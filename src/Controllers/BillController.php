<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Jobs\TryMakingBillAsCancelled;
use Milestone\SmartKitchen\Requests\CreateBillRequest;

class BillController extends Controller
{
    public function Create(CreateBillRequest $createBillRequest){
        $createBillRequest->store();
        return redirect()->back();
    }

    public function Cancel(Request $request){
        $bill_id = $request->bill;
        TryMakingBillAsCancelled::dispatch($bill_id);
    }
}
