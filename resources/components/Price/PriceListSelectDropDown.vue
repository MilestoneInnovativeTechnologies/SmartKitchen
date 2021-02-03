<template>
  <q-select :options="options" v-bind="$attrs" :value="optValue" @input="doEmit" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";

export default {
  name: "PriceListSelectDropDown",
  mixins: [SelectDropDown],
  computed: {
    options(){ return _(this.$store.state.prices.list).filter(['status','Active']).map(pList => Object.assign({},pList,{ label:this.getName(pList),value:pList.id })).value() },
  },
}
</script>
