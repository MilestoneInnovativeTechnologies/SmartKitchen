<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
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
        TokenItemsSaved::dispatch($Token->fresh()->Items);
        return redirect('order');
    }

    public function Accept(Request $request){
        $tokenItem = TokenItem::find($request->input('id'));
        $kitchen = $request->input('kitchen');
        $user = $request->input('user',Auth::id());
        $progress = 'Accepted';
        TokenItemAccepting::dispatch($tokenItem,$kitchen,$user);
        $tokenItem->update(compact('kitchen','progress'));
        TokenItemAccepted::dispatch($tokenItem,$kitchen,$user);
    }

    public function Reset(Request $request){
        $tokenItem = TokenItem::find($request->input('id'));
        $kitchen = $request->input('kitchen');
        $user = $request->input('user',Auth::id());
        $progress = 'New';
        TokenItemResetting::dispatch($tokenItem,$kitchen,$user);
        $tokenItem->update(compact('kitchen','progress'));
        TokenItemReset::dispatch($tokenItem,$kitchen,$user);
    }

    public function Process(Request $request){
        $tokenItem = TokenItem::find($request->input('id'));
        $user = $request->input('user',Auth::id());
        $progress = 'Processing';
        TokenItemProcessing::dispatch($tokenItem,$user);
        $tokenItem->update(compact('progress'));
        TokenItemProcessed::dispatch($tokenItem,$user);
    }

    public function Complete(Request $request){
        $tokenItem = TokenItem::find($request->input('id'));
        $user = $request->input('user',Auth::id());
        $progress = 'Completed';
        TokenItemCompleting::dispatch($tokenItem,$user);
        $tokenItem->update(compact('progress'));
        TokenItemCompleted::dispatch($tokenItem,$user);
    }

    public function Served(Request $request){
        $tokenItem = TokenItem::find($request->input('id'));
        $user = $request->input('user',Auth::id());
        $progress = 'Served';
        TokenItemServing::dispatch($tokenItem, $user);
        $tokenItem->update(compact('progress'));
        TokenItemServed::dispatch($tokenItem, $user);
    }

    public function Cancel(Request $request){
        $tokenItem = TokenItem::find($request->input('id'));
        $user = $request->input('user',Auth::id());
        $progress = 'Cancelled';
        TokenItemCancelling::dispatch($tokenItem, $user);
        $tokenItem->update(compact('progress'));
        TokenItemCancelled::dispatch($tokenItem, $user);
    }

    public static function Amount($token, $progress = null){
        $Token = Token::with(['Items','PriceList.Items'])->find($token);
        $progress = $progress ? array_intersect(is_array($progress) ? $progress : [$progress],Token::$summableProgress) : Token::$summableProgress;
        $prices = $Token->PriceList->Items->whereIn('item',$Token->Items->pluck('item')->all())->pluck('price','item')->all();
        return $Token->Items->sum(function($item) use($progress,$prices) {
            return in_array($item->progress,$progress) ? doubleval(($item->quantity) * ($prices[$item->item] ?? 0)) : 0;
        });
    }
}
