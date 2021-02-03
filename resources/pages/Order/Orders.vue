<template>
  <q-page padding v-scroll="scrolled">
    <div class="row q-col-gutter-xs items-start">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1" v-for="token in tokens" :key="hKey(token)">
        <OrderSummaryWaiterItem :id="token.id" />
      </div>
    </div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab || !tokens.length" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'order_new' }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
import OrderSummaryWaiterItem from "components/Order/OrderSummaryWaiterOrder";
import {h_key} from "assets/helpers";
import {mapState} from "vuex";
import { debounce } from 'quasar'
export default {
  name: 'PageOrders',
  components: {OrderSummaryWaiterItem},
  data(){ return {
    fab: true, timeout: 0, offset: [24,24],
    progresses: ['New','Processing','Completed']
  } },
  computed: mapState('tokens',{
    tokens({ data }){ return _(data).filter(({ progress }) => this.progresses.includes(progress)).value() }
  }),
  methods: {
    hKey({ id }){ h_key('order','summary','order',id) },
    scrolled: debounce(function(){this.fab = false},500,true),
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] }
  },
  watch: {
    fab: {
      immediate: true,
      handler: function(s){ if(s) return; clearTimeout(this.timeout); this.timeout = setTimeout(vm => vm.fab = true,1500,this) }
    }
  }
}
</script>
