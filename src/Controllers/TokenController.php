<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Events\TokenItemAccepted;
use Milestone\SmartKitchen\Events\TokenItemAccepting;
use Milestone\SmartKitchen\Events\TokenItemCancelled;
use Milestone\SmartKitchen\Events\TokenItemCancelling;
use Milestone\SmartKitchen\Events\TokenItemCompleted;
use Milestone\SmartKitchen\Events\TokenItemCompleting;
use Milestone\SmartKitchen\Events\TokenItemPrepared;
use Milestone\SmartKitchen\Events\TokenItemProcessed;
use Milestone\SmartKitchen\Events\TokenItemProcessing;
use Milestone\SmartKitchen\Events\TokenItemReset;
use Milestone\SmartKitchen\Events\TokenItemResetting;
use Milestone\SmartKitchen\Events\TokenItemServed;
use Milestone\SmartKitchen\Events\TokenItemServing;
use Milestone\SmartKitchen\Events\TokenItemsSaved;
use Milestone\SmartKitchen\Events\TokenItemsSaving;
use Milestone\SmartKitchen\Models\Tax;
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;
use Milestone\SmartKitchen\Requests\CreateTokenRequest;

class TokenController extends Controller
{
    public function Create(CreateTokenRequest $request){
        $Token = $request->store(); $user = $Token->user;
        $Items = [];
        foreach ($request->input('items') as $item){
            $quantity = $request->input("quantity.$item");
            $narration = $request->input("narration.$item");
            $delay = $request->input("delay.$item",0);
            $data = compact('user','item','quantity','delay','narration');
            $Items[] = new TokenItem($data);
            TokenItemPrepared::dispatch($data);
        }
        TokenItemsSaving::dispatch($Items);
        $Token->Items()->saveMany($Items);
        TokenItemsSaved::dispatch($Token->fresh()->Items,$user);
        return redirect('order');
    }

    public function Accept(Request $request){
        $tokenItem = $request->input('id');
        $kitchen = $request->input('kitchen');
        $user = $request->input('user',Auth::id());
        self::TokenItemAccept($tokenItem,$kitchen,$user);
    }

    public function Reset(Request $request){
        $tokenItem = $request->input('id');
        $kitchen = $request->input('kitchen');
        $user = $request->input('user',Auth::id());
        self::TokenItemReset($tokenItem,$kitchen,$user);
    }

    public function Process(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        self::TokenItemProcess($tokenItem,$user);
    }

    public function Complete(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        self::TokenItemComplete($tokenItem,$user);
    }

    public function Served(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        self::TokenItemServe($tokenItem,$user);
    }

    public function Cancel(Request $request){
        $tokenItem = $request->input('id');
        $user = $request->input('user',Auth::id());
        self::TokenItemCancel($tokenItem,$user);
    }

    public static function Items($token, $progress = null){
        $Token = Token::with(['Items.Item','PriceList.Items'])->find($token);
        $progress = $progress ? array_intersect(is_array($progress) ? $progress : [$progress],Token::$summableProgress) : Token::$summableProgress;
        $prices = $Token->PriceList->Items->whereIn('item',$Token->Items->pluck('item')->all())->pluck('price','item')->all();
        $taxes = Tax::all(); $Items = $Token->Items;
        return collect($Items
            ->filter(function($item) use($progress){ return in_array($item->progress,$progress); })
            ->map(function($item) use($prices){ return collect($item)->merge(['item' => $item->Item->id, 'name' => $item->Item->name,'price' => $prices[$item->Item->id]])->all(); })
            ->map(function($item) use($taxes){
                $tax = $taxes->first(function($tax)use($item){ return in_array($item['item'],$tax->items); });
                return collect($item)->merge([ 'tax' => $tax ? Arr::only($tax->toArray(),['id','name','contents']) : null])->all();
            }))
            ;
    }
    public static function Amount($token, $progress = null){
        return self::Items($token, $progress)->sum(function($item){ return doubleval(($item['quantity'] ?? 1) * ($item['price'] ?? 0)); });
    }

    public static function TokenItemAccept($tokenItem,$kitchen,$user){
        $progress = 'Accepted'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Accept token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemAccepting::dispatch($tokenItem->id,$kitchen,$tokenItem->item,$user);
        $tokenItem->update(compact('kitchen','progress'));
        TokenItemAccepted::dispatch($tokenItem,$user);
        return $tokenItem;
    }
    public static function TokenItemReset($tokenItem,$kitchen,$user){
        $progress = 'New'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Reset token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemResetting::dispatch($tokenItem,$kitchen,$user);
        $tokenItem->update(compact('kitchen','progress'));
        TokenItemReset::dispatch($tokenItem,$user);
        return $tokenItem;
    }
    public static function TokenItemProcess($tokenItem,$user){
        $progress = 'Processing'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Process token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemProcessing::dispatch($tokenItem,$user);
        $tokenItem->update(compact('progress'));
        TokenItemProcessed::dispatch($tokenItem,$user);
    }
    public static function TokenItemCancel($tokenItem,$user){
        $progress = 'Cancelled'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Cancel token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemCancelling::dispatch($tokenItem, $user);
        $tokenItem->update(compact('progress'));
        TokenItemCancelled::dispatch($tokenItem, $user);
    }
    public static function TokenItemComplete($tokenItem,$user){
        $progress = 'Completed'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Complete token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemCompleting::dispatch($tokenItem,$user);
        $tokenItem->update(compact('progress'));
        TokenItemCompleted::dispatch($tokenItem,$user);
    }
    public static function TokenItemServe($tokenItem,$user){
        $progress = 'Served'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Serve token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemServing::dispatch($tokenItem, $user);
        $tokenItem->update(compact('progress'));
        TokenItemServed::dispatch($tokenItem, $user);
    }
}
