<template>
  <div class="row q-col-gutter-xs">
    <div class="col"><DigitMetric :value="Tokens.length" bg="green" text="white" title="Sales" icon="shopping_cart" /></div>
    <div class="col"><DigitMetric :value="total_payments" bg="purple" text="white" title="Payments" icon="account_balance_wallet" /></div>
    <div class="q-mt-md col-12">
      <q-card flat square>
        <q-card-section class="bg-grey text-bold q-py-xs text-white bg-blue-grey-10 q-mt-lg">Sales by Type</q-card-section>
        <q-card-section class="row q-col-gutter-xs q-pa-none q-pt-xs">
          <div class="col-xs-6 col-sm-3" v-for="(sales,type) in sales_by_type" :key="hKey('sbt',type)"><DigitMetric :value="sales" :bg="iconColor_sbt[type][1]" text="white" :title="type" :icon="iconColor_sbt[type][0]" /></div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-mt-md col-12">
      <q-card flat square>
        <q-card-section class="bg-grey text-bold q-py-xs text-white bg-blue-grey-10 q-mt-lg">Payments by Type</q-card-section>
        <q-card-section class="row q-col-gutter-xs q-pa-none q-pt-xs">
          <div class="col-xs-6 col-sm-3" v-for="(amount,type) in payments_by_type" :key="hKey('pbt',type)"><DigitMetric :value="amount" :bg="iconColor_pyt[type][1]" text="white" :title="type" :icon="iconColor_pyt[type][0]" /></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import DigitMetric from "components/Metric/DigitMetric";
import Tokens from "assets/mixins/Tokens";
import {h_key, is_today} from "assets/helpers";
import {mapState} from "vuex";
import {OrderTypes, PaymentsTypes} from "assets/assets";
export default {
  name: "ReportDashboardMetricsMain",
  components: {DigitMetric},
  mixins: [Tokens],
  data(){ return {
    iconColor_sbt: { 'Dining':['local_dining','purple'],'Home Delivery':['delivery_dining','amber'],'Take Away':['home','green'],'Other':['stream','light-blue'] },
    iconColor_pyt: { Cash:['money','green'],Card:['payment','teal'],Wallet:['account_balance','purple'],Credit:['money_off','red'] },
  } },
  computed: {
    ...mapState({ payments:({ payments:{ data }}) => data }),
    Tokens(){ return _.filter(this.tokens_own,({ date,progress }) => is_today(date) && progress !== 'Cancelled') },
    Payments(){ return _(this.payments).filter(({ status,date }) => status === 'Active' && is_today(date)).value() },
    total_payments(){ return _.sumBy(this.Payments,({ amount }) => _.toNumber(amount)) },
    sales_by_type(){
      let sbt = _.zipObject(OrderTypes,Array(OrderTypes.length).fill(0))
      _.forEach(this.Tokens,({ type }) => sbt[type]++);
      return sbt;
    },
    payments_by_type(){
      let pbt = _.zipObject(PaymentsTypes,Array(PaymentsTypes.length).fill(0))
      _.forEach(this.Payments,({ type,amount }) => pbt[type]+=_.toNumber(amount));
      return pbt;
    }
  },
  methods: {
    hKey(item,detail){ return _.kebabCase(h_key(item,detail)) }
  }
}
</script>
