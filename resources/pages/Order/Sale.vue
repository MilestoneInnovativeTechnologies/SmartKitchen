<template>
  <q-page padding>
    <template v-if="quick">
      <QuickOrder @item="addItem" :items="params.items" :price_list="params.price_list" @done="payment_mode = true" ref="quick_order" />
    </template>
    <template v-else>
      <FilterInputText @text="item_filter = $event" class="q-mb-xs" />
      <GroupItemsSelect :selected="group" :filter="item_filter" :price_list="params.price_list" @item="addItem" type="Sale" />
      <GroupStickyButton v-model="group" :type="params.type" />
      <q-page-sticky position="bottom-right" :offset="offset">
        <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <q-fab v-show="!payment_mode" icon="reply_all" active-icon="reply_all" color="indigo" glossy @click="payment_mode = true" class="flip-horizontal" v-touch-pan.prevent.mouse="move" />
        </transition>
      </q-page-sticky>
    </template>
    <q-dialog v-if="!price_list" :value="!price_list" persistent @hide="CFL()">
      <q-card :style="popup_width()">
        <q-bar class="text-white bg-info q-py-lg items-center"><q-icon name="receipt" color="white" left /><span>Select Price List</span><q-space /><q-btn icon="clear" v-close-popup flat round color="white" /></q-bar>
        <q-card-section>
          <PriceListSelectDropDown outlined dense input-debounce="0" v-model="price_list" label="Select Price List" get="id" clearable />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="payment_mode" persistent @show="calculateTotal">
      <q-card :style="popup_width()">
        <q-bar class="bg-secondary text-white q-py-lg"><q-icon name="account_balance" /><div>Customer & Payments Details</div><q-space /><q-btn dense flat icon="close" v-close-popup><q-tooltip>Close</q-tooltip></q-btn></q-bar>
        <q-card-section class="q-pa-none">
          <q-list dense style="font-size: 0.75rem" separator bordered>
            <q-item>
              <q-item-section avatar>No</q-item-section>
              <q-item-section>Item</q-item-section>
              <q-item-section side>Total</q-item-section>
              <q-item-section side><q-icon name="clear" color="white" size="xs" /></q-item-section>
            </q-item>
            <q-item v-for="(s_item,idx) in params.items" :key="hKey(s_item)">
              <q-item-section avatar>{{ idx+1 }}</q-item-section>
              <q-item-section>
                <q-item-label caption style="font-size: 0.65rem">{{ parseFloat(price[s_item.item]).toFixed(2) }}</q-item-label>
                <q-item-label>
                  {{ s_item.quantity }} x {{ items_data[s_item.item].name }}
                  <q-popup-edit v-model="params.items[idx].quantity" :title="items_data[s_item.item].name" auto-save><q-input type="number" v-model.number="params.items[idx].quantity" dense outlined autofocus label="Quantity" /></q-popup-edit>
                </q-item-label>
              </q-item-section>
              <q-item-section side>{{ parseFloat(price[s_item.item] * s_item.quantity).toFixed(2) }}</q-item-section>
              <q-item-section side><q-icon name="clear" color="negative" size="xs" @click="removeItem(idx)" /></q-item-section>
            </q-item>
            <q-item class="text-white" dense>
              <q-item-section  avatar>0</q-item-section>
              <q-item-section ><q-item-label class="text-white">Total</q-item-label></q-item-section>
              <q-item-section class="text-secondary text-bold" side>{{ parseFloat(total).toFixed(2) }}</q-item-section>
              <q-item-section  side><q-icon name="attach_money" color="secondary" size="xs" /></q-item-section>
            </q-item>
            <q-item class="text-white no-border" dense v-show="params.discount">
              <q-item-section avatar>0</q-item-section>
              <q-item-section><q-item-label class="text-secondary">Discount</q-item-label></q-item-section>
              <q-item-section class="text-secondary" side>{{ parseFloat(params.discount).toFixed(2) }}</q-item-section>
              <q-item-section side><q-icon name="local_offer" color="secondary" size="xs" /></q-item-section>
            </q-item>
            <q-item class="text-white" dense>
              <q-item-section avatar>0</q-item-section>
              <q-item-section><q-item-label class="text-secondary text-bold">Payable</q-item-label></q-item-section>
              <q-item-section class="text-secondary text-bold" side style="font-size: 1rem">{{ parseFloat(total - params.discount).toFixed(2) }}</q-item-section>
              <q-item-section side><q-icon size="xs" /></q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section class="row q-col-gutter-xs">
          <div class="col-7"><OrderCustomer get="id" v-model="params.customer" outlined dense /></div>
          <div class="col-5"><TaxNatureSelectDropDown label="Tax Nature" v-model="params.nature" outlined dense /></div>
          <div class="col-3"><PaymentTypeSelectDropDown v-model="params.advance_type" outlined dense /></div>
          <div class="col-4"><q-input type="number" outlined dense v-model.number="params.discount" label="Discount" @keyup="discount_percent" /></div>
          <div class="col-5"><q-input type="number" outlined dense v-model.number="params.advance_amount" label="Amount" /></div>
        </q-card-section>
        <q-card-actions align="right" class="q-px-md bg-grey-2"><q-btn glossy push label="Complete" :disable="params.items.length < 1" :loading="processing" color="secondary" padding="sm lg" class="full-width" @click="complete" /></q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import FilterInputText from "components/FilterInputText";
import {mapGetters, mapState} from "vuex";
import {h_key, is_period, popup_width} from "assets/helpers";
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";
import PaymentTypeSelectDropDown from "components/Payment/PaymentTypeSelectDropDown";
import {PaymentsTypes} from "assets/assets";
import GroupStickyButton from "components/Group/GroupStickyButton";
import GroupItemsSelect from "components/Group/GroupItemsSelect";
import QuickOrder from "components/Order/QuickOrder";
import QuickMode from "assets/mixins/QuickMode";
export default {
  name: 'PageSale',
  components: {QuickOrder, GroupItemsSelect, GroupStickyButton, PaymentTypeSelectDropDown, TaxNatureSelectDropDown, OrderCustomer, PriceListSelectDropDown, FilterInputText },
  mixins: [QuickMode],
  data(){ return {
    group: 0, item_filter: '', fab: true, offset: [12,12], payment_mode: false, processing: false,
    params: {
      type: 'Sale', price_list: null, items: [],
      customer: null, nature: null, discount: 0, advance_type:PaymentsTypes[0], advance_amount: 0
    }
  } },
  computed: {
    ...mapGetters({ prices:'prices/items' }), ...mapState({ items_data:({ items }) => items.data }),
    price_list: {
      get(){
        if(!_.has(this.$store.state.public,'sale_price_list')){
          let sale_price_list = _.get(settings('price_list',this.params.type),'id')
          if(sale_price_list) this.$store.commit('public',{ sale_price_list })
        }
        return _.get(this.$store.state.public,'sale_price_list',undefined)
      },
      set(sale_price_list){ this.$store.commit('public',{ sale_price_list }) },
    },
    price(){ return _.get(this.prices,_.toInteger(this.params.price_list)) },
    total(){ return _(this.params.items).map(({ item,quantity }) => quantity * this.price[item]).sum() },
  },
  methods: {
    popup_width, hKey({ item }){ return h_key(item) },
    CFL(){ if(!this.price_list) this.$router.push('/'); else this.params.price_list = this.price_list },
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] },
    addItem({ id }){
      let itemIndex = _.findIndex(this.params.items, ['item', parseInt(id)]);
      if (itemIndex === -1) itemIndex = this.params.items.push({item: id, quantity: 0}) - 1;
      this.params.items[itemIndex].quantity++;
      if(!this.quick) this.$q.notify(`${this.params.items.length} x Items <br>${_.sumBy(this.params.items,'quantity')} x Quantities`)
    },
    calculateTotal(){ this.params.advance_amount = this.total - this.params.discount; if(!this.params.items.length) this.params.discount = 0 },
    removeItem(idx){ this.params.items.splice(idx,1) },
    complete(){ if(!this.params.customer) return alert('Choose Customer'); this.processing = true; post('token','create',this.params).then(this.serve) },
    serve({ id }){ setTimeout(function(vm){
      let ids = _.map(vm.$store.state.tokens.items[parseInt(id)],'id');
      if(ids.length) post('token','served',{ id:ids }).then(vm.completed)
      else vm.completed();
    },750,this) },
    completed(){ this.payment_mode = false; this.params.items.splice(0,this.params.items.length); this.processing = false; if(_.has(this,['$refs','quick_order','$data','code'])) this.$refs['quick_order'].$data.code = 0 },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    discount_percent(e){
      if(is_period(e.keyCode) && (this.prv_per || _.includes(_.toString(this.params.discount),"."))) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.params.discount = this.params.discount * this.total * 0.01
            e.target.blur(); e.target.focus();
          })
        },250)
      }
      this.prv_per = is_period(e.keyCode);
    }
  },
  watch: {
    'params.items': { deep:true, handler:'calculateTotal' },
    'params.discount': { handler:'calculateTotal' },
    'price_list': { immediate:true, handler(pl){ if(pl) this.params.price_list = parseInt(pl) } },
  },
  created(){
    this.$q.notify.setDefaults({ position: 'top-right', timeout: 2000, color: 'positive', group:'items', html: true, caption: 'Items Updated !!' });
  }
}
</script>
