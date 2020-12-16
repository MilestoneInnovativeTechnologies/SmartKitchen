<template>
  <q-card>
    <q-card-section class="bg-light-blue q-pa-xs"></q-card-section>
    <q-card-section class="q-pb-none">
      <div class="text-bold">ID: {{ token.id }}</div>
      <div class="text">Seat: {{ seating.name }}</div>
      <div class="text-caption" v-if="customer">Customer: {{ customer.name }}</div>
      <div class="text-caption">Date: {{ token.date }}</div>
      <OrderCustomer v-if="!customer" @customer="assignCustomer" class="q-mt-sm" />
    </q-card-section>
    <q-card-actions align="center" vertical class="q-gutter-y-xs">
      <q-select label="Tax" dense :options="tax_natures" v-model="tax" outlined class="full-width" />
      <q-input type="number" dense label="discount" v-model="discount" outlined />
      <q-btn label="Generate Bill" dense color="primary" :loading="loading" @click="generate" />
    </q-card-actions>
    <q-list bordered separator>
      <q-item v-for="item in items_amount" :key="hKey(item)">
        <q-item-section>
          <q-item-label>{{ item.quantity }} x {{ itemName(item) }}</q-item-label>
          <q-item-label caption>{{ item.quantity }} x {{ precision(item.price) }}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-black">
          {{ precision(item.amount) }}
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="right">
      <div class="text-h6">{{ precision(total) }}</div>
    </q-card-actions>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {h_key, precision} from "assets/helpers";
import OrderCustomer from "app/milestone/smartkitchen/resources/components/Order/OrderCustomer";

export default {
  name: "TokenDetailCard",
  components: {OrderCustomer, CardImageTitle},
  props: ['id'],
  data() { return {
    loading: false,
    src: 'https://cdn.quasar.dev/img/parallax2.jpg',
    tax: null, discount: 0
  } },
  computed: {
    token() { return _.get(this.$store.state.tokens.data, _.toInteger(this.id)) },
    seating() { return _.get(this.$store.state.seating.data, _.toInteger(this.token.seating)) },
    customer() { return _.get(this.$store.state.customers.data, _.toInteger(this.token.customer)) },
    items(){ return _.filter(_.get(this.$store.state.tokens.items,_.toInteger(this.token.id)),({ progress }) => progress !== 'Cancelled') },
    items_id(){ return _.map(this.items,'item') },
    prices() { return _(this.$store.state.prices.data).filter(({ price_list,item }) => (this.token.price_list === price_list && this.items_id.includes(item))).mapKeys('item').mapValues(({ price }) => _.toNumber(price)).value() },
    items_amount(){ return _.map(this.items, ({ item,quantity,id }) => _.zipObject(['id','item','price','quantity','amount'],[id,item,this.prices[item],quantity,this.prices[item]*quantity])) },
    total(){ return _.sumBy(this.items_amount,'amount') },
    tax_natures(){ return this.$store.getters["tax/natures"] }
  },
  methods: {
    precision(n){ return precision(n)  },
    hKey({ id }){ return h_key('receptionist','token',this.id,'item',id) },
    itemName({ item }){ return _.get(this.$store.state.items.data,[_.toInteger(item),'name']) },
    assignCustomer({ id }){ post('token','customer',{ token:this.id,customer:id }) },
    generate(){
      this.loading = true; if(!this.id || !this.customer) return this.loading = false;
      let params = { token:this.id, customer:this.customer.id, discount:this.discount,nature:this.tax }
      post('bill','create',params).then().catch().then(() => this.loading = false)
    }
  }
}
</script>
