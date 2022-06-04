<template>
  <q-page>
    <FilterInputText @text="filter = $event" class="q-ma-md" />
    <q-list separator>
      <q-item v-for="payment in showing" :key="'archive-payments-' + payment.id" clickable @click="detail(payment)">
        <q-item-section avatar><q-badge color="info" class="q-pa-sm" style="font-size: 0.65rem" :label="payment.bill.id" /></q-item-section>
        <q-item-section>
          <q-item-label class="text-bold text-cyan">{{ parseFloat(payment.amount).toFixed(2) }}</q-item-label>
          <q-item-label caption>Token: {{ payment.bill.token.id }}, Type: {{ payment.bill.token.type }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-cyan">{{ payment.type }}</q-item-label>
          <q-item-label caption>{{ payment.bill.customer.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>{{ time(payment.date) }}</q-item-label>
          <q-item-label caption>{{ human_date(payment.date) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon :name="payment.status === 'Active' ? 'done_all' : 'remove_done'" :color="payment.status === 'Active' ? 'cyan' : 'grey-6'" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog persistent v-model="details" transition-show="flip-down" transition-hide="flip-up">
      <q-card style="width: 80vw">
        <q-card-section class="row items-center q-pa-sm bg-grey-4">
          <q-icon name="account_balance" class="q-mr-sm" />
          <span>Payment Details</span><q-space />
          <q-btn icon="close" size="sm" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section v-if="payment">
          <div class="row justify-between">
            <div class="text-h5 text-teal text-bold">{{ parseFloat(payment.amount).toFixed(2) }}</div>
            <div class="text-center">
              <div class="text-bold text-teal">{{ payment.type }}</div>
              <div class="text-caption text-uppercase" style="font-size: 0.65rem">payment type</div>
            </div>
          </div>
          <ItemDetailWide class="q-mt-sm text-uppercase" label="Status">{{ payment.status }}</ItemDetailWide>
          <ItemDetailWide class="q-mt-sm text-uppercase" label="Payment Time">{{ time(payment.date) }}</ItemDetailWide>
          <ItemDetailWide class="q-mt-sm text-uppercase" label="Payment Date">{{ human_date2(payment.date) }}</ItemDetailWide>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="bill" class="q-pys">
          <q-item-label header class="text-primary q-px-none q-py-none text-uppercase text-bold">Bill Details</q-item-label>
          <ItemDetailWide class="q-mt-sm text-uppercase" label="Customer">{{ customer ? customer.name : '' }}</ItemDetailWide>
          <ItemDetailWide class="q-mt-sm text-uppercase" label="Bill Date">{{ human_date2(bill.date) }}</ItemDetailWide>
          <ItemDetailWide class="q-mt-sm text-uppercase" label="Bill Amount">{{ parseFloat(bill.amount).toFixed(2) }}</ItemDetailWide>
          <ItemDetailWide class="q-mt-sm text-uppercase" label="Bill Discount">{{ parseFloat(bill.discount).toFixed(2) }}</ItemDetailWide>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="others.length" class="q-pys">
          <q-list separator>
            <q-item-label header class="text-primary q-px-none q-py-none text-uppercase text-bold">Other Payments</q-item-label>
            <q-item v-for="payment1 in others" :key="'payment-'+payment.id+'-other-payments-' + payment1.id" class="q-px-none">
              <q-item-section avatar><q-avatar size="md" class="text-white" color="teal" rounded>{{ payment1.id }}</q-avatar></q-item-section>
              <q-item-section><q-item-label caption>{{ payment.type }}</q-item-label><q-item-label caption style="font-size: 0.55rem">{{ human_date2(payment1.date) }}</q-item-label></q-item-section>
              <q-item-section side>
                <q-item-label class="text-primary text-bold">{{ parseFloat(payment1.amount).toFixed(2) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions class="bg-grey-3" align="right" v-show="payment && payment.status === 'Active'">
          <q-btn dense color="red" size="sm" :loading="loading" label="Cancel Payment" @click="cancel" />
          <q-btn dense color="teal" size="sm" :disable="loading" label="Print" @click="print(payment)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <Pagination :records="payments" v-model="showing" color="info" />
  </q-page>
</template>

<script>
import {mapState} from "vuex";
import {extract_date, human_date, human_date2, id_keyed, matches, time} from "assets/helpers";
import ItemDetailWide from "components/ItemDetailWide";
import Pagination from "components/Pagination";
import FilterInputText from "components/FilterInputText";
import Bills from "assets/mixins/Bills";

export default {
  name: 'PageArchivePayments',
  components: {FilterInputText, Pagination, ItemDetailWide},
  mixins: [Bills],
  computed: {
    keyed_bills(){ return id_keyed(this.bills) },
    Payments(){ return _(this.$store.state.payments.data).filter(['status','Active']).map(this.payment_data).reverse().value() },
    bill(){ return _.get(this.payment,'bill') },
    customer(){ return _.get(this.payment,['bill','customer']) },
    others(){ return this.bill ? _.filter(this.payments,({ bill,id,status }) => _.toInteger(bill) === _.toInteger(this.bill.id) && _.toInteger(id) !== _.toInteger(this.payment.id) && status === 'Active') : [] },
    payments(){ return this.filter ? _.filter(this.Payments,payment => _.includes(payment.slug,this.filter.toLowerCase())) : this.Payments },
  },
  data(){ return {
    filter: '',
    details:false, payment:null, loading:false,
    showing: null,
  } },
  methods: {
    human_date,human_date2, time,
    payment_data(payment){
      let bill = _.get(this.keyed_bills,payment.bill), slug = [bill.token.id,bill.id,bill.amount,payment.amount,bill.token.type,bill.customer.name,bill.customer.phone].join(' ').toLowerCase()
      return Object.assign({},payment,{ bill,slug })
    },
    detail(payment){
      this.details = true;
      this.payment = payment
    },
    cancel(){
      this.loading = true; let vm = this;
      this.$store.dispatch('payments/cancel',this.payment,{ root:true }).then(payment => vm.loading = false)
    },
    print({ id }){ post('payment','print',{ id }) },
  }
}
</script>
