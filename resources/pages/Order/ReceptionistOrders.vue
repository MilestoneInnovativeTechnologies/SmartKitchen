<template>
  <q-page padding v-scroll="scrolled">
    <BillFilter :tokens="active_tokens" v-model="Tokens" class="q-mb-sm" />
    <Masonry width="280" :items="showing">
      <template #item="token">
        <OrderSummaryReceptionistOrder :token="token" @action="OSA_action" />
      </template>
    </Masonry>
    <OrderSummaryActionPopups @done="OSA_action_done" v-bind="OSA_CB" @token_customer_changed="tokenCustomerChanged" />
    <Pagination :records="Tokens" v-model="showing" />
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="!order && (fab || tokens.length < 6)" position="bottom-right" :offset="offset">
        <q-fab icon="add" active-icon="add" color="primary" glossy @click="order = true" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
    <q-dialog v-model="order" persistent><OrderNewBasic :style="popup_width()" after="orders" /></q-dialog>
  </q-page>
</template>

<script>
import {h_key, popup_width} from "assets/helpers";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";
import Masonry from "components/Masonry";
import OrderNewBasic from "components/Order/OrderNewBasic";
import BillFilter from "components/Bill/BillFilter";
import Pagination from "components/Pagination";
import Bills from "assets/mixins/Bills";
import OrderSummaryActionPopups from "components/Order/OrderSummaryActionPopups";
import OrderSummaryActions from "assets/mixins/OrderSummaryActions";

export default {
  name: 'PageReceptionistOrders',
  components: {OrderSummaryActionPopups, Pagination, BillFilter, OrderNewBasic, Masonry, OrderSummaryReceptionistOrder},
  mixins: [Bills,OrderSummaryActions],
  data(){ return {
    fab: true, timeout: 0, offset: [24,24],
    progress_includes: { Completed:[],Billed:['Completed'],Paid:['Completed','Pending','Partial'] },
    order: false,
    Tokens: null, showing: [],
  } },
  computed: {
    settings_progress(){ return settings('keep_tokens_in_orders_until') || 'Completed' },
    progresses(){ return _.concat(['New','Processing'],this.progress_includes[this.settings_progress]) },
    active_tokens(){ return _(this.tokens).filter(token => token.type !== 'Remote' && this.progresses.includes(token.progress)).map(token => Object.assign({},token,{ bill:this.token_bill[token.id] })).reverse().value() }
  },
  methods: {
    popup_width,
    hKey({ id }){ h_key('order','summary','order',id) },
    scrolled(pos){ this.fab = true },
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] },
    tokenCustomerChanged(){
      let token_id = _.get(this.OSA_Object,'id',null); if(!token_id) return;
      this.OSA_Object = _.find(this.active_tokens,['id',token_id])
    }
  },
  watch: {
    fab: {
      immediate: true,
      handler: function(s){ if(!s) return; clearTimeout(this.timeout); this.timeout = setTimeout(vm => vm.fab = false,7500,this) }
    }
  }
}
</script>
