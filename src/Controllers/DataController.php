<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Customer;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\ItemGroup;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\Menu;
use Milestone\SmartKitchen\Models\Price;
use Milestone\SmartKitchen\Models\PriceList;
use Milestone\SmartKitchen\Models\Seating;
use Milestone\SmartKitchen\Models\Tax;
use Milestone\SmartKitchen\Models\User;

class DataController extends Controller
{
    private static $tblKeys = [
        'items' => 'items',
        'item_groups' => 'items',
        'price_lists' => 'items',
        'prices' => 'items',
        'kitchens' => 'items',
        'kitchen_statuses' => 'items',
        'kitchen_items' => 'items',
        'menus' => 'groups',
        'seating' => 'seating',
        'users' => 'users',
        'taxes' => 'taxes',
        'customers' => 'customers',
    ];

    private static $importError = null;
    private static function setImportError($msg){ self::$importError = $msg; return false; }
    private static function outError(){ return response(self::$importError,222); }

    public function download_import_template(Request $request){
        $file = public_path('Import Data Template.xlsx');
        $headers = array('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return response()->download($file, 'Import Data Template.xlsx',$headers);
    }

    public function import(Request $request){
        $data = self::getDataArray($request->all()); $mode = $request->input('mode');
        if(self::$importError) return self::outError(); $DB = [];
        foreach (self::$tblKeys as $table => $key){
            if(!array_key_exists($key,$data)) continue;
            $method = 'getDBData_' . $table; $db_data = self::$method($mode,$data[$key],$data);
            if(!$db_data) continue; $update = $insert = []; extract($db_data);
            if(self::$importError) return self::outError();
            self::doUpdate($table,$update,$mode === 'Fresh');
            self::doInsert($table,$insert,$mode === 'Fresh');
        }
        return $DB;
    }

    private static function doUpdate($table,$data,$truncate = false){
        if(!$data || empty($data)) return; if($truncate) DB::table($table)->truncate();
        foreach($data as $update) DB::table($table)->where($update['where'])->update($update['record']);
    }

    private static function doInsert($table,$data,$truncate = false){
        if(!$data || empty($data)) return; if($truncate) DB::table($table)->truncate();
        DB::table($table)->insert($data);
    }

    private static function getDataArray($data){
        if(empty($data) || count($data)<2 || !array_key_exists('mode',$data)) return self::setImportError('Import data is either empty or no mode selected');
        $dataArray = [];
        foreach ($data as $item => $records) {
            if($item === 'mode') continue;
            if(substr(trim($records),0,2) !== 'ID') return self::setImportError('No header row for record: ' . $item);
            $records = explode("\n", $records);
            if(count($records) === 1) return self::setImportError('Only header row for ' . $item);
            $heads = explode("\t",array_splice($records,0,1)[0]);
            $dataArray[$item] = array_values(array_filter(array_map(function ($record) use ($heads) {
                if (empty(trim($record))) return null;
                $columns = explode("\t", $record);
                if(count($columns) < count($heads)) $columns = array_merge($columns,array_fill(0,count($heads)-count($columns),""));
                if(count($columns) > count($heads)) $columns = array_slice($columns,0,count($heads));
                return array_combine($heads, $columns);
            }, $records)));
        }
        return $dataArray;
    }

    private static function getDBData_items($mode, $records){
        $update = []; $insert = [];
        $db_fields = ['name','detail']; $data_fields = ['Name','Detail']; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        if($mode === 'Fresh'){
            $insert = array_map(function($record) use($db_fields,$data_fields,$now) {
                $fields2 = array_merge($db_fields,['created_at','updated_at']);
                $values2 = array_merge(array_values(Arr::only($record,$data_fields)),[$now,$now]);
                return array_merge(array_combine($fields2,$values2),['updated_at' => $now, 'created_at' => $now]);
            },$records);
        } else {
            $Ref = Item::pluck('id','name')->toArray(); $pick = 'name';
            foreach ($records as $data){
                $record = array_combine($db_fields,array_values(Arr::only($data,$data_fields))); $name = $record[$pick];
                $record['updated_at'] = $now;
                if($upd && array_key_exists($name,$Ref)){
                    $where = ['id' => $Ref[$name]];
                    $update[] = compact('record','where');
                }
                if($ins && !array_key_exists($name,$Ref)){
                    $record['created_at'] = $now;
                    $insert[] = $record;
                }
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_item_groups($mode, $records){
        $update = []; $insert = []; $db_fields = ['name','items']; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $IGroup = ItemGroup::pluck('id','name')->toArray(); $Item = Item::pluck('id','name')->toArray(); $Groups = [];
        foreach ($records as $data){
            $rec_groups = array_values(array_filter(Arr::only($data,array_map(function($n){ return 'Group ' . $n; },range(1,10)))));
            foreach($rec_groups as $grp){
                if(!array_key_exists($grp,$Groups)) $Groups[$grp] = [];
                if(Arr::has($Item,$data['Name'])) $Groups[$grp][] = $Item[$data['Name']];
            }
        }
        foreach($Groups as $name => $items){
            $record = ['name' => $name, 'items' => json_encode($items), 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($name,$IGroup))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
            if($upd && array_key_exists($name,$IGroup)){
                $where = ['id' => $IGroup[$name]];
                $update[] = compact('record','where');
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_price_lists($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        if(!$ins && $mode !== 'Fresh') return null;
        $PLs = PriceList::pluck('id','name')->toArray();
        $data_pls = array_slice(array_keys($records[0]),3,10);
        foreach($data_pls as $name){
            $record = ['name' => $name, 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($name,$PLs))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_prices($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $PLs = PriceList::pluck('id','name')->toArray(); $data_pls = array_slice(array_keys($records[0]),3,10);
        $Items = Item::pluck('id','name')->toArray();
        $Prices = Price::all()->groupBy->price_list->mapWithKeys(function($prices,$pl){
            return [$pl => collect($prices)->keyBy->item->map->price->toArray()];
        })->toArray();
        foreach($records as $data){
            foreach ($data_pls as $pl){
                if(Arr::has($PLs,$pl) && Arr::has($Items,$data['Name'])){
                    $record = ['price_list' => $PLs[$pl], 'item' => $Items[$data['Name']], 'price' => $data[$pl], 'updated_at' => $now];
                    if($upd && Arr::has($Prices,$record['price_list']) && Arr::has($Prices[$record['price_list']],$record['item'])){
                        $where = ['price_list' => $record['price_list'],'item' => $record['item']];
                        $update[] = compact('record','where');
                    }
                    if($mode === 'Fresh' || ($ins && (!Arr::has($Prices,$record['price_list']) || !Arr::has($Prices[$record['price_list']],$record['item'])))){
                        $insert[] = array_merge($record,['created_at' => $now]);
                    }
                }
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_kitchens($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        if(!$ins && $mode !== 'Fresh') return null;
        $Ks = Kitchen::pluck('id','name')->toArray(); $data_Ks = array_values(array_unique(array_column($records,'Kitchen')));
        foreach($data_Ks as $name){
            $record = ['name' => $name, 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($name,$Ks))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_kitchen_statuses($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        if(!$ins && $mode !== 'Fresh') return null;
        $Ks = Kitchen::pluck('id','name')->toArray(); $data_Ks = array_values(array_unique(array_column($records,'Kitchen')));
        foreach($data_Ks as $name){
            if(Arr::has($Ks,$name)){
                $record = ['kitchen' => Arr::get($Ks,$name), 'users' => '[]', 'updated_at' => $now, 'created_at' => $now];
                if($mode === 'Fresh' || ($ins && !array_key_exists($name,$Ks))){
                    $insert[] = $record;
                }
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_kitchen_items($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $Kitchens = Kitchen::pluck('id','name')->toArray(); $Items = Item::pluck('id','name')->toArray();
        $KIs = KitchenItem::all()->groupBy->kitchen->mapWithKeys(function($kis,$kitchen){
            return [$kitchen => collect($kis)->keyBy->item->map->id->toArray()];
        })->toArray();
        foreach($records as $data){
            if(Arr::has($Kitchens,$data['Kitchen']) && Arr::has($Items,$data['Name'])){
                $record = ['kitchen' => $Kitchens[$data['Kitchen']], 'item' => $Items[$data['Name']], 'stock' => 100, 'duration' => 180, 'updated_at' => $now];
                if($mode === 'Fresh' || ($ins && (!Arr::has($KIs,$record['kitchen']) || !Arr::has($KIs[$record['kitchen']],$record['item'])))){
                    $insert[] = array_merge($record,['created_at' => $now]);
                }
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_menus($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $Ms = Menu::pluck('id','name')->toArray(); $Menus = [];
        $Gs = ItemGroup::pluck('name','id')->toArray();
        foreach ($records as $data){
            $rec_menus = array_values(array_filter(Arr::only($data,array_map(function($n){ return 'Menu ' . $n; },range(1,5)))));
            foreach($rec_menus as $mnu){
                if(!array_key_exists($mnu,$Ms)) $Menus[$mnu] = [];
                if(Arr::has($Gs,$data['Name'])) $Menus[$mnu][] = $Gs[$data['Name']];
            }
        }
        foreach($Menus as $name => $groups){
            $record = ['name' => $name, 'groups' => json_encode($groups), 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($name,$Ms))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
            if($upd && array_key_exists($name,$Ms)){
                $where = ['id' => $Ms[$name]];
                $update[] = compact('record','where');
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_seating($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $Ss = Seating::pluck('id','name')->toArray(); $PLs = PriceList::pluck('id','name')->toArray();
        foreach ($records as $data){
            $record = ['name' => $data['Table Name'], 'seats' => '[' .$data['Seats']. ']', 'price_list' => Arr::get($PLs,$data['Price List'],null), 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($record['name'],$Ss))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
            if($upd && array_key_exists($record['name'],$Ss)){
                $where = ['id' => $Ss[$record['name']]];
                $update[] = compact('record','where');
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_users($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $Users = User::pluck('id','name')->toArray();
        foreach ($records as $data){
            $record = ['name' => $data['Name'], 'role' => $data['Role'], 'login' => Str::snake($data['Name']), 'pin' => $data['PIN'], 'password' => Hash::make($data['Password']), 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($record['name'],$Users))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
            if($upd && array_key_exists($record['name'],$Users)){
                $where = ['id' => $Users[$record['name']]];
                $update[] = compact('record','where');
            }
        }
        return compact('update','insert');
    }

    private static function getDBData_taxes($mode, $taxes, $all){
        if(!array_key_exists('items',$all)) return self::setImportError('For importing tax, Items are also needed to be filled');
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $Items = Item::pluck('id','name')->toArray();
        $data_tax_items = collect($all['items'])->groupBy->Tax->mapWithKeys(function($its,$tx) use($Items) {
            return [$tx => collect($its)->map(function($it) use($Items){
                return Arr::get($Items,$it['Name'],null);
            })->filter()->toArray()];
        })->toArray();
        $Taxes = Tax::pluck('id','name')->toArray();
        foreach ($taxes as $data){
            $record = ['name' => $data['Name'], 'contents' => json_encode(self::getTaxContents($data)), 'items' => json_encode(Arr::get($data_tax_items,$data["Name"],[])), 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($record['name'],$Taxes))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
            if($upd && array_key_exists($record['name'],$Taxes)){
                $where = ['id' => $Taxes[$record['name']]];
                $update[] = compact('record','where');
            }
        }
        return compact('update','insert');
    }

    private static function getTaxContents($data){
        return array_values(array_filter(array_map(function($num) use($data) {
            if(!$data['Content ' . $num . ' Name']) return null;
            $content = [];
            foreach(['Name','Nature','Percent'] as $name){
                $key = 'Content ' . $num . ' ' . $name;
                $content[strtolower($name)] = $name === 'Percent' ? floatval($data[$key]) : $data[$key];
            }
            return $content;
        },range(1,5))));
    }

    private static function getDBData_customers($mode, $records){
        $update = []; $insert = []; $now = now()->toDateTimeString();
        $upd = strpos($mode, 'Update') !== false; $ins = strpos($mode, 'Insert') !== false;
        $Customers = Customer::pluck('id','name')->toArray();
        foreach ($records as $data){
            $record = ['name' => $data['Name'], 'phone' => $data['Phone'], 'address' => $data['Address'], 'email' => $data['Email'], 'updated_at' => $now];
            if($mode === 'Fresh' || ($ins && !array_key_exists($record['name'],$Customers))){
                $insert[] = array_merge($record,['created_at' => $now]);
            }
            if($upd && array_key_exists($record['name'],$Customers)){
                $where = ['id' => $Customers[$record['name']]];
                $update[] = compact('record','where');
            }
        }
        return compact('update','insert');
    }
}
