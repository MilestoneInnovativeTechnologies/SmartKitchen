<template>
  <q-card>
    <q-card-section :class="'bg-' + clrCls" class="q-pa-xs"></q-card-section>
    <CardImageTitle :image="img" :title="p('name')" />
    <q-card-section class="text-center"><q-badge :label="p('status')" outline :color="clrCls" class="text-uppercase" style="font-size: 0.60rem"  /></q-card-section>
    <q-card-section v-if="p('tokens') && p('tokens').length" v-for="token in p('tokens')" :key="hKey(token)" class="q-pa-none">
      <q-card-section horizontal class="bg-grey-3 items-center" style="margin-top: 1px">
        <q-card-section class="col-4 q-px-none text-center text-weight-bold">{{ token.id }}</q-card-section>
        <q-card-section class="col-8 bg-grey-2 q-px-sm">
          <div style="font-size: 0.60rem">{{ time(token.date) }}</div>
          <div style="font-size: 0.60rem"><q-icon name="category" size="xs" /> {{ token.items.length }}</div>
          <div v-if="token.waiter" style="font-size: 0.60rem"><q-icon name="support_agent" size="xs" /> {{ token.waiter.name }}</div>
          <div v-if="token.customer" style="font-size: 0.60rem"><q-icon name="person" size="xs" /> {{ token.customer.name }}</div>
          <div class="text-left"><q-badge :label="token.progress" outline :color="clrCls" style="font-size: 0.55rem" /></div>
        </q-card-section>
      </q-card-section>
    </q-card-section>
<!--
    <q-card-section>
      <q-list v-if="p('token') && p('status') !== 'Vacant'" dense>
        <SeatStatusPreviewTokenDetailItem v-if="p('token')" icon="description" :label="p('token')" />
        <SeatStatusPreviewTokenDetailItem v-if="p('waiter')" icon="person" :label="p('customer')" />
        <SeatStatusPreviewTokenDetailItem v-if="p('waiter')" icon="trending_up" :label="p('progress')" />
      </q-list>
    </q-card-section>
-->
    <q-card-actions class="bg-positive q-pa-none text-center" v-if="!p('token') || p('status') === 'Vacant'">
      <q-btn label="New Order" class="full-width" flat color="white" padding="sm xs" :to="{ name:'order_new',params:{ seating:p('id'),type:'Dining',price_list:p('price_list'),after:{ name:'seat_status' } } }"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {SeatStatusCardColor} from "assets/assets";
import SeatStatusPreviewTokenDetailItem from "components/Seating/SeatStatusPreviewTokenDetailItem";
import {image,time,h_key} from "assets/helpers";
export default {
  name: "SeatStatusPreview",
  components: {SeatStatusPreviewTokenDetailItem, CardImageTitle},
  data(){ return { img:image(this.$attrs.image) } },
  computed: {
    clrCls(){ return SeatStatusCardColor[this.p('status')] },
    me(){ return _.get(this.$route,['meta','me','id']) },
  },
  methods: {
    p(key){ return _.get(this.$attrs,key) },
    hKey({ id }){ return h_key('ssp','token',id) },
    time
  }
}
</script>
