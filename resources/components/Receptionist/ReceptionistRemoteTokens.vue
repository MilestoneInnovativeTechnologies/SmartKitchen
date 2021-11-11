<template>
  <q-card v-if="remote_client && rTokens.length">
    <q-card-section class="bg-grey-2 row justify-between text-bold"><div>Remote Orders Statuses</div><div>{{ rTokens.length }}</div></q-card-section>
    <ReceptionistRecentRemoteTokensSummary :tokens="rTokens" />
  </q-card>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {extract_date, h_key, is_future_day, is_past_day, is_today} from "assets/helpers";
import ReceptionistRecentRemoteTokensSummary from "components/Receptionist/ReceptionistRecentRemoteTokensSummary";
import {mapGetters} from "vuex";
const { CC71V,DP71V,KK99V } = require('boot/subscription').FEATURES

export default {
  name: "ReceptionistRemoteTokens",
  components: {ReceptionistRecentRemoteTokensSummary},
  mixins: [Tokens],
  data(){ return {
    remote_client: (CC71V === 'Yes' && _.trim(DP71V) !== '' && KK99V === 'Yes'),
  } },
  computed: {
    ...mapGetters({ progresses:'bills/token_progresses' }),
    rTokens(){ return _(this.tokens_remote).filter(is_any_recent).filter(({ items,id }) => have_non_served(items) || this.not_paid(id)).sortBy(sort_delivery).value() },
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','remote','token',id) },
    not_paid(id){ return _.get(this.progresses,id) !== 'Paid' }
  }
}

function is_any_recent({ items }){ return _.some(items,({ deliver }) => is_today(deliver) || is_past_day(deliver,3) || is_future_day(deliver,3)) }
function have_non_served(items){ return _.some(items,({ progress }) => ['New','Processing','Accepted','Completed'].includes(progress)) }
function sort_delivery({ items }){ return _(items).map(({ deliver }) => extract_date(deliver,'YYYY-MM-DD HH:mm:ss').getTime()).min() }
</script>
