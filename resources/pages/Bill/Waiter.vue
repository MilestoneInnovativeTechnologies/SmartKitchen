<template>
  <q-page padding>
    <BillFilter class="q-mb-sm" :tokens="FTokens" v-model="Tokens" />
    <Masonry :width="300" :items="Tokens">
      <template #item="Token">
        <TokenBillGenerate v-if="Token.progress === 'Completed'" :token="Token" />
        <BillMakePayment v-else :bill="Bills[Token.id]" />
      </template>
    </Masonry>
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
    Tokens: null
  } },
  computed: {
    filter_progress(){ return _.concat(((settings_boolean(settings('waiter_generate_bills')) !== false) ? ['Completed'] : []),((settings_boolean(settings('waiter_make_payments')) !== false) ? ['Pending','Partial'] : [])) },
    FTokens(){ return _.filter(this.tokens,({ progress,type }) => type === 'Dining' && this.filter_progress.includes(progress) ) },
    token_ids(){ return _.map(this.Tokens,'id') },
    Bills(){ return _(this.bills).filter(({ token }) => token && this.token_ids.includes(token.id) && token.progress !== 'Completed').keyBy(({ token }) => token.id).value() }
  }
}
</script>
