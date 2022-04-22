<template>
  <q-page>
    <div class="q-pa-md"><FilterInputText @text="filter = $event" label="Filter Orders" /></div>
    <Masonry :items="Tokens" :width="min_width">
      <template #item="tokens">
        <q-list>
          <q-expansion-item v-for="(token,col) in tokens.item" :key="'token-' + token.id" group="token" popup @show="show(tokens.identity,col)" :header-class="header_class(token)">
            <template #header>
              <q-item-section avatar><q-avatar size="md" font-size="0.85rem" :color="token.balance ? 'primary' : 'positive'" text-color="white" rounded>{{ token.id }}</q-avatar></q-item-section>
              <q-item-section>
                <q-item-label style="font-size: 0.75rem">{{ lget(token,['customer','name'],'No Customer') }}</q-item-label>
                <q-item-label v-if="token.bill" caption style="font-size: 0.70rem" class="text-primary text-weight-bold">Items: {{ token.items.length }}, Total: {{ token.bill.payable }}</q-item-label>
                <q-item-label caption style="font-size: 0.70rem">{{ items_name(token) }}</q-item-label>
                <q-item-label v-if="token.narration" caption style="font-size: 0.70rem" class="text-red">{{ token.narration }}</q-item-label>
              </q-item-section>
              <q-item-section side class="text-center">
                <span style="font-size: 0.65rem">{{ token_progress(token) }} <q-spinner-dots v-show="token_progress(token) === 'Processing'" color="red" size="xs" /></span>
                <q-rating :value="progress_rating[token_progress(token)]" :max="3" size="xs" color="green-5" icon="star" readonly />
              </q-item-section>
            </template>
            <q-card>
              <q-list separator>
                <q-item style="font-size: 0.65rem">
                  <q-item-section class="text-primary">
                    <q-item-label>Time: {{ time(token.date) }}</q-item-label>
                    <q-item-label>User: {{ lget(token,['waiter','name']) }}</q-item-label>
                  </q-item-section>
                  <q-item-section class="text-positive">
                    <q-item-label>Payable: {{ token.payable }}</q-item-label>
                    <q-item-label>Balance: {{ token.balance }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-for="item in token.items" :key="'token-'+token.id+'-item-'+item.id" :clickable="item.progress === 'Completed'" @click="select(token,item)">
                  <q-item-section avatar><q-avatar size="md" :color="include(token,item) ? 'positive' : ''"><q-icon :name="item.progress === 'Served' ? 'done_all' : 'done'" :color="item.progress === 'Served' ? 'green-4' : 'grey-4'" /></q-avatar></q-item-section>
                  <q-item-section style="font-size: 0.65rem">
                    <q-item-label>{{ lget(item,['item','name']) }}</q-item-label>
                    <q-item-label style="font-size: 0.65rem">{{ lget(item,'quantity') }}x {{ lget(item,['price']) }}</q-item-label>
                  </q-item-section>
                  <q-item-section side class="text-primary text-weight-bold">{{ lget(item,'quantity') * lget(item,['price']) }}</q-item-section>
                  <q-item-section side><q-badge color="primary" :label="lget(item,'progress')" outline style="font-size: 0.55rem" /></q-item-section>
                </q-item>
              </q-list>
              <q-card-section class="bg-light-blue-1" v-if="token.balance">
                <q-card-section class="q-pa-none row items-center justify-end q-col-gutter-xs">
                  <template v-if="!token.bill || !token.customer">
                    <div class="col-7"><OrderCustomer get="id" v-model="customer" outlined dense /></div>
                    <div class="col-5"><TaxNatureSelectDropDown label="Tax" v-model="tax" outlined dense /></div>
                    <div class="col-3"><PaymentTypeSelectDropDown v-model="type" outlined dense /></div>
                    <div class="col-4"><q-input type="number" outlined dense v-model.number="discount" label="Discount" @keyup="discount_percent" /></div>
                    <div class="col-5"><q-input type="number" outlined dense v-model.number="amount" label="Amount" /></div>
                  </template>
                  <template v-else>
                    <PaymentTypeSelectDropDown outlined v-model="type" dense class="col" />
                    <q-input outlined type="number" v-model.number="amount" label="Amount" dense class="col" />
                  </template>
                </q-card-section>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn v-if="progress_rating[token_progress(token)] < 3" label="Serve Selected" no-caps color="primary" class="q-px-md" @click="serve(token)" :disabled="!(selected[token.id] && selected[token.id].length)" />
                <q-space />
                <q-btn v-show="token.balance" label="Add Payment" color="positive" class="q-px-md" @click="pay(token)" :disabled="amount === 0" />
              </q-card-actions>
              <q-inner-loading :showing="loading"><q-spinner-facebook color="positive" size="2em" /></q-inner-loading>
            </q-card>
          </q-expansion-item>
        </q-list>
      </template>
    </Masonry>
    <div class="q-my-xl"> &nbsp; </div>
    <q-page-sticky position="bottom-right" :offset="offset">
      <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <q-fab icon="add" active-icon="add" v-if="!pl_mode" color="primary" glossy @click="add_order" />
      </transition>
    </q-page-sticky>
    <q-dialog v-if="!params.price_list" v-model="pl_mode" persistent>
      <q-card :style="popup_width()">
        <q-bar class="text-white bg-info q-py-lg items-center"><q-icon name="receipt" color="white" left /><span>Select Price List</span><q-space /><q-btn icon="clear" v-close-popup flat round color="white" /></q-bar>
        <q-card-section>
          <PriceListSelectDropDown outlined dense input-debounce="0" :value="params.price_list" @input="add_order_new" label="Select Price List" get="id" clearable />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {h_key, is_period, popup_width, time} from "assets/helpers";
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import Masonry from "components/Masonry";
import Bills from "assets/mixins/Bills";
import {PaymentsTypes} from "assets/assets";
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";
import PaymentTypeSelectDropDown from "components/Payment/PaymentTypeSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
import FilterInputText from "components/FilterInputText";

export default {
  name: 'PageTakeAway',
  components: {
    FilterInputText,
    OrderCustomer, PaymentTypeSelectDropDown, TaxNatureSelectDropDown, Masonry, PriceListSelectDropDown},
  mixins: [Bills],
  data(){ return {
    pl_mode: false, min_width: 390,
    fab: true, offset: [12,12],
    filter: '',
    params: { type: 'Take Away', price_list: null, seat: false, user:null, after:'take_away', payment:true },
    progress_rating: { New:0,Processing:1,Completed:2,Served:3,Paid:4 },
    active: [], selected: {},
    customer: null, tax: null, options: PaymentsTypes, type: PaymentsTypes[0], discount:0, amount: 0,
    loading: false,
  } },
  computed: {
    Tokens(){ let tokens = _(this.tokens).filter(token => token.type === 'Take Away' && !_.includes(['Cancelled','Paid'],token.progress))
      .map(token => Object.assign({},token,
        { bill:_.find(this.bills,(bill) => bill.token && bill.token.id === token.id) },
        { payable:this.payable(token),balance:this.balance(token) },
        { slug:tokenSlug(token) })
      ).filter(({ slug }) => this.filter ? _.includes(slug,_.toLower(this.filter)) : true)
      .value(), size = _.size(tokens); return _.chunk(tokens,_.ceil(size/(_.floor(this.$q.screen.width/this.min_width) || 1))) },
    Token(){ return this.active.length ? _.get(this.Tokens,[this.active[0],this.active[1]]) : null },
  },
  methods: {
    popup_width, lget:_.get, time, hKey({ item }){ return h_key(item) },
    header_class(token){ return this.token_progress(token) === 'Completed' ? 'animate' : (_.get(this.Token,'id') === token.id ? 'bg-grey-4' : '') },
    getPriceList(){
      if(!_.has(this.$store.state.public,'take_away_price_list')){
        let take_away_price_list = _.get(this.$store.getters['prices/take_away'],'id')
        if(take_away_price_list) this.$store.commit('public',{ take_away_price_list })
      }
      return _.get(this.$store.state.public,'take_away_price_list',undefined)
    },
    add_order(){
      if(!this.params.price_list) this.pl_mode = true;
      else this.add_order_new();
    },
    add_order_new(pl){
      if(pl) {
        this.params.price_list = pl;
        this.$store.commit('public',{ take_away_price_list:pl })
      }
      this.pl_mode = false;
      if(this.params.price_list) this.$router.push({ name:'order_new',params:this.params })
    },
    items_name(token){ return _.truncate(_.map(token.items,({ item }) => _.truncate(item.name,{ length:15,omission:'..' })).join(', '),{ length:105 }) },
    token_progress({ progress,items }){
      if(progress === 'Processing' && allCompleted(items)) return 'Completed'
      if(['Completed','Billed','Pending','Partial'].includes(progress)) return 'Served';
      return progress;
    },
    show(row,col){ let token = this.Tokens[row][col]; this.active = [row,col];
      if(!_.has(this.selected,token.id)) this.$set(this.selected,token.id,[])
      this.selected[token.id] = _(token.items).map(({ id,progress }) => progress === 'Completed' ? id : null).filter().value()
      this.discount = 0; this.amount = this.balance(token); this.tax = null; this.type = PaymentsTypes[0]; this.customer = _.get(token,['customer','id']);
    },
    select({ id },item){
      if(item.progress !== 'Completed') return;
      if(_.includes(this.selected[id],item.id)) this.selected[id] = _.difference(this.selected[id],[item.id])
      else this.selected[id].push(item.id)
    },
    discount_percent(e){
      if(is_period(e.keyCode) && (this.prv_per || _.includes(_.toString(this.discount),"."))) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.discount = this.discount * this.balance(this.Token) * 0.01;
            e.target.blur(); e.target.focus();
          })
        },250)
      }
      this.prv_per = is_period(e.keyCode);
    },
    include({ id },item){ return _.has(this.selected,id) && _.includes(this.selected[id],item.id) },
    payable(token){ return token.payable ? (token.payable) : (_.find(this.bills,bill => bill.token.id === token.id) ? _.get(_.find(this.bills,bill => bill.token.id === token.id),'payable') : _.sumBy(token.items,({ quantity,price }) => quantity*price)) },
    balance(token){ return token.balance ? (token.balance) : (this.payable(token) - (_.find(this.bills,bill => bill.token.id === token.id) ? _.get(_.find(this.bills,bill => bill.token.id === token.id),'paid') : 0)) },
    serve(token) {
      this.loading = true; let ids = this.selected[token.id]; if(!ids.length) return this.loading = false;
      setTimeout(function (vm) {
        post('token', 'served', {id: ids}).then(() => {
          vm.loading = false; vm.selected[token.id] = [];
        })
      }, 750, this)
    },
    pay(token){
      this.loading = true; if(this.amount === 0) return alert('Enter paying amount..' + ((this.loading = false) || ''));
      let item = 'payment', params = {};
      if(token.bill){
        params = { bill:token.bill.id, amount:this.amount, type:this.type }
      } else {
        item = 'bill'; params = { token:token.id, customer:this.customer, discount:this.discount, nature:this.tax, advance_type:this.type, advance_amount:this.amount }
      }
      post(item,'create',params).then(() => this.$store.dispatch('server/ping',null,{ root:true })).catch().finally(() => this.loading = false)
    },
  },
  created(){
    this.params.user = this.$route.meta.me.id
    this.params.price_list = this.getPriceList();
  },
  watch: {
    discount(amount){ this.amount = this.balance(this.Token) - amount }
  }
}

function allCompleted(items){
  return _.every(items,({ progress }) => ['Completed','Served','Cancelled'].includes(progress))
}
function tokenSlug(token){
  let customer = _.pick(_.get(token,'customer'),['name','phone']), items = _.map(_.get(token,'items'),'item.name'), waiter = _.get(token,['waiter','name'])
  return _.toLower(_.join(_.concat(items,_.values(customer),waiter)," "))
}
</script>

<style>
.animate {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% {
    transform: scale(1);
    background-color: rgba(227, 227, 227, 0.3);
  }

  75% {
    transform: scale(0.98);
    background-color: rgb(252, 252, 252, 0);
  }
}
</style>

