<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Tax;

class TaxController extends Controller
{

    public static function data(){
        return request(['name','contents','items','status']);
    }

    public static function create(){
        $item = new Tax(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Tax::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }

}
