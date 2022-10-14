<template>
  <q-card>
    <q-card-section :class="'bg-' + clrCls" class="q-pa-xs"></q-card-section>
    <CardImageTitle :image="img" :title="p('name')" />
    <q-card-section class="text-center"><q-badge :label="p('status')" outline :color="clrCls" class="text-uppercase" /></q-card-section>
    <q-card-section v-if="p('tokens') && p('tokens').length" v-for="token in p('tokens')" :key="hKey(token)" class="q-pa-none q-mt-xs content-center" horizontal>
      <q-card-section class="bg-grey-3 q-pa-sm text-center text-weight-bold flex flex-center"><div style="transform: rotateZ(-90deg)">{{ token.id }}</div></q-card-section>
      <q-list class="col-grow q-ml-xs bg-grey-1" style="font-size: 0.8rem">
        <q-item class="q-py-md">
          <q-item-section>
            <q-item-label caption class="text-italic" style="font-size: 0.7rem">{{ time(token.date) }}</q-item-label>
            <q-item-label :class="'text-' + TokenProgressColor[token.progress]" class="text-bold">{{ token.progress }}</q-item-label>
            <q-item-label caption class="text-bold" style="font-size: 0.7rem">{{ customerName(token) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions class="bg-positive q-pa-none text-center" v-if="!p('token') || p('status') === 'Vacant'">
      <q-btn label="New Order" class="full-width" flat color="white" padding="sm xs" :to="{ name:'order_new',params:{ seating:p('id'),type:'Dining',price_list:p('price_list'),after:{ name:'seat_status' } } }"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {SeatStatusCardColor, TokenProgressColor} from "assets/assets";
import SeatStatusPreviewTokenDetailItem from "components/Seating/SeatStatusPreviewTokenDetailItem";
import {image,time,h_key} from "assets/helpers";
export default {
  name: "SeatStatusPreview",
  components: {SeatStatusPreviewTokenDetailItem, CardImageTitle},
  data(){ return { img:image(this.$attrs.image),TokenProgressColor } },
  computed: {
    clrCls(){ return SeatStatusCardColor[this.p('status')] },
    me(){ return _.get(this.$route,['meta','me','id']) },
  },
  methods: {
    time,
    p(key){ return _.get(this.$attrs,key) },
    hKey({ id }){ return h_key('ssp','token',id) },
    customerName({ customer }){ return customer ? customer.name : '-' }
  }
}
</script>
