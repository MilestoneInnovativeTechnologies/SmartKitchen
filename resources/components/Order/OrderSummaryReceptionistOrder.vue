<template>
  <q-card>
    <q-card-section class="q-py-xs text-center text-white" :class="cColor"><span v-if="token.type === 'Dining' && token.user">{{ token.user.name }}</span></q-card-section>
    <CardImageTitle :image="src" :title="token.seating ? token.seating.name : (token.customer ? token.customer.name : token.type)" :caption="token.customer ? token.customer.phone : null" :info="token.type === 'Home Delivery'" @info="info = !info" />
    <q-card-actions><q-badge :label="token.id" class="q-py-sm q-px-sm" /><q-badge :label="token.type" class="q-py-sm q-ml-xs" /><q-badge :label="token.progress" class="q-py-sm q-ml-xs" /><q-space /><q-btn v-if="token.progress !== 'Billed'" icon="add_box" color="primary" flat @click="add_mode = true" padding="0" /></q-card-actions>
    <OrderSummaryWaiterOrderItemsList :order="id" :noserve="noserve" />
    <q-dialog v-model="add_mode" persistent v-if="token.progress !== 'Billed'"><OrderSummaryItemAdd :token="id" style="width: 700px; max-width: 90vw;" @close="add_mode = false" /></q-dialog>
    <q-dialog v-model="info" persistent v-if="token.type === 'Home Delivery'"><CustomerDetailCard :id="token.customer.id" style="max-width: 360px; width: 90vw;" color="purple" /></q-dialog>
  </q-card>
</template>

<script>
import OrderSummaryWaiterOrderItemsList from "components/Order/OrderSummaryWaiterOrderItemsList";
import OrderSummaryItemAdd from "components/Order/OrderSummaryItemAdd";
import CardImageTitle from "components/CardImageTitle";
import { mapState } from 'vuex'
import {images} from "assets/default_images";
import {DiningTypeColor} from "assets/assets";
import {image} from "assets/helpers";
import CustomerDetailCard from "components/Customer/CustomerDetailCard";
export default {
  components: {CustomerDetailCard, CardImageTitle, OrderSummaryItemAdd, OrderSummaryWaiterOrderItemsList},
  data(){ return {
    add_mode: false, info: false,
  } },
  props: ['id','noserve'],
  name: "OrderSummaryReceptionistOrder",
  computed: {
    ...mapState({ token:function({ tokens:{ data },seating,users,customers }){
        let token = data[_.toInteger(this.id)];
        return Object.assign({},token,
          { seating:seating.data[_.toInteger(token.seating)] },
          { user:users.data[_.toInteger(token.user)] },
          { customer:customers.data[_.toInteger(token.customer)] }
        )
      }}),
    image(){ let type = this.token.type; return type === 'Dining' ? this.token.seating.image : ((type === 'Home Delivery' && this.token.customer) ? this.token.customer.image : images[_.toLower(type).replace(/\s*/g,'')]) },
    src(){ return image(this.image) },
    cColor(){ return 'bg-' + DiningTypeColor[this.token.type] }
  }
}
</script>
