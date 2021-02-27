<template>
  <q-card>
    <q-card-section class="bg-grey-2 text-weight-bold">Items Price</q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-xs">
        <div class="col-12"><FilterInputText @text="filter = $event" /></div>
        <div class="col-sm-3 col-md-2 col-lg-1" :class="colXSCls" v-for="({ item,price,name },idx) in items" :key="'plps-' + item" v-show="!filter || name.toLowerCase().includes(filter.toLowerCase())">
          <q-input :label="name" type="number" dense outlined :value="price" @input="update(item,$event)" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import FilterInputText from "components/FilterInputText";

export default {
  name: "AdministratorMasterPriceListPriceSet",
  components: {FilterInputText},
  props: ['list'],
  data(){ return {
    filter: '', updates: {},
  } },
  computed: {
    ...mapState('items', { products: 'data' }),
    colXSCls(){ return this.$q.screen.width > 430 ? ['col-xs-4'] : ['col-xs-6'] },
    lPrice(){ return this.list ? _(this.$store.state.prices.data).filter(['price_list',this.list]).mapKeys('item').mapValues(({ price }) => _.toNumber(price)).value() : {} },
    items(){ return _(this.products).map(({ id,name }) => Object.assign({},{ item:id,price:this.getPrice(id),name })).value() },
    uPrice(){
      if(_.size(this.updates) === 0) return this.items;
      return _.map(this.items,(item) => _.has(this.updates,item.item) ? _.set(_.clone(item),'price',this.updates[item.item]) : item)
    },
  },
  methods: {
    getPrice(item){ return _.has(this.updates,item) ? this.updates[item] : _.toNumber(_.get(this.lPrice,item,0)) },
    update(item,price){ this.$set(this.updates,item,_.toNumber(price)); this.$emit('input',this.updates) }
  },
  watch: {
    list(){ this.updates = {} }
  }
}
</script>
