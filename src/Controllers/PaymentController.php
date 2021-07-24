<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Jobs\UpdateBillProgress;
use Milestone\SmartKitchen\Models\Payment;
use Milestone\SmartKitchen\Requests\CreatePaymentRequest;

class PaymentController extends Controller
{
    public function create(CreatePaymentRequest $createPaymentRequest){
        $createPaymentRequest->store();
    }

    public function cancel(Request $request){
        if(!$request->id) return null;
        $Payment = Payment::find($request->id);
        $Payment->status = 'Inactive';
        $Payment->save();
        UpdateBillProgress::dispatch($Payment->bill);
        return $Payment;
    }
}
