<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;

class PrintOrderKot
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $token, $mode, $tokenItemID;

    public function __construct($token, $mode, $tokenItemID){
        $this->token = $token;
        $this->mode = $mode;
        $this->tokenItemID = $tokenItemID;
    }

    public function handle(){
        if(!$this->mode) return self::FullPrint($this->token);
        if(!$this->tokenItemID) return Log::critical('KOT print job called without TokenItemID but having Mode: ' . $this->mode);
        if(settings('kot_print_separate',true) === null){
            if(settings('kot_' . strtolower($this->mode) . '_print_template')) self::ItemPrint($this->tokenItemID,$this->mode);
            else self::FullPrint($this->token);
            return null;
        }
        if(settings('kot_print_separate',true) === true) return self::ItemPrint($this->tokenItemID,$this->mode);
        return self::FullPrint($this->token);
    }

    private static function FullPrint($token){
        $Token = Token::with(['Items' => function($Q){
            $Q->whereNotNull('kitchen')->where('progress','!=','New');
        }])->find($token);
        $kitchens = $Token->Items->map->kitchen->filter()->unique()->toArray();
        if(empty($kitchens)) return;
        Kitchen::whereIn('id',$kitchens)->where('auto_accept','Yes')->get()->each(function($kitchen) use($token){ $kitchen->print(['args' => [$token]]); });
    }

    private static function ItemPrint($tokenItemID,$mode){
        $tokenItem = TokenItem::find($tokenItemID);
        if($tokenItem->progress === 'New' || !$tokenItem->kitchen) return;
        $Kitchen = Kitchen::find($tokenItem->kitchen);
        if($Kitchen->auto_accept === 'Yes') $Kitchen->print(['args' => [$tokenItem->token,$tokenItemID],'item' => $mode]);
    }
}
