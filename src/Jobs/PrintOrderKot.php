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

    private $token, $mode, $added, $modified, $cancelled;
    private static $MODES = ['Add' => 'added','Modify' => 'modified','Cancel' => 'cancelled'];

    public function __construct($token, $mode, $added, $modified, $cancelled){
        $this->token = $token; $this->mode = $mode;
        $this->added = $added; $this->modified = $modified; $this->cancelled = $cancelled;
    }

    public function handle(){
        if(!$this->mode) return self::FullPrint($this->token);
        if(!$this->added && !$this->modified && !$this->cancelled) return Log::critical('KOT print job called without added,modified,cancelled but having Mode: ' . $this->mode);
        if(settings('kot_print_separate',true) === null){
            foreach (self::$MODES as $mode => $data){
                if(empty($this->{$data})) continue;
                if(settings('kot_' . strtolower($mode) . '_print_template')) self::ItemPrint($this->{$data},$mode,$this->token);
                else self::FullPrint($this->{$data});
            }
            return null;
        }
        if(settings('kot_print_separate',true) === true){
            foreach (self::$MODES as $mode => $data){
                if(empty($this->{$data})) continue;
                self::ItemPrint($this->{$data},$mode,$this->token);
            }
            return null;
        }
        foreach (self::$MODES as $data){
            if(empty($this->{$data})) continue;
            self::FullPrint($this->{$data});
        }
        return null;
    }

    private static function FullPrint($token){
        $Token = Token::with(['Items' => function($Q){
            $Q->whereNotNull('kitchen')->where('progress','!=','New');
        }])->find($token);
        $kitchens = $Token->Items->map->kitchen->filter()->unique()->toArray();
        if(empty($kitchens)) return;
        Kitchen::whereIn('id',$kitchens)->where('auto_accept','Yes')->get()->each(function($kitchen) use($token){ $kitchen->print(['args' => [$token]]); });
    }

    private static function ItemPrint($tokenItems,$mode,$token){
        $kitchens = [];
        collect((array) $tokenItems)->each(function($tokenItem)use(&$kitchens){
            if($tokenItem->progress !== 'New' && $tokenItem->kitchen){
                $kitchen = $tokenItem->kitchen;
                if(!array_key_exists($kitchen,$kitchens)) $kitchens[$kitchen] = [];
                $kitchens[$kitchen][] = $tokenItem->id;
            }
        });
        if(!empty($kitchens)){
            Kitchen::find(array_keys($kitchens))->each(function($Kitchen)use($kitchens,$mode,$token){
                $kitchen_id = $Kitchen->id; $items = $kitchens[$kitchen_id] ?? [];
                if(!empty($items) && $Kitchen->auto_accept === 'Yes'){
                    $Kitchen->print(['args' => [$token,$items,$mode], 'sub' => $mode]);
                }
            });
        }
    }
}
