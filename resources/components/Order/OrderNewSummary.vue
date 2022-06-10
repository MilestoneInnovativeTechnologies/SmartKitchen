<template>
  <q-card>
    <q-bar class="text-white q-py-lg items-center" :class="'bg-' + clr">
      <q-icon name="receipt" color="white" left />
      <span>Order Summary</span><q-space />
      <q-btn icon="clear" v-close-popup flat round color="white" />
    </q-bar>
    <q-card-section class="q-pa-none">
      <q-list dense style="font-size: 0.75rem" separator bordered>
        <q-item>
          <q-item-section avatar>No</q-item-section>
          <q-item-section>Item</q-item-section>
          <q-item-section side>Total</q-item-section>
          <q-item-section side><q-icon name="clear" color="white" size="xs" /></q-item-section>
        </q-item>
        <q-item v-for="(item,idx) in items" :key="h_key('ons-oi',idx,'i',item.item)">
          <q-item-section avatar>{{ idx+1 }}</q-item-section>
          <q-item-section>
            <q-item-label>{{ iData(item,'name') }}<span v-if="item.narration" class="text-red text-italic text-caption q-ml-sm" style="font-size: 0.65rem">({{ item.narration }})</span></q-item-label>
            <q-item-label caption style="font-size: 0.65rem">{{ item.quantity }} x {{ parseFloat(price[item.item]).toFixed(2) }}</q-item-label>
          </q-item-section>
          <q-popup-edit :value="item.quantity" @input="$emit('process',['quantity',idx,$event])" :title="iData(item,'name')" auto-save>
            <q-input type="number" :value="item.quantity" @input="$emit('process',['quantity',idx,$event])" dense outlined autofocus label="Quantity" />
            <q-input v-if="item_narration_enabled" type="textarea" :value="item.narration" @input="$emit('process',['item_narration',idx,$event])" dense outlined label="Narration" class="q-mt-xs" style="height: 2.8rem" />
          </q-popup-edit>
          <q-item-section side>{{ parseFloat(price[item.item] * item.quantity).toFixed(2) }}</q-item-section>
          <q-item-section side><q-icon name="clear" color="negative" size="xs" @click="$emit('process',['remove',idx])" /></q-item-section>
        </q-item>
        <q-item class="text-white" dense>
          <q-item-section  avatar>0</q-item-section>
          <q-item-section ><q-item-label class="text-white">Total</q-item-label></q-item-section>
          <q-item-section class="text-bold" :class="'text-' + clr" side>{{ parseFloat(total).toFixed(2) }}</q-item-section>
          <q-item-section  side><q-icon name="attach_money" :color="clr" size="xs" /></q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section class="row q-col-gutter-xs" v-if="payment">
      <div class="col-12" v-if="order_narration_enabled"><q-input type="textarea" style="height: 2.8rem" :value="narration" @input="$emit('process',['narration',$event])" dense outlined label="Narration" /></div>
      <div class="col-7"><OrderCustomer get="id" v-model="v_customer" outlined dense /></div>
      <div class="col-5"><TaxNatureSelectDropDown label="Tax Nature" v-model="payments.nature" outlined dense /></div>
      <div class="col-3"><PaymentTypeSelectDropDown v-model="payments.advance_type" outlined dense /></div>
      <div class="col-4"><q-input type="number" outlined dense v-model.number="payments.discount" label="Discount" @keyup="discount_percent" /></div>
      <div class="col-5"><q-input type="number" outlined dense v-model.number="payments.advance_amount" label="Amount" /></div>
    </q-card-section>
    <q-card-section v-else>
      <OrderCustomer get="id" v-model="v_customer" outlined dense />
      <q-input v-if="order_narration_enabled" type="textarea" style="height: 2.8rem" :value="narration" @input="$emit('process',['narration',$event])" dense outlined label="Narration" class="q-mt-xs" />
    </q-card-section>
    <q-card-actions align="right" class="bg-grey-2">
      <q-btn label="Submit" :color="clr" padding="xs md" :loading="loading" @click="submit" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {h_key, is_period, settings_boolean} from "assets/helpers";
import {mapState} from "vuex";
import OrderCustomer from "components/Order/OrderCustomer";
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";
import PaymentTypeSelectDropDown from "components/Payment/PaymentTypeSelectDropDown";
import {PaymentsTypes} from "assets/assets";
import KeyPressCapture from "assets/mixins/KeyPressCapture";

export default {
  name: "OrderNewSummary",
  components: {PaymentTypeSelectDropDown, TaxNatureSelectDropDown, OrderCustomer},
  props: ['items','price_list','customer','color','loading','payment','type'],
  mixins: [KeyPressCapture],
  data(){ return {
    payments: { nature: null, advance_type:PaymentsTypes[0], advance_amount:0, discount: 0 },
    order_narration_enabled: settings_boolean(settings('enable_order_narration')) === true,
    item_narration_enabled: settings_boolean(settings('enable_item_narration')) === true,
  } },
  computed: {
    ...mapState('items',{ item_master:'data' }), clr(){ return this.color || 'accent' },
    instant_payment(){
      let role = _.toLower(_.get(this.$route,['meta','me','role'])), key = 'take_away_instant_payment', key1 = `take_away_${role}_instant_payment`;
      return ((settings_boolean(settings(key1)) === undefined ? settings_boolean(settings(key)) : settings_boolean(settings(key1))) !== false)
    },
    price(){ return _.get(this.$store.getters['prices/items'],_.toInteger(this.price_list)) },
    total(){ return _.reduce(this.items,(total,{ item,quantity }) => total + this.price[item] * quantity,0) },
    v_customer: {
      get(){ return this.customer },
      set(customer){ this.$emit('process',['customer',customer]) }
    },
    narration: {
      get(){ return _.get(this.$attrs,'narration','') },
      set(narration){ this.$emit('process',['narration',narration]) }
    }
  },
  methods: {
    h_key,
    iData({ item },key){ return _.get(this.item_master,[_.toInteger(item),key]) },
    discount_percent(e){
      if(is_period(e.keyCode) && (this.prv_per || _.includes(_.toString(this.payments.discount),"."))) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.payments.discount = this.payments.discount * this.total * 0.01
            e.target.blur(); e.target.focus();
          })
        },250)
      }
      this.prv_per = is_period(e.keyCode);
    },
    submit(){
      if(this.payment && !this.v_customer) return alert('Select Customer')
      this.$emit('process',['submit',this.payments])
    },
    KPC(e){
      if(['Enter','\n'].includes(e.key) && e.ctrlKey && !this.loading) this.submit()
      if(e.key === 'Escape') this.$emit('close')
    }
  },
  watch: {
    'payments.discount': {
      immediate:true,
      handler(discount){
        discount = _.toNumber(discount);
        if(this.instant_payment === false && discount <= 0) this.payments.advance_amount = 0
        else this.payments.advance_amount = _.toNumber(this.total - discount)
      }
    },
    total(amount){ if(this.instant_payment || _.toNumber(this.payments.discount)) this.payments.advance_amount = _.toNumber(_.toNumber(amount) - _.toNumber(this.payments.discount)) }
  }
}
</script>
