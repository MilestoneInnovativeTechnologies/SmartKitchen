<template>
  <q-card>
    <q-bar class="bg-secondary text-white q-py-lg">
      <q-list class="q-my-xl full-width">
        <q-item style="font-size: 0.75rem" class="q-px-none items-center">
          <q-item-section side class="text-white">{{ token.id }}</q-item-section>
          <q-item-section side class="text-white">{{ token.type }}</q-item-section>
          <q-item-section>{{ token.seating ? token.seating.name : date(token.date) }}</q-item-section>
          <q-item-section side v-if="token.customer" class="text-white">{{ token.customer.name }}</q-item-section>
<!--          <q-item-section side><q-btn icon="close" color="white" rounded flat dense v-close-popup class="q-mt-xs" /></q-item-section>-->
        </q-item>
      </q-list>
    </q-bar>
    <q-list separator style="font-size: 0.75rem">
      <q-item v-for="(item,idx) in items" :key="'tgb-t-'+token.id+'-ti-'+item.id+'-idx-'+idx">
        <q-item-section>
          <q-item-label caption>{{ item.quantity }}x {{ precision(item.price) }}</q-item-label>
          <q-item-label>{{ item.item.name }}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-bold">{{ precision(item.price * item.quantity) }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label caption>{{ items.length }}x Items, {{ quantities }}x Quantities</q-item-label>
          <q-item-label>Total</q-item-label>
        </q-item-section>
        <q-item-section side class="text-bold" style="font-size: 1rem">{{ precision(total) }}</q-item-section>
      </q-item>
      <q-item><q-item-section><OrderCustomer v-model="customer" get="id" outlined /></q-item-section></q-item>
      <q-item>
        <q-item-section><TaxNatureSelectDropDown label="Tax" v-model="tax" outlined /></q-item-section>
        <q-item-section><q-input v-model.number="discount" outlined label="Discount" type="number" @keyup="discount_percent" /></q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="row items-center justify-around q-px-md bg-grey-2">
      <div class="text-center col">
        <q-item-label style="font-size: 1.5rem; line-height: 1rem !important;" class="text-weight-bolder">{{ precision(total - discount) }}</q-item-label>
        <q-item-label caption class="text-capitalize">Payable</q-item-label>
      </div>
      <div class="text-center col">
        <q-btn label="Generate Bill" color="secondary" class="q-px-md" @click="generate" :disabled="!customer || items.length === 0" />
      </div>
    </q-card-section>
    <q-inner-loading :showing="loading"><q-spinner-facebook color="secondary" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>

import {human_date2, is_period, is_today, precision, time} from "assets/helpers";
import UserSelectDropDown from "components/Users/UserSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";

export default {
  name: "TokenBillGenerate",
  components: {TaxNatureSelectDropDown, OrderCustomer, UserSelectDropDown},
  props: ['token'],
  data(){ return {
    loading: false, discount: 0, tax: null,
    create_customer: null
  } },
  computed: {
    items(){ return _.filter(this.token.items,item => item.progress !== 'Cancelled') },
    total(){ return _.sumBy(this.items,({ price,quantity }) => price*quantity) },
    quantities(){ return _.sumBy(this.items,({ quantity }) => quantity) },
    customer: {
      get(){ return this.create_customer !== null ? this.create_customer : _.get(this.token,['customer','id']) },
      set(customer){
        if(customer === 0) return this.create_customer = 0;
        this.create_customer = null; this.assign(customer);
      }
    }
  },
  methods: {
    precision,
    date(date){ return is_today(date) ? time(date) : human_date2(date) },
    assign(customer){ this.loading = true; post('token','customer',{ token:this.token.id,customer }).then(() => this.loading = false) },
    discount_percent(e){
      if(is_period(e.keyCode) && (this.prv_per || _.includes(_.toString(this.discount),"."))) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.discount = this.discount * this.total * 0.01
            e.target.blur(); e.target.focus();
          })
        },250)
      }
      this.prv_per = is_period(e.keyCode);
    },
    generate(){
      this.loading = true; if(!this.customer || !this.items || _.size(this.items) === 0) return alert('Select a customer' + ((this.loading = false) || ''));
      let params = { token:this.token.id, customer:this.customer, discount:this.discount,nature:this.tax }
      post('bill','create',params).then(() => this.$store.dispatch('server/ping',null,{ root:true })).catch().finally(() => this.loading = false)
    },
  },
}
</script>
