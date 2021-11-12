<template>
  <q-list separator>
    <q-expansion-item v-for="token in tokens" :key="'rrrtk-t-' + token.id" group="one" dense>
      <template v-slot:header>
        <q-item-section><q-item-label>{{ to_format('D/MMM',token.date) }}</q-item-label></q-item-section>
        <q-item-section><q-item-label>{{ token.customer ? token.customer.name : '--no-customer--' }}</q-item-label></q-item-section>
        <q-item-section side><q-badge :color="tpc[progress(token)]" :label="progress(token)" class="q-py-xs" /></q-item-section>
      </template>
      <q-card>
        <q-list separator dense>
          <q-item v-for="item in token.items" :key="'rrrtk-ti-t-'+token.id+'-ti-'+item.id+'-i-'+item.item.id">
            <q-item-section><q-item-label caption>{{ to_format('D/MMM hh:mm A',item.deliver) }}</q-item-label></q-item-section>
            <q-item-section><q-item-label caption>{{ item.quantity }}x {{ item.item ? item.item.name : '--no-item--' }}</q-item-label></q-item-section>
            <q-item-section side><q-badge :color="tpc[item.progress]" :label="item.progress" class="q-py-xs" /></q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import {TokenProgressColor} from "assets/assets";
import {to_format} from "assets/helpers";

export default {
  name: "ReceptionistRecentRemoteTokensSummary",
  props: ['tokens'],
  data(){ return {
    tpc: TokenProgressColor,
  } },
  computed: {

  },
  methods: {
    to_format,
    progress({ progress,items }){ return progress !== 'Processing' ? progress : (_.every(items,{ progress:'Completed' }) ? 'Completed' : progress) }
  }
}
</script>
