<template>
  <q-page padding>
    <BillFilter class="q-mb-sm" :tokens="FTokens" v-model="Tokens" />
    <Masonry :width="300" :items="Tokens">
      <template #item="Token">
        <TokenBillGenerate v-if="Token.progress === 'Completed'" :token="Token" />
        <BillMakePayment v-else :bill="token_bill[Token.id]" />
      </template>
    </Masonry>
    <Pagination :records="Tokens" v-model="showing" />
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import BillMakePayment from "components/Bill/BillMakePayment";
import Masonry from "components/Masonry";
import {settings_boolean} from "assets/helpers";
import BillFilter from "components/Bill/BillFilter";
import Pagination from "components/Pagination";

export default {
  name: "PageBillWaiter",
  components: {Pagination, BillFilter, Masonry, BillMakePayment, TokenBillGenerate},
  mixins: [Bills],
  data(){ return {
    Tokens: null, showing: [],
  } },
  computed: {
    me(){ return _.get(this.$route,['meta','me','id']) },
    filter_progress(){ return _.concat(((settings_boolean(settings('waiter_generate_bills')) !== false) ? ['Completed'] : []),((settings_boolean(settings('waiter_make_payments')) !== false) ? ['Pending','Partial'] : [])) },
    FTokens(){ return _.filter(this.tokens,({ progress,type,user,waiter }) => type === 'Dining' && this.filter_progress.includes(progress) && _.includes([user,_.get(waiter,'id')],this.me)) },
  }
}
</script>
