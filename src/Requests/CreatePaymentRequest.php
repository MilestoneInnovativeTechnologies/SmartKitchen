<?php

namespace Milestone\SmartKitchen\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Events\PaymentCreated;
use Milestone\SmartKitchen\Events\PaymentCreating;
use Milestone\SmartKitchen\Models\Payment;

class CreatePaymentRequest extends FormRequest
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
            'bill'   =>  'required',
            'amount' =>  'required'
        ];
    }

    protected function prepareForValidation(){
        $this->merge([
            'date' => $this->input('date',now()->toDateTimeString()),
            'amount'  => doubleval($this->input('amount') ?: 0),
            'type'    => $this->input('type','Cash'),
            'status'    => $this->input('status','Active'),
        ]);
    }

    public function store(){
        $data = $this->only(['bill','amount','type','detail','date']);
        PaymentCreating::dispatch($data);
        $payment = Payment::create($data);
        PaymentCreated::dispatch($payment);
        return $payment;
    }
}
