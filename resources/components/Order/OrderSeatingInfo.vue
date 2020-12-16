<template>
  <div v-if="seating" class="row content-around">
    <div class="col text-weight-bold">Seat<div class="text-caption">{{  seat.name }}</div></div>
    <div class="col text-weight-bold">Price List<div class="text-caption">{{ price.name }}</div></div>
  </div>
</template>

<script>
export default {
  name: "OrderSeatingInfo",
  props: ['seating'],
  computed: {
    seat(){ return _.get(this.$store.state.seating.data,_.toSafeInteger(this.seating)) },
    price(){ return _.get(this.$store.state.prices.list,_.toSafeInteger(this.seat.price_list)) },
  }
}
</script>
