<template>
  <q-page padding>
    <BillFilter class="q-mb-sm" :tokens="FTokens" v-model="Tokens" />
    <Masonry :width="300" :items="showing">
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
import BillFilter from "components/Bill/BillFilter";

export default {
  name: "PageBillReceptionist",
  components: {BillFilter, Masonry, BillMakePayment, TokenBillGenerate},
  mixins: [Bills],
  data(){ return {
    filter_progress: ['Completed','Pending','Partial'],
    Tokens: null, page: 1,
  } },
  computed: {
    ipp(){ return this.$store.getters['settings/items_per_page'] },
    max(){ return this.Tokens ? _.ceil(this.Tokens.length/this.ipp) : 1 },
    FTokens(){ return _.filter(this.tokens,({ id,progress }) => this.filter_progress.includes(progress) || _.has(this.Bills,id)) },
    showing(){ return _.slice(this.Tokens,(this.page-1) * this.ipp,this.page * this.ipp) },
    more(){ return this.Tokens && (this.Tokens.length > this.showing.length) }
  }
}
</script>
