<template>
  <q-item v-bind="$attrs">
    <q-item-section avatar><q-badge color="teal" class="q-pa-sm" style="font-size: 0.65rem" :label="bill.id" /></q-item-section>
    <q-item-section>
      <q-item-label class="text-teal">{{ bill.customer ? bill.customer.name : '' }}</q-item-label>
      <q-item-label caption>{{ items() }}</q-item-label>
      <q-item-label caption>Token: {{ bill.token ? bill.token.id : '' }}, Type: {{ bill.token ? bill.token.type : '' }}, {{ human_date(bill.date,true) }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="text-teal text-bold" style="font-size: 1.1rem"><span v-show="bill.progress !== 'Paid'" class="text-caption">{{ bill.paid }}/</span>{{ parseFloat(bill.payable).toFixed(2) }}</div>
    </q-item-section>
  </q-item>
</template>

<script>
import {human_date} from "assets/helpers";

export default {
  name: "BillListItem",
  props: ['bill'],
  methods: {
    human_date,
    items(){ return _.map(_.get(this.bill,['token','items']), item => _.get(item,['item','name'])).join(", ") }
  }
}
</script>
