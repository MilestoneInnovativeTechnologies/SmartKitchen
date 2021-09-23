<template>
  <q-card square class="shadow-1">
    <template v-if="view === 'grid'">
      <img :src="image" />
      <q-card-section class="bg-grey-2">
        <div class="text-caption" style="font-size: .8rem; line-height: 1.25">{{ name }}</div>
        <div class="text-caption q-mt-xs text-grey" style="font-size: .65rem; line-height: 1.1" v-show="!!detail">{{ detail }}</div>
      </q-card-section>
    </template>
    <template v-else-if="view === 'list'">
      <q-card-section horizontal>
        <q-img class="col-3" :src="image" />
        <q-card-section>
          <div class="text-caption" style="font-size: .8rem; line-height: 1.25">{{ name }}</div>
          <div class="text-caption q-mt-xs text-grey" style="font-size: .65rem; line-height: 1.1" v-show="!!detail">{{ detail }}</div>
        </q-card-section>
      </q-card-section>
      <q-separator />
    </template>
    <q-card-section class="flex q-py-sm justify-between items-center">
      <div class="text-positive text-subtitle1 text-bold">{{ precision(price) }}</div>
      <div v-if="order"><q-btn color="positive" label="Add" dense padding="xs md" glossy /></div>
    </q-card-section>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {precision} from "assets/helpers";
export default {
  name: "OnlineMenuItem",
  components: {CardImageTitle},
  props: ['name','image','price','detail','order'],
  computed: {
    cart(){ return this.$store.state.public.cart },
    view(){ return _.get(this.$store.state.public,'view') }
  },
  methods: {
    precision
  }
}
</script>

