<template>
  <q-select :options="modes" v-model="mode" v-bind="$attrs" />
</template>

<script>
import {KitchenTokensDisplayMode} from "assets/assets";
export default {
  name: "KitchenTokenDisplayMode",
  props: ['value'],
  computed: {
    append(){ return this.$q.screen.width < 500 ? '' : ' Mode' },
    modes(){ return KitchenTokensDisplayMode.map(mode => mode + this.append) },
    mode: {
      get(){ return this.value ? this.value + this.append : _.first(this.modes) },
      set(mode){ this.$emit('input',mode.replace(this.append,'')) },
    }
  },
  mounted(){ if(!this.value) this.mode = _.first(this.modes) }
}
</script>
