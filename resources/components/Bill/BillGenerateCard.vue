<template>
  <q-card>
    <q-bar class="bg-accent text-white"><q-icon name="receipt_long" class="q-mr-md" />Generate Bill<q-space /><q-btn icon="close" rounded flat dense v-close-popup /></q-bar>
    <q-card-section class="row q-col-gutter-sm">
      <q-input readonly outlined dense class="col-4" :value="Token.id" label="Token ID" />
      <q-input readonly outlined dense class="col-8" :value="Token.date_human" label="Date" />
    </q-card-section>
    <q-list dense separator>
      <q-item v-for="item in Items" :key="'db-gk-t-'+token+'-ti-'+item.id+'-i-'+item.id">
        <q-item-section avatar><q-avatar rounded><q-img :src="image(item.item.image)" /></q-avatar></q-item-section>
        <q-item-section>
          <q-item-label>{{ item.quantity }}x {{ item.item.name }}</q-item-label>
          <q-item-label caption>Rate: {{ item.price }}</q-item-label>
        </q-item-section>
        <q-item-section side>{{ precision(item.price * item.quantity) }}</q-item-section>
      </q-item>
      <q-item class="text-bold text-subtitle1">
        <q-item-section avatar><q-avatar rounded icon="functions" /></q-item-section>
        <q-item-section><q-item-label>Total</q-item-label></q-item-section>
        <q-item-section side>{{ precision(total) }}</q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="row q-col-gutter-xs">
      <div class="col-12"><OrderCustomer v-model="customer" get="id" outlined dense /></div>
      <div class="col-7"><q-select label="Tax" dense :options="tax_natures" v-model="tax" outlined /></div>
      <div class="col-5"><q-input outlined dense class="col-5" v-model.number="discount" type="number" label="Discount" /></div>
    </q-card-section>
    <q-card-section class="row items-center justify-around q-px-md">
      <div class="text-center col-6">
        <q-item-label style="font-size: 1.5rem; line-height: 1rem !important;" class="text-weight-bolder">{{ precision(total - discount) }}</q-item-label>
        <q-item-label caption class="text-capitalize">Payable</q-item-label>
      </div>
      <div class="text-center col-6">
        <UserSelectDropDown v-if="$route.meta.me.role !== 'Delivery Boy'" outlined dense get="id" role="Delivery Boy" clearable v-model="user" label="Delivery Boy" class="q-mb-xs" />
        <q-btn label="Generate Bill" color="accent" padding="xs md" dense :loading="loading" @click="generate" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {image,precision} from "assets/helpers";
import Bills from "assets/mixins/Bills";
import OrderCustomer from "components/Order/OrderCustomer";
import UserSelectDropDown from "components/Users/UserSelectDropDown";

export default {
  name: "BillGenerateCard",
  components: {UserSelectDropDown, OrderCustomer},
  props: ['token'],
  mixins: [Tokens,Bills],
  data(){ return {
    tax: null, discount: 0, customer: null,
    loading: false, user: null,
  } },
  computed: {
    Token(){ return _.find(this.tokens,['id',parseInt(this.token)]) },
    Items(){ return _.filter(this.Token.items,tk_itm => tk_itm.progress !== 'Cancelled') },
    Bill(){ return _.find(this.bills,bill => parseInt(_.get(bill,['token','id'])) === parseInt(this.token)) },
    total(){ return _.sumBy(this.Items,({ price,quantity }) => _.toNumber(price) * _.toNumber(quantity)) },
    tax_natures(){ return this.$store.getters["tax/natures"] },
  },
  methods: {
    image, precision,
    generate(){
      this.loading = true; if(!this.token || !this.customer) return this.loading = false;
      let params = { token:this.token, customer:this.customer, discount:this.discount,nature:this.tax, user:this.user || this.$route.meta.me.id }
      post('bill','create',params).then(() => this.$store.dispatch('server/ping',null,{ root:true })).catch().finally(this.generated)
    },
    generated(){
      this.loading = false;
      this.$emit('generated')
    }
  },
  watch: {
    'Token.customer':{ immediate:true, handler(customer){ this.customer = _.get(customer,'id') } }
  }
}
</script>
