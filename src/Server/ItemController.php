<?php

namespace Milestone\SmartKitchen\Server;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\Remote;

class ItemController extends Controller
{

    public static $interval = 5;
    public static $Create = 'create';
    public static $Params = [
        'create' => ['Item@id' => '*'],
    ];

    public static function fresh(){
        return ['create'];
    }

    public function create($id,$attrs){
        $local_id = Arr::get(Remote::where(['item' => 'item', 'location' => LOCATION, 'remote_id' => $id])->first(),'local_id');
        $attrs = Arr::except($attrs[0],['id','created_at','updated_at','image','props']);
        if($local_id) Item::find($local_id)->update($attrs);
        else self::remote(Item::create($attrs)->id);
    }

}
