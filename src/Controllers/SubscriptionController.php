<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class SubscriptionController extends Controller
{

    public static function code(){
        return Storage::exists('subscription') ? Storage::get('subscription') : '';
    }

    public static function serial(){
        $text = @shell_exec('cat /proc/cpuinfo');
        if($text){
            foreach (explode("\n",$text) as $line) {
                $cols = explode(":",trim($line));
                if(count($cols) === 2 && trim($cols[0]) === "Serial") return trim($cols[1]);
            }
        }
        return sk('web_serial') ?: env('DEMO_SERIAL');
    }

    public function device_serial(){
        return response('SERIAL REQUEST',200)->header('SK-Serial',self::serial());
    }

    public function subscribe(Request $request){
        if($request->filled(['key','code'])){
            $env = file_get_contents(base_path('.env')); $key = $request->input('key');
            preg_match('/CLIENT_KEY=(.*)/',$env,$matches);
            if(empty($matches)){ file_put_contents(base_path('.env'),$env . "\nCLIENT_KEY=".($key)."\n"); }
            else file_put_contents(base_path('.env'),preg_replace('/CLIENT_KEY\=.*/','CLIENT_KEY='.$key,$env));
            if(Storage::exists('subscription')){ Storage::put('subscription.undo',Storage::get('subscription')); }
            Storage::put('subscription',$request->input('code')); $this->cacheFeatures($request->input('code'));
            return redirect()->route('subscription');
        }
        return redirect()->route('login');
    }

    public function key(Request $request){
        if($request->getMethod() === 'POST'){
            $env = file_get_contents(base_path('.env'));
            preg_match('/CLIENT_KEY=(.*)/',$env,$matches);
            if(!empty($matches)){
                file_put_contents(base_path('.env'),rtrim(preg_replace('/CLIENT_KEY\=.*/','',$env)) . "\n");
            }
            if(Storage::exists('subscription')){ Storage::delete('subscription'); }
            if(Storage::exists('subscription.undo')){ Storage::delete('subscription.undo'); }
            return redirect()->route('subscription');
        }
        return redirect()->route('login');
    }

    public static function ExipreTimestamp(){
        $code = self::code();
        return $code ? intval(substr($code,34,5) . substr(explode("/",$code)[0],-5)) : time();
    }

    public static function LoginCredentials($credentials = []){
        if(self::ExipreTimestamp() <= time()) $credentials['role'] = 'Administrator';
        return $credentials;
    }

    public function cacheFeatures($code){
        $P1 = explode("/",$code)[0];
        [$keys,$values] = self::Decode(substr($P1,39,strlen($P1)-37-39));
        $features = array_combine($keys,$values);
        Cache::forever('features',$features);
    }

    public function action(Request $request){
        if($request->delete) {
            Storage::delete('subscription');
            if(Storage::exists('subscription.undo')){
                Storage::put('subscription',Storage::get('subscription.undo'));
                Storage::delete('subscription.undo');
                return redirect()->route('subscription');
            }
        }
        if($request->undo) {
            $undo = Storage::get('subscription.undo'); $subscription = Storage::get('subscription');
            Storage::put('subscription',$undo); Storage::put('subscription.undo',$subscription);
            return redirect()->route('subscription');
        }
        return redirect()->route('login');
    }

    static function Encode($PArray, $VArray = null){
        if($VArray === null) {
            $VArray = array_values($PArray);
            $PArray = array_keys($PArray);
        }
        $A = base64_encode(implode("|",$PArray));
        $B = base64_encode(implode("|",$VArray));
        $C = mt_rand(1,5);
        $D = str_split($A,$C); $F = count($D); $D[$F-1] = str_pad(end($D),$C,"$");
        $E = str_split($B,$C); $G = count($E); $E[$G-1] = str_pad(end($E),$C,"$");
        $H = max($F,$G);
        $J = "";
        for($I=0; $I<$H; $I++){
            if($F>$I) $J .= $D[$I];
            if($G>$I) $J .= $E[$I];
        }
        $K = mb_strlen($J); $L = (intval($K/3)<15)?(intval($K/3)):11; $M = dechex($L);
        $N = str_split($J,$L);
        $O = dechex($F);
        $P = dechex($G);
        $Q = [$M,$N[0],$C,$N[1],$O,"g",join("",array_slice($N,2)),"h",$P];
        $R = join("",$Q);
        return $R;
    }

    static function Decode($Key){
        $T = 0;
        $M = mb_substr($Key,$T,1); $T += 1;
        $L = hexdec($M);
        $N = [];
        $N[0] = mb_substr($Key,$T,$L); $T += $L;
        $C = mb_substr($Key,$T,1); $T += 1;
        $N[1] = mb_substr($Key,$T,$L); $T += $L;
        $U = mb_strpos(mb_substr($Key,$T),"g");
        $O = mb_substr($Key,$T,$U); $T += $U; $T++;
        $F = hexdec($O);
        $P = mb_substr(strrchr($Key,"h"),1);
        $G = hexdec($P);
        $N[2] = mb_substr(mb_substr($Key,$T),0,(0-(1+mb_strlen($P))));
        $J = join("",$N);
        $V = str_split($J,($C*2));
        $D = []; $E = [];
        foreach($V as $I => $W){
            $D1 = mb_substr($W,0,$C); $E1 = mb_substr($W,$C);
            if($F > $I && $G > $I) { $D[] = $D1; $E[] = $E1; continue; }
            if($F > $I) { $D[] = $D1; if($E1 != "") $D[] = $E1; continue; }
            if($G > $I) { $E[] = $D1; if($E1 != "") $E[] = $E1; continue; }
        }
        $D[$F-1] = str_replace("$","",end($D));
        $E[$G-1] = str_replace("$","",end($E));
        $A = join("",$D); $B = join("",$E);
        return[explode("|",base64_decode($A)),explode("|",base64_decode($B))];
    }

}
