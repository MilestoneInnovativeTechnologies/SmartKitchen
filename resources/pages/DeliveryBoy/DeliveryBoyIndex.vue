<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col-xs-12 col-sm-6"><DigitMetric :value="tokens_own.length" bg="cyan" text="white" title="Own Orders" icon="receipt" /></div>
      <div class="col-xs-6 lt-sm"><DigitMetric :value="deliverable.length" bg="orange" text="white" title="Deliverable" icon="delivery_dining" /></div>
      <div class="col-xs-6"><DigitMetric :value="delivered.length" bg="green" text="white" title="Delivered" icon="done_all" /></div>
      <div class="col-xs-6 col-sm-4"><DigitMetric :value="processing.length" bg="blue-grey" text="white" title="Processing" icon="memory" /></div>
      <div class="col-xs-6 col-sm-4"><DigitMetric :value="Billable.length" bg="red" text="white" title="Billable" icon="request_quote" /></div>
      <div class="col-xs-6 col-sm-4 gt-xs"><DigitMetric :value="deliverable.length" bg="orange" text="white" title="Deliverable" icon="delivery_dining" /></div>
      <div class="col-xs-6"><DigitMetric :value="Payments" bg="light-green" text="white" title="Total Payments" icon="account_balance_wallet" /></div>
      <div class="col-xs-6"><DigitMetric :value="Tokens.length" bg="deep-purple" text="white" title="Total Orders" icon="format_list_numbered" /></div>
    </div>
    <q-list>
      <q-item-label header v-if="processing.length">Processing Orders <span v-show="processing.length > 4">(+ {{ processing.length-4 }} More)</span></q-item-label>
      <OrderSummaryDeliveryBoy :tokens="take_only(processing,4)" kitchen separator />

      <q-item-label header v-if="Billable.length">Billable Orders <span v-show="Billable.length > 4">(+ {{ Billable.length-4 }} More)</span></q-item-label>
      <OrderSummaryDeliveryBoy :tokens="take_only(Billable,4)" separator />

      <q-item-label header v-if="deliverable.length">Deliverable Orders <span v-show="deliverable.length > 4">(+ {{ deliverable.length-4 }} More)</span></q-item-label>
      <OrderSummaryDeliveryBoy :tokens="take_only(deliverable,4)" address separator />
    </q-list>
    <OrderNewFabDeliveryBoy />
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import {is_today} from "assets/helpers";
import DigitMetric from "components/Metric/DigitMetric";
import OrderSummaryDeliveryBoy from "components/Order/OrderSummaryDeliveryBoy";
import {NoCustomer} from "assets/assets";
import OrderNewFabDeliveryBoy from "components/Order/OrderNewFabDeliveryBoy";

export default {
  name: 'PageDeliveryBoyIndex',
  components: {OrderNewFabDeliveryBoy, OrderSummaryDeliveryBoy, DigitMetric},
  mixins: [Bills],
  data(){ return {
    me: parseInt(this.$route.meta.me.id)
  } },
  computed: {
    Tokens(){ return _(this.tokens).filter(token => token.progress !== 'Cancelled' && token.type === 'Home Delivery').sortBy('id').reverse().map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer })).map(token => Object.assign({},token,{ bill:_.get(this.token_bill,token.id) }))./*filter(({ date }) => is_today(date)).*/value() },
    bills_today(){ return _(this.bills).filter(({ date }) => is_today(date)).value() },
    bills_own(){ return _.filter(this.bills_today,['user.id',this.me]) },
    Billable(){ return _.filter(this.Tokens,token => !token.bill) },
    Payments(){ return _.sumBy(this.bills_own,({ paid }) => _.toNumber(paid)) },
    tokens_own(){ return _.filter(this.Tokens,token => token_own_filter(this.me,token)) },
    deliverable(){ return _.filter(this.tokens_own,({ bill }) => bill && (bill.progress === 'Pending' || bill.progress === 'Partial')) },
    processing(){ return _.filter(this.tokens_own,({ items }) => !is_all_completed(items)) },
    delivered(){ return _.filter(this.tokens_own,({ bill }) => bill && bill.progress === 'Paid') },
  },
  methods: {
    take_only(array,amount){ return _.take(array,amount || 5) },
  }
}
function is_all_completed(items){ return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed','Served'],progress)) }
function token_own_filter(user_id,token){ return (token.bill && (_.get(token.bill,['user','id']) === user_id || _.get(token.bill,['user','role']) === 'Receptionist')) || (token.user === user_id) }
</script>
