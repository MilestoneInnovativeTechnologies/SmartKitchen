<template>
  <q-card flat>
    <q-card-section horizontal ref="hd">
      <q-card-section class="col-8 q-pa-none q-pr-xs"><QuickOrderCodeDisplay :code="code" :quantity="quantity" :mode="mode" :title="item_name" /></q-card-section>
      <q-responsive class="col-4 q-pa-none"><QuickOrderItemsTotal :items="items" :prices="prices" /></q-responsive>
    </q-card-section>
    <q-card-section>
      <q-scroll-area :style="{ height:items_height + 'px' }">
        <QuickOrderItemsDisplay v-if="items" :items="items" :prices="prices" :prop="item_prop" />
      </q-scroll-area>
    </q-card-section>
    <q-card-section class="fixed-bottom bg-white q-pt-none" ref="nk">
      <q-separator />
      <q-bar class="bg-transparent justify-between items-center">
        <q-toggle v-model="quantity_fix" label="Quantity Fix" dense size="xs" style="font-size: 0.65rem; line-height: 1" />
        <div class="flex items-center"><span style="font-size: 0.65rem; line-height: 1" class="q-mr-sm">Item Prop: </span><q-select v-model="item_prop" :options="props" borderless /></div>
      </q-bar>
      <NumericKeypad v-model="number" @enter="mode_change" :disabled="!item" @done="$emit('done')" />
    </q-card-section>
  </q-card>
</template>

<script>
import NumericKeypad from "components/NumericKeypad";
import QuickOrderCodeDisplay from "components/Order/QuickOrderCodeDisplay";
import {mapState} from "vuex";
import QuickOrderItemsTotal from "components/Order/QuickOrderItemsTotal";
import QuickOrderItemsDisplay from "components/Order/QuickOrderItemsDisplay";
export default {
  name: "QuickOrder",
  components: {QuickOrderItemsDisplay, QuickOrderItemsTotal, QuickOrderCodeDisplay, NumericKeypad},
  props: ['items','price_list'],
  data(){ return {
    mode: 'code',
    code: 0, quantity: 1, quantity_fresh: true, code_fresh: true,
    items_height: 100,
  } },
  computed: {
    ...mapState('items',{ props:state => _.map(state.prop,'name'),items_master:'data' }),
    number: { set(num){ let m = this.mode, mf = m+'_fresh'; this[m] = this[mf] ? _.toNumber(_.toString(num).split("").pop(),this[mf] = false) : num },  get(){ return _.get(this,this.mode) }, },
    quantity_fix: { set(quantity_fix){ this.$store.commit('public', { quantity_fix }) }, get(){ return _.get(this.$store.state.public,'quantity_fix',settings('quick','quantity_fix')) }, },
    item_prop: { set(item_prop){ this.$store.commit('public', { item_prop }) }, get(){ return _.get(this.$store.state.public,'item_prop',settings('quick','item_prop')) }, },
    items_keyed(){ return _.mapKeys(this.items_master,item => _.toInteger(item[this.item_prop])) },
    item(){ return _.get(this.items_keyed,_.toInteger(this.code)) },
    item_name(){ return _.get(this.item,'name') },
    prices(){ return _.get(this.$store.getters['prices/items'],this.price_list,this.price_zero()) },
  },
  methods: {
    price_zero(){ return _.fromPairs(_.map(this.items,({ item }) => [item,0])) },
    def(){ this.code = this.quantity_fix ? this.code : 0; this.quantity = 1; this.quantity_fresh = true; this.code_fresh = true },
    mode_change(num){
      this[this.mode] = num; if(this.mode === 'code' && !this.item) return;
      if(this.mode === 'quantity') this.def(this.send_item(_.toInteger(num)));
      this.mode = _.get({ code:'quantity',quantity:'code' },this.mode);
      if(this.mode === 'quantity' && this.quantity_fix) this.mode_change(1)
    },
    send_item(num){ if(num <= 0 || !this.item) return; this.$emit('item',this.item); return this.send_item(num-1) }
  },
  mounted() {
    setTimeout(vm => vm.items_height = window.innerHeight - 75 - vm.$refs['hd'].$el.offsetHeight - vm.$refs['nk'].$el.offsetHeight,1000,this)
  },
}
</script>
