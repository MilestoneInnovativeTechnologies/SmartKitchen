<template>
  <q-list class="rounded-borders">
    <q-expansion-item v-for="token in tokens" :key="hKey(name,token)" :group="name" switch-toggle-side popup>
      <template v-slot:header>
        <q-item-section>
          <q-item-label v-if="token.customer">{{ customers[parseInt(token.customer)].name }}</q-item-label>
          <q-item-label caption>{{ token.date_human }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge :color="tpc[progress(token)]" :label="progress(token)" class="q-px-sm q-py-sm" />
        </q-item-section>
      </template>
      <q-card class="bg-grey-1">
        <q-card-section class="q-py-xs">
          <RemoteTokenItemsList :token="token" :items="token.items" :item_master="items" :kitchen_master="kitchens" :customer_master="customers" />
        </q-card-section>
      </q-card>
      <RemoteTokenPayment :bill="bills[token.id]" />
    </q-expansion-item>
  </q-list>
</template>

<script>
import {h_key} from "assets/helpers";
import {TokenProgressColor} from "assets/assets";
import RemoteTokenItemsList from "components/Order/RemoteTokenItemsList";
import RemoteTokenPayment from "components/Order/RemoteTokenPayment";

export default {
  name: "RemoteTokensList",
  components: {RemoteTokenPayment, RemoteTokenItemsList},
  props: ['name','tokens','customers','items','kitchens','bills'],
  data(){ return {
    tpc: TokenProgressColor,
  } },
  methods: {
    hKey(item,{ id }){ return h_key(item,id) },
    progress({ progress,items }){ return progress !== 'Processing' ? progress : (_.every(items,{ progress:'Completed' }) ? 'Completed' : progress) }
  }
}
</script>
