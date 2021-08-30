<template>
  <q-page padding>
    <q-splitter v-model="split" :horizontal="horizontal" style="height: 85vh">
      <template v-slot:before>
        <q-card>
          <q-tabs v-model="tab" class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
            <q-tab name="seating" label="Seating"/>
            <q-tab name="items" label="Items"/>
          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="seating">
              <SeatSelect @selected="seat"/>
            </q-tab-panel>
            <q-tab-panel name="items" class="q-pa-none">
              <q-splitter v-model="iSplit">
                <template v-slot:before>
                  <MenuGroupTabs @selected="group = $event" style="height: 85vh"/>
                </template>

                <template v-slot:after>
                  <div class="q-px-md q-pt-xs"><FilterInputText @text="item_filter = $event" /></div>
                  <GroupItemsPanel :selected="group ? group.id : null" :filter="item_filter" v-bind="params" @item="item" style="height: 85vh" />
                </template>
              </q-splitter>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </template>
      <template v-slot:after>
        <OrderSeatingInfo class="q-mt-sm q-px-md" :seating="params.seating" />
        <OrderCustomer class="q-mt-sm q-px-md" v-model="params.customer" get="id" />
        <OrderItemsSummary :items="params.items" :price_list="params.price_list" @quantity="quantity" @update="update" @delete="remove" class="q-ma-sm" />
        <div class="q-mt-sm q-px-md"><q-btn color="primary" class="full-width" label="Submit" @click="create" :disable="!params.items.length" :loading="loading" /></div>
      </template>
    </q-splitter>
    <q-page-sticky position="bottom-right" :offset="[24, 24]" v-if="order_info">
      <q-btn v-if="horizontal" fab glossy color="accent" :icon="'vertical_align_' + (hide ? 'top' : 'bottom')" @click="hide = !hide" />
      <q-btn v-else fab glossy color="accent" icon="keyboard_tab" @click="hide = !hide" :style="{ transform: hide ? 'rotateY(180deg)' : null }" />
    </q-page-sticky>
    <q-dialog v-model="m_show" persistent><MenuSelect style="width: 75vw; max-width: 330px" @selected="r_menu = false" /></q-dialog>
  </q-page>
</template>

<script>
import SeatSelect from "components/Seating/SeatSelect";
import MenuGroupTabs from "components/Menu/MenuGroupTabs";
import GroupItemsPanel from "components/Group/GroupItemsPanel";
import OrderCustomer from "components/Order/OrderCustomer";
import OrderItemsSummary from "components/Order/OrderItemsSummary";
import OrderSeatingInfo from "components/Order/OrderSeatingInfo";
import FilterInputText from "components/FilterInputText";
import MenuSelect from "components/Menu/MenuSelect";

export default {
  name: "PageOrderNew",
  components: {
    MenuSelect,
    FilterInputText,
    OrderSeatingInfo, OrderItemsSummary, OrderCustomer, GroupItemsPanel, MenuGroupTabs, SeatSelect},
  data() {
    return {
      tab: 'seating', m_split: 60, iSplit: 20,
      pos: null, group: null, loading: false,
      item_filter: '', hide: false,
      r_menu: false,
      params: {
        seating: null,
        price_list: null,
        customer: null,
        items: []
      },
    }
  },
  computed: {
    order_info(){ return this.params.seating && this.params.items.length },
    split: {
      get(){ return (this.order_info && !this.hide) ? this.m_split : 100 },
      set(n){ this.m_split = (this.order_info && !this.hide && n !== 100) ? n : this.m_split },
    },
    horizontal() {
      let {height, width} = this.$q.screen;
      return this.pos === null ? (width <= height) : this.pos
    },
    m_show: {
      get(){ return !this.$store.state.menus.s_items.length || this.r_menu },
      set(s){ this.r_menu = !!s }
    }
  },
  methods: {
    seat({id, price_list }) {
      this.params.seating = id;
      this.params.price_list = price_list;
      this.tab = 'items';
    },
    item({ id }){
      let items_item = _.find(this.params.items,['item',id]);
      if(!items_item) this.params.items.push({ item:id,quantity:1,delay:0,narration:null })
      else items_item.quantity++
    },
    quantity({ item,quantity }){
      item = _.toSafeInteger(item); quantity = _.toNumber(quantity);
      let items_item = _.find(this.params.items,['item',item]);
      if(!items_item) this.params.items.push({ item,quantity })
      else items_item.quantity = quantity;
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
      this.loading = true;
      post('token','create',this.params).then(r => {
        this.loading = false; this.group = null;
        this.params.seating = null; this.params.customer = null;
        this.params.items.splice(0,this.params.items.length)
        this.tab = "seating"; this.item_filter = "";
      })
    }
  },
  created() {
    this.r_menu = this.m_show;
  }
}
</script>
