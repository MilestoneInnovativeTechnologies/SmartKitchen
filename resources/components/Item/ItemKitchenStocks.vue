<template>
  <q-card>
    <q-card-section class="text-weight-bold bg-grey-1 flex justify-between q-py-xs">
      <div>{{ label || 'Kitchen Stocks' }}</div>
    </q-card-section>
    <q-list>
      <q-item v-for="kitchen in kitchens" :key="'iks-' + kitchen.id">
        <q-item-section side><q-checkbox v-model="act_kitchens" :val="kitchen.id" /></q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">{{ kitchen.name }}</q-item-label>
          <q-item-label caption class="row q-col-gutter-x-xs">
            <q-input outlined dense class="col" type="number" label="Stock" v-model.number="stocks[kitchen.id]['stock']" />
            <q-input outlined dense class="col" type="number" label="Duration" v-model.number="stocks[kitchen.id]['duration']" />
            <q-select outlined dense class="col" label="Auto Process" v-model="stocks[kitchen.id]['auto_process']" :options="['Yes','No']" />
            <q-select outlined dense class="col" label="Auto Complete" v-model="stocks[kitchen.id]['auto_complete']" :options="['Yes','No']" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import FilterInputText from "components/FilterInputText";
const def = new Object({ stock:100,duration:180,auto_process:'No',auto_complete:'No' })

export default {
  name: "ItemKitchenStocks",
  components: {FilterInputText},
  props: ['value','label'],
  data(){ return {
    v_stocks: null,
  } },
  computed: {
    kitchens(){ return this.$store.state.kitchens.data },
    stocks: {
      get(){ return Object.assign({},this.v_stocks,this.value) },
      set(stocks){ this.$emit('input',_.pick(stocks,this.act_kitchens)) }
    },
    act_kitchens: {
      get(){ return _(this.value).keys().map(_.toInteger).value() },
      set(kitchens){ this.$emit('input',_.pick(this.stocks,kitchens)) },
    }
  },
  created() {
    this.v_stocks = _(this.kitchens).mapKeys('id').mapValues(() => _.cloneDeep(def)).value()
  }
}
</script>
