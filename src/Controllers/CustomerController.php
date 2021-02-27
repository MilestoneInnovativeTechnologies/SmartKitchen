<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Customer;

class CustomerController extends Controller
{

    public function create(){
        $data = request()->only(['name','email','phone','address','status']);
        $customer = new Customer($data); $customer->save();
        return $customer;
    }

    public function update(){
        if(!request()->has('id')) return $this->create();
        $data = request(['name','email','phone','address','status']);
        Customer::find(request()->input('id'))->update($data);
    }

}
