<?php

namespace Milestone\SmartKitchen\Models;

class ItemGroup extends Model
{

    protected $hidden = ['created_at','updated_at'];
    protected $casts = [
        'items' =>  'array'
    ];

}
