<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Database\Eloquent\Builder;

class Bill extends Model
{

    protected static function booted()
    {
        static::addGlobalScope('not_cancelled', function (Builder $builder) {
            $builder->where('progress', '!=', 'Cancelled');
        });
    }

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
    public function Payments(){ return $this->hasMany(Payment::class,'bill','id'); }

}
