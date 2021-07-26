<template>
  <q-page>
    <q-list separator>
      <template v-if="pending.length">
        <q-item-label header>Unpaid/Partial</q-item-label>
        <BillListItem v-for="(bill,idx) in pending" :key="hKey(bill,idx,'a-b-upp-b')" :bill="bill" clickable :class="{ 'bg-grey-1':idx%2 }" @click.native="view(bill)" />
        <q-item-label header>Paid</q-item-label>
      </template>
      <BillListItem v-for="(bill,idx) in paid" :key="hKey(bill,idx,'a-b-p-b')" :bill="bill" clickable :class="{ 'bg-grey-1':idx%2 }" @click.native="view(bill)" />
    </q-list>
    <q-dialog persistent v-model="show" transition-show="flip-down" transition-hide="flip-up">
      <BillDetail v-if="bill" :bill="bill" style="min-width: 80vw" />
    </q-dialog>
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import {extract_date, h_key} from "assets/helpers";
import BillListItem from "components/Archive/Bill/BillListItem";
import BillDetail from "components/Archive/Bill/BillDetail";

export default {
  name: 'PageArchiveBills',
  components: {BillDetail, BillListItem},
  mixins: [Bills],
  data(){ return {
    bill:null, show:false
  } },
  computed: {
    pending(){ return _.filter(this.bills,({ progress }) => ['Partial','Pending'].includes(progress)) },
    paid(){ return _(this.bills).filter(['progress','Paid']).sortBy(({ date }) => extract_date(date).getTime()).reverse().value() },
  },
  methods: {
    hKey(item,idx,name){ return h_key(name,idx,item.id) },
    view(bill){ this.bill = bill; this.show = true }
  }
}
</script>
