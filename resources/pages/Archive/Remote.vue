<template>
  <q-page padding>
    <q-list separator>
      <q-item v-for="(token,idx) in Tokens" :key="h_key('ar-r-',token.id)" clickable @click="show = !!((selected = idx) || true)">
        <q-item-section avatar><q-avatar rounded size="md" text-color="white" :color="color">{{ token.id }}</q-avatar></q-item-section>
        <ItemDetailStackLeft class="col-grow q-mt-sm" :color="color" :label="token.date_human">{{ token.customer ? token.customer.name : '' }}</ItemDetailStackLeft>
        <ItemDetailStackLeft class="q-mt-sm" :color="color" label="Items">{{ items(token) }}</ItemDetailStackLeft>
        <q-item-section side><q-badge :label="token.progress" class="q-py-xs q-px-sm" :color="color" outline /></q-item-section>
      </q-item>
    </q-list>
    <q-dialog persistent v-model="show">
      <ArchiveTokenDetail v-if="Token" :token="Token" style="min-width: 80vw" :color="color" />
    </q-dialog>
  </q-page>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {extract_date, h_key} from "assets/helpers";
import ArchiveTokenDetail from "components/Archive/Token/ArchiveTokenDetail";
import ItemDetailStackLeft from "components/ItemDetailStackLeft";

export default {
  name: 'PageArchiveRemote',
  components: {ItemDetailStackLeft, ArchiveTokenDetail},
  mixins: [Tokens],
  data(){ return {
    color: 'indigo',
    selected: null, show: false,
  } },
  computed: {
    Tokens(){ return _(this.tokens_own).filter(['type','Remote']).sortBy(({ date }) => extract_date(date).getTime()).reverse().value() },
    Token(){ return this.selected === null ? null : this.Tokens[this.selected] },
  },
  methods: {
    h_key,
    items({ items }){ return _.truncate(_.map(items,({ item: { name } }) => _.truncate(name,{ length:14,omission:'..' })).join(','),{ length:64,omission:' etc' }) },
  }
}
</script>
