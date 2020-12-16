<template>
  <q-list separator bordered>
    <q-item v-for="row in rows" :key="hKey(row)" dense>
      <q-item-section>
        <q-item-label caption>{{ row.quantity }} x {{ itemName(row) }}</q-item-label>
        <q-item-label lines="1" caption v-if="row.narration">{{ row.narration }}</q-item-label>
        <q-item-label lines="1" caption v-if="row.delay">Delay: {{ row.delay }}</q-item-label>
        <q-item-label lines="1" caption v-if="kitchen(row)">Kitchen: {{ kitchen(row) }}</q-item-label>
      </q-item-section>
      <q-item-section side><q-badge :label="row.progress" /></q-item-section>
      <q-item-section side>
        <q-btn icon="edit" v-if="editable(row)" color="warning" dense flat size="sm" @click="edit_mode = !!(edit_obj = row)" padding="0" />
        <q-btn icon="how_to_reg" v-if="row.progress === 'Completed'" color="positive" dense flat size="sm" @click="served(row)" padding="0" />
      </q-item-section>
    </q-item>
    <q-dialog v-model="edit_mode" persistent><OrderSummaryItemUpdate :token="order" v-bind="edit_obj" style="width: 700px; max-width: 60vw;" @close="edit_mode = !!(edit_obj = null)" /></q-dialog>
  </q-list>
</template>

<script>
import { mapState } from 'vuex'
import {h_key} from "assets/helpers";
import OrderSummaryItemUpdate from "components/Order/OrderSummaryItemUpdate";

export default {
  name: "OrderSummaryWaiterOrderItemsList",
  components: {OrderSummaryItemUpdate},
  props: ['order'],
  data(){ return {
    edit_mode: false,
    edit_obj: null,
  } },
  computed: {
    rows(){ return _.get(this.$store.state.tokens.items,_.toInteger(this.order),[]) },
    ...mapState({ items:({ items:{ data } }) => data,kitchens:({ kitchens:{ data }}) => data }),
  },
  methods: {
    hKey({ id,item }){ return h_key('waiter','order','items','list','item',item,'id',id) },
    itemName({ item }){ return _.get(this.items,[_.toSafeInteger(item),'name']) },
    kitchen({ kitchen }){ return _.get(this.kitchens,[_.toSafeInteger(kitchen),'name'],null) },
    editable({ progress }){ return ['New','Accepted'].includes(progress) },
    edit(row){
      this.edit_obj = row;
      this.edit_mode = true;
    },
    served({ id }){ post('token','served',{ id }) },
  }
}
</script>
