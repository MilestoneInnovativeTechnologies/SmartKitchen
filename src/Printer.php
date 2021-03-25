<?php


namespace Milestone\SmartKitchen;

use Illuminate\Support\Arr;
use Mike42\Escpos\Printer as P;
use Mike42\Escpos\CapabilityProfile;
use Mike42\Escpos\EscposImage;
use Milestone\SmartKitchen\Logging\Log;
use Milestone\SmartKitchen\Models\Master;

class Printer
{
    private $_printer = null; private $_template = null; private $_data = null;
    private $master_settings = ['connector','capability','width'];
    private $connector = 'FilePrintConnector';
    private $capability = null;
    private $width = 48;
    private static $settings = ['width' => null];
    private $Printer = null;

    public $done = false;

    private static $Specials = ['line','title','around','stack','table','image','upi'];
    private static $upi_addr = 'upi://pay?pa=[address]&pn=[name]&tn=[id]&am=[amount]';

    public function __construct($printer,$template = null,$data = null)
    {
        $this->_printer = $printer; $this->_template = $template; $this->_data = $data;
        $master = Master::where('name','like',$printer . '%')->get()->mapWithKeys(function($item) use($printer){
            $key = strpos($item->name,'_') === false ? 'printer' : str_replace($printer . '_','',$item->name);
            return [$key => $item->value];
        })->toArray();
        $this->setPrinter($master);
        if($template && $data) $this->print();
    }

    private function setPrinter($settings){
        $set = $this->master_settings;
        $printer = Arr::get($settings,'printer');
        foreach ($set as $key){
            if(Arr::has($settings,$key))
                $this->$key = Arr::get($settings,$key);
        }
        $ConnectType = '\\Mike42\\Escpos\\PrintConnectors\\' . $this->connector;
        $connector = $connector = new $ConnectType($printer);
        $this->Printer = self::Printer($connector,$this->capability);
    }

    private static function Printer($connector,$capability = null) : P {
        return $capability ? new P($connector,CapabilityProfile::load($capability)) : new P($connector,$capability);
    }

    private static function s($key){ return Arr::get(self::$settings,$key); }

    public function template($template){ $this->_template = $template; return $this; }
    public function data($data){ $this->_data = $data; return $this; }

    public function print($data = null,$template = null){
        if($data) $this->data($data); if($template) $this->template($template);
        foreach (self::$settings as $key => $val) self::$settings[$key] = $this->$key;
        if(!$this->_template || !$this->_data) return $this;
        $this->reset();
        foreach ($this->_template as $content)
            call_user_func([$this,'Process'],$content);
        $this->Printer->cut(P::CUT_FULL,1); $this->Printer->pulse(); $this->Printer->close();
        $this->done = true;
        return $this;
    }

    public static function do($printer,$template = null,$data = null){
        return new self($printer,$template,$data);
    }

    private function reset(){
        $this->Printer->selectPrintMode(); $this->Printer->setJustification();
        $this->Printer->setUnderline(false); $this->Printer->setTextSize(1,1);
        $this->Printer->setEmphasis(false); $this->Printer->initialize();
    }

    private function Process($section){
        if(is_array($section)){
            if(count($section) > 1) {
                $props = explode("|",$section[1]);
                if(count(array_intersect($props,self::$Specials)) > 0) $this->process_special($props,$section[0],$section[2] ?? null,$section[3] ?? null);
                else $this->process_props($props,$section[0]);
            } else {
                if($section[0]) $this->process_plain($section[0]);
            }
        } else $this->process_plain($section . "\n");
    }

    private function process_plain($text = ""){
        $textArray = self::txtAry(self::exec_template($text,$this->_data));
        $this->Printer->selectPrintMode(); $this->Printer->setJustification();
        foreach ($textArray as $txt) $this->Printer->text($txt . "\n");
    }

    private function process_props($props,$content,$reset = true){
        $this->Printer->selectPrintMode(); $this->Printer->setJustification();
        if(in_array('left',$props)) $this->Printer->setJustification(P::JUSTIFY_LEFT);
        if(in_array('center',$props)) $this->Printer->setJustification(P::JUSTIFY_CENTER);
        if(in_array('right',$props)) $this->Printer->setJustification(P::JUSTIFY_RIGHT);
        if(in_array('emphasis',$props)) $this->Printer->setEmphasis(true);
        if(in_array('big',$props)) $this->Printer->selectPrintMode(P::MODE_DOUBLE_WIDTH);
        if(in_array('underline',$props)) $this->Printer->setUnderline(true);
        if(in_array('size2',$props)) $this->Printer->setTextSize(2,2);
        if(in_array('size3',$props)) $this->Printer->setTextSize(3,3);
        if(in_array('size4',$props)) $this->Printer->setTextSize(4,4);
        if(in_array('size5',$props)) $this->Printer->setTextSize(5,5);
        if(in_array('size6',$props)) $this->Printer->setTextSize(6,6);
        if(in_array('size7',$props)) $this->Printer->setTextSize(7,7);
        if(in_array('size8',$props)) $this->Printer->setTextSize(8,8);
        if(in_array('feed',$props)) $this->Printer->feed();
        $textArray = self::txtAry(self::exec_template($content,$this->_data));
        foreach ($textArray as $txt) if($txt) $this->Printer->text($txt . "\n");
        if($reset) $this->reset();
    }
    private function process_special($props,$content,$args,$extra){
        foreach (self::$Specials as $special){
            $method = 'process_' . $special;
            if((in_array($special,$props)) && method_exists($this,$method)) call_user_func([$this,$method],$content,$props,$args,$extra);
        }
    }

    private function process_title($text){
        $textArray = self::txtAry(self::exec_template($text,$this->_data));
        $this->Printer->setJustification(P::JUSTIFY_CENTER);
        $this->Printer->selectPrintMode(P::MODE_DOUBLE_WIDTH);
        foreach ($textArray as $txt) $this->Printer->text($txt . "\n");
        $this->reset();
    }

    private function process_line($text = '-',$props = []){
        $text = str_pad($text,$this->width,$text);
        $this->reset();
        $this->process_props($props,$text);
    }

    private function process_around($text,$props){
        $lines = []; $width = self::s('width'); $mid = floor($width/2); $space = $mid-2;
        list($left,$right) = array_map(function($text)use($space){ return self::txtAry(self::exec_template($text,$this->_data),$space); },explode("|",$text));
        for ($i = 0; $i<max(count($left),count($right)); $i++){
            $lines[] = (str_pad($left[$i] ?? "",$mid," ",STR_PAD_RIGHT)) . (str_pad($right[$i] ?? "",$width-$mid," ",STR_PAD_LEFT));
        }
        $this->reset();
        foreach ($lines as $txt) $this->process_props($props,$txt);
    }

    private function process_stack($text,$props){
        list($top,$bottom) = array_map(function($text){ return self::txtAry(self::exec_template($text,$this->_data)); },explode("|",$text));
        $this->reset();
        foreach ($top as $txt) $this->process_props(array_merge($props,['emphasis']),$txt);
        foreach ($bottom as $txt) $this->process_props($props,$txt);
    }

    private function process_image($path,$props){
        $path = self::exec_template($path, $this->_data);
        try {
            $img = EscposImage::load($path, false);
            $this->process_props($props,"",false);
            $this->Printer->bitImage($img);
        } catch (\Exception $e) {
            Log::info('For printing image, no image file exists');
        }
    }

    private function process_upi($content,$props){
        $this->process_props($props,"",false);
        $this->Printer->qrCode(self::upiUrl($content,$this->_data));
        $this->reset();
    }

    private function process_table($info,$props,$len,$rht){
        $rows = self::row_segregate($info,$this->_data,in_array('index',$props)); $head = $body = $size = null;
        extract(self::slim($rows,self::s('width'),$len,$rht));
        $this->reset();
        foreach(self::table_lines($head,$size) as $line) $this->Printer->text($line . "\n");
        $this->process_line();
        foreach(array_map(function($content)use($size){ return self::table_lines($content,$size); },$body) as $row)
            foreach($row as $line) $this->Printer->text($line . "\n");
        $this->process_line();
    }

    private static function row_segregate($info,$data,$index = false){
        list($key,$columns) = explode('#',$info);
        $columns = collect(explode("|",$columns))->mapWithKeys(function($item){ $parts = explode(":",$item); return [$parts[0] => $parts[1]]; })->toArray();
        $items = Arr::get($data,$key);
        return array_map(function($item,$idx)use($columns,$data,$index){
            $columns = $index ? array_merge(['#' => $idx],$columns) : $columns;
            return collect($columns)->mapWithKeys(function($value,$key)use($data,$item){
                return [self::exec_template($key,$item,$data) => self::exec_template($value,$item,$data)];
            })->toArray();
        },$items,range(1,count($items)));
    }

    private static function slim($rows,$width,$len,$rht){
        $head = array_keys($rows[0]); if($len && $head[0] === '#') array_unshift($len,1); $size = []; $max = array_combine($head,array_map('strlen',$head)); $space = $width - ((count($head)-1) * 2);
        $body = array_map(function($row)use(&$max){
            foreach ($row as $hd => $bd){ $len = strlen($bd); if($max[$hd] < $len) $max[$hd] = $len; }
            return array_values($row);
        },$rows);
        $sLoop = $len ?: $max; $total = array_sum($sLoop);
        foreach ($sLoop as $val) $size[] = intval(($val/$total)*$space) ?: 1;
        if(array_sum($size) < $space) $size[array_search(max($size),$size)] += ($space - array_sum($size));
        if($rht){
            $rht = is_array($rht) ? $rht : [$rht];
            foreach($rht as $hd){
                $hdIdx = array_search($hd,$head); if($hdIdx === false) continue;
                $head[$hdIdx] = str_pad($hd,$size[$hdIdx]," ",STR_PAD_LEFT);
                foreach ($body as $bIdx => $row) $body[$bIdx][$hdIdx] = str_pad($row[$hdIdx],$size[$hdIdx]," ",STR_PAD_LEFT);
            }
        }
        return compact('head','body','size');
    }

    private static function table_lines($array,$sizes){
        $lines = []; $sizes = array_values($sizes);
        $data = array_map(function($text,$size){ return array_map(function($line)use($size){ return str_pad($line,$size," ",STR_PAD_RIGHT); },self::txtAry($text,$size)); },$array,$sizes);
        $pad = max(array_map('count',$data));
        foreach ($data as $key => $array) $data[$key] = array_pad($array,$pad,str_pad(" ",$sizes[$key]));
        for($i=0; $i<$pad; $i++) $lines[$i] = implode("  ",array_column($data,$i));
        return $lines;
    }

    private static function txtAry($text,$max = null){
        return explode("\n", wordwrap($text,$max ?? self::s('width'),"\n",true));
    }
    private static function exec_template($template,$data,$secondary = []){
        return preg_replace_callback('#\[([^\[]*)\]#m',function($matches) use($data,$secondary){ return Arr::get($data,$matches[1],Arr::get($secondary,$matches[1],'')); },$template);
    }
    private static function upiUrl($content,$data){
        list($id,$amount) = array_map(function($template)use($data){ return self::exec_template($template,$data); },explode("|",$content));
        $data = array_merge(Master::where('name','like','upi_%')->get()->mapWithKeys(function($item){ return [str_replace('upi_','',$item->name) => $item->value]; })->toArray(),compact('id','amount'));
        return self::exec_template(self::$upi_addr,$data);
    }

}

/*
 * Inorder to have this work, settings should have a value like '//localhost/EPSON' under any name (printer name).. Ex: PRINTER001 This name is referred while calling the class Printer
 * Every settings related to this printer should provide in settings as <printer_name>_<settings name>.. Ex: PRINTER001_width
 * Required settings are connector -> windows shared printers => FilePrintConnector, widows printer => WindowsPrintConnector, more details @ https://github.com/mike42/escpos-php
 * capability -> more details @ https://github.com/mike42/escpos-php
 * width -> width in no of characters a line can include.. In thermal printer it may line 32,48 etc. Default is 48
 *
 * The first argument should be the printer name (string), second & third are array as template and data respectively
 *
 *
 * TEMPLATE FORMAT
 * It should be in array where each element considered as a section
 * Each section itself will be another array, having first element as text or template string
 * Second element should be the properties given as string and multiple props separated by | "pipe character"
 * Template string can be
 * Hi Mr [customer.name], how you doing.. You line number is [id] and time [delivery.time]
 * Thee square brackets are removed with value supplied in data array
 * Supported properties are
 * left
 * center
 * right
 * emphasis
 * big
 * underline
 * size1,size2,size3,size4,size5,size6,size7,size8
 * title
 * line -> text will be the character of line, it can be any. .Normally "-","*","_" or even words like "HAPPY"
 * around -> print on each side of a line. Text should have left and right portion separated by | "pipe character"
 * stack -> print on top bottom. Text should have top and bottom portion separated by | "pipe character". Top text will try to emphasis. Other props like left,center,right,underline are also accepted as props
 * table -> String should be the field details ex: 'items#Details:[quantity]x [item.name]|Narration:[narration]|Customer:[customer.name]|Seat:[seating.name]
 * where the items is the key of data where table data is located
 * each field would be separated by |. Each field should have field name and its value separated by :
 * An optional 3rd argument can be given if there is any size specification. It should be array having each element size of corresponding column. Ex: [2,3,4]
 * An optional 4th argument can be given if there is any column to be aligned right
 * In props, index can be added for having sequence no as output
 * upi -> this is to print payment upi qr code. text should be like '[id]|[amount]', where ID and amount should be separated by "|". Other props are also supported.
 * Inorder to have this work, settings should contain upi_address and upi_name
 *
 */