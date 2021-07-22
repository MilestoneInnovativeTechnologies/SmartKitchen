<template>
  <q-select :options="kitchens" v-model="kitchen" v-bind="$attrs" />
</template>

<script>
export default {
  name: "KitchenSelectElement",
  props: ['value'],
  computed: {
    kitchens(){ return _(this.$store.getters['kitchens/assign'][_USER.id]).map(kid => _.get(this.$store.state.kitchens.data,kid,null)).filter().map(({ id,name }) => _.zipObject(['label','value'],[this.truncate(name),id])).value() },
    kitchen: {
      get(){ return (this.value && !!_.find(this.kitchens,['value',_.toInteger(this.value)])) ? _.find(this.kitchens,['value',_.toInteger(this.value)]) : _.first(this.kitchens) },
      set({ value }){ this.$emit('input',_.toInteger(value)) }
    },
  },
  methods: {
    truncate(text){ return this.$q.screen.width < 500 ? _.truncate(text,{ length:10 }) : text }
  },
  mounted(){ this.kitchen = _.cloneDeep(this.kitchen) }
}
</script>
