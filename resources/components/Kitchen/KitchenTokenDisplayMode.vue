<template>
  <q-select :options="modes" v-model="mode" v-bind="$attrs" />
</template>

<script>
import {KitchenTokensDisplayMode} from "assets/assets";
const append = ' Mode'
export default {
  name: "KitchenTokenDisplayMode",
  props: ['value'],
  computed: {
    modes(){ return KitchenTokensDisplayMode.map(mode => mode + append) },
    mode: {
      get(){ return this.value ? this.value + append : _.first(this.modes) },
      set(mode){ this.$emit('input',mode.replace(append,'')) },
    }
  },
  mounted(){ if(!this.value) this.mode = _.first(this.modes) }
}
</script>
