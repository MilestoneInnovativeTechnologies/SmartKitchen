<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-2" v-for="bill in pBills" :key="hKey(bill)">
        <BillDetailCard v-bind="bill" />
      </div>
    </div>
  </q-page>
</template>

<script>
import {h_key} from "assets/helpers";
import BillDetailCard from "components/Bill/BillDetailCard";
import Bills from "assets/mixins/Bills";

export default {
  name: "PageBillPending",
  mixins: [Bills],
  components: {BillDetailCard},
  computed: {
    pBills(){ return _.filter(this.bills,({ progress }) => ['Pending','Partial'].includes(progress)) }
  },
  methods: {
    hKey({ id }){ return h_key('bill','details','bill',id) }
  }
}
</script>
