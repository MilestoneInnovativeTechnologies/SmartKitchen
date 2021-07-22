<template>
  <q-select :options="options" label="Select Kitchen" dense :value="kitchen" map-options @input="emit" outlined />
</template>

<script>
export default {
  name: 'LoginKitchenSelect',
  data () {
    return { kitchen: null }
  },
  computed: {
    kitchens(){ return this.$store.getters["kitchens/non_remote"] },
    options(){ return _.map(this.kitchens,({ id,name }) => _.zipObject(['label','value'],[name,id])) },
  },
  methods: {
    emit({ value }){ this.$emit('selected',value); this.kitchen = value }
  }
}
</script>
