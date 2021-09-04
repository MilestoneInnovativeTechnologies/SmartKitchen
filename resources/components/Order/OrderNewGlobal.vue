<template>
  <q-card flat square>
    <q-card-section class="q-px-none" v-if="seat && (!tab || tab === 'seating')">
      <SeatSelect @selected="seating" />
    </q-card-section>
    <q-card-section class="q-px-none" v-else>
      <FilterInputText @text="item_filter = $event" class="q-mb-xs" />
      <GroupItemsSelect :selected="active_group" :filter="item_filter" :price_list="params.price_list" @item="item" />
    </q-card-section>
    <q-tabs v-model="tab" align="justify" dense class="fixed-bottom bg-primary">
      <q-tab v-if="seat" class="text-white" name="seating" icon="event_seat" label="Seat" />
      <q-tab class="text-white" name="items" icon="widgets" label="Items" />
      <q-tab class="text-white" name="proceed" icon="forward" label="Proceed" />
    </q-tabs>
    <GroupStickyButton v-model="active_group" :style="{ visibility:(seat && (!tab || tab === 'seating')) ? 'hidden' : 'visible' }" />
    <q-dialog persistent :value="tab === 'proceed'" @before-hide="tab = 'items'">
      <OrderNewSummary :style="popup_width()" v-bind="params" @process="process" :loading="loading" />
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
export default {
  name: "OrderNewGlobal",
  components: {OrderNewSummary, SeatSelect, GroupStickyButton, GroupItemsSelect, FilterInputText},
  data(){ return {
    tab: '',
    active_group: 0, item_filter: '',
    params: {
      type: null, seating: null, price_list: null,
      customer: null, items: [], user: null, narration: null,
    },
    loading: false,
  } },
  props: ['seat'],
  computed: {
    attrs(){ return _.pick(this.$attrs,_.keys(this.params)) },
  },
  methods: {
    popup_width,
    item({ id }){
      let items_item = _.find(this.params.items,['item',id]);
      if(!items_item) this.params.items.push({ item:id,quantity:1,delay:0,narration:null })
      else items_item.quantity++
      this.$q.notify({ type:'positive',message:`Item Updated`,caption:`Total ${this.params.items.length} Items`,group:'items',position:"top-right" })
    },
    seating({ id,price_list }) {
      this.params.seating = id;
      this.params.price_list = price_list;
      this.tab = 'items';
    },
    init(attrs){ let vm = this; _.forEach(attrs,function(val,key){ vm.params[key] = val }) },
    process(ary){ this[_.head(ary)]['apply'](this,_.tail(ary)) },
    quantity(idx,quantity) { this.params.items[idx]['quantity'] = quantity },
    remove(idx) { this.params.items.splice(idx,1) },
    customer(id) { this.params.customer = id },
    submit() {
      if(_.isEmpty(this.params.items)) return; this.loading = true;
      post('token','create',this.params).then(() => {
        this.params.items.splice(0,this.params.items.length);
        this.item_filter = ""; this.active_group = 0; this.init(this.attrs);
        this.tab = "items"; this.loading = false;
        if(this.seat) setTimeout(vm => vm.tab = 'seating',600,this)
      })
    },
  },
  watch: {
    'attrs': { immediate:true, deep:true, handler:'init' },
  }
}
</script>
