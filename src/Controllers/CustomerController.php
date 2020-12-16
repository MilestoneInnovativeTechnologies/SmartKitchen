<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Customer;

class CustomerController extends Controller
{

    public function create(){
        $data = request()->only(['name','email','phone','address']);
        $customer = new Customer($data); $customer->save();
        return $customer;
    }

}
