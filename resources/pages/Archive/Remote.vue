<template>
  <q-page>
    <FilterInputText @text="filter = $event" class="q-ma-md" />
    <q-list separator>
      <q-item v-for="(token,idx) in showing" :key="h_key('ar-r-',token.id)" clickable @click="show = !!((selected = idx) || true)">
        <q-item-section avatar><q-badge :color="color" class="q-pa-sm" style="font-size: 0.65rem" :label="token.id" /></q-item-section>
        <ItemDetailStackLeft class="col-grow q-mt-sm" :color="color" :label="token.date_human">{{ token.customer ? token.customer.name : '' }}</ItemDetailStackLeft>
        <ItemDetailStackLeft class="q-mt-sm" :color="color" label="Items">{{ items(token) }}</ItemDetailStackLeft>
        <q-item-section side><q-badge :label="token.progress" class="q-py-xs q-px-sm" :color="color" outline /></q-item-section>
      </q-item>
    </q-list>
    <q-dialog persistent v-model="show">
      <ArchiveTokenDetail v-if="Token" :token="Token" style="min-width: 80vw" :color="color" @print="print(Token)" />
    </q-dialog>
    <Pagination :records="Tokens" v-model="showing" :color="color" />
  </q-page>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {extract_date, h_key} from "assets/helpers";
import ArchiveTokenDetail from "components/Archive/Token/ArchiveTokenDetail";
import ItemDetailStackLeft from "components/ItemDetailStackLeft";
import FilterInputText from "components/FilterInputText";
import Pagination from "components/Pagination";

export default {
  name: 'PageArchiveRemote',
  components: {Pagination, FilterInputText, ItemDetailStackLeft, ArchiveTokenDetail},
  mixins: [Tokens],
  data(){ return {
    color: 'indigo',
    selected: null, show: false,
    filter: '', showing: null,
  } },
  computed: {
    AllTokens(){ return _(this.tokens_own).filter(['type','Remote']).map(token => Object.assign({},token,{ slug:slug(token) })).sortBy(({ date }) => extract_date(date).getTime()).reverse().value() },
    Tokens(){ return this.filter ? _.filter(this.AllTokens,({ slug }) => _.includes(slug,this.filter.toLowerCase())) : this.AllTokens },
    Token(){ return this.selected === null ? null : this.showing[this.selected] },
  },
  methods: {
    h_key,
    items({ items }){ return _.truncate(_.map(items,({ item: { name } }) => _.truncate(name,{ length:14,omission:'..' })).join(','),{ length:64,omission:' etc' }) },
    print({ id }){ post('token','print',{ id }) },
  }
}
function slug({ id,customer,type }){ return [id,_.get(customer,'name'),type].join(" ").toLowerCase() }
</script>
