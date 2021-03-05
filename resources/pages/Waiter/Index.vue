<template>
  <q-page padding class="q-gutter-y-sm" v-scroll="scrolled">
    <OrderWaiterSummary class="q-mt-md" />
    <OrderWaiterServable class="q-mt-md" />
    <OrderOngoingTables class="q-mt-md" />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'order_new' }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
import OrderWaiterSummary from "components/Order/OrderWaiterSummary";
import OrderWaiterServable from "components/Order/OrderWaiterServable";
import DigitMetric from "components/Metric/DigitMetric";
import OrderOngoingTables from "components/Order/OrderOngoingTables";
import {debounce} from "quasar";
export default {
  name: 'PageWaiterIndex',
  components: {OrderOngoingTables, DigitMetric, OrderWaiterServable, OrderWaiterSummary},
  data(){ return {
    token: new URLSearchParams(document.location.search.substring(1)).get('token'),
    fab: true,  offset: [24,24],
  } },
  methods: {
    scrolled: debounce(function(){ this.fab = false },500,true),
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] }
  },
  watch: {
    fab(s){ if(s) return; clearTimeout(this.timeout); this.timeout = setTimeout(vm => vm.fab = true,1500,this) }
  }

}
</script>
