<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\KitchenSaved;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Kitchen extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $hidden = ['created_at','updated_at'];
    protected $appends = ['image'];

    public $printer_name = 'kot_printer';
    public $print_template = 'kot_print_template';

    protected static function booted(){
        static::created(function($Kitchen){ KitchenStatus::create(['kitchen' => $Kitchen->id, 'users' => []]); });
        static::saved(function($kitchen){ KitchenSaved::dispatch($kitchen); });
    }

    public function Items(){ return $this->hasMany(KitchenItem::class,'kitchen','id'); }
    public function Active(){ return $this->hasOne(KitchenStatus::class,'kitchen','id')->where('status','Active'); }

    public function kot_print_template_data($kitchen,$token_id = null){
        if(!$token_id) return null;
        $Token = Token::find($token_id);
        $data = $Token->print_data($Token,['kitchen' => Arr::get($kitchen,'id')]);
        $data->setAttribute('kitchen',is_array($kitchen) ? $kitchen : $kitchen->toArray());
        return $data;
    }

    public function print($props = []) {
        $printer = Arr::get(KitchenStatus::where('kitchen',$this->id)->first(),'printer',Arr::get(Settings::where('name',$this->printer_name)->first(),'value'));
        $props['printer'] = $printer;
        return parent::print($props);
    }

}
