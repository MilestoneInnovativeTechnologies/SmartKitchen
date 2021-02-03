<template>
  <q-card>
    <q-card-section :class="clrCls" class="q-pa-xs"></q-card-section>
    <q-card-section horizontal>
      <CardImageTitle :image="img" :title="p('status')" />
      <q-card-section class="col-7">
        <div class="text-bold">{{ p('name') }}</div>
        <div v-if="!p('token') || p('status') === 'Vacant'"><q-btn icon-right="double_arrow" color="positive" flat dense padding="0" label="Order" :to="{ name:'seat_status_order',params:{ seating:p('id'),price_list:p('price_list') } }" /></div>
        <q-list v-if="p('token') && p('status') !== 'Vacant'" dense>
          <q-item dense style="padding: 0px !important;">
            <q-item-section avatar style="min-width: 1.5rem; height: 1.5rem" class="q-px-none"><q-icon name="description" size="sm" /></q-item-section>
            <q-item-section><q-item-label class="text-bold">{{ p('token') }}</q-item-label></q-item-section>
          </q-item>
          <q-item dense style="padding: 0px !important;" v-if="p('customer')">
            <q-item-section avatar style="min-width: 1.5rem; height: 1.5rem" class="q-px-none"><q-icon name="person" size="sm" /></q-item-section>
            <q-item-section><q-item-label>{{ p('customer') }}</q-item-label></q-item-section>
          </q-item>
          <q-item dense style="padding: 0px !important;" v-if="p('waiter')">
            <q-item-section avatar style="min-width: 1.5rem; height: 1.5rem" class="q-px-none"><q-icon name="how_to_reg" size="sm" /></q-item-section>
            <q-item-section><q-item-label>{{ p('waiter') }}</q-item-label></q-item-section>
          </q-item>
          <q-item dense style="padding: 0px !important;" v-if="p('waiter')">
            <q-item-section avatar style="min-width: 1.5rem; height: 1.5rem" class="q-px-none"><q-icon name="trending_up" size="sm" /></q-item-section>
            <q-item-section><q-item-label>{{ p('progress') }}</q-item-label></q-item-section>
          </q-item>
        </q-list>

      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {images} from "assets/default_images";
import {SeatStatusCardColor} from "assets/assets";
export default {
  name: "SeatStatusPreview",
  components: {CardImageTitle},
  data(){ return { img:images.seating } },
  computed: {
    clrCls(){ return 'bg-' + SeatStatusCardColor[this.p('status')] }
  },
  methods: {
    p(key){ return _.get(this.$attrs,key) }
  }
}
</script>
