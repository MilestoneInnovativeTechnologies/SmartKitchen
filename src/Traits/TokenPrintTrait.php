<?php

namespace Milestone\SmartKitchen\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Price;
use Milestone\SmartKitchen\Models\Settings;

trait TokenPrintTrait
{
    private static $Settings = null;
    private static function settings($name,$not_has_value = null){
        if(self::$Settings === null) self::$Settings = Settings::pluck('value','name')->toArray();
        return Arr::has(self::$Settings,$name) ? $name : $not_has_value;
    }

    public function print_data($data){
        $data->load(['Items' => function($Q){ $Q->withoutGlobalScopes()->with(['Item','User','Kitchen']); },'User','Seating','Customer','Bill.Payments']);
        $data->setAttribute('total_items',$data->Items->count());
        $data->setAttribute('total_quantities',$data->Items->sum->quantity);
        $data->setAttribute('date_human',human_date($data->date));
        $data->setAttribute('date_human2',human_date2($data->date));
        $data->setAttribute('time_human',human_time($data->date));
        $prices = Price::where('price_list',$data->price_list)->get()->keyBy->item->map->price->toArray();
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
            $data->Bill->setAttribute('payable',$data->Bill->amount - $data->Bill->discount);
            $data->Bill->setAttribute('payable_precise',precise($data->Bill->payable));

            $tax_amounts = self::taxAmounts(Arr::get($data,'Bill.contents'));
            $data->Bill->setAttribute('tax_amounts',$tax_amounts);
            $data->Bill->setAttribute('total_taxable',collect($tax_amounts)->sum(function($tax_amount){ return $tax_amount['taxable']; }));
            $data->Bill->setAttribute('total_taxable_precise',precise($data->Bill->total_taxable));
            $data->Bill->setAttribute('total_tax',collect($tax_amounts)->sum(function($tax_amount){ return $tax_amount['amount']; }));
            $data->Bill->setAttribute('total_tax_precise',precise($data->Bill->total_tax));

            $data->Bill->setAttribute('paid',$data->Bill->Payments->sum->amount);
            $data->Bill->setAttribute('paid_precise',precise($data->Bill->paid));
            $data->Bill->setAttribute('balance',$data->Bill->payable - $data->Bill->paid);
            $data->Bill->setAttribute('balance_precise',precise($data->Bill->balance));

            if($data->Bill->Payments && $data->Bill->Payments->isNotEmpty()){
                $data->Bill->setAttribute('payments',self::setBillPayments($data->Bill->Payments));
            }
        }
        return $data;
    }

    private static function setItemAttrs($prices,$Item){
        $Item->setAttribute('price',$prices[$Item->Item->id]);
        $Item->setAttribute('amount',$prices[$Item->Item->id]*$Item->quantity);
        $Item->setAttribute('price_precise',precise($Item->price));
        $Item->setAttribute('amount_precise',precise($Item->amount));
        return $Item;
    }

    private static function setBillContents($contents){
        return collect($contents)->map(function($content){
            $content['price_precise'] = precise($content['price']);
            $content['amount'] = $content['price'] * $content['quantity'];
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
            if(Arr::has($content,'tax') && $content['tax']['amount'] > 0) return $content['tax']['name'];
            return null;
        })->mapWithKeys(function($contents,$name){
            if($name){
                $contents = collect($contents); $percent = Arr::get($contents,'0.tax.percent'); $percent_precise = precise($percent);
                $taxable = $contents->sum(function($content){ return Arr::get($content,'tax.price') * Arr::get($content,'tax.quantity'); });
                $amount = $contents->sum(function($content){ return Arr::get($content,'tax.amount'); });
                $taxable_precise = precise($taxable);
                $amount_precise = precise($amount);
                $total = $taxable + $amount; $total_precise = precise($total);
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
        $role = auth()->user() ? auth()->user()->role : ''; $type = $this->type; $token = $this->Bill ? 'Bill' : 'Token'; $user = auth()->user() ? auth()->user()->name : '';
        $template_name = $this->print_name_item('Print Template',$role,$type,$token,$user);
        $props['template_name'] = $template_name ?: $this->print_template;
        return $props;
    }

    public function print_printer_name($props = []){
        if(Arr::hasAny($props,['printer','printer_name'])) return $props;
        $role = auth()->user() ? auth()->user()->role : ''; $type = $this->type; $token = $this->Bill ? 'Bill' : 'Token'; $user = auth()->user() ? auth()->user()->name : '';
        $printer_name = $this->print_name_item('Printer',$role,$type,$token,$user);
        $props['printer_name'] = $printer_name ?: $this->printer_name;
        return $props;

    }

    public function print_name_item($item,$role,$type,$token,$user){
        $parts = [
            ($user.$role.$type),($user.$type.$token),($user.$type.'Token'),($user.$type),($user.$token),($user.'Token'),($user),
            ($role.$type.$token),($role.$type.'Token'),($role.$type),($role.$token),($role.'Token'),($role),
            ($type.$token),($type.'Token'),($type),($token),('Token'),('')
        ];
        foreach ($parts as $part){
            $name = self::settings(Str::snake($part . $item));
            if($name) return $name;
        }
        return null;
    }

}