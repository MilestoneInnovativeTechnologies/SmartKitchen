<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\File;

class Model extends BaseModel
{
    use HasFactory, InteractsWithMedia;

    public function scopeSync($Query, $after, $before, $id = 0){
        return $Query->where(function($Q)use($after,$before,$id){
            return $Q
                ->where(function($QQ)use($after,$before,$id){ return $id ? $QQ->where('id','>',$id) : $QQ->where('created_at','>',$after)->where('created_at','<=',$before); })
                ->orWhere(function($QQ)use($after,$before,$id){ return $id ? $QQ->where('id','<=',$id)->where('updated_at','>=',$after) : $QQ->where('updated_at','>=',$after)->where('created_at','<=',$after); });
        });
    }

    public function registerMediaCollections(): void {
        $item = Str::of(get_called_class())->afterLast('\\')->lower()->__toString();
        $this->addMediaCollection($item)
            ->singleFile()
            ->useFallbackPath('/media/' . $item . '.jpg')
        ;
    }

    private static $mCache = [];
    function getImageAttribute(){
        if(empty(self::$mCache)) self::$mCache = DB::table('media')
            ->where('model_type',get_called_class())
            ->get()
            ->mapWithKeys(function($item){ return [$item->model_id => implode('/',[$item->id,$item->file_name])]; });
        $item = Str::of(get_called_class())->afterLast('\\')->lower()->__toString();
        return Arr::get(self::$mCache,$this->attributes['id'],$item . '.jpg');
    }
}
