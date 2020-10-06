<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Database\Eloquent\Builder;

class Token extends Model
{
    protected static function booted()
    {
        static::addGlobalScope('not_cancelled', function (Builder $builder) {
            $builder->where('progress', '!=', 'Cancelled');
        });
    }
    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Seating(){ return $this->belongsTo(Seating::class,'customer','id'); }
    public function User(){ return $this->belongsTo(User::class,'user','id'); }
    public function PriceList(){ return $this->belongsTo(PriceList::class,'price_list','id'); }
    public function Items(){ return $this->hasMany(TokenItem::class,'token','id'); }
    public function Bill(){ return $this->hasOne(Bill::class,'token','id')->where('progress','!=','Cancelled'); }

}
