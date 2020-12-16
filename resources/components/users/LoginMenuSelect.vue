<template>
  <q-select :options="options" label="Select Menu" dense :value="menu" map-options @input="emit" outlined />
</template>

<script>
export default {
  name: 'LoginMenuSelect',
  data () {
    return { menu: null }
  },
  computed: {
    menus(){ return this.$store.state.menus.data },
    options(){ return _.map(this.menus,({ id,name }) => _.zipObject(['label','value'],[name,id])) }
  },
  methods: {
    emit({ value}){ this.$emit('selected',value); this.menu = value }
  }
}
</script>
