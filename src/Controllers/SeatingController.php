<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Seating;

class SeatingController extends Controller
{

    public static function data(){
        return request(['name','detail','status','price_list','seats']);
    }

    public static function create(){
        $item = new Seating(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Seating::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }

}
