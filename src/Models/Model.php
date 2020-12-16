<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;

class Model extends BaseModel
{
    use HasFactory;

    public function scopeSync($Query, $after, $before, $id = 0){
        return $Query->where(function($Q)use($after,$before,$id){
            return $Q
                ->where(function($QQ)use($after,$before,$id){ return $id ? $QQ->where('id','>',$id) : $QQ->where('created_at','>',$after)->where('created_at','<=',$before); })
                ->orWhere(function($QQ)use($after,$before,$id){ return $id ? $QQ->where('id','<=',$id)->where('updated_at','>=',$after) : $QQ->where('updated_at','>=',$after)->where('created_at','<=',$after); });
        });
    }
}
