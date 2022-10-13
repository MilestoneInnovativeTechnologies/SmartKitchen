<style>
    * { font-size:12px; font-family: 'Courier New' }
    .big { font-size: 15px; }
    .double_big { font-size: 20px; }
    .triple_big { font-size: 26px; }
    .bold { font-weight: bold; }
    .right { text-align: right; }
    .center { text-align: center; }
    .underline { border-bottom:1px solid #000; }
    .topline { border-top:1px solid #000; }
    .dashed_underline { border-bottom:1px dashed #000; }
    .dashed_topline { border-top:1px dashed #000; }
    .vpad { padding-top:10px; padding-bottom: 10px; }
    .text_underline { text-decoration: underline }
</style>
<table style="width:100%">
    <tbody>
    <tr><td colspan="10" class="center bold text_underline vpad triple_big">{{ $id }}</td></tr>
    <tr>
        <td colspan="5">{{ $type }}</td>
        <td colspan="5" class="right">{{ $time_human }}</td>
    </tr>
    <tr>
        <td colspan="5">@if($type === 'Dining') Table: {{ $seating['name'] ?? '' }} @elseif($type === 'Home Delivery') {{ $customer['name'] }} @else '' @endif</td>
        <td colspan="5" class="right">{{ $user['name'] }}</td>
    </tr>
    <tr>
        <td colspan="1" class="vpad underline bold" style="width: 2%">#</td>
        <td colspan="7" class="vpad underline bold">Item</td>
        <td colspan="2" class="vpad underline bold right">Qty</td>
    </tr>
    @foreach($items as $item)
        <tr>
            <td colspan="1" class="">{{ $loop->iteration }}</td>
            <td colspan="7" class="">{{ $item['name'] }} @if($item['narration']) <br> {{ $item['narration'] }} @endif</td>
            <td colspan="2" class=" right">{{ $item['quantity'] }}</td>
        </tr>
    @endforeach
    <tr>
        <td colspan="10" class="underline"></td>
    </tr>
    </tbody>
</table>