<template>
  <q-list separator bordered>
    <q-item v-for="item in items" :key="hKey(item)" :disable="item.progress === 'Cancelled'">
      <q-item-section>
        <q-item-label caption class="text-red text-bold" v-if="item.deliver">Delivery: {{ item.deliver_human }}</q-item-label>
        <q-item-label>{{ item.quantity }} x {{ item.item.name }}<span v-if="item.narration"> ({{ item.narration }})</span></q-item-label>
        <q-item-label lines="1" caption v-if="delay(item)">Delay: {{ delay(item) }} seconds</q-item-label>
        <q-item-label lines="1" caption v-if="item.kitchen">Kitchen: {{ item.kitchen.name }}</q-item-label>
      </q-item-section>
      <q-item-section side><q-badge :label="item.progress" class="q-py-xs" /></q-item-section>
      <q-item-section side>
        <q-btn icon="edit" v-if="editable(item)" color="warning" round @click="edit_mode = !!(edit_obj = item)" dense />
        <q-btn icon="how_to_reg" v-if="item.progress === 'Completed' && !noserve" color="positive" round @click="served(item)" dense />
      </q-item-section>
      <q-inner-loading :showing="processing.includes(item.id)"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
    </q-item>
    <q-dialog v-model="edit_mode" persistent><OrderSummaryItemUpdate :token="token" v-bind="edit_obj" style="width: 700px; max-width: 90vw;" @close="edit_mode = !!(edit_obj = null)" /></q-dialog>
  </q-list>
</template>

<script>
import {attention, h_key} from "assets/helpers";
import OrderSummaryItemUpdate from "components/Order/OrderSummaryItemUpdate";
import OrderItemEditable from "assets/mixins/OrderItemEditable";

export default {
  name: "OrderSummaryWaiterOrderItemsList",
  components: {OrderSummaryItemUpdate},
  props: ['token','noserve'],
  mixins: [OrderItemEditable],
  data(){ return {
    edit_mode: false,
    edit_obj: null,
    processing: [],
    completed: []
  } },
  computed: {
    items(){ return _.get(this.token,'items',[]) },
  },
  methods: {
    hKey({ id,item }){ return h_key('waiter','order','items','list','item',item.id,'id',id) },
    itemName({ item }){ return _.get(this.items,[_.toSafeInteger(item),'name']) },
    delay({ delay }){ return (delay > 0 && (delay*1000) > new Date().getTime()) ? (delay - _.toInteger(new Date().getTime()/1000)) : 0 },
    kitchen({ kitchen }){ return _.get(this.kitchens,[_.toSafeInteger(kitchen),'name'],null) },
    editable({ progress }){ return ['New','Accepted'].includes(progress) || this.oie_is(progress) },
    edit(item){
      this.edit_obj = item;
      this.edit_mode = true;
    },
    served({ id }){ this.processing.push(id); post('token','served',{ id }).then(() => this.processing = _.difference(this.processing,[id])); },
  },
  created(){ this.completed = _(this.items).filter(['progress','Completed']).map('id').value() },
  watch: {
    items: {
      deep: true,
      handler(items){ _.forEach(items,({ progress,id }) => (progress === 'Completed' && !this.completed.includes(id)) ? attention(this.completed.push(id)) : null) }
    }
  }
}
</script>
