<template>
  <q-page padding>
    <BillFilter class="q-mb-sm" :tokens="FTokens" v-model="Tokens" />
    <Masonry :width="300" :items="Tokens">
      <template #item="Token">
        <TokenBillGenerate v-if="Token.progress === 'Completed'" :token="Token" />
        <BillMakePayment v-else :bill="token_bill[Token.id]" />
      </template>
    </Masonry>
    <div class="q-pa-lg flex flex-center" v-show="more"><q-pagination v-model="page" color="primary" :min="1" :max="max" :max-pages="7" :ellipses="true" :boundary-numbers="true" /></div>
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import BillMakePayment from "components/Bill/BillMakePayment";
import Masonry from "components/Masonry";
import {settings_boolean} from "assets/helpers";
import BillFilter from "components/Bill/BillFilter";

export default {
  name: "PageBillWaiter",
  components: {BillFilter, Masonry, BillMakePayment, TokenBillGenerate},
  mixins: [Bills],
  data(){ return {
    Tokens: null, page: 1
  } },
  computed: {
    ipp(){ return this.$store.getters['settings/items_per_page'] },
    max(){ return this.Tokens ? _.ceil(this.Tokens.length/this.ipp) : 1 },
    me(){ return _.get(this.$route,['meta','me','id']) },
    filter_progress(){ return _.concat(((settings_boolean(settings('waiter_generate_bills')) !== false) ? ['Completed'] : []),((settings_boolean(settings('waiter_make_payments')) !== false) ? ['Pending','Partial'] : [])) },
    FTokens(){ return _.filter(this.tokens,({ progress,type,user,waiter }) => type === 'Dining' && this.filter_progress.includes(progress) && _.includes([user,_.get(waiter,'id')],this.me)) },
    // token_ids(){ return _.map(this.Tokens,'id') },
    // Bills(){ return _(this.bills).filter(({ token }) => token && this.token_ids.includes(token.id) && token.progress !== 'Completed').keyBy(({ token }) => token.id).value() },
    showing(){ return _.slice(this.Tokens,(this.page-1) * this.ipp,this.page * this.ipp) },
    more(){ return this.Tokens && (this.Tokens.length > this.showing.length) }
  }
}
</script>
