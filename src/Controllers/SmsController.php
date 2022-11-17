<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Engine\Token;
use Milestone\SmartKitchen\Jobs\FireSMS;
use Milestone\SmartKitchen\Models\Settings;

class SmsController extends Controller
{

    public function store_defaults(Request $request){
        foreach ($request->only(['disable','method','params','url','param_to','param_message']) as $key => $value){
            $name = '_sms_' . $key;
            Settings::updateOrCreate(compact('name'), compact('value'));
        }
    }

    public function update(Request $request){
        $updates = [];
        foreach($request->all() as $key => $value){
            if(substr($key,0,5) === '_sms_')
                $updates[$key] = $value;
        };
        self::do_update($updates);
    }

    private static function do_update($updates){
        foreach ($updates as $name => $value)
            if(trim($value) === '') {
                Settings::where('name',$name)->get()->each(function($setting){ $setting->update(['name' => '_deleted_']); });
            } else {
                Settings::updateOrCreate(
                    compact('name'),
                    compact('value')
                );
            }
    }

    public function delete(Request $request){
        $name = $request->name; if(!$name) return;
        $props = array_values(array_merge(FireSMS::$smsKeys,FireSMS::$smsKeysExtra));
        Settings::where('value','like','%'.$name.'%')->where('name','like','_sms_%')->get()->each(function($record) use($name){
            if($record->value === $name) $record->update(['name' => '_deleted_']);
            else $record->update(['value' => implode(",",array_values(array_diff(explode(",",$record->value),[$name])))]);
        });
        Settings::where('name','like','_sms_' . $name . '%')->get()->each(function($entry)use($props,$name){
            $nProps = array_map(fn($prop) => implode('_',['_sms',$name,$prop]),$props);
            $nProps[] = implode('_',['_sms',$name]);
            if(in_array($entry->name,$nProps)) $entry->update(['name' => '_deleted_']);
        });
        return $name;
    }

    public function token_text(){
        return json_encode(Token::fetch(random_int(1,\Milestone\SmartKitchen\Models\Token::max('id'))), JSON_PRETTY_PRINT);
    }

    public function add_new(Request $request){
        $trigger = '_sms_' . $request->trigger; $name = $request->name;
        $Trigger = Settings::where('name',$trigger)->first();
        if(!$Trigger) {
            $settings = new Settings(['name' => $trigger, 'value' => trim($name)]);
            $settings->save();
        } else {
            $sms = explode(",",trim($Trigger->value));
            $sms[] = $name;
            $Trigger->value = implode(",",$sms);
            $Trigger->save();
        }
        foreach ($request->all() as $name => $value) {
            if(substr($name,0,5) !== '_sms_') continue;
            $settings = new Settings(compact('name','value'));
            $settings->save();
        }
    }

}
