<template>
  <q-card v-if="Tokens.length">
    <q-card-section class="row justify-between text-bold text-white items-center q-py-xs" :class="'bg-' + clr"><div>Non Dining Orders</div><FilterInputText bg-color="white" class="gt-xs" style="width: 50vw" label="Filter" @text="filter = $event" lazy /><div>{{ Tokens.length }}</div></q-card-section>
    <q-card-section class="q-pa-xs">
      <FilterInputText label="Search" class="q-mb-sm lt-sm" @text="filter = $event" lazy />
      <Masonry :items="Filtered_tokens" width="260">
        <template #item="token">
          <OrderSummaryReceptionistOrder :token="token" v-on="$listeners" />
        </template>
      </Masonry>
    </q-card-section>
  </q-card>
</template>

<script>
import {h_key} from "assets/helpers";
import OrderSummaryReceptionistOrder from "components/Order/OrderSummaryReceptionistOrder";
import Masonry from "components/Masonry";
import Bills from "assets/mixins/Bills";
import OrderSummaryActions from "assets/mixins/OrderSummaryActions";
import FilterInputText from "components/FilterInputText";

export default {
  name: "ReceptionistNonDiningTokens",
  components: {FilterInputText, Masonry, OrderSummaryReceptionistOrder},
  mixins: [Bills,OrderSummaryActions],
  props: ['color'],
  data(){ return {
    activeProgress: ['New','Processing','Completed','Billed','Pending'],
    displayTypes: ['Take Away','Sale','Other'],
    filter: '',
  } },
  computed: {
    Tokens(){
      return _(this.tokens)
        .filter(({ type,progress }) => this.displayTypes.includes(type) && this.activeProgress.includes(progress))
        .map(token => Object.assign({},token,{ bill:this.token_bill[token.id] },{ slug:tokenSlug(token,this.token_bill[token.id]) }))
        .reverse().value()
    },
    Filtered_tokens(){ return this.filter ? _.filter(this.Tokens,token => _.includes(token.slug,_.toLower(this.filter))) : _.take(this.Tokens,10) },
    clr(){ return this.color || 'teal' }
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','non','dining','token',id) },
  }
}
function tokenSlug(token,bill){
  let customer = _.pick(_.get(token,'customer'),['name','phone']), items = _.map(_.get(token,'items'),'item.name'), waiter = _.get(token,['waiter','name']), type = _.get(token,'type');
  let bill_id = _.get(bill,'id'), bill_amount = _.get(bill,'amount')
  return _.toLower(_.join(_.concat(token.id,bill_id,items,_.values(customer),waiter,bill_amount)," "))
}
</script>
