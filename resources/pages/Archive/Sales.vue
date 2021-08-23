<template>
  <q-page padding>
    <q-list separator>
      <q-item v-for="(token,idx) in Tokens" :key="h_key('ao-o-',token.id)" clickable @click="show = !!((selected = idx) || true)">
        <q-item-section avatar><q-avatar rounded size="md" text-color="white" :color="color">{{ token.id }}</q-avatar></q-item-section>
        <ItemDetailStackLeft class="col-grow q-mt-sm" :color="color" :label="token.date_human">{{ token.customer ? token.customer.name : '' }}</ItemDetailStackLeft>
        <q-item-section><q-item-label lines="2" class="text-grey" style="font-size: 0.70rem">{{ items(token) }}</q-item-label></q-item-section>
        <q-item-section side :class="'text-' + color" class="text-bold">{{ amount(token).toFixed(2) }}</q-item-section>
      </q-item>
    </q-list>
    <q-dialog persistent v-model="show">
      <ArchiveTokenDetail v-if="Token" :token="Token" style="min-width: 80vw" :color="color" @print="print(Token)" />
    </q-dialog>
  </q-page>
</template>

<script>
import ItemDetailStackLeft from "components/ItemDetailStackLeft";
import ArchiveTokenDetail from "components/Archive/Token/ArchiveTokenDetail";
import Tokens from "assets/mixins/Tokens";
import {extract_date, h_key} from "assets/helpers";

export default {
  name: 'PageArchiveSales',
  components: {ItemDetailStackLeft, ArchiveTokenDetail},
  mixins: [Tokens],
  data(){ return {
    color: 'purple',
    selected: null, show: false,
  } },
  computed: {
    Tokens(){ return _(this.tokens_own).filter(({ type }) => type === 'Sale').sortBy(({ date }) => extract_date(date).getTime()).reverse().value() },
    Token(){ return this.selected === null ? null : this.Tokens[this.selected] },
  },
  methods: {
    h_key,
    items({ items }){ return _.truncate(_.map(items,({ item: { name } }) => _.truncate(name,{ length:13,omission:'..' })).join(', '),{ length:64,omission:' etc' }) },
    amount({ items }){ return _.round(_(items).map(({ price,quantity }) => price * quantity).sum(),2) },
    print({ id }){ post('token','sales_print',{ id }) },
  }
}
</script>
