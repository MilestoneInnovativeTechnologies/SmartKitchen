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
  name: "PageBillPendingWaiter",
  mixins: [Bills],
  components: {Masonry, BillDetailCard},
  computed: {
    pBills(){ return _(this.bills).filter(({ progress }) => ['Pending','Partial'].includes(progress)).filter(['user.id',parseInt(_USER.id)]).value() }
  },
  methods: {
    hKey({ id }){ return h_key('bill','details','bill',id) }
  }
}
</script>
