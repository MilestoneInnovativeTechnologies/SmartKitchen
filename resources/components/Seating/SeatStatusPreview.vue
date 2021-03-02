<template>
  <q-card>
    <q-card-section :class="clrCls" class="q-pa-xs"></q-card-section>
    <q-card-section horizontal>
      <CardImageTitle :image="img" :title="p('status')" />
      <q-card-section class="col-7 q-pa-xs">
        <div class="text-bold">{{ p('name') }}</div>
        <div v-if="!p('token') || p('status') === 'Vacant'"><q-btn color="teal-7" class="block no-border-radius" size="sm" label="New Order" :to="{ name:'seat_status_order',params:{ seating:p('id'),price_list:p('price_list') } }" /></div>
        <q-list v-if="p('token') && p('status') !== 'Vacant'" dense>
          <SeatStatusPreviewTokenDetailItem v-if="p('token')" icon="description" :label="p('token')" />
          <SeatStatusPreviewTokenDetailItem v-if="p('waiter')" icon="person" :label="p('customer')" />
          <SeatStatusPreviewTokenDetailItem v-if="p('waiter')" icon="trending_up" :label="p('progress')" />
        </q-list>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {SeatStatusCardColor} from "assets/assets";
import SeatStatusPreviewTokenDetailItem from "components/Seating/SeatStatusPreviewTokenDetailItem";
import {image} from "assets/helpers";
export default {
  name: "SeatStatusPreview",
  components: {SeatStatusPreviewTokenDetailItem, CardImageTitle},
  data(){ return { img:image(this.$attrs.image) } },
  computed: {
    clrCls(){ return 'bg-' + SeatStatusCardColor[this.p('status')] }
  },
  methods: {
    p(key){ return _.get(this.$attrs,key) }
  }
}
</script>
