<?php

namespace Milestone\SmartKitchen\Models;

use Milestone\SmartKitchen\Jobs\RemoteAddKitchenItems;
use Milestone\SmartKitchen\Scopes\MonitoringOnlyScope;

class Remote extends Model
{

    protected $hidden = ['created_at','updated_at'];

    protected static function booted() {
        static::addGlobalScope(new MonitoringOnlyScope);
        static::saving(function($remote){ if(!$remote->location) $remote->setAttribute('location',sk('branch_code')); });
        static::saved(function($remote){
            if($remote->item === 'kitchens'){
                $kis = KitchenItem::where('kitchen',$remote->local_id)->pluck('item')->toArray();
                if(!empty($kis)) Remote::where('item','kitchen_items')->whereIn('local_id',$kis)->get()->each->touch();
                if($remote->isDirty('reference')) RemoteAddKitchenItems::dispatch($remote->local_id,$remote->location);
            } elseif($remote->item === 'tokens'){
                $tis = TokenItem::where('token',$remote->local_id)->pluck('item')->toArray();
                if(!empty($tis)) Remote::where('item','token_items')->whereIn('local_id',$tis)->get()->each->touch();
            }
        });
    }

    protected $casts = [
        'extra'   =>  'array',
    ];
}
