<template>
  <div class="row q-col-gutter-xs">
    <div class="col-xs-6 col-sm-3" v-for="(status,idx) in d_status" :key="'order-waiter-summary-status-' + status">
      <DigitMetric :value="orderOfStatus(status)" :title="status" :bg="prop[idx][0]" text="white" :icon="prop[idx][1]" />
    </div>
  </div>
</template>

<script>
import DigitMetric from "components/Metric/DigitMetric";
export default {
  name: "OrderWaiterSummary",
  components: {DigitMetric},
  data(){ return {
    d_status: ['New','Processing','Completed','Billed'],
    prop:[['cyan','note_add'],['orange','published_with_changes'],['green','done'],['blue','done_outline']]
  } },
  computed: {
    orders(){ return this.$store.getters['tokens/today'] },
    total(){ return _.size(this.orders) }
  },
  methods: {
    orderOfStatus(status){ return _.sumBy(_.values(this.orders),({ progress }) => _.toSafeInteger(status === progress)) }
  }
}
</script>
