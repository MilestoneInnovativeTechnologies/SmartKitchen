<template>
  <q-card flat square>
    <q-card-section class="q-px-none" v-if="seat && (!tab || tab === 'seating')">
      <SeatSelect @selected="seating" />
    </q-card-section>
    <q-card-section class="q-px-none" v-else>
      <template v-if="quick">
        <QuickOrder @item="item" :items="params.items" :price_list="params.price_list" @done="tab = 'proceed'" />
      </template>
      <template v-else>
        <FilterInputText @text="item_filter = $event" class="q-mb-xs" autofocus />
        <GroupItemsSelect :selected="active_group" :filter="item_filter" :price_list="params.price_list" :type="params.type" :item_quantities="item_quantities" @item="item" @quantity="setQuantity" @proceed="tab = 'proceed'" />
      </template>
    </q-card-section>
    <template v-if="!quick">
      <q-tabs v-model="tab" align="justify" dense class="fixed-bottom bg-primary">
        <q-tab v-if="seat" class="text-white" name="seating" icon="event_seat" label="Seat" />
        <q-tab class="text-white" name="items" icon="widgets" label="Items" />
        <q-tab class="text-white" name="proceed" icon="forward" label="Proceed" />
      </q-tabs>
      <GroupStickyButton v-model="active_group" :style="{ visibility:(seat && (!tab || tab === 'seating')) ? 'hidden' : 'visible' }" :type="params.type" />
    </template>
    <q-dialog persistent :value="tab === 'proceed'" @before-hide="tab = 'items'">
      <OrderNewSummary :style="popup_width()" v-bind="params" @process="process" :loading="loading" :payment="payment" />
    </q-dialog>
  </q-card>
</template>

<script>
import FilterInputText from "components/FilterInputText";
import GroupItemsSelect from "components/Group/GroupItemsSelect";
import GroupStickyButton from "components/Group/GroupStickyButton";
import SeatSelect from "components/Seating/SeatSelect";
import OrderNewSummary from "components/Order/OrderNewSummary";
import {popup_width} from "assets/helpers";
import QuickOrder from "components/Order/QuickOrder";
import QuickMode from "assets/mixins/QuickMode";
export default {
  name: "OrderNewGlobal",
  components: {QuickOrder, OrderNewSummary, SeatSelect, GroupStickyButton, GroupItemsSelect, FilterInputText},
  mixins: [QuickMode],
  data(){ return {
    tab: '',
    active_group: 0, item_filter: '',
    params: {
      type: null, seating: null, price_list: null,
      customer: null, items: [], user: null, narration: null,
    },
    loading: false,
  } },
  props: ['seat','after','payment'],
  computed: {
    attrs(){ return _.pick(this.$attrs,_.keys(this.params)) },
    item_quantities(){ return _(this.params.items).mapKeys('item').mapValues(item => _.toNumber(item.quantity)).value() },
  },
  methods: {
    popup_width,
    item({ id },quantity){
      let items_item_index = _.findIndex(this.params.items,{ item:id,narration:null });
      if(items_item_index < 0) items_item_index = this.params.items.push({ item:id,quantity:quantity || 1,delay:0,narration:null }) - 1
      else this.params.items[items_item_index].quantity++
      let token_item = this.params.items[items_item_index]
      if(!this.quick) this.$q.notify({ type:'positive',message:`Item Updated`,html:true, caption:`${this.params.items.length} x Items <br />${_.sumBy(this.params.items,'quantity')} x Quantities <br />${token_item.quantity}x ${this.itemName(token_item.item)}`,group:'items',position:"top-right" })
      return items_item_index;
    },
    setQuantity({ item,quantity }){
      item = _.toSafeInteger(item); quantity = _.toNumber(quantity);
      let idx = _.findIndex(this.params.items,['item',item]);
      if(idx < 0) this.item({ id:item },quantity)
      else this.quantity(idx,quantity);
      if(quantity < 1) setTimeout((vm,idx) => vm.remove(idx),2000,this,idx)
    },
    seating({ id,price_list }) {
      this.params.seating = id;
      this.params.price_list = price_list;
      this.tab = 'items';
    },
    init(attrs){ let vm = this; _.forEach(attrs,function(val,key){ vm.params[key] = val }) },
    process(ary){ this[_.head(ary)]['apply'](this,_.tail(ary)) },
    quantity(idx,quantity) { this.params.items[idx]['quantity'] = _.toNumber(quantity) },
    remove(idx) { this.params.items.splice(idx,1) },
    customer(id) { this.params.customer = id },
    narration(text) { this.params.narration = text },
    item_narration(idx,text) { this.params.items[idx]['narration'] = text },
    submit(payments) {
      if(_.isEmpty(this.params.items)) return; this.loading = true;
      let params = this.payment ? Object.assign({},this.params,payments) : this.params;
      post('token','create',params).then(() => {
        this.params.items.splice(0,this.params.items.length);
        this.item_filter = ""; this.active_group = 0; this.init(this.attrs);
        this.loading = false; this.tab = "items"
        if(this.after) return this.$router.push(_.isObject(this.after) ? this.after : { name:this.after })
        if(this.seat) setTimeout(vm => vm.tab = 'seating',600,this)
      })
    },
    itemName(i_id){ return _.get(this.$store.state.items.data,[i_id,'name']) },
  },
  watch: {
    'attrs': { immediate:true, deep:true, handler:'init' },
    'params.type': { immediate:true,handler(type){ if(type && !this.params.customer) this.params.customer = _.get(settings('default_customer',type),'id') } }
  }
}
</script>
