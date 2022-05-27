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

    private static $MODE_STATE = ['Add' => 'Added', 'Modify' => 'Modified', 'Cancel' => 'Cancelled'];

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

    public function print_data($kitchen,$token_id,$token_item_ids = [],$mode = ''){
        if(!$token_id || !$kitchen) return [];
        $Token = Token::find($token_id);
        $data = $Token->print_data($Token,['kitchen' => Arr::get($kitchen,'id'),'token_item_ids' => $token_item_ids]);
        $data->setAttribute('kitchen',is_array($kitchen) ? $kitchen : $kitchen->toArray());
        $data->setAttribute('items_state',self::$MODE_STATE[$mode] ?? '');
        return $data;
    }

}
