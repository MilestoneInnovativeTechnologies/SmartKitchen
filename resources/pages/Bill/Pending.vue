<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-2" v-for="bill in bills" :key="hKey(bill)">
        <BillDetailCard v-bind="bill" />
      </div>
    </div>
  </q-page>
</template>

<script>
import {h_key} from "assets/helpers";
import BillDetailCard from "components/Bill/BillDetailCard";

export default {
  name: "PageBillPending",
  components: {BillDetailCard},
  computed: {
    bills(){ return this.$store.getters['bills/pending'] }
  },
  methods: {
    hKey({ id }){ return h_key('bill','details','bill',id) }
  }
}
</script>
