<template>
  <q-page padding>
    <Masonry width="300" :items="pBills">
      <template #item="bill">
        <BillDetailCard v-bind="bill" />
      </template>
    </Masonry>
  </q-page>
</template>

<script>
import {h_key} from "assets/helpers";
import BillDetailCard from "components/Bill/BillDetailCard";
import Bills from "assets/mixins/Bills";
import Masonry from "components/Masonry";

export default {
  name: "PageBillPending",
  mixins: [Bills],
  components: {Masonry, BillDetailCard},
  computed: {
    pBills(){ return _.filter(this.bills,({ progress }) => ['Pending','Partial'].includes(progress)) }
  },
  methods: {
    hKey({ id }){ return h_key('bill','details','bill',id) }
  }
}
</script>
