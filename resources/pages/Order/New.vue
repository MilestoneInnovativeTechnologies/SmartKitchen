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
                  <GroupItemsPanel :selected="group ? group.id : null" @item="item" style="height: 85vh" />
                </template>
              </q-splitter>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </template>
      <template v-slot:after>
        <OrderSeatingInfo class="q-mt-sm q-px-md" :seating="params.seating" />
        <OrderCustomer class="q-mt-sm q-px-md" @customer="customer" :key="refresh" />
        <OrderItemsSummary :items="params.items" :price_list="params.price_list" @quantity="quantity" @update="update" @delete="remove" class="q-ma-sm" />
        <div class="q-mt-sm q-px-md"><q-btn color="primary" class="full-width" label="Submit" @click="create" :disable="!params.items.length" :loading="loading" /></div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import SeatSelect from "components/Seating/SeatSelect";
import MenuGroupTabs from "components/Menu/MenuGroupTabs";
import GroupItemsPanel from "components/Group/GroupItemsPanel";
import OrderCustomer from "components/Order/OrderCustomer";
import OrderItemsSummary from "components/Order/OrderItemsSummary";
import OrderSeatingInfo from "components/Order/OrderSeatingInfo";

export default {
  name: "PageOrderNew",
  components: {OrderSeatingInfo, OrderItemsSummary, OrderCustomer, GroupItemsPanel, MenuGroupTabs, SeatSelect},
  data() {
    return {
      tab: 'seating', split: 60, iSplit: 20,
      pos: null, group: null, loading: false,
      refresh: 0,
      params: {
        seating: null,
        price_list: null,
        customer: null,
        items: []
      },
    }
  },
  computed: {
    horizontal() {
      let {height, width} = this.$q.screen;
      return this.pos === null ? (width <= height) : this.pos
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
    customer(customer){ this.params.customer = customer ? customer.id : null },
    create(){
      this.loading = true;
      post('token','create',this.params).then(r => {
        this.loading = false;
        this.params.seating = null;
        this.params.items.splice(0,this.params.items.length)
        this.tab = "seating"; this.refresh++;
      })
    }
  }
}
</script>
