<?php

namespace Milestone\SmartKitchen\Engine;

use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Price;
use Milestone\SmartKitchen\Models\Token as TokenModel;
use Milestone\SmartKitchen\Models\TokenItem;

class Token
{

    private $Token = null;

    public function __construct($token_id,$extra = [])
    {
        $data = TokenModel::with(['Items' => function($Q)use($extra){
            if(is_array($extra) && array_key_exists('kitchen',$extra)) $Q->withoutGlobalScopes()->where('progress','<>','Cancelled')->where('kitchen',intval($extra['kitchen']))->with(['Item','User','Kitchen']);
            else $Q->withoutGlobalScopes()->where('progress','<>','Cancelled')->with(['Item','User','Kitchen']);
        },'User','Seating','Customer','PriceList','Bill' => function($Q){ $Q->with(['Payments','User','Customer']); }])->find($token_id);
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

        $this->Token = $data;

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

    public function data(){ return $this->Token; }
    public function token(){ return $this->data()->toArray(); }

    public static function fetch($token_id){ return (new self($token_id))->token(); }

}