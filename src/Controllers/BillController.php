<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Jobs\TryMakingBillAsCancelled;
use Milestone\SmartKitchen\Models\Tax;
use Milestone\SmartKitchen\Requests\CreateBillRequest;

class BillController extends Controller
{
    public static $contentKeys = ['id','item','name','price','quantity','tax','discount'];

    public function create(CreateBillRequest $createBillRequest){
        $createBillRequest->store()->print();
        return [];
    }

    public function Cancel(Request $request){
        $bill_id = $request->bill;
        TryMakingBillAsCancelled::dispatch($bill_id);
    }

    public static function Contents($token, $nature = null, $discount = 0){
        $Items = TokenController::Items($token);
        $total = $Items->sum(function($item){ return doubleval(($item['quantity'] ?? 1) * ($item['price'] ?? 0)); });
        $discount_percent = doubleval($discount) === 0 ? 0 : (($discount/$total) * 100);
        return $Items->map(function($item) use($nature, $discount_percent){
            $contents = Arr::get($item,'tax.contents',[]);
            $contents = array_filter($contents,function($content) use($nature){ return ($nature) ?  ($content['nature'] === $nature || $content['nature'] === null) : ($content['nature'] === null); });
            $taxable = self::taxable(array_values($contents),$item,$discount_percent);
            $tax = array_merge(['name' => Arr::get($item,'tax.name')],$taxable);
            $discount_amount = doubleval(($item['quantity'] ?? 1) * ($item['price'] ?? 0) * $discount_percent/100);
            $discount = $discount_amount;//['percent' => $discount_percent,'amount' => $discount_amount];
            return collect($item)
                ->merge(compact('tax','discount'))
                ->only(self::$contentKeys)
                ;
        });
    }

    public static function taxable($contents, $item, $discount_percent){
        $percent = array_sum(array_map(function($p){ return doubleval($p); },array_column($contents,'percent')));
        $price = doubleval($item['price']); $quantity = doubleval($item['quantity']); $total = $price * $quantity; $discount_amount = $total * doubleval($discount_percent) / 100;
        $net_total = $total - $discount_amount;
        $t_price = doubleval(((100 * $net_total)/(100 + $percent))); $amount = $t_price * $percent / 100; $price = $t_price/$quantity;
        $contents = Tax::Contents($contents,$price,$quantity);
        return compact('price','quantity','percent','amount','contents');
    }
}
