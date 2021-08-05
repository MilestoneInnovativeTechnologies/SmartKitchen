<template>
  <q-page padding class="q-gutter-y-sm">
    <MenuGroupScroll v-model="group" />
    <div class="row q-col-gutter-x-xs">
      <div class="col-xs-4 col-sm-6 col-md-7"><FilterInputText @text="filter = $event" /></div>
      <div class="col-xs-4 col-sm-4 col-md-4"><PriceListSelectDropDown outlined dense input-debounce="0" v-model="params.price_list" label="Select Price List" get="id" class="bg-grey-4" /></div>
      <div class="col-xs-4 col-sm-2 col-md-1"><q-input outlined dense label="Total" disable :value="parseFloat(total).toFixed(2)" /></div>
    </div>
    <Masonry :items="items" :width="100" style="overflow: hidden">
      <template #item="item">
        <ItemSelectCard @selected="addItem" :id="item.item" :price_list="1" />
      </template>
    </Masonry>
    <q-page-sticky position="bottom-right" :offset="fabPos" v-show="!payment_mode">
      <q-fab icon="keyboard_arrow_right" active-icon="keyboard_arrow_right" square glossy label-position="left" push label="Proceed" color="secondary" :disable="draggingFab" v-touch-pan.prevent.mouse="moveFab" @click="payment_mode = !payment_mode" />
    </q-page-sticky>
    <q-dialog v-model="payment_mode" persistent @show="calculateTotal">
      <q-card>
        <q-bar class="bg-secondary text-white q-py-lg">
          <q-icon name="account_balance" />
          <div>Customer & Payments Details</div><q-space />
          <q-btn dense flat icon="close" v-close-popup><q-tooltip>Close</q-tooltip></q-btn>
        </q-bar>
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
          <div class="col-4"><q-input type="number" outlined dense v-model.number="params.discount" label="Discount" /></div>
          <div class="col-5"><q-input type="number" outlined dense v-model.number="params.advance_amount" label="Amount" /></div>
        </q-card-section>
        <q-card-actions align="right" class="q-px-md q-pt-none"><q-btn glossy push label="Complete" :disable="params.items.length < 1" :loading="processing" color="secondary" padding="sm lg" class="full-width" @click="complete" /></q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import MenuGroupScroll from "components/Menu/MenuGroupScroll";
import FilterInputText from "components/FilterInputText";
import {mapGetters, mapState} from "vuex";
import {h_key, matches} from "assets/helpers";
import Masonry from "components/Masonry";
import ItemSelectCard from "components/Item/ItemSelectCard";
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import OrderCustomer from "components/Order/OrderCustomer";
import TaxNatureSelectDropDown from "components/Tax/TaxNatureSelectDropDown";
import PaymentTypeSelectDropDown from "components/Payment/PaymentTypeSelectDropDown";
import {PaymentsTypes} from "assets/assets";
export default {
  name: 'PageSale',
  components: {
    PaymentTypeSelectDropDown,
    TaxNatureSelectDropDown,
    OrderCustomer, PriceListSelectDropDown, ItemSelectCard, Masonry, FilterInputText, MenuGroupScroll},
  data(){ return {
    group: null, filter: '',
    fabPos: [18,18], draggingFab: false,
    payment_mode: false, processing: false,
    params: {
      type: 'Sale', price_list: null, items: [],
      customer: null, nature: null, discount: 0, advance_type:PaymentsTypes[0], advance_amount: 0
    }
  } },
  computed: {
    ...mapGetters({ kis_map:'kitchens/map',prices:'prices/items' }), ...mapState({ items_data:({ items }) => items.data,kis:({ kitchens }) => kitchens.items,tokens:({ tokens }) => _(tokens.items).flatMap().filter(['progress','Completed']).groupBy(({ token }) => _.toInteger(token)).value() }),
    ...mapState({ remote_kis:({ remote }) => _(remote.data).filter(['item','kitchen_items']).map(({ local_id }) => _.toInteger(local_id)).value() }),
    remote_items(){ return _(this.remote_kis).map(ki_id => _.get(this.kis,_.get(this.kis_map,ki_id),{}).item).value() },
    items(){ return _(_.get(this.group,'items')).difference(this.remote_items).filter(item_id => matches(_.get(this.items_data,item_id),['id','name','detail'],this.filter)).value() },
    price(){ return _.get(this.prices,_.toInteger(this.params.price_list)) },
    total(){ return _(this.params.items).map(({ item,quantity }) => quantity * this.price[item]).sum() },
  },
  methods: {
    hKey({ item }){ return h_key(item) },
    addItem({ id }){
      let itemIndex = _.findIndex(this.params.items, ['item', parseInt(id)]);
      if (itemIndex === -1) itemIndex = this.params.items.push({item: id, quantity: 0}) - 1;
      this.params.items[itemIndex].quantity++
    },
    setPriceList(){
      if(!this.params.price_list) this.params.price_list = this.$store.state.public.sales_price_list || _.get(_.find(this.$store.state.prices.list,['status','Active']),'id')
      else this.$store.commit('public',{ sales_price_list:this.params.price_list })
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    calculateTotal(){ this.params.advance_amount = this.total - this.params.discount; if(!this.params.items.length) this.params.discount = 0 },
    removeItem(idx){ this.params.items.splice(idx,1) },
    complete(){ if(!this.params.customer) return alert('Choose Customer'); this.processing = true; post('token','create',this.params).then(this.serve) },
    serve({ id }){ setTimeout(function(vm){
      let ids = _.map(vm.tokens[parseInt(id)],'id');
      if(ids.length) post('token','served',{ id:ids }).then(vm.completed)
      else vm.completed();
    },750,this) },
    completed(){ this.payment_mode = false; this.params.items.splice(0,this.params.items.length); this.processing = false },
  },
  watch: {
    'params.price_list': { immediate:true, handler:'setPriceList' },
    'params.items': { deep:true, handler:'calculateTotal' },
    'params.discount': { handler:'calculateTotal' },
  },
}
</script>
