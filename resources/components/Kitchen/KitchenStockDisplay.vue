<template>
  <q-card>
    <q-card-section class="bg-grey-2"><div class="text-h6">Stock: {{ name }}</div></q-card-section>
    <q-list separator>
      <q-item class="text-bold">
        <q-item-section avatar><q-item-label>#</q-item-label></q-item-section>
        <q-item-section><q-item-label>Item</q-item-label></q-item-section>
        <q-item-section><q-item-label>Stock</q-item-label></q-item-section>
      </q-item>
      <q-item><q-item-section><FilterInputText label="Filter" @text="filter = $event" /></q-item-section></q-item>
      <q-item class="bg-grey-1" dense><div class="text-bold">Zero Stock Items</div></q-item>
      <q-item v-if="zero.length === 0" dense><div class="text-italic">No Items</div></q-item>
      <KitchenStockDisplayItemRow v-else v-for="(detail,idx) in zero" :key="hKey('zero',detail)" :no="idx+1" :id="detail.id" :stock="detail.stock" :name="detail.item.name" />
      <q-item class="bg-grey-1" dense><div class="text-bold">Negative Stock Items</div></q-item>
      <q-item v-if="negative.length === 0" dense><div class="text-italic">No Items</div></q-item>
      <KitchenStockDisplayItemRow v-else v-for="(detail,idx) in negative" :key="hKey('negative',detail)" :no="idx+1" :id="detail.id" :stock="detail.stock" :name="detail.item.name" />
      <q-item class="bg-grey-1" dense><div class="text-bold">Least Stock Items</div></q-item>
      <q-item v-if="least.length === 0" dense><div class="text-italic">No Items</div></q-item>
      <KitchenStockDisplayItemRow v-else v-for="(detail,idx) in least" :key="hKey('least',detail)" :no="idx+1" :id="detail.id" :stock="detail.stock" :name="detail.item.name" />
      <q-item class="bg-grey-1" dense><div class="text-bold">Other Items</div></q-item>
      <q-item v-if="other.length === 0" dense><div class="text-italic">No Items</div></q-item>
      <KitchenStockDisplayItemRow v-else v-for="(detail,idx) in other" :key="hKey('other',detail)" :no="idx+1" :id="detail.id" :stock="detail.stock" :name="detail.item.name" />
    </q-list>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import {h_key, matches} from "assets/helpers";
import KitchenStockDisplayItemRow from "components/Kitchen/KitchenStockDisplayItemRow";
import FilterInputText from "components/FilterInputText";
export default {
  name: "KitchenStockDisplay",
  props: ['kitchen'],
  data(){ return {
    filter: '', limit: 6,
  } },
  components: {FilterInputText, KitchenStockDisplayItemRow},
  computed: {
    kid(){ return _.toInteger(this.kitchen) },
    ...mapState({
      name: function({ kitchens:{ data } }){ return _.get(data,[this.kid,'name']) },
      stock: function({ kitchens:{ items },items:{ data } }){ return this.filtered(_.map(_.get(items,[this.kid]),item => Object.assign({},item,{ item:data[item.item] }))) },
    }),
    negative(){ return _(this.stock).filter(detail => sType(detail,this.limit) === 1).sortBy('stock').value() },
    zero(){ return _(this.stock).filter(detail => sType(detail,this.limit) === 2).sortBy('stock').value() },
    least(){ return _(this.stock).filter(detail => sType(detail,this.limit) === 3).sortBy('stock').value() },
    other(){ return _(this.stock).filter(detail => sType(detail,this.limit) === 4).sortBy('stock').value() },
  },
  methods: {
    hKey(type,{ id,item }){ return h_key('ksd',id,'type',type,'kitchen',this.kid,'item',item.id) },
    filtered(array){ return this.filter ? _.filter(array,item => matches(item.item,['id','name','detail'],this.filter)) : array }
  }
}
function sType({ stock },limit){ let stk = _.toNumber(stock); return (stk < 0) ? 1 : ((stk === 0) ? 2 : ((stk < limit) ? 3 : 4)) }
</script>
