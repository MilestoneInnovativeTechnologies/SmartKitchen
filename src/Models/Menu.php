<?php

namespace Milestone\SmartKitchen\Models;

class Menu extends Model
{

    protected $hidden = ['created_at','updated_at'];

    protected $casts = [
        'groups' => 'array',
    ];

}
