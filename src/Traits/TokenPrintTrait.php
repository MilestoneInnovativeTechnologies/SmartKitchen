<?php

namespace Milestone\SmartKitchen\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Engine\Token;

trait TokenPrintTrait
{
    private static $Settings = null;
    private static function settings($name,$not_has_value = null){
        if(self::$Settings === null) self::$Settings = Cache::get('settings');
        return Arr::has(self::$Settings,$name) ? $name : $not_has_value;
    }

    public function print_data($data,$extra = []){
        return (new Token($data->id))->data();
    }

    public function print_template_name($props = []){
        if(Arr::hasAny($props,['template','template_name'])) return $props;
        $role = Arr::get($props,'role',(auth()->user() ? auth()->user()->role : ''));
        $type = Arr::get($props,'type',$this->type);
        $item = Arr::get($props,'item',$this->Bill ? 'Bill' : 'Token');
        $sub = Arr::get($props,'sub','');
        $user = Arr::get($props,'user',(auth()->user() ? auth()->user()->name : ''));
        $template_name = $this->print_name_item('Print Template',$role,$type,$item,$user,$sub);
        $props['template_name'] = $template_name ?: $this->print_template;
        return $props;
    }

    public function print_printer_name($props = []){
        if(Arr::hasAny($props,['printer','printer_name'])) return $props;
        $role = Arr::get($props,'role',(auth()->user() ? auth()->user()->role : ''));
        $type = Arr::get($props,'type',$this->type);
        $item = Arr::get($props,'item','');
        $sub = Arr::get($props,'sub','');
        $user = Arr::get($props,'user',(auth()->user() ? auth()->user()->name : ''));
        $printer_name = $this->print_name_item('Printer',$role,$type,$item,$user,$sub);
        $props['printer_name'] = $printer_name ?: $this->printer_name;
        return $props;

    }

    public function print_name_item($thing, $role, $type, $item, $user, $sub){
        $parts = [
            ($role.$user.$type.$item.$sub),($role.$user.$type.$item),
            ($role.$user.$item.$sub),($role.$user.$item),
            ($role.$user.$type),($role.$user),
            ($user.$type.$item.$sub),($user.$type.$item),($user.$item.$sub),($user.$item),($user.$type),($user),
            ($role.$type.$item.$sub),($role.$type.$item),($role.$item.$sub),($role.$item),($role.$type),($role),
            ($type.$item.$sub),($type.$item),($item.$sub),($item),($type),('')
        ];
        foreach ($parts as $part){
            $name = self::settings(Str::snake($part . $thing));
            if($name) return $name;
        }
        return null;
    }

}