<template>
  <q-card>
    <q-bar class="text-white text-subtitle2" :class="'bg-' + clr">Confirm Pending Online Order<q-space /><q-btn icon="close" flat dense v-close-popup /></q-bar>
    <q-card-section class="q-gutter-sm flex items-center justify-between">
      <q-badge :label="type" :color="clr" outline class="q-pa-sm" />
      <q-badge v-if="type === 'Dining'" :label="st_name($attrs)" :color="clr" outline class="q-pa-sm" />
      <q-badge v-if="['Sale','Take Away'].includes(type)" :label="'Price List: ' + pl_name($attrs)" :color="clr" outline class="q-pa-sm" />
      <q-badge v-if="type === 'Home Delivery'" :label="ct_name($attrs)" :color="clr" outline class="q-pa-sm" />
    </q-card-section>
    <q-list separator bordered>
      <OnlineOrderItemEdit v-for="(item,idx) in items" :key="'oo-cc-il-i-' + item.item" :color="clr" :idx="idx" :order="$attrs.id" />
    </q-list>
    <q-card-section class="text-center text-bold text-h6" :class="'text-' + clr">{{ precision(it_total({ items })) }}</q-card-section>
    <q-separator />
    <q-card-section class="q-gutter-y-xs" v-if="waiter_select || !$attrs.customer">
      <WaiterSelectDropDown v-if="waiter_select" outlined dense input-debounce="0" v-model="user" label="Select Waiter" get="id" />
      <OrderCustomer v-if="!$attrs.customer" v-model="customer" get="id" outlined dense />
    </q-card-section>
    <q-card-actions class="bg-grey-2">
      <q-btn color="red" icon="delete" flat @click="remove" /><q-space />
      <q-btn :color="clr" label="Confirm & Create Token" @click="create" />
    </q-card-actions>
    <q-dialog v-model="remove_confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm">You are about to cancel an order. Are you sure??</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" color="info" v-close-popup /><q-space />
          <q-btn label="Yes, Cancel Order" color="red" v-close-popup @click="remove(true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import OnlineOrders from "assets/mixins/OnlineOrders";
import OnlineOrderItemEdit from "components/Order/OnlineOrderItemEdit";
import {precision} from "assets/helpers";
import WaiterSelectDropDown from "components/Users/WaiterSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";

export default {
  name: "OnlineOrderConfirmCard",
  components: {OrderCustomer, WaiterSelectDropDown, OnlineOrderItemEdit},
  data(){ return {
    user: _USER.role === 'Waiter' ? _USER.id : null,
    customer: null, remove_confirm: false,
  } },
  mixins: [OnlineOrders],
  props: ['color','type','items'],
  computed: {
    clr(){ return this.color || 'info' },
    waiter_select(){ return this.type === 'Dining' && _USER.role !== 'Waiter' },
  },
  methods: {
    precision,
    create(){
      let params = { type:this.type,price_list:this.$attrs.price_list,seating:this.$attrs.seating,customer:this.customer,user:this.user,items:_.cloneDeep(this.items) }
      this.$store.dispatch('online/create',{ reference:this.$attrs.id,params }).then(() => this.$emit('confirmed'))
    },
    remove(status){
      if(status === true) this.$store.dispatch('online/remove',{ reference:this.$attrs.id }).then(() => this.$emit('cancelled'))
      this.remove_confirm = true
    }
  },
  created(){
    if(this.type === 'Home Delivery') this.customer = this.$attrs.customer;
  },
}
</script>
