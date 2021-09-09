<template>
  <q-card>
    <q-card-section class="bg-info q-pa-xs"></q-card-section>
    <q-card-section class="q-py-sm bg-grey-2 row justify-between text-bold"><div>ID: {{ token.id }}</div><div>{{ time }}</div></q-card-section>
    <q-card-section>
      <div class="row justify-between">
        <div class="text-caption text-bold">Type</div>
        <div class="text-bold">{{ token.type }}</div>
      </div>
      <div class="row justify-between" v-if="seating">
        <div class="text-caption text-bold">Seating</div>
        <div class="text-bold">{{ seating.name }}</div>
      </div>
      <div class="row justify-between" v-if="user">
        <div class="text-caption text-bold">User</div>
        <div class="text-bold">{{ user.name }}</div>
      </div>
      <q-separator class="q-my-md" v-if="seating || user" />
      <div class="row justify-between items-center">
        <div class="text-caption text-bold">Customer</div>
        <OrderCustomer v-if="!customer" v-model="sCustomer" get="id" class="q-mt-sm" />
        <div v-else class="text-bold">{{ customer.name }} &nbsp; &nbsp; <q-icon name="clear" size="xs" color="negative" class="cursor-pointer" @click="assignCustomer({ id:null })" /></div>
      </div>
      <div class="row justify-between items-center">
        <div class="text-caption text-bold">Tax</div>
        <TaxNatureSelectDropDown v-if="!tax" label="Tax" dense v-model="tax" outlined style="min-width: 10rem" class="q-mt-xs" />
        <div v-else class="text-bold">{{ tax }} &nbsp; &nbsp; <q-icon name="clear" size="xs" color="negative" @click="tax = ''" class="cursor-pointer" /></div>
      </div>
    </q-card-section>
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
      <q-item>
        <q-item-section><q-item-label>&nbsp;</q-item-label></q-item-section>
        <q-item-section side class="text-black text-bold" style="font-size: 1.25rem">{{ precision(total) }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section><q-item-label>&nbsp;</q-item-label></q-item-section>
        <q-item-section side class="text-black text-bold" style="font-size: 1.25rem"><q-input type="number" dense label="Discount" v-model.number="discount" outlined /></q-item-section>
      </q-item>
      <q-item class="text-center bg-grey-2">
        <q-item-section>
          <q-item-label style="font-size: 1.5rem" class="text-weight-bolder">{{ precision(total - discount) }}</q-item-label>
          <q-item-label caption class="text-capitalize">Payable</q-item-label>
        </q-item-section>
        <q-item-section side><q-btn label="Generate Bill"  color="light-blue" padding="xs sm" dense @click="generate" /></q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="loading"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {h_key, precision, time} from "assets/helpers";
import { mapState } from "vuex";
import OrderCustomer from "components/Order/OrderCustomer";
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";

export default {
  name: "TokenDetailCard",
  components: {TaxNatureSelectDropDown, OrderCustomer, CardImageTitle},
  props: ['id'],
  data() { return {
    loading: false,
    tax: null, discount: 0
  } },
  computed: {
    tid(){ return _.toInteger(this.id) },
    ...mapState({
      token:function({ tokens:{ data }}){ return data[this.tid] },
      seating:function({ seating:{ data }}){ return data[this.token.seating] },
      customer:function({ customers:{ data }}){ return data[this.token.customer] },
      items:function({ tokens:{ items }}){ return _.filter(items[this.tid],({ progress }) => progress !== 'Cancelled') },
      prices:function({ prices:{ data }}){ return _(data).filter(({ price_list,item }) => (this.token.price_list === price_list && this.items_id.includes(item))).mapKeys('item').mapValues(({ price }) => _.toNumber(price)).value() },
      user:function({ users:{ data }}){ return data[this.token.user] },
    }),
    time(){ return time(this.token.date) },
    items_id(){ return _.map(this.items,'item') },
    items_amount(){ return _.map(this.items, ({ item,quantity,id }) => _.zipObject(['id','item','price','quantity','amount'],[id,item,this.prices[item],quantity,this.prices[item]*quantity])) },
    total(){ return _.sumBy(this.items_amount,'amount') },
    sCustomer: {
      get(){ return _.get(this.customer,'id',null) },
      set(customer){ post('token','customer',{ token:this.id,customer }) }
    }
  },
  methods: {
    precision(n){ return precision(n)  },
    hKey({ id }){ return h_key('receptionist','token',this.id,'item',id) },
    itemName({ item }){ return _.get(this.$store.state.items.data,[_.toInteger(item),'name']) },
    assignCustomer({ id }){ post('token','customer',{ token:this.id,customer:id }) },
    generate(){
      this.loading = true; if(!this.id || !this.customer) return this.loading = false;
      let params = { token:this.id, customer:this.customer.id, discount:this.discount,nature:this.tax }
      post('bill','create',params).then(() => this.$store.dispatch('server/ping',null,{ root:true })).catch().finally(() => this.loading = false)
    }
  }
}
</script>
