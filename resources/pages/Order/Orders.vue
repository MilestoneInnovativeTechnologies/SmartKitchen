<template>
  <q-page padding v-scroll="scrolled">
    <div class="row q-col-gutter-xs items-start">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1" v-for="(token,id) in tokens" :key="hKey(token)">
        <OrderSummaryWaiterItem :id="id" />
      </div>
    </div>
    <q-page-sticky v-show="fab || !Object.keys(tokens).length" position="bottom-right" :offset="offset">
      <q-fab icon="add" color="primary" glossy :to="{ name: 'order_new' }" v-touch-pan.prevent.mouse="move" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import OrderSummaryWaiterItem from "components/Order/OrderSummaryWaiterOrder";
import {h_key} from "assets/helpers";
import {mapState} from "vuex";
export default {
  name: 'PageOrders',
  components: {OrderSummaryWaiterItem},
  data(){ return {
    fab: true, timeout: 0, offset: [24,24],
    progresses: ['New','Processing','Completed']
  } },
  computed: mapState('tokens',{
    tokens({ data }){ return _(data).filter(({ progress }) => this.progresses.includes(progress)).mapKeys('id').value() }
  }),
  methods: {
    hKey({ id }){ h_key('order','summary','order',id) },
    scrolled(pos){ this.fab = true },
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] }
  },
  watch: {
    fab: {
      immediate: true,
      handler: function(s){ if(!s) return; clearTimeout(this.timeout); this.timeout = setTimeout(vm => vm.fab = false,7500,this) }
    }
  }
}
</script>
