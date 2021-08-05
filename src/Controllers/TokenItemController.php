<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Events\TokenItemAccepted;
use Milestone\SmartKitchen\Events\TokenItemAccepting;
use Milestone\SmartKitchen\Events\TokenItemCancelled;
use Milestone\SmartKitchen\Events\TokenItemCancelling;
use Milestone\SmartKitchen\Events\TokenItemCompleted;
use Milestone\SmartKitchen\Events\TokenItemCompleting;
use Milestone\SmartKitchen\Events\TokenItemProcessed;
use Milestone\SmartKitchen\Events\TokenItemProcessing;
use Milestone\SmartKitchen\Events\TokenItemReset;
use Milestone\SmartKitchen\Events\TokenItemResetting;
use Milestone\SmartKitchen\Events\TokenItemServed;
use Milestone\SmartKitchen\Events\TokenItemServing;
use Milestone\SmartKitchen\Models\TokenItem;

class TokenItemController extends Controller
{

    public static function Accept($tokenItem,$kitchen,$user){
        $progress = 'Accepted'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Accept token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemAccepting::dispatch($tokenItem->id,$kitchen,$tokenItem->item,$user);
        $tokenItem->update(compact('kitchen','progress'));
        TokenItemAccepted::dispatch($tokenItem,$user);
        return $tokenItem;
    }
    public static function Reset($tokenItem,$kitchen,$user){
        $progress = 'New'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Reset token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemResetting::dispatch($tokenItem,$kitchen,$user);
        $kitchen = null;
        $tokenItem->update(compact('kitchen','progress'));
        TokenItemReset::dispatch($tokenItem,$user);
        return $tokenItem;
    }
    public static function Process($tokenItem,$user){
        $progress = 'Processing'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Process token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemProcessing::dispatch($tokenItem,$user);
        $tokenItem->update(compact('progress'));
        TokenItemProcessed::dispatch($tokenItem,$user);
        return $tokenItem;
    }
    public static function Cancel($tokenItem,$user){
        $progress = 'Cancelled'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Cancel token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemCancelling::dispatch($tokenItem, $user);
        $tokenItem->update(compact('progress'));
        TokenItemCancelled::dispatch($tokenItem, $user);
        return $tokenItem;
    }
    public static function Complete($tokenItem,$user){
        $progress = 'Completed'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Complete token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemCompleting::dispatch($tokenItem,$user);
        $tokenItem->update(compact('progress'));
        TokenItemCompleted::dispatch($tokenItem,$user);
        return $tokenItem;
    }
    public static function Serve($tokenItem,$user){
        $progress = 'Served'; $tokenItem = TokenItem::find($tokenItem);
        if(!$tokenItem) return Log::warning('Called function to Serve token item: ' . $tokenItem->id . ', But such token item does not exist..');
        TokenItemServing::dispatch($tokenItem, $user);
        $tokenItem->update(compact('progress'));
        TokenItemServed::dispatch($tokenItem, $user);
        return $tokenItem;
    }
}
