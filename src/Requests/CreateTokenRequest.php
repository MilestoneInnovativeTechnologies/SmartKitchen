<?php

namespace Milestone\SmartKitchen\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Events\TokenCreated;
use Milestone\SmartKitchen\Events\TokenCreating;
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
//        $this->merge(['user' => $this->input('user')]);
    }

    public function store(){
        $data = $this->only(['type','seating','price_list','user','customer']);
        TokenCreating::dispatch($data);
        $token = Token::create($data);
        TokenCreated::dispatch($token);
        return $token;
    }
}
