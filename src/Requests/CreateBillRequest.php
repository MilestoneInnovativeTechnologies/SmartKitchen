<?php

namespace Milestone\SmartKitchen\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Controllers\TokenController;
use Milestone\SmartKitchen\Events\BillCreated;
use Milestone\SmartKitchen\Events\BillCreating;
use Milestone\SmartKitchen\Models\Bill;

class CreateBillRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'token'   =>  'required',
            'customer'=>  'required'
        ];
    }

    protected function prepareForValidation(){
        $this->merge([
            'amount'    => TokenController::Amount($this->input('token')),
            'discount'  => doubleval($this->input('discount') ?: 0),
        ]);
    }

    public function store(){
        $data = $this->only(['token','customer','user','amount','discount']);
        BillCreating::dispatch($data);
        $bill = Bill::create($data);
        BillCreated::dispatch($bill);
        return $bill;
    }
}
