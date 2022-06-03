<template>
  <q-card>
    <q-card-section class="text-weight-bold bg-grey-1 flex justify-between q-py-xs">
      <div>{{ label || 'Set Prices' }}</div>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-xs">
        <div :class="colCls" v-for="pl in price_lists" :key="'ips-' + pl.id">
          <q-input :label="pl.name" type="number" dense outlined v-model.number="prices[pl.id]" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name: "ItemPricesSet",
  props: ['value','label'],
  data(){ return {
    size: 0, size_chart: [null,1,2,3,4,6,12], screens: [999999,1500,1300,1100,900,700,0],
  } },
  computed: {
    price_lists(){ return this.$store.state.prices.list },
    colCls(){ let size = this.size_chart[this.size || screenToSize(this.$q.screen.width)]; return size ? ('col-' + size) : ('col-'+12) },
    prices: {
      get(){ return this.value },
      set(prices){ this.$emit('input',prices) },
    }
  }
}
function screenToSize(scr){
  let screens = [999999,1500,1300,1100,900,700,0];
  for(let i in screens) { if(scr > screens[i]) { return i; } }
  return 1;
}
</script>
