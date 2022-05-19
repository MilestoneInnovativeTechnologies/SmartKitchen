<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Events\TokenItemAdded;
use Milestone\SmartKitchen\Events\TokenItemAdding;
use Milestone\SmartKitchen\Events\TokenItemPrepared;
use Milestone\SmartKitchen\Events\TokenItemsSaved;
use Milestone\SmartKitchen\Events\TokenItemsSaving;
use Milestone\SmartKitchen\Events\TokenItemUpdated;
use Milestone\SmartKitchen\Events\TokenItemUpdating;
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
            $quantity = $obj['quantity'] ?? 0;
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
        TokenItemsSaved::dispatch($Token->fresh()->Items,$user,$Token->id);
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
    }

    public function cancel(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        TokenItemController::Cancel($tokenItem,$user);
        return TokenItem::find($tokenItem);
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
            TokenItemsSaving::dispatch([$token_item]);
            $token_item->token = $token_id;
            TokenItemAdding::dispatch($token_id,$ti_data['item'],$ti_data['quantity'],$request->input('user'),$ti_data);
            $token_item->save();
            TokenItemAdded::dispatch($token_item->fresh(),$request->input('user'),$ti_data);
//            TokenItemsSaved::dispatch(Token::find($token_id)->Items,$request->input('user'),$token_id);
            return $token_item->fresh();
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

    public function customer(Request $request){
        if(!$request->filled(['token'])) return;
        Token::find($request->input('token'))->update($request->only('customer'));
    }

    public function kot_print(Request $request){
        if(!$request->input('id')) return []; $token_id = $request->input('id');
        $Token = Token::with('Items')->find($token_id);
        $kitchens = $Token->Items->map->kitchen->filter()->unique()->values()->toArray();
        if($kitchens) Kitchen::whereIn('id',$kitchens)->get()->each(function($kitchen)use($token_id){ $kitchen->print(['args' => [$token_id]]); });
        return [];
    }

    public function print(Request $request){
        if(!$request->input('id')) return []; $token_id = $request->input('id');
        Token::find($token_id)->print(['template_name' => 'token_print_template','printer_name' => 'token_printer']);
        return [];
    }

    public function sales_print(Request $request){
        if(!$request->input('id')) return []; $token_id = $request->input('id');
        Token::find($token_id)->print(['template_name' => 'sale_print_template','printer_name' => 'sale_printer']);
        return [];
    }
}
