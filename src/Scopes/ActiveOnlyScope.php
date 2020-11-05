<?php


namespace Milestone\SmartKitchen\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class ActiveOnlyScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('status','Active');
    }

}
