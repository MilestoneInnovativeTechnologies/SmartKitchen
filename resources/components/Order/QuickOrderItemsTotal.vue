<template>

  <q-card class="text-center text-primary">
    <q-card-section class="q-py-xs text-caption text-uppercase" style="line-height:1; font-size: 0.65rem">TOTAL</q-card-section>
    <q-separator />
    <q-card-section class="text-weight-bolder text-h5 q-py-md">{{ total }}</q-card-section>
    <q-separator />
    <q-card-section class="q-py-xs text-caption text-uppercase" style="line-height:1; font-size: 0.65rem">ITEMS: {{ (items || []).length }}</q-card-section>
  </q-card>

</template>

<script>
import CardImageTitle from "components/CardImageTitle";
export default {
  name: "QuickOrderItemsTotal",
  components: {CardImageTitle},
  props: ['items','prices'],
  computed: {
    total(){ return _.sumBy(this.items,({ item,quantity }) => _.toNumber(_.get(this.prices,item) * quantity)) },
    quantities(){ return _.sumBy(this.items,'quantity') },
  }
}
</script>
