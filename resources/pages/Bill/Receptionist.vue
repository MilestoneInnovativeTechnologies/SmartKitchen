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
import BillFilter from "components/Bill/BillFilter";

export default {
  name: "PageBillReceptionist",
  components: {BillFilter, Masonry, BillMakePayment, TokenBillGenerate},
  mixins: [Bills],
  data(){ return {
    filter_progress: ['Completed','Pending','Partial'],
    Tokens: null,
  } },
  computed: {
    FTokens(){ return _.filter(this.tokens,({ progress }) => this.filter_progress.includes(progress) ) },
    Bills(){ return _(this.bills).filter(({ token }) => token && this.filter_progress.slice(1).includes(token.progress)).keyBy(({ token }) => token.id).value() }
  }
}
</script>
