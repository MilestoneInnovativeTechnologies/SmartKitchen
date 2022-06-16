<template>
  <q-page>
    <FilterInputText @text="filter = $event" class="q-ma-md" />
    <q-list separator>
      <q-item v-for="(token,idx) in showing" :key="h_key('ao-o-',token.id)" clickable @click="show = !!((selected = idx) || true)">
        <q-item-section avatar><q-badge :color="color" class="q-pa-sm" style="font-size: 0.65rem" :label="token.id" /></q-item-section>
        <ItemDetailStackLeft class="col-grow q-mt-sm" :color="color" :label="token.date_human">{{ token.customer ? token.customer.name : '' }}</ItemDetailStackLeft>
        <q-item-section><q-item-label lines="2" class="text-grey" style="font-size: 0.70rem">{{ items(token) }}</q-item-label></q-item-section>
        <q-item-section side :class="'text-' + color" class="text-bold">{{ amount(token).toFixed(2) }}</q-item-section>
      </q-item>
    </q-list>
    <q-dialog persistent v-model="show">
      <ArchiveTokenDetail v-if="Token" :token="Token" style="min-width: 80vw" :color="color" @print="print(Token)" @cancelled="show = false" />
    </q-dialog>
    <Pagination :records="Tokens" v-model="showing" :color="color" />
  </q-page>
</template>

<script>
import ItemDetailStackLeft from "components/ItemDetailStackLeft";
import ArchiveTokenDetail from "components/Archive/Token/ArchiveTokenDetail";
import Tokens from "assets/mixins/Tokens";
import {extract_date, h_key} from "assets/helpers";
import FilterInputText from "components/FilterInputText";
import Pagination from "components/Pagination";

export default {
  name: 'PageArchiveSales',
  components: {Pagination, FilterInputText, ItemDetailStackLeft, ArchiveTokenDetail},
  mixins: [Tokens],
  data(){ return {
    color: 'purple',
    selected: null, show: false,
    filter: '', showing: null,
  } },
  computed: {
    AllTokens(){ return _(this.tokens_own).filter(({ type }) => type === 'Sale').map(token => Object.assign({},token,{ slug:slug(token) })).sortBy(({ date }) => extract_date(date).getTime()).reverse().value() },
    Tokens(){ return this.filter ? _.filter(this.AllTokens,({ slug }) => _.includes(slug,this.filter.toLowerCase())) : this.AllTokens },
    Token(){ return this.selected === null ? null : this.showing[this.selected] },
  },
  methods: {
    h_key,
    items({ items }){ return _.truncate(_.map(items,({ item: { name } }) => _.truncate(name,{ length:13,omission:'..' })).join(', '),{ length:64,omission:' etc' }) },
    amount({ items }){ return _.round(_(items).map(({ price,quantity }) => price * quantity).sum(),2) },
    print({ id }){ post('token','print',{ id }) },
  }
}
function slug({ id,customer,type }){ return [id,_.get(customer,'name'),type].join(" ").toLowerCase() }
</script>
