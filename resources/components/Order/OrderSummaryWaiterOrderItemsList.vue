<template>
  <q-list separator bordered>
    <q-item v-for="item in items" :key="hKey(item)" :disable="item.progress === 'Cancelled'" :clickable="clickable(item)" @click="$emit('select',item)">
      <q-item-section>
        <q-item-label caption class="text-red text-bold" v-if="item.deliver">Delivery: {{ item.deliver_human }}</q-item-label>
        <q-item-label>{{ item.quantity }} x {{ item.item.name }}<span v-if="item.narration"> ({{ item.narration }})</span></q-item-label>
        <q-item-label lines="1" caption v-if="delay(item)">Delay: {{ delay(item) }} seconds</q-item-label>
        <q-item-label lines="1" caption v-if="item.kitchen">Kitchen: {{ item.kitchen.name }}</q-item-label>
      </q-item-section>
      <q-item-section side v-show="selected && selected.includes(item.id)"><q-icon name="how_to_reg" color="positive" /></q-item-section>
      <q-item-section side><q-badge :label="item.progress" class="q-py-xs" /></q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import {attention, h_key} from "assets/helpers";
import OrderSummaryItemUpdate from "components/Order/OrderSummaryItemUpdate";
import OrderItemEditable from "assets/mixins/OrderItemEditable";

export default {
  name: "OrderSummaryWaiterOrderItemsList",
  components: {OrderSummaryItemUpdate},
  props: ['token','noserve','selected'],
  mixins: [OrderItemEditable],
  data(){ return {

  } },
  computed: {
    items(){ return _.get(this.token,'items',[]) },
  },
  methods: {
    hKey({ id,item }){ return h_key('waiter','order','items','list','item',item.id,'id',id) },
    itemName({ item }){ return _.get(this.items,[_.toSafeInteger(item),'name']) },
    delay({ delay }){ return (delay > 0 && (delay*1000) > new Date().getTime()) ? (delay - _.toInteger(new Date().getTime()/1000)) : 0 },
    kitchen({ kitchen }){ return _.get(this.kitchens,[_.toSafeInteger(kitchen),'name'],null) },
    clickable({ progress }){ return !this.noserve && progress === 'Completed' },
  },
}
</script>
