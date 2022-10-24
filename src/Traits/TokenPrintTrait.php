<?php

namespace Milestone\SmartKitchen\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Price;
use Milestone\SmartKitchen\Models\Settings;
use Milestone\SmartKitchen\Models\TokenItem;

trait TokenPrintTrait
{
    private static $Settings = null;
    private static function settings($name,$not_has_value = null){
        if(self::$Settings === null) self::$Settings = Cache::get('settings');
        return Arr::has(self::$Settings,$name) ? $name : $not_has_value;
    }

    public function print_data($data,$extra = []){
        $data->load(['Items' => function($Q)use($extra){
            if(is_array($extra) && array_key_exists('kitchen',$extra)) $Q->withoutGlobalScopes()->where('progress','<>','Cancelled')->where('kitchen',intval($extra['kitchen']))->with(['Item','User','Kitchen']);
            else $Q->withoutGlobalScopes()->where('progress','<>','Cancelled')->with(['Item','User','Kitchen']);
        },'User','Seating','Customer','Bill' => function($Q){ $Q->with(['Payments','User']); }]);
        $data->setAttribute('total_items',$data->Items->count());
        $data->setAttribute('total_quantities',$data->Items->sum->quantity);
        $data->setAttribute('date_human',human_date($data->date));
        $data->setAttribute('date_human2',human_date2($data->date));
        $data->setAttribute('time_human',human_time($data->date));
        $prices = Price::where('price_list',$data->price_list)->get()->keyBy->item->map->price->toArray();
        if(is_array($extra) && array_key_exists('token_item_ids',$extra) && $extra['token_item_ids']){
            $token_items = TokenItem::withoutGlobalScopes()->with(['Item','User','Kitchen'])->find($extra['token_item_ids']);
            $data->setAttribute('state_items',self::setItemsAttrs($prices,$token_items)->toArray());
        }
        $data->setAttribute('items',$data->Items->map(function($Item)use($prices){ return self::setItemAttrs($prices,$Item); }));
        $data->setAttribute('items_amount',$data->Items->sum->amount);
        $data->setAttribute('items_amount_precise',precise($data->items_amount));
        if($data->Bill){
            $data->Bill->setAttribute('date_human',human_date($data->Bill->date));
            $data->Bill->setAttribute('date_human2',human_date2($data->Bill->date));
            $data->Bill->setAttribute('time_human',human_time($data->Bill->date));
            $data->Bill->setAttribute('contents',self::setBillContents($data->Bill->contents));
            $data->Bill->setAttribute('amount_precise',precise($data->Bill->amount));
            $data->Bill->setAttribute('discount_precise',precise($data->Bill->discount));
            $data->Bill->setAttribute('sub_total',precise($data->Bill->amount));
            $data->Bill->setAttribute('discount',precise($data->Bill->discount));
            $data->Bill->setAttribute('payable',floatval($data->Bill->amount) - floatval($data->Bill->discount));
            $data->Bill->setAttribute('payable_precise',precise($data->Bill->payable));

            $tax_amounts = self::taxAmounts(Arr::get($data,'Bill.contents'));
            $data->Bill->setAttribute('tax_amounts',$tax_amounts);
            $data->Bill->setAttribute('total_taxable',collect($tax_amounts)->sum(function($tax_amount){ return $tax_amount['taxable']; }));
            $data->Bill->setAttribute('total_taxable_precise',precise($data->Bill->total_taxable));
            $data->Bill->setAttribute('total_tax',collect($tax_amounts)->sum(function($tax_amount){ return $tax_amount['amount']; }));
            $data->Bill->setAttribute('total_tax_precise',precise($data->Bill->total_tax));

            $data->Bill->setAttribute('paid',$data->Bill->Payments->sum->amount);
            $data->Bill->setAttribute('paid_precise',precise($data->Bill->paid));
            $data->Bill->setAttribute('balance',floatval($data->Bill->payable) - floatval($data->Bill->paid));
            $data->Bill->setAttribute('balance_precise',precise($data->Bill->balance));

            if($data->Bill->Payments && $data->Bill->Payments->isNotEmpty()){
                $data->Bill->setAttribute('payments',self::setBillPayments($data->Bill->Payments));
            }
        }
        return $data;
    }

    private static function setItemAttrs($prices,$Item){
        $price = Arr::get($prices,$Item->Item->id,0);
        $Item->setAttribute('name',$Item->Item->name);
        $Item->setAttribute('price',$price);
        $Item->setAttribute('amount',floatval($price) * floatval($Item->quantity));
        $Item->setAttribute('price_precise',precise($Item->price));
        $Item->setAttribute('amount_precise',precise($Item->amount));
        return $Item;
    }

    private static function setItemsAttrs($prices,$Items){
        return collect($Items)->map(function($Item)use($prices){ return self::setItemAttrs($prices,$Item); });
    }

    private static function setBillContents($contents){
        return collect($contents)->map(function($content){
            $content['price_precise'] = precise($content['price']);
            $content['amount'] = floatval($content['price']) * floatval($content['quantity']);
            $content['amount_precise'] = precise($content['amount']);
            return $content;
        })->toArray();
    }

    private static function setBillPayments($payments){
        return collect($payments)->map(function($payment){
            $payment['date_human'] = human_date($payment['date']);
            $payment['time_human'] = human_time($payment['date']);
            $payment['amount_precise'] = precise($payment['amount']);
            return $payment;
        })->toArray();
    }

    private static function taxAmounts($contents){
        return collect($contents)->groupBy(function($content){
            if(Arr::has($content,'tax') && floatval($content['tax']['amount']) > 0) return $content['tax']['name'];
            return null;
        })->mapWithKeys(function($contents,$name){
            if($name){
                $contents = collect($contents); $percent = Arr::get($contents,'0.tax.percent'); $percent_precise = precise($percent);
                $taxable = $contents->sum(function($content){ return floatval(Arr::get($content,'tax.price')) * floatval(Arr::get($content,'tax.quantity')); });
                $amount = $contents->sum(function($content){ return Arr::get($content,'tax.amount'); });
                $taxable_precise = precise($taxable);
                $amount_precise = precise($amount);
                $total = floatval($taxable) + floatval($amount); $total_precise = precise($total);
                $detail = self::subTaxAmounts($contents);
                return [$name => compact('name','percent','percent_precise','taxable','amount','taxable_precise','amount_precise','total','total_precise','detail')];
            } return [];
        })->toArray();
    }

    private static function subTaxAmounts($contents){
        $contents = $contents->flatMap(function($content){ return Arr::get($content,'tax.contents'); })->groupBy->name;
        return $contents->mapWithKeys(function($subs,$name){
            $percent = Arr::get($subs,'0.percent'); $amount = $subs->sum->amount;
            $percent_precise = precise($percent); $amount_precise = precise($amount);
            return [$name => compact('name','percent','amount','percent_precise','amount_precise')];
        })->toArray();
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