<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Cache;
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
        static::created(function($Kitchen){
            KitchenStatus::create(['kitchen' => $Kitchen->id, 'users' => []]);
        });
    }

    public function Items(){ return $this->hasMany(KitchenItem::class,'kitchen','id'); }
    public function Active(){ return $this->hasOne(KitchenStatus::class,'kitchen','id')->where('status','Active'); }

    public static function getClouds(){ $cacheKey = self::$cloudKitchensCacheKey; return Cache::get($cacheKey,[]); }
    private static function cacheCloud($id){ $kitchens = self::getClouds(); $kitchens[] = $id; $kitchens = array_unique($kitchens); Cache::put(self::$cloudKitchensCacheKey,$kitchens); }
    private static function removeCloud($id){ $kitchens = self::getClouds(); $kitchens = array_values(array_diff($kitchens,[$id])); Cache::put(self::$cloudKitchensCacheKey,$kitchens); }

    public function kot_print_template_data($kitchen,$token_id = null){
        if(!$token_id) return null;
        $kitchen_id = $kitchen->id;
        $data = Token::with(['User','Seating','Customer','Items' => function($Q)use($kitchen_id){ $Q->withoutGlobalScopes()->with(['Item','User','Kitchen'])->where('kitchen',$kitchen_id); }])->find($token_id);
        $data->setAttribute('total_items',$data->Items->count());
        $data->setAttribute('total_quantities',$data->Items->sum->quantity);
        $data->setAttribute('date_human',human_date($data->date));
        $data->setAttribute('time_human',human_time($data->date));
        return $data;
    }

}
