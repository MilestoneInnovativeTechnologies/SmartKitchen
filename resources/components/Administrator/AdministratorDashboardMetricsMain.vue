<template>
  <div class="row q-col-gutter-xs">
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="customers" bg="teal" text="white" title="Total Customers" icon="supervised_user_circle" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="items" bg="blue" text="white" title="Total Items" icon="category" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="seats" bg="lime" text="white" title="Today Seats" icon="event_seat" /></div>
    <div class="col-xs-6 col-sm-3"><DigitMetric :value="least.length" bg="orange" text="white" title="Least Stock" icon="trending_down" /></div>
  </div>
</template>

<script>
import DigitMetric from "components/Metric/DigitMetric";
import {is_today} from "assets/helpers";
export default {
  name: "AdministratorDashboardMetricsMain",
  components: {DigitMetric},
  computed: {
    customers(){ return _.size(Object.values(this.$store.state.customers.data)) },
    items(){ return _.size(Object.values(this.$store.state.items.data)) },
    seats(){ return _.size(Object.values(this.$store.state.seating.data)) },
    least(){ return _(this.$store.state.kitchens.items).flatMap().filter(({ stock }) => stock < 5).value() },
  }
}
</script>
