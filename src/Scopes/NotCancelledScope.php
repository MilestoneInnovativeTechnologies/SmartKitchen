<?php


namespace Milestone\SmartKitchen\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class NotCancelledScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('progress','!=','Cancelled')->orWhere(function($QQ){
            return $QQ->where('progress','Cancelled')->where('updated_at','>',now()->subRealMinutes(5)->toDateTimeString());
        });
    }

}
