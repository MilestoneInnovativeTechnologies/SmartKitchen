<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Printer;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\File;

class Model extends BaseModel
{
    use HasFactory, InteractsWithMedia;

    public $printer_name = null;
    public $print_template = null;

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

    //['printer' => '','template' => [],'modify' => '','data' => ,'template_name' => '','args' => []]
    // template should be array, while template name should be from master
    public function print($props = []){

        $printer = Arr::get($props,'printer',Arr::get(Master::where('name',$this->printer_name)->first(),'value',null));

        $template = Arr::get($props,'template',null); $template_name = null;
        if(!$template){
            $template_name = Arr::get($props,'template_name',$this->print_template); if(!$template_name) return Log::info('Print called with no print name defined!!');
            $template_string = Arr::get(Master::where('name',$template_name)->first(),'value',null);
            if(!$template_string) return Log::info('Template, ' . $template_name . ', not defined in master!!');
            $template = json_decode($template_string,true); if(!$template) return Log::critical('Error in template: ' . $template_name);
        }

        $modifier_name = Arr::get($props,'modify',null);
        if(!$modifier_name){
            $modifier_name = ($template_name) ? $template_name . '_data' : 'print_data';
            $modifier_name = method_exists($this,$modifier_name) ? $modifier_name : (method_exists($this,'print_data') ? 'print_data' : null);
        }

        $data = Arr::get($props,'data',$this);
        $data = $modifier_name ? call_user_func_array([$this,$modifier_name],array_merge([$data],(array) Arr::get($props,'args',[]))) : $data;
        if($data instanceof Collection || $data instanceof Model) $data = $data->toArray();
        if(!$data) return Log::critical('Print Called from empty data');

        return Printer::do($printer,$template,$data);
    }
}
