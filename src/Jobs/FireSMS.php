<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Engine\Token;

class FireSMS
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private static $Gateway = [
        'url'           =>  '',
        'params'        =>  '',
        'to_param'      =>  '',
        'message_param' =>  '',
        'custom_gateway'=>  '',
    ];

    public static $smsKeys = ['name','template','to','disable','condition','method'];
    private static $smsKeyDefault = ['method' => 'get'];
    public static $smsKeysExtra = ['url','params','param_to','param_message'];

    public static $SMSFilters = ['clean','trim','last','prepend','append'];
    public $token, $smsArray = [];

    public function __construct($smsArray,$token_id)
    {
        $features = features();
        self::$smsKeyDefault['url'] = self::$Gateway['url'] = $features['FH85V'] ?? '';
        self::$smsKeyDefault['method'] = $features['GE85V'] ?? 'get';
        self::$Gateway['params'] = $features['FU85V'] ?? ''; self::$Gateway['to_param'] = $features['MO85V'] ?? ''; self::$Gateway['message_param'] = $features['MY85V'] ?? '';
        $this->token = Token::fetch($token_id);
        $this->smsArray = array_map(function($name){
            $props = array_combine(
                self::$smsKeys,
                array_map(function($prop) use ($name) {
                    return $prop === 'name' ? $name : self::fromSettings($name,$prop);
                },self::$smsKeys)
            );
            $props_extra = array_combine(
                self::$smsKeysExtra,
                array_map(function($prop) use ($name) {
                    return self::fromSettingsExtra($name,$prop);
                },self::$smsKeysExtra)
            );
            return array_merge($props,$props_extra);
        },$smsArray);
    }

    public function handle()
    {
        $token = $this->token; $entries = [];
        foreach ($this->smsArray as $sms){
            if($sms['disable'] === '1' || !$sms['template'] || !$sms['to']) continue;
            if($sms['condition']) {
                $conditions = self::conditionArray($sms['condition']);
                foreach ($conditions as $condition) {
                    if(self::testCondition($token,$condition)) continue;
                    else continue 2;
                }
            }
            $url = $sms['url']; $params = $sms['params']; $method = $sms['method'];
            $param_to = $sms['param_to']; $param_message = $sms['param_message'];
            $message = self::templateMessage($sms['template'],$token);
            $numbers = self::templateMessage($sms['to'],$token);
            $contacts = self::getContacts($numbers);
            foreach ($contacts as $contact)
                $entries[] = compact('url','params','method','message','contact','param_to','param_message');
        }
        foreach ($entries as $entry){
            $params = $entry['params']; $params[$entry['param_to']] = $entry['contact']; $params[$entry['param_message']] = $entry['message'];
            $this->queue($entry['url'],$entry['method'],$params);
        }
    }

    private static function fromSettings($name,$prop){
        $key = $prop === 'template' ? ('_sms_' . $name) : implode("_",['_sms',$name,$prop]); $key2 = implode("_",['_sms',$prop]);
        return settings($key) ?: settings($key2) ?: Arr::get(self::$smsKeyDefault,$prop,'');
    }

    private static function fromSettingsExtra($name,$prop){
        $custom = self::$Gateway['custom_gateway'] === 'Yes';
        if($prop === 'url') return $custom ? self::fromSettings($name,$prop) : self::$Gateway['url'];
        if($prop === 'param_to') return $custom ? self::fromSettings($name,$prop) : self::$Gateway['to_param'];
        if($prop === 'param_message') return $custom ? self::fromSettings($name,$prop) : self::$Gateway['message_param'];
        if($prop === 'params') {
            $params = [];
            $s_params = self::fromSettings($name,$prop);
            $d_params = self::$Gateway['params'];
            $s_params = $s_params ? explode("&",$s_params) : [];
            $d_params = $d_params ? explode("&",$d_params) : [];
            $a_params = $custom ? array_merge($d_params,$s_params) : array_merge($s_params,$d_params);
            foreach ($a_params as $param) {
                [$key,$value] = explode("=",$param);
                $params[$key] = $value;
            }
            return $params;
        }
        $key = $prop === 'template' ? ('_sms_' . $name) : implode("_",['_sms',$name,$prop]);
        return settings($key) ?: Arr::get(self::$smsKeyDefault,$prop,'');
    }

    //type=Home Delivery,customer.name!=Cash
    private static function conditionArray($string) {
        return array_map(function($line) {
            $condition = [];
            foreach (['===','<>','!=','<=','=<','>=','=>','==','='] as $operator) {
                if(strpos($line,$operator) !== false){
                    $condition = explode($operator,$line);
                    $condition[] = $operator;
                    break;
                }
            }
            return $condition;
        },explode(",",$string));
    }

    private static function testCondition($ary,$condition){
        $key = $condition[0]; $value = $condition[1]; $opr = $condition[2];
        $aryVal = Arr::get($ary,$key);
        if($opr == '===') return $aryVal === $value;
        if(in_array($opr,['=','=='])) return $aryVal == $value;
        if(in_array($opr,['=>','>='])) return $aryVal >= $value;
        if(in_array($opr,['=<','<='])) return $aryVal <= $value;
        if(in_array($opr,['!=','<>'])) return $aryVal != $value;
        return true;
    }

    private static function templateMessage($template,$token) {
        $matches = [];
        preg_match_all("/\[([\w|\.]+)\]/",$template,$matches);
        return str_replace($matches[0],array_map(fn($key) => Arr::get($token,$key,''),$matches[1]),$template);
    }

    //$to = 9495155550,[customer.phone]|clean|last:10&12|
    private static function getContacts($to){
        $contacts = [];
        $toArray = explode(',',$to);
        foreach ($toArray as $numFilters){
            $numFilter1 = explode('|',$numFilters);
            $number = $numFilter1[0]; $filters = array_slice($numFilter1,1);
            if(empty($filters)) $contacts[] = $number;
            else {
                foreach ($filters as $filter) $number = self::filter($filter,$number);
                $contacts[] = $number;
            }
        }
        return $contacts;
    }


    private static function filter($nameArgs,$text){
        $argStr = '';
        if(strpos($nameArgs,':')) [$name,$argStr] = explode(":",$nameArgs); else $name = $nameArgs;
        $args = $argStr ? explode("&",$argStr) : [];
        if($name === self::$SMSFilters[0]) return preg_replace("/[^0-9]/", "",$text );
        if($name === self::$SMSFilters[1]) return trim($text);
        if($name === self::$SMSFilters[2]) return Str::substr($text,0 - ($args[0] ?? 10));
        if($name === self::$SMSFilters[3]) return ($args[0] ?? '0091') . $text;
        if($name === self::$SMSFilters[4]) return $text . ($args[0] ?? '');
        return call_user_func_array([Str::class,$name],[$text,...$args]);
    }

    protected function queue($url,$method,$params){
        if($url && $method && $params){
            $sms = [$url,$method,$params];
            $queue = Cache::pull('sms_queue',[]);
            $queue[] = $sms; Cache::put('sms_queue',$queue,3*60);
        }
    }

    //url,params,message,to
    public static function Fire($url,$method,$params){
        if(!$url || !$method || !$params) return false;
        $curl = curl_init();
        if($method === 'get') {
            $url = $url . '?' . http_build_query($params);
            curl_setopt($curl, CURLOPT_URL, $url);
        } else {
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
        }
        curl_setopt($curl, CURLOPT_TIMEOUT_MS, 1500);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl); curl_close($curl);
        return $response;
    }
}
