<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemsSaved;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\Token;

class PrintAcceptedItemsToken
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemsSaved $event)
    {
        $token = $event->token;
        $Token = Token::with(['Items' => function($Q){
            $Q->whereNotNull('kitchen')->where('progress','!=','New');
        }])->find($token);
        $kitchens = $Token->Items->map->kitchen->filter()->unique()->toArray();
        if(empty($kitchens)) return;
        Kitchen::whereIn('id',$kitchens)->where('auto_accept','Yes')->get()->each(function($kitchen) use($token){ $kitchen->print(['args' => $token]); });
    }
}
