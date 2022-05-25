<template>
  <q-page padding>
    <FilterInputText @text="filter = $event" />
    <q-list separator>
      <BillListItem v-for="(bill,idx) in showing" :key="hKey(bill,idx,'a-b-b')" :bill="bill" clickable :class="{ 'bg-grey-1':idx%2 }" @click.native="show = !!((selected = idx) || true)" />
    </q-list>
    <q-dialog persistent v-model="show" transition-show="flip-down" transition-hide="flip-up">
      <BillDetail v-if="bill" :bill="bill" style="min-width: 80vw" @print="print(bill)" />
    </q-dialog>
    <Pagination :records="Bills" v-model="showing" />
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import {extract_date, h_key} from "assets/helpers";
import BillListItem from "components/Archive/Bill/BillListItem";
import BillDetail from "components/Archive/Bill/BillDetail";
import FilterInputText from "components/FilterInputText";
import Pagination from "components/Pagination";

export default {
  name: 'PageArchiveBills',
  components: {Pagination, FilterInputText, BillDetail, BillListItem},
  mixins: [Bills],
  data(){ return {
    selected:null, show:false,
    filter: '', showing: null,
  } },
  computed: {
    AllBills(){ return _(this.bills).filter(({ progress }) => progress !== 'Cancelled').map(bill => Object.assign({},bill,{ slug:slug(bill) })).sortBy(({ date }) => extract_date(date).getTime()).reverse().value() },
    Bills(){ return this.filter ? _.filter(this.AllBills,({ slug }) => _.includes(slug,this.filter.toLowerCase())) : this.AllBills },
    bill(){ return this.selected === null ? null : this.showing[this.selected] }
  },
  methods: {
    hKey(item,idx,name){ return h_key(name,idx,item.id) },
    print({ id }){ post('bill','print',{ id }) },
  }
}
function slug({ id,customer,amount,token }){ return [id,_.get(customer,'name'),_.toNumber(amount),token.type].join(" ").toLowerCase() }
</script>
