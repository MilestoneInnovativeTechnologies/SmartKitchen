<template>
  <q-card>
    <q-card-section class="q-py-xs text-center text-white" :class="cColor"><span v-if="token.type === 'Dining' && token.user">{{ token.user.name }}</span></q-card-section>
    <CardImageTitle :image="src" :title="token.seating ? token.seating.name : (token.customer ? token.customer.name : token.type)" :caption="token.customer ? (token.seating ? (token.customer.name + ', ' + token.customer.phone) : token.customer.phone) : null" :info="token.type === 'Home Delivery'" @info="info = !info" />
    <q-card-actions><q-badge :label="token.id" class="q-pa-sm" /><q-badge :label="token.type" class="q-py-sm q-ml-xs" /><q-badge :label="token.progress" class="q-py-sm q-ml-xs" /><q-space /><div v-if="token.progress !== 'Billed'"><q-btn v-if="!billed" icon="receipt_long" color="secondary" flat @click="bill_generate_mode = true" padding="0" /><q-btn icon="add_box" color="primary" flat @click="add_mode = true" padding="0" /></div></q-card-actions>
    <OrderSummaryWaiterOrderItemsList :order="id" :noserve="noserve" />
    <q-dialog v-model="add_mode" persistent v-if="token.progress !== 'Billed'"><OrderSummaryItemAdd :token="id" style="width: 700px; max-width: 90vw;" @close="add_mode = false" /></q-dialog>
    <q-dialog v-model="bill_generate_mode" persistent v-if="!billed">
      <div :style="popup_width()">
        <div class="flex justify-end"><q-btn color="teal" text-color="white" icon="close" v-close-popup  /></div>
        <TokenBillGenerate :token="token_for_billing" />
      </div>
    </q-dialog>
    <q-dialog v-model="info" persistent v-if="token.type === 'Home Delivery' && token.customer"><CustomerDetailCard :id="token.customer.id" style="max-width: 360px; width: 90vw;" color="purple" /></q-dialog>
  </q-card>
</template>

<script>
import OrderSummaryWaiterOrderItemsList from "components/Order/OrderSummaryWaiterOrderItemsList";
import OrderSummaryItemAdd from "components/Order/OrderSummaryItemAdd";
import CardImageTitle from "components/CardImageTitle";
import { mapState } from 'vuex'
import {images} from "assets/default_images";
import {DiningTypeColor} from "assets/assets";
import {image, popup_width} from "assets/helpers";
import CustomerDetailCard from "components/Customer/CustomerDetailCard";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";

export default {
  components: {
    TokenBillGenerate,
    CustomerDetailCard, CardImageTitle, OrderSummaryItemAdd, OrderSummaryWaiterOrderItemsList},
  data(){ return {
    add_mode: false, bill_generate_mode: false, info: false,
  } },
  props: ['token','noserve'],
  name: "OrderSummaryReceptionistOrder",
  computed: {
    ...mapState({ token:function({ tokens:{ data },seating,users,customers }){
        let token = data[_.toInteger(this.id)];
        return Object.assign({},token,
          { seating:seating.data[_.toInteger(token.seating)] },
          { user:users.data[_.toInteger(token.user)] },
          { customer:customers.data[_.toInteger(token.customer)] },
        )
      }}),
    image(){ let type = this.token.type; return type === 'Dining' ? this.token.seating.image : ((type === 'Home Delivery' && this.token.customer) ? this.token.customer.image : images[_.toLower(type).replace(/\s*/g,'')]) },
    src(){ return image(this.image) },
    cColor(){ return 'bg-' + DiningTypeColor[this.token.type] },
    billed(){ return _.includes(this.$store.getters['tokens/billed'],_.toInteger(this.id)) },
    token_for_billing(){ return this.billed ? this.token : Object.assign({},this.token,{
      items: addItemAndPrice(this.$store.state.tokens.items[this.token.id], this.$store.state.items.data, this.$store.getters['prices/items'][this.token.price_list])
    }) }
  },
  methods: {
    popup_width
  }
}

function addItemAndPrice(items,item_master,prices){
  return _.map(items,item => Object.assign({},item,{
    item: _.get(item_master,item.item),
    price: _.get(prices,item.item),
  }))
}
</script>
