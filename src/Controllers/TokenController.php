<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Events\TokenCreated;
use Milestone\SmartKitchen\Events\TokenItemAdded;
use Milestone\SmartKitchen\Events\TokenItemAdding;
use Milestone\SmartKitchen\Events\TokenItemPrepared;
use Milestone\SmartKitchen\Events\TokenItemsAdded;
use Milestone\SmartKitchen\Events\TokenItemsCancelled;
use Milestone\SmartKitchen\Events\TokenItemsSaved;
use Milestone\SmartKitchen\Events\TokenItemsSaving;
use Milestone\SmartKitchen\Events\TokenItemsUpdated;
use Milestone\SmartKitchen\Events\TokenItemUpdated;
use Milestone\SmartKitchen\Events\TokenItemUpdating;
use Milestone\SmartKitchen\Events\TokenUpdated;
use Milestone\SmartKitchen\Models\Bill;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\Tax;
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;
use Milestone\SmartKitchen\Requests\CreateTokenRequest;

class TokenController extends Controller
{
    public function create(CreateTokenRequest $request){
        $Token = $request->store(); $user = $Token->user;
        $Items = [];
        foreach ($request->input('items') as $obj){
            if(!$obj['item']) continue;
            $item = $obj['item'];
            $quantity = ($obj['quantity'] ?? 0) ?: 1;
            $narration = $obj['narration'] ?? null;
            $delay = $obj['delay'] ?? 0; $delay = intval($delay) * 60;
            if($delay > 0) $delay += time();
            $deliver = array_key_exists('deliver',$obj) ? Carbon::parse($obj['deliver'])->toDateTimeString() : null;
            $photo = $obj['photo'] ?? null;
            $data = compact('user','item','quantity','delay','narration','deliver','photo');
            $Items[] = new TokenItem($data);
            TokenItemPrepared::dispatch($data);
        }
        TokenItemsSaving::dispatch($Items);
        $Token->Items()->saveMany($Items);
        $Token = $Token->fresh();
        TokenItemsSaved::dispatch($Token->Items,$user,$Token->id);
        TokenCreated::dispatch($Token);
        return $Token;
    }

    public function accept(Request $request){
        $tokenItem = $request->input('id');
        $kitchen = $request->input('kitchen');
        $user = $request->input('user',Auth::id());
        TokenItemController::Accept($tokenItem,$kitchen,$user);
        return TokenItem::find($tokenItem);
    }

    public function reset(Request $request){
        $tokenItem = $request->input('id');
        $kitchen = $request->input('kitchen');
        $user = $request->input('user',Auth::id());
        TokenItemController::Reset($tokenItem,$kitchen,$user);
        return TokenItem::find($tokenItem);
    }

    public function process(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        TokenItemController::Process($tokenItem,$user);
        return TokenItem::find($tokenItem);
    }

    public function complete(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        TokenItemController::Complete($tokenItem,$user);
        return TokenItem::find($tokenItem);
    }

    public function served(Request $request){
        $tokenItems = $request->input('id');
        $tokenItems = is_array($tokenItems) ? $tokenItems : [$tokenItems];
        $user = $request->input('user',Auth::id());
        foreach ($tokenItems as $tokenItem) TokenItemController::Serve($tokenItem,$user);
        if($request->filled(['bill','amount','type']) && (float) $request->amount > 0){
            $class = PaymentController::class; $action = 'create';
            app()->call("$class@$action");
        }
    }

    public function do_cancel(Request $request){
        $user = $request->input('user',Auth::id()); $tokenItems = [];
        Token::with(['Items'])->find($request->input('id'))->Items->each(function($tokenItem)use($user,&$tokenItems){
            $tokenItems[] = TokenItemController::Cancel($tokenItem->id,$user);
        });
        TokenItemsUpdated::dispatch([], [], $tokenItems, $user, $request->input('id'));
    }

    public function cancel(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        $tokenItem = TokenItemController::Cancel($tokenItem,$user);
        TokenItemsUpdated::dispatch([], [], [$tokenItem], $user, $tokenItem->token);
    }

    public static function Items($token, $progress = null){
        $Token = Token::with(['Items.Item','PriceList.Items'])->find($token);
        $progress = $progress ? array_intersect(is_array($progress) ? $progress : [$progress],Token::$summableProgress) : Token::$summableProgress;
        $prices = $Token->PriceList->Items->whereIn('item',$Token->Items->pluck('item')->all())->pluck('price','item')->all();
        $taxes = Tax::all(); $Items = $Token->Items;
        return collect($Items
            ->filter(function($item) use($progress){ return in_array($item->progress,$progress); })
            ->map(function($item) use($prices){ return collect($item)->merge(['item' => $item->Item->id, 'name' => $item->Item->name,'price' => $prices[$item->Item->id] ?? 0])->merge($item->Item->props)->all(); })
            ->map(function($item) use($taxes){
                $tax = $taxes->first(function($tax)use($item){ return in_array($item['item'],$tax->items); });
                return collect($item)->merge([ 'tax' => $tax ? Arr::only($tax->toArray(),['id','name','contents']) : null])->all();
            }))->values()
            ;
    }
    public static function Amount($token, $progress = null){
        return self::Items($token, $progress)->sum(function($item){ return doubleval(($item['quantity'] ?? 1) * ($item['price'] ?? 0)); });
    }

    public function waiter(){
        return Token::with(['Items'])->waiter()->active()->get();
    }

    public function item(Request $request){
        if(!$request->has('user')) $request->merge(['user' => auth()->id()]);
        $ti_data = $request->only(['item','quantity','delay','narration','user','deliver','photo']);
        if(array_key_exists('delay',$ti_data)){ $delay_int = intval($ti_data['delay']); $ti_data['delay'] = ($delay_int && $delay_int > 0) ? (($delay_int * 60) + time()) : 0; }
        if($request->has('token')){
            $token_id = $request->input('token');
            TokenItemPrepared::dispatch($ti_data);
            $token_item = new TokenItem($ti_data);
            $token_item->token = $token_id;
            TokenItemAdding::dispatch($token_id,$ti_data['item'],$ti_data['quantity'],$request->input('user'),$ti_data);
            $token_item->save(); $tokenItem = $token_item->fresh();
            TokenItemAdded::dispatch($tokenItem,$request->input('user'),$ti_data);
            TokenItemsUpdated::dispatch([$tokenItem->fresh()], [], [], $request->user, $tokenItem->token);
            return $tokenItem->fresh();
        }
        elseif($request->has('id')){
            $id = $request->input('id');
            $token_item = TokenItem::find($id); $old = $token_item->toArray();
            TokenItemUpdating::dispatch($id,$ti_data,$old);
            $token_item->update($ti_data);
            TokenItemUpdated::dispatch($id,$ti_data,$old);
            return $token_item->fresh();
        }
        return [];
    }

    public function token_items(Request $request){
        if(!$request->filled('token')) return [];
        $user = $request->input('user',Auth::id());
        $token_id = $request->input('token');
        $cancelled = $request->input('cancelled'); $added = $request->input('added'); $items = $request->input('items');
        $done_cancelled = empty($cancelled) ? [] : self::BulkUpdateCancel($token_id,$user,$items,$cancelled);
        $done_added = empty($added) ? [] : self::BulkUpdateAdd($token_id,$user,$items,$added);
        $done_modified = [];
        foreach ($request->input('items') as $obj){
            if(!$obj['item'] || !$obj['id']) continue;
            $token_item_id = $obj['id'];
            $token_item = TokenItem::find($token_item_id); $old = $token_item->toArray();
            $ti_data = Arr::only($obj,['item','quantity','delay','narration']);
            if(!self::HaveTIUpdate($ti_data,$old)) continue;
            TokenItemUpdating::dispatch($token_item_id,$ti_data,$old);
            $token_item->update($ti_data);
            TokenItemUpdated::dispatch($token_item_id,$ti_data,$old);
            $done_modified[] = $token_item->fresh();
        }
        TokenItemsUpdated::dispatch($done_added, $done_modified, $done_cancelled, $user, $token_id);
        return [];
    }

    public function customer(Request $request){
        if(!$request->filled(['token'])) return;
        Token::find($request->input('token'))->update($request->only('customer'));
        TokenUpdated::dispatch(Token::find($request->input('token')),'customer');
        Bill::where('token',$request->token)->where('progress','!=','Cancelled')->update($request->only('customer'));
    }

    public function kot_print(Request $request){
        if(!$request->input('id')) return []; $token_id = $request->input('id');
        $Token = Token::with(['Items' => function($Q){ return $Q->where('progress','!=',"Cancelled"); }])->find($token_id);
        $kitchens = $Token->Items->map->kitchen->filter()->unique()->values()->toArray();
        if($kitchens) Kitchen::whereIn('id',$kitchens)->get()->each(function($kitchen)use($token_id){ $kitchen->print(['args' => [$token_id]]); });
        return [];
    }

    public function print(Request $request){
        if(!$request->input('id')) return []; $token_id = $request->input('id');
        Token::find($token_id)->print();
        return [];
    }

    private static function BulkUpdateCancel($token,$user,$items,$cancelled){
        $cancellable = [];
        if(empty($cancelled) || empty($items)) return [];
        foreach ($cancelled as $cancel){
            $id = $items[$cancel]['id'];
            if($id) $cancellable[] = $id;
        }
        $tokenItems = TokenItem::find($cancellable)->each(function ($tokenItem){
            $tokenItem->progress = 'Cancelled';
            $tokenItem->save();
        })->all();
        TokenItemsCancelled::dispatch($tokenItems,$user,$token);
        return $tokenItems;
    }

    private static function BulkUpdateAdd($token,$user,$items,$added){
        $tokenItems = [];
        if(empty($added) || empty($items)) return $tokenItems;
        foreach ($added as $idx){
            $data = $items[$idx];
            $ti_data = Arr::only($data,['item','quantity','delay','narration']); $ti_data['user'] = $user;
            $delay_int = intval($ti_data['delay']); $ti_data['delay'] = ($delay_int && $delay_int > 0) ? (($delay_int * 60) + time()) : 0;
            TokenItemPrepared::dispatch($ti_data);
            $token_item = new TokenItem($ti_data);
            $token_item->token = $token;
            TokenItemAdding::dispatch($token,$ti_data['item'],$ti_data['quantity'],$user,$ti_data);
            $token_item->save(); $tokenItem = $token_item->fresh();
            TokenItemAdded::dispatch($tokenItem,$user,$ti_data);
            $tokenItems[] = $tokenItem->fresh();
        }
        TokenItemsAdded::dispatch($tokenItems,$user,$token);
        return $tokenItems;
    }

    private static function HaveTIUpdate($NewData,$OldData){
        foreach ($NewData as $key => $val){
            if(!array_key_exists($key,$OldData) || $OldData[$key] !== $val)
                return true;
        }
        return false;
    }
}
