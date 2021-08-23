<template>
  <q-list separator bordered>
    <q-item v-for="row in rows" :key="hKey(row)" :disable="row.progress === 'Cancelled'">
      <q-item-section>
        <q-item-label caption class="text-red text-bold" v-if="row.deliver">Delivery: {{ row.deliver_human }}</q-item-label>
        <q-item-label>{{ row.quantity }} x {{ itemName(row) }}<span v-if="row.narration"> ({{ row.narration }})</span></q-item-label>
        <q-item-label lines="1" caption v-if="delay(row)">Delay: {{ delay(row) }} seconds</q-item-label>
        <q-item-label lines="1" caption v-if="kitchen(row)">Kitchen: {{ kitchen(row) }}</q-item-label>
      </q-item-section>
      <q-item-section side><q-badge :label="row.progress" class="q-py-xs" /></q-item-section>
      <q-item-section side>
        <q-btn icon="edit" v-if="editable(row)" color="warning" round @click="edit_mode = !!(edit_obj = row)" dense />
        <q-btn icon="how_to_reg" v-if="row.progress === 'Completed' && !noserve" color="positive" round @click="served(row)" dense />
      </q-item-section>
      <q-inner-loading :showing="processing.includes(row.id)"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
    </q-item>
    <q-dialog v-model="edit_mode" persistent><OrderSummaryItemUpdate :token="order" v-bind="edit_obj" style="width: 700px; max-width: 90vw;" @close="edit_mode = !!(edit_obj = null)" /></q-dialog>
  </q-list>
</template>

<script>
import { mapState } from 'vuex'
import {attention, h_key} from "assets/helpers";
import OrderSummaryItemUpdate from "components/Order/OrderSummaryItemUpdate";

export default {
  name: "OrderSummaryWaiterOrderItemsList",
  components: {OrderSummaryItemUpdate},
  props: ['order','noserve'],
  data(){ return {
    edit_mode: false,
    edit_obj: null,
    processing: [],
    completed: []
  } },
  computed: {
    rows(){ return _.get(this.$store.state.tokens.items,_.toInteger(this.order),[]) },
    ...mapState({ items:({ items:{ data } }) => data,kitchens:({ kitchens:{ data }}) => data }),
  },
  methods: {
    hKey({ id,item }){ return h_key('waiter','order','items','list','item',item,'id',id) },
    itemName({ item }){ return _.get(this.items,[_.toSafeInteger(item),'name']) },
    delay({ delay }){ return (delay > 0 && (delay*1000) > new Date().getTime()) ? (delay - _.toInteger(new Date().getTime()/1000)) : 0 },
    kitchen({ kitchen }){ return _.get(this.kitchens,[_.toSafeInteger(kitchen),'name'],null) },
    editable({ progress }){ return ['New','Accepted'].includes(progress) },
    edit(row){
      this.edit_obj = row;
      this.edit_mode = true;
    },
    served({ id }){ this.processing.push(id); post('token','served',{ id }).then(() => this.processing = _.difference(this.processing,[id])); },
  },
  created(){ this.completed = _(this.rows).filter(['progress','Completed']).map('id').value() },
  watch: {
    rows: {
      deep: true,
      handler(rows){ _.forEach(rows,({ progress,id }) => (progress === 'Completed' && !this.completed.includes(id)) ? attention(this.completed.push(id)) : null) }
    }
  }
}
</script>
