<?php


namespace Milestone\SmartKitchen\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class MonitoringOnlyScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->where(function($Q){
            return $Q->where('monitor','Yes')->orWhere(function($QQ){
                return $QQ->where('monitor','No')->where('updated_at','>',now()->subRealDays(3)->toDateTimeString());
            });
        });
    }

}
