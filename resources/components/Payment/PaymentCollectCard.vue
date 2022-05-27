<template>
  <q-card v-if="bill">
    <q-bar class="bg-positive text-white"><q-icon name="payments" class="q-mr-md" /><span style="font-size: 0.75rem" class="text-bold">Add Payment</span><q-space /><q-btn icon="close" rounded flat dense v-close-popup /></q-bar>
    <q-card-section class="bg-grey-1">
      <q-list dense>
        <q-item>
          <q-item-section side>
            <q-item-label caption>Bill: {{ bill.id }}</q-item-label>
            <q-item-label>{{ bill.customer.name }}</q-item-label>
          </q-item-section>
          <q-item-section> &nbsp; </q-item-section>
          <q-item-section side>
            <q-item-label caption>Token: {{ bill.token.id }}</q-item-label>
            <q-item-label>{{ bill.token.date_human }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-list separator dense>
      <q-item v-for="(content,idx) in bill.contents" :key="'bcp-' + bill.id + 'ci-' + idx">
        <q-item-section side>{{ idx+1 }}</q-item-section>
        <q-item-section>{{ content.quantity }}x {{ precision(content.price) }}</q-item-section>
        <q-item-section>{{ content.name }}</q-item-section>
        <q-item-section side class="text-bold">{{ precision(total(content)) }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="text-bold q-my-md">
          <q-item-label>Sub Total</q-item-label>
          <q-item-label v-if="discount">Discount</q-item-label>
          <q-item-label v-if="paid">Paid</q-item-label>
        </q-item-section>
        <q-item-section side class="text-bold q-my-md">
          <q-item-label class="text-positive">{{ precision(bill.amount) }}</q-item-label>
          <q-item-label v-if="discount">{{ precision(bill.discount) }}</q-item-label>
          <q-item-label v-if="paid">{{ precision(bill.paid) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section class="text-center">
        <div class="text-bold text-h5 text-positive">{{ precision(bill.balance) }}</div>
        <div style="font-size: 0.8rem; line-height: 0.55rem" class="text-grey-6">Net Payable</div>
      </q-card-section>
      <q-card-actions class="row items-center q-col-gutter-x-xs bg-grey-1">
        <PaymentTypeSelectDropDown class="col" v-model="params.type" outlined label="Type" />
        <q-input class="col" v-model.number="params.amount" type="number" outlined label="Amount" />
        <div><q-btn color="positive" label="Pay" padding="md lg" @click="pay" :loading="loading" /></div>
      </q-card-actions>
    </q-list>
  </q-card>
</template>

<script>
import {precision} from "assets/helpers";
import {PaymentsTypes} from "assets/assets";
import PaymentTypeSelectDropDown from "components/Payment/PaymentTypeSelectDropDown";

export default {
  name: "PaymentCollectCard",
  components: {PaymentTypeSelectDropDown},
  props: ['bill'],
  data(){ return {
    PaymentsTypes,
    params: { type:'Cash', amount:0 },
    loading: false,
  } },
  computed: {
    discount(){ return _.toNumber(this.bill.discount) },
    paid(){ return _.toNumber(this.bill.paid) },
    balance(){ return _.toNumber(this.bill.balance) },
  },
  methods: {
    precision,
    total({ price,quantity }){ return _.toNumber(price) * _.toNumber(quantity) },
    pay(){
      this.loading = true; if(!this.params.amount) return this.loading = false;
      post('payment','create',this.params).then(this.done)
    },
    done(){ this.$emit('paid'); this.loading = false; }
  },
  created(){
    this.params.bill = this.bill.id;
    this.params.amount = _.toNumber(this.bill.balance);
  }
}
</script>
