<template>
  <q-page padding v-scroll="scrolled">
    <Masonry width="300" :items="tokens">
      <template #item="token">
        <OrderSummaryReceptionistOrder :id="token.id" />
      </template>
    </Masonry>
    <q-page-sticky v-show="fab || Object.keys(tokens).length < 6" position="bottom-right" :offset="offset">
      <q-fab icon="add" color="primary" glossy :to="{ name: 'receptionist_order_new' }" v-touch-pan.prevent.mouse="move" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {h_key} from "assets/helpers";
import {mapState} from "vuex";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";
import Masonry from "components/Masonry";
export default {
  name: 'PageReceptionistOrders',
  components: {Masonry, OrderSummaryReceptionistOrder},
  data(){ return {
    fab: true, timeout: 0, offset: [24,24],
    progresses: ['New','Processing']
  } },
  computed: mapState('tokens',{
    tokens({ data }){ return _(data).filter(({ progress,type }) => type !== 'Remote' && this.progresses.includes(progress)).mapKeys('id').value() }
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
