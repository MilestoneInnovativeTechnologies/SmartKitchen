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
      <q-item-label header v-if="processing.length">Processing Orders</q-item-label>
      <OrderSummaryDeliveryBoy :tokens="processing" kitchen separator />
      <q-item-label header v-if="Billable.length">Billable Orders</q-item-label>
      <OrderSummaryDeliveryBoy :tokens="Billable" separator />
      <q-item-label header v-if="deliverable.length">Deliverable Orders</q-item-label>
      <OrderSummaryDeliveryBoy :tokens="deliverable" address separator />
    </q-list>
    <OrderNewFabDeliveryBoy />
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import {attention, is_today} from "assets/helpers";
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
    Tokens(){ return _(this.tokens).filter(['type','Home Delivery']).map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer }))./*filter(({ date }) => is_today(date)).*/value() },
    bills_today(){ return _(this.bills).filter(({ date }) => is_today(date)).value() },
    bills_own(){ return _.filter(this.bills_today,['user.id',this.me]) },
    token_bill(){ return _(this.Tokens).mapKeys(({ id }) => parseInt(id)).mapValues((token,token_id) => _.get(_.find(this.bills,['token.id',parseInt(token_id)]),'id',null) ).value() },
    Billable(){ return _.filter(this.Tokens,({ id,items }) => is_all_completed(items) && !_.get(this.token_bill,parseInt(id))) },
    Payments(){ return _.sumBy(this.bills_own,({ paid }) => _.toNumber(paid)) },
    tokens_own(){ return _.filter(this.Tokens,({ user,id }) => _.get(this.token_bill,id) ? _.find(this.bills_own,['id',_.get(this.token_bill,id)]) : user === this.me) },
    deliverable(){ return _(this.tokens_own).filter(({ id }) => _.get(this.token_bill,parseInt(id)) && _.get(_.find(this.bills,['id',_.get(this.token_bill,parseInt(id))]),'progress') === 'Pending').value() },
    processing(){ return _.filter(this.tokens_own,({ items }) => !is_all_completed(items)) },
    delivered(){ return _(this.tokens_own).filter(({ id }) => _.get(this.token_bill,parseInt(id))).filter(({ id }) => _.get(_.find(this.bills,['id',_.get(this.token_bill,id)]),'progress') !== 'Pending').value() },
  },
  watch: {
    tokens(Nw,Ol){ if(!Ol || Nw.length > Ol.length) { attention(); } },
    bills(Nw,Ol){ if(!Ol || Nw.length > Ol.length) { attention(); } }
  }
}

function is_all_completed(items){
  return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed','Served'],progress))
}
</script>
