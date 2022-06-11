<template>
  <q-page padding>
    <BillFilter class="q-mb-sm" :tokens="FTokens" v-model="Tokens" />
    <Masonry :width="300" :items="showing">
      <template #item="Token">
        <BillMakePayment v-if="token_bill[Token.id]" :bill="token_bill[Token.id]" @action="OSA_action" />
        <BillGenerateCard v-else-if="Token.type === 'Home Delivery'" :token="Token" />
        <TokenBillGenerate v-else :token="Token" />
      </template>
    </Masonry>
    <OrderSummaryActionPopups @done="OSA_action_done" v-bind="OSA_CB" />
    <Pagination :records="Tokens" v-model="showing" />
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import TokenBillGenerate from "components/Bill/TokenBillGenerate";
import BillMakePayment from "components/Bill/BillMakePayment";
import Masonry from "components/Masonry";
import BillFilter from "components/Bill/BillFilter";
import Pagination from "components/Pagination";
import BillGenerateCard from "components/Bill/BillGenerateCard";
import OrderSummaryActionPopups from "components/Order/OrderSummaryActionPopups";
import OrderSummaryActions from "assets/mixins/OrderSummaryActions";

export default {
  name: "PageBillReceptionist",
  components: {OrderSummaryActionPopups, BillGenerateCard, Pagination, BillFilter, Masonry, BillMakePayment, TokenBillGenerate},
  mixins: [Bills,OrderSummaryActions],
  data(){ return {
    filter_progress: ['Completed','Pending','Partial'],
    Tokens: null, showing: null,
  } },
  computed: {
    FTokens(){ return _.filter(this.tokens,({ id,progress }) => this.filter_progress.includes(progress) || this.filter_progress.includes(_.get(this.token_bill,[id,'progress']))).reverse() },
  }
}
</script>
