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

    public function print($props = []) {
        $TokenModel = Token::find(is_array($props['args']) ? $props['args'][0] : $props['args']); $props['item'] = 'Kot';
        $printer = Arr::get(KitchenStatus::where('kitchen',$this->id)->first(),'printer');
        if($printer) $props['printer'] = $printer;
        else $props = $TokenModel->print_printer_name($props);
        $props = $TokenModel->print_template_name($props);
        return parent::print($props);
    }

    private static function get_kot_token_print_data($Token,$kitchen,$ti_id){
        $data = $Token->print_data($Token,['kitchen' => Arr::get($kitchen,'id'),'token_item_id' => $ti_id]);
        $data->setAttribute('kitchen',is_array($kitchen) ? $kitchen : $kitchen->toArray());
        return $data;

    }

    public function kot_print_template_data($kitchen,$token_id = null,$tokenItem_id = null){
        if(!$token_id) return null; $Token = Token::find($token_id);
        return self::get_kot_token_print_data($Token,$kitchen,$tokenItem_id);
    }

    public function kot_add_print_template_data($kitchen,$token_id = null,$tokenItem_id = null){
        $data = $this->kot_print_template_data($kitchen,$token_id,$tokenItem_id);
        $data->setAttribute('item_state','Added');
        return $data;
    }

    public function kot_modify_print_template_data($kitchen,$token_id = null,$tokenItem_id = null){
        $data = $this->kot_print_template_data($kitchen,$token_id,$tokenItem_id);
        $data->setAttribute('item_state','Modified');
        return $data;
    }

    public function kot_cancel_print_template_data($kitchen,$token_id = null,$tokenItem_id = null){
        $data = $this->kot_print_template_data($kitchen,$token_id,$tokenItem_id);
        $data->setAttribute('item_state','Cancelled');
        return $data;
    }

}
