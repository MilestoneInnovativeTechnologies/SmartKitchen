<template>
  <q-page padding>
    <BillFilter class="q-mb-sm" :tokens="FTokens" v-model="Tokens" />
    <Masonry :width="300" :items="showing">
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
import BillFilter from "components/Bill/BillFilter";
import Pagination from "components/Pagination";

export default {
  name: "PageBillReceptionist",
  components: {Pagination, BillFilter, Masonry, BillMakePayment, TokenBillGenerate},
  mixins: [Bills],
  data(){ return {
    filter_progress: ['Completed','Pending','Partial'],
    Tokens: null, showing: null,
  } },
  computed: {
    FTokens(){ return _.filter(this.tokens,({ id,progress }) => this.filter_progress.includes(progress) || this.filter_progress.includes(_.get(this.token_bill,[id,'progress']))).reverse() },
  }
}
</script>
