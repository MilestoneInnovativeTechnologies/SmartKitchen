<template>
  <q-page padding class="q-gutter-y-sm">
    <MenuGroupScroll v-model="group" />
    <FilterInputText @text="filter = $event" />
    <Masonry :items="filterKeys" >
      <template #item="item">
        <ItemSelectCard @selected="addItem" :id="item.item" :price_list="params.price_list" :quantity="i_qty(item)" @quantity="quantity" />
      </template>
    </Masonry>
    <div :class="horizontal ? 'fixed-bottom' : 'fixed-right'" class="bg-white q-py-sm shadow-2 q-gutter-y-sm q-px-md" style="overflow: scroll" :style="horizontal ? { 'max-height':'60vh' } : { 'width':'400px',top:'2.5rem' }" v-if="!hide">
      <OrderSeatingInfo :seating="params.seating" />
      <OrderCustomer v-model="params.customer" get="id" outlined dense />
      <OrderItemsSummary :items="params.items" :price_list="params.price_list" @quantity="quantity" @update="update" @delete="remove" />
      <div><q-btn color="primary" class="full-width" label="Submit" @click="create" :disable="!params.items.length" :loading="loading" /></div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn v-if="horizontal" fab glossy color="accent" :icon="'vertical_align_' + (hide ? 'top' : 'bottom')" @click="hide = !hide" />
      <q-btn v-else fab glossy color="accent" icon="keyboard_tab" @click="hide = !hide" :style="{ transform: hide ? 'rotateY(180deg)' : null }" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {OrderTypeRequiredFieldsDB} from "assets/assets";
import MenuGroupScroll from "components/Menu/MenuGroupScroll";
import FilterInputText from "components/FilterInputText";
import ItemSelectCard from "components/Item/ItemSelectCard";
import {h_key, matches} from "assets/helpers";
import OrderSeatingInfo from "components/Order/OrderSeatingInfo";
import OrderCustomer from "components/Order/OrderCustomer";
import OrderItemsSummary from "components/Order/OrderItemsSummary";
import Masonry from "components/Masonry";

export default {
  name: "PageOrderCommonNew",
  components: {
    Masonry,
    OrderItemsSummary, OrderCustomer, OrderSeatingInfo, ItemSelectCard, FilterInputText, MenuGroupScroll},
  props: ['type','customer','seating','price_list','user'],
  data(){ return {
    params: { type:'Dining',customer:null,seating:null,price_list:null,user:null,items:[] },
    group: null, filter: null, loading: false, hide:true, pos:null,
  } },
  computed: {
    items(){ return this.group ? this.group.items : [] },
    filterKeys(){ return this.filter ? _(this.$store.state.items.data).filter(({ id }) => this.items.includes(id)).filter(obj => matches(obj,['id','name','detail'],this.filter)).map('id').value() : this.items },
    horizontal() {
      let {height, width} = this.$q.screen;
      return (width < 819 && height >= width)
    }
  },
  methods: {
    addItem({id}) {
      let items_item_index = _.findIndex(this.params.items, ['item', id]);
      if (items_item_index < 0) this.params.items.push({item: id, quantity: 1, delay: 0, narration: null})
      else this.params.items[items_item_index].quantity++
      this.$q.notify(`${this.params.items.length} x Items <br>${_.sumBy(this.params.items,'quantity')} x Quantities`)
    },
    quantity({ item,quantity }){
      item = _.toSafeInteger(item); quantity = _.toNumber(quantity);
      let items_item_index = _.findIndex(this.params.items,['item',item]);
      if(items_item_index < 0) this.params.items.push({ item, quantity, delay: 0, narration: null })
      else this.params.items[items_item_index].quantity = quantity;
      if(quantity < 1) setTimeout((vm,item) => vm.remove(item),2000,this,{ item })
    },
    remove({ item }){
      let idx = _.findIndex(this.params.items,['item',_.toSafeInteger(item)]);
      if(idx > -1) this.params.items.splice(idx,1);
    },
    update(obj){
      let items_item = _.find(this.params.items,['item',obj.item]);
      if(!items_item) return null;
      _.forEach(_.omit(obj,'item'),(v,k) => items_item[k] = v)
    },
    create(){
      let vm = this; vm.loading = true;
      post('token','create',vm.params).then(r => {
        vm.loading = false;
        vm.$router.push({ name:'orders' })
      })
    },
    hKey(item_id){ return h_key('common','order','group',this.group.id,'item',item_id) }
  },
  created() {
    let vm = this, params = OrderTypeRequiredFieldsDB[vm.type || 'Dining'];
    _.forEach(params,param => vm.params[param] = vm[param]);
    this.$q.notify.setDefaults({ position: 'top-right', timeout: 1000, color: 'positive', group: false, html: true, caption: 'Items Updated !!' })
  }
}
</script>
