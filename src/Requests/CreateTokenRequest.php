<?php

namespace Milestone\SmartKitchen\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\TokenCreating;
use Milestone\SmartKitchen\Models\PriceList;
use Milestone\SmartKitchen\Models\Token;

class CreateTokenRequest extends FormRequest
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
            'seating'   =>  'required_if:type,Dining',
            'items'     =>  'required'
        ];
    }

    protected function prepareForValidation(){
        $this->merge([
            'user' => $this->input('user',auth()->id()),
            'date' => $this->input('date',now()->toDateTimeString()),
            'price_list' => $this->input('price_list',Arr::get(PriceList::where('status','Active')->first(),'id')),
        ]);
    }

    public function store(){
        $data = $this->only(['type','seating','date','price_list','user','customer','narration','progress']);
        TokenCreating::dispatch($data);
        $token = Token::create($data);
        return $token;
    }
}
