<template>
  <q-card>
    <q-bar class="text-white q-py-lg items-center" :class="'bg-' + clr">
      <q-icon name="receipt" color="white" left />
      <span>Order Summary</span><q-space />
      <q-btn icon="clear" v-close-popup flat round color="white" />
    </q-bar>
    <q-card-section class="q-pa-none">
      <q-list dense style="font-size: 0.75rem" separator bordered>
        <q-item>
          <q-item-section avatar>No</q-item-section>
          <q-item-section>Item</q-item-section>
          <q-item-section side>Total</q-item-section>
          <q-item-section side><q-icon name="clear" color="white" size="xs" /></q-item-section>
        </q-item>
        <q-item v-for="(item,idx) in items" :key="h_key('ons-oi',idx,'i',item.item)">
          <q-item-section avatar>{{ idx+1 }}</q-item-section>
          <q-item-section>
            <q-item-label>{{ iData(item,'name') }}</q-item-label>
            <q-item-label caption style="font-size: 0.65rem">{{ item.quantity }} x {{ parseFloat(price[item.item]).toFixed(2) }}</q-item-label>
          </q-item-section>
          <q-popup-edit :value="items.quantity" @input="$emit('process',['quantity',idx,$event])" :title="iData(item,'name')" auto-save><q-input type="number" :value="item.quantity" @input="$emit('process',['quantity',idx,$event])" dense outlined autofocus label="Quantity" /></q-popup-edit>
          <q-item-section side>{{ parseFloat(price[item.item] * item.quantity).toFixed(2) }}</q-item-section>
          <q-item-section side><q-icon name="clear" color="negative" size="xs" @click="$emit('process',['remove',idx])" /></q-item-section>
        </q-item>
        <q-item class="text-white" dense>
          <q-item-section  avatar>0</q-item-section>
          <q-item-section ><q-item-label class="text-white">Total</q-item-label></q-item-section>
          <q-item-section class="text-bold" :class="'text-' + clr" side>{{ parseFloat(total).toFixed(2) }}</q-item-section>
          <q-item-section  side><q-icon name="attach_money" :color="clr" size="xs" /></q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section>
      <OrderCustomer get="id" v-model="v_customer" />
    </q-card-section>
    <q-card-actions align="right" class="bg-grey-2">
      <q-btn label="Submit" :color="clr" padding="xs md" :loading="loading" @click="$emit('process',['submit'])" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {h_key} from "assets/helpers";
import {mapState} from "vuex";
import OrderCustomer from "components/Order/OrderCustomer";

export default {
  name: "OrderNewSummary",
  components: {OrderCustomer},
  props: ['items','price_list','customer','color','loading'],
  computed: {
    ...mapState('items',{ item_master:'data' }), clr(){ return this.color || 'accent' },
    price(){ return _.get(this.$store.getters['prices/items'],_.toInteger(this.price_list)) },
    total(){ return _.reduce(this.items,(total,{ item,quantity }) => total + this.price[item] * quantity,0) },
    v_customer: {
      get(){ return this.customer },
      set(customer){ this.$emit('process',['customer',customer]) }
    }
  },
  methods: {
    h_key,
    iData({ item },key){ return _.get(this.item_master,[_.toInteger(item),key]) }
  }
}
</script>
