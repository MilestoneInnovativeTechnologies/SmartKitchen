<?php

namespace Milestone\SmartKitchen\Models;

use Milestone\SmartKitchen\Scopes\ActiveOnlyScope;

class Tax extends Model
{

    protected static function booted(){ static::addGlobalScope(new ActiveOnlyScope); }

    protected $casts = [
        'contents'  =>  'array',
        'items'     =>  'array',
    ];

    public static function Contents($contents,$price,$quantity){
        if(empty($contents)) return [];
        $price = doubleval($price); $quantity = doubleval($quantity);
        return array_map(function($content) use($price,$quantity){
            return [
                'name' => $content['name'],// 'price' => $price, 'quantity' => $quantity,
                'percent' => $percent = doubleval($content['percent']),
                'amount' => $price * $quantity * $percent/100
            ];
        },$contents);
    }
}
