<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Requests\CreatePaymentRequest;

class PaymentController extends Controller
{
    public function create(CreatePaymentRequest $createPaymentRequest){
        $createPaymentRequest->store();
    }
}
