<template>
  <q-page padding class="q-gutter-y-sm">
    <q-list bordered class="rounded-borders">
      <q-expansion-item expand-separator switch-toggle-side v-model="expanded" label="Customer and Order Details" caption="Manage Customer/Items selected">
        <q-card>
          <q-card-section class="row q-px-none q-py-none">
            <q-card-section class="col-xs-12 col-sm-6 q-col-gutter-y-xs q-pt-none">
              <div class="text-subtitle1">Customer</div>
              <OrderCustomer v-model="params.customer" get="id" outlined dense />
              <PriceListSelectDropDown outlined dense input-debounce="0" v-model="params.price_list" label="Select Price List" get="id" />
              <DateTime outlined dense label="Delivery Date" :value="deliver" @input="deliver = $event" />
<!--              <q-input type="textarea" label="Narration" outlined dense v-model="params.narration" />-->
            </q-card-section>
            <q-card-section class="col-xs-12 col-sm-6 q-col-gutter-y-xs q-pt-none q-px-none" v-show="params.items.length">
              <div class="text-subtitle1 q-ml-md">Items</div>
              <q-list class="q-pt-none">
                <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                  <q-item v-for="(item,idx) in params.items" :key="'roi-' + item.item + '-' + idx" :class="{ 'bg-grey-2':(idx%2)?false:true }">
                    <q-item-section avatar><q-avatar rounded><img :src="image(item)"></q-avatar></q-item-section>
                    <q-item-section>
                      <q-item-label>{{ item.quantity }}<span class="text-caption q-ml-xs q-mr-sm">x</span>{{ items[parseInt(item.item)].name }}</q-item-label>
                      <q-item-label lines="1" caption>Rate: {{ prices[parseInt(item.item)] }}, Delivery: {{ item.deliver }}</q-item-label>
                      <q-item-label lines="2" caption v-show="item.narration">{{ item.narration }}</q-item-label>
                    </q-item-section>
                    <q-item-section side class="text-weight-bolder text-body1">{{ parseFloat(prices[parseInt(item.item)] * item.quantity).toFixed(2) }}</q-item-section>
                    <q-item-section side>
                      <q-btn round dense flat color="warning" icon="edit" @click="edit = idx" />
                      <q-btn icon="delete" round dense flat color="red" @click="remove(idx)" />
                    </q-item-section>
                  </q-item>
                </transition-group>
              </q-list>
              <div class="text-subtitle1 q-ml-md">Advance Payment</div>
              <q-card-section class="q-gutter-y-xs q-ml-xl">
                <q-select label="Tax" dense :options="natures" v-model="params.nature" outlined />
                <q-input type="number" dense label="Discount" v-model.number="params.discount" outlined @keypress="discount_percent" />
                <q-select dense outlined v-model="params.advance_type" :options="payment_types" label="Payment Type" />
                <q-input outlined dense type="number" v-model.number="params.advance_amount" label="Amount" @keypress="amount_percent" />
                <q-card-actions class="q-px-none row">
                  <q-input borderless class="col" input-class="text-weight-bold text-body1 text-primary" label-color="primary" readonly label="Order Total" :value="total" /><q-space />
                  <q-input borderless class="col" input-class="text-weight-bold text-body1 text-primary" label-color="primary" readonly label="Amount Payable" :value="total - params.discount" /><q-space />
                  <q-btn label="Submit" color="primary" padding="sm lg" @click="save" :disable="loading" :loading="loading" />
                </q-card-actions>
              </q-card-section>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-inner-loading :showing="loading"><q-spinner-ios size="25%" color="primary" /></q-inner-loading>
    </q-list>
    <Masonry :items="remote_items" >
      <template #item="item">
        <ItemSelectCard :id="item.item" :price_list="params.price_list" :remote="true" @selected="selected" />
      </template>
    </Masonry>
    <q-dialog persistent :value="edit > -1" transition-show="scale" transition-hide="scale" @hide="edit = -1">
      <RemoteOrderItemUpdateForm v-if="edit > -1" style="width: 700px; max-width: 90vw;" @close="edit = -1" :item="params.items[edit]" @update="update" />
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Masonry from "components/Masonry";
import ItemSelectCard from "components/Item/ItemSelectCard";
import OrderCustomer from "components/Order/OrderCustomer";
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import RemoteOrderItemUpdateForm from "components/Order/RemoteOrderItemUpdateForm";
import {image, is_period, tomorrow} from "assets/helpers";
import DateTime from "components/DateTime";
import {PaymentsTypes} from "assets/assets";
import {delete_file} from "assets/modules/Remote";
import {BRANCH_CODE} from "boot/subscription";

export default {
  name: 'PageRemoteOrdersNew',
  components: { DateTime, RemoteOrderItemUpdateForm, PriceListSelectDropDown, OrderCustomer, ItemSelectCard, Masonry },
  data(){ return {
    expanded: true, payment_types: PaymentsTypes, loading: false, deliver: null,
    params: { type:'Remote',price_list:null,customer:null,items:[],nature:null,discount:0,advance_type:PaymentsTypes[0],advance_amount:0,_location:BRANCH_CODE },
    edit: -1,
  } },
  computed: {
    ...mapGetters({ remote_items:'kitchens/cloud_items',natures:'tax/natures',price_items:'prices/items' }), ...mapState('items',{ items:'data' }),
    prices(){ return _.get(this.price_items,this.params.price_list) },
    total(){ let prices = this.prices; return _.reduce(this.params.items,function(sum,{ item,quantity }){ return (prices[parseInt(item)] * parseInt(quantity)) + sum },0) }
  },
  methods: {
    selected({ id }){
      let itemIndex = _.findIndex(this.params.items, ['item', id]);
      if (itemIndex === -1 || (this.params.items[itemIndex].narration || this.params.items[itemIndex].deliver !== this.deliver))
        itemIndex = this.params.items.push({item: id, quantity: 1, narration: null, deliver: this.deliver, photo:null }) - 1;
      else this.params.items[itemIndex].quantity++
      this.$q.notify(`${this.params.items.length} x Items <br>${_.sumBy(this.params.items,'quantity')} x Quantities`)
    },
    image({ item }){ return image(this.items[parseInt(item)].image) },
    update(item){ _.forEach(item,(val,key) => this.params.items[this.edit][key] = val); this.edit = -1 },
    remove(idx){ if(this.params.items[idx].photo) delete_file(this.params.items[idx].photo); setTimeout(function(vm){ vm.params.items.splice(idx,1) },330,this) },
    save(){ if(!this.params.customer) return alert('Choose Customer'); this.loading = true; post('token','create',this.params).then(this.saved) },
    saved(){ this.loading = false; this.$nextTick(function(){ this.$router.push({ name:'orders_remote' }) }) },
    discount_percent(e){
      if(is_period(e.keyCode) && (this.prv_per1 || _.includes(_.toString(this.params.discount),"."))) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.params.discount = this.params.discount * this.total * 0.01
            e.target.blur(); e.target.focus();
          })
        },250)
      }
      this.prv_per1 = is_period(e.keyCode);
    },
    amount_percent(e){
      if(is_period(e.keyCode) && (this.prv_per2 || _.includes(_.toString(this.params.advance_amount),"."))) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.params.advance_amount = this.params.advance_amount * (this.total - this.params.discount) * 0.01
            e.target.blur(); e.target.focus();
          })
        },250)
      }
      this.prv_per2 = is_period(e.keyCode);
    },
  },
  created() {
    this.$q.notify.setDefaults({ position: 'top-right', timeout: 1000, color: 'positive', group: false, html: true, caption: 'Items Updated !!' });
    this.deliver = tomorrow();
    if(!_.has(this.$store.state.public,'remote_price_list')){
      let remote_price_list = _.get(settings('price_list',this.params.type),'id',null)
      if(remote_price_list) this.$store.commit('public',{ remote_price_list })
    }
    this.params.price_list = _.get(this.$store.state.public,'remote_price_list',1)
  },
  watch: {
    'params.price_list': function(id){ let s_name = _.snakeCase(this.params.type+' Price List'); if(this.$store.state.public[s_name] !== parseInt(id)) this.$store.commit('public',{ [s_name]:parseInt(id) }) },
    deliver(date){ if(date) _.forEach(this.params.items,(item,idx) => this.$set(this.params.items[idx],'deliver',date)) }
  }
}
</script>
