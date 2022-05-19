<template>
  <q-page padding>
    <div class="q-px-md q-mb-sm"><FilterInputText label="Filter" @text="filter = $event" lazy="true" /></div>
    <q-list>
      <TokenDetailDeliveryBoyExpansion v-for="token in FilteredTokens" :key="'dbc-cm-tk-' + token.id" :token="token" @bill="bill(token)" group="own" color="purple" popup :label="label(token)" :caption="caption(token)" />
    </q-list>
    <q-btn class="full-width q-mt-md" label="Show more" flat dense color="amber" @click="page++" v-show="!filter && AllTokens.length > show" />
    <q-dialog persistent v-model="bill_mode" @before-hide="bill_mode = false"><BillGenerateCard :token="selected" :style="popup_width()" v-if="bill_mode" @generated="generated" /></q-dialog>
    <OrderNewFabDeliveryBoy />
  </q-page>
</template>

<script>
import TokenDetailDeliveryBoyExpansion from "components/Tokens/TokenDetailDeliveryBoyExpansion";
import {popup_width} from "assets/helpers";
import BillGenerateCard from "components/Bill/BillGenerateCard";
import DeliveryBoyPaymentCard from "components/Payment/DeliveryBoyPaymentCard";
import {NoCustomer} from "assets/assets";
import OrderNewFabDeliveryBoy from "components/Order/OrderNewFabDeliveryBoy";
import Tokens from "assets/mixins/Tokens";
import FilterInputText from "components/FilterInputText";
import {ItemsPerPageDefault} from "assets/constants";

export default {
  name: "DeliveryBoyCompleted",
  components: {
    FilterInputText,
    OrderNewFabDeliveryBoy, DeliveryBoyPaymentCard, BillGenerateCard, TokenDetailDeliveryBoyExpansion},
  mixins: [Tokens],
  data(){ return {
    me: parseInt(this.$route.meta.me.id),
    bill_mode: false, deliver_mode: false,
    selected: null, filter: '', page: 1
  } },
  computed: {
    billed_tokens(){ return this.$store.getters['tokens/billed'] },
    show(){ return this.page * _.ceil((settings('items_per_page') || ItemsPerPageDefault)/3) },
    AllTokens(){
      return _(this.tokens)
        .filter(token => token.type === 'Home Delivery' && token.progress !== 'Cancelled' && is_all_completed(token) && !_.includes(this.billed_tokens,token.id))
        .map(token => token.customer ? token : Object.assign({},token,{ customer:NoCustomer }))
        .map(token => Object.assign({},token,{ slug:token_slug(token) }))
        .sortBy('id').reverse()
        .value()
    },
    FilteredTokens(){
      return this.filter ? _.filter(this.AllTokens,token => _.includes(token.slug,_.toLower(this.filter))) : _.take(this.AllTokens,this.show)
    }
  },
  methods: {
    popup_width,
    label(token){ return `${token.id}, ${token.customer.name}` },
    caption(token){ return plain(_.get(token,['customer','address'],"")) },
    bill(token){ this.selected = token; this.bill_mode = true },
    generated(){ this.bill_mode = false; this.selected = null },
  }
}
function plain(txt){ return (txt || "").replaceAll(/\n/g,", ") }
function is_all_completed({ items }){ return items.length && _.every(items,({ progress }) => _.includes(['Cancelled','Completed','Served'],progress)) }
function token_slug({ id,customer }){ return _.toLower([id,customer.name,customer.phone,plain(customer.address)].join(" ")) }
</script>
