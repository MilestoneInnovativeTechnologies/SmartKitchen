<style>
    * { font-size:12px; font-family: 'Courier New' }
    .big { font-size: 15px; }
    .double_big { font-size: 20px; }
    .bold { font-weight: bold; }
    .right { text-align: right; }
    .center { text-align: center; }
    .underline { border-bottom:1px solid #000; }
    .topline { border-top:1px solid #000; }
    .dashed_underline { border-bottom:1px dashed #000; }
    .dashed_topline { border-top:1px dashed #000; }
    .vpad { padding-top:10px; padding-bottom: 10px; }
    .text_underline { text-decoration: underline }
    .vtop { vertical-align: top }
</style>
<table style="width:100%">
    <tbody>
    <tr><td colspan="10" class="center bold text_underline vpad">BILL DETAILS</td></tr>
    <tr>
        <td colspan="5">Bill #{{ $bill['id'] }}</td>
        <td colspan="5" class="right">{{ $bill['time_human'] }}</td>
    </tr>
    <tr>
        <td colspan="5">{{ $customer['name'] }}</td>
        <td colspan="5" class="right">{{ $bill['date_human2'] }}</td>
    </tr>
    <tr>
        <td colspan="1" class="vpad underline bold">#</td>
        <td colspan="3" class="vpad underline bold">Item</td>
        <td colspan="2" class="vpad underline bold">Qty</td>
        <td colspan="2" class="vpad underline bold right">Rate</td>
        <td colspan="2" class="vpad underline bold right">Total</td>
    </tr>
    @foreach($bill['contents'] as $content)
        <tr>
            <td colspan="1" class="vtop">{{ $loop->iteration }}</td>
            <td colspan="3" class="vtop">{{ $content['name'] }}</td>
            <td colspan="2" class="vtop">{{ $content['quantity'] }}</td>
            <td colspan="2" class="vtop right">{{ $content['price_precise'] }}</td>
            <td colspan="2" class="vtop right">{{ $content['amount_precise'] }}</td>
        </tr>
    @endforeach
    <tr>
        <td colspan="10" class="underline"></td>
    </tr>
    <tr><td colspan="8" class="right bold">Sub Total</td><td colspan="2" class="right bold">{{ $bill['amount_precise'] }}</td></tr>
    <tr><td colspan="8" class="right bold">Discount</td><td colspan="2" class="right bold">{{ $bill['discount_precise'] }}</td></tr>
    <tr><td colspan="10" class="vpad center double_big bold dashed_underline dashed_topline dashed">{{ $bill['payable_precise'] }}</td></tr>
    <tr><td colspan="10" class="center ">Thank you for the business!!</td></tr>
    </tbody>
</table>