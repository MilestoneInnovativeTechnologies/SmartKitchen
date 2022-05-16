<template>
  <q-card>
    <q-card-section class="bg-grey-2 text-weight-bold flex justify-between items-center">
      <div>Items Price</div>
      <div class="col-grow q-mx-xl gt-xs"><q-slider v-model="size" :min="0" :max="6" :step="1" color="black" /></div>
      <q-toggle v-model="all" checked-icon="check" color="red" label="Show all items" unchecked-icon="clear" />
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-xs">
        <div class="col-12"><FilterInputText @text="filter = $event" /></div>
        <div :class="colCls" v-for="({ item,price,name },idx) in items" :key="'plps-' + item" v-if="idx < 40 || all">
          <q-input :label="name" type="number" dense outlined :value="price" @input="update(item,$event)" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import FilterInputText from "components/FilterInputText";
import {matches} from "assets/helpers";

export default {
  name: "AdministratorMasterPriceListPriceSet",
  components: {FilterInputText},
  props: ['list'],
  data(){ return {
    filter: '', updates: {}, all: false,
    size: 0, size_chart: [null,1,2,3,4,6,12], screens: [999999,1500,1300,1100,900,700,0]
  } },
  computed: {
    ...mapState('items', { products: 'data' }),
    colCls(){ let size = this.size_chart[this.size || screenToSize(this.$q.screen.width)]; return size ? ('col-' + size) : ('col-'+12) },
    lPrice(){ return this.list ? _(this.$store.state.prices.data).filter(['price_list',this.list]).mapKeys('item').mapValues(({ price }) => _.toNumber(price)).value() : {} },
    items(){ return _(this.products).filter(product => !this.filter || matches(product,['id','name','detail','prop1','prop2','prop3','prop4','prop5'],this.filter)).map(({ id,name }) => Object.assign({},{ item:id,price:this.getPrice(id),name })).value() },
  },
  methods: {
    getPrice(item){ return _.has(this.updates,item) ? this.updates[item] : _.toNumber(_.get(this.lPrice,item,0)) },
    update(item,price){ this.$set(this.updates,item,_.toNumber(price)); this.$emit('input',this.updates) },
  },
  watch: {
    list(){ this.updates = {} }
  }
}
function screenToSize(scr){
  let screens = [999999,1500,1300,1100,900,700,0];
  for(let i in screens) { if(scr > screens[i]) { return i; } }
  return 1;
}
</script>
