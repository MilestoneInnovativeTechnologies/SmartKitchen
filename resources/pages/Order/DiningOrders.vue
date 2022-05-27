<template>
  <q-page padding v-scroll="scrolled">
    <Masonry width="280" :items="showing">
      <template #item="token">
        <OrderSummaryWaiterOrder :token="token" />
      </template>
    </Masonry>
    <Pagination :records="Tokens" v-model="showing" />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab || !Tokens.length" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'order_new',params:{ seat:true,user:$route.meta.me.id,type:'Dining' } }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
import {h_key} from "assets/helpers";
import { debounce } from 'quasar'
import Masonry from "components/Masonry";
import Pagination from "components/Pagination";
import bills from "assets/mixins/Bills";
import OrderSummaryWaiterOrder from "components/Order/OrderSummaryWaiterOrder";
export default {
  name: 'PageDiningOrders',
  components: {OrderSummaryWaiterOrder, Pagination, Masonry},
  mixins: [bills],
  data(){ return {
    fab: true, timeout: 0, offset: [24,24],
    showing: null,
    progress_includes: { Billed:[], Paid:['Pending','Partial'] },
  } },
  computed: {
    settings_progress(){
      let wps = settings('keep_tokens_in_waiter_orders_until'); if(wps !== undefined) return wps;
      return settings('keep_tokens_in_orders_until') || 'Billed';
    },
    progresses(){ return _.concat(['New','Processing','Completed'],this.progress_includes[this.settings_progress]) },
    Tokens(){ return _(this.tokens).filter(this.mine).map(token => Object.assign({},token,{ bill:this.token_bill[token.id] })).value() },
    me(){ return _.get(this.$route,['meta','me','id']) },
    receptionists(){ return _(this.$store.state.users.data).filter(['role','Receptionist']).map(user => _.toSafeInteger(user.id)).value() },
    allowable_users(){ return _.concat(null,this.me,this.receptionists) }
  },
  methods: {
    mine({ progress,type,user }){ return type === 'Dining' && this.progresses.includes(progress) && _.includes(this.allowable_users,user) },
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
