<template>
  <q-input v-if="lazy !== undefined" :label="label || dLabel" outlined dense clearable debounce="500" v-model="filter" @input="$emit('text',filter)" v-bind="$attrs" ref="filter_input" />
  <q-input v-else-if="blur !== undefined" :label="label || dLabel" outlined dense clearable v-model="filter" @blur="$emit('text',filter)" v-bind="$attrs" ref="filter_input" />
  <q-input v-else :label="label || dLabel" outlined dense clearable v-model="filter" @input="$emit('text',filter)" v-bind="$attrs" ref="filter_input" />
</template>

<script>
export default {
  name: "FilterInputText",
  props: ['label','lazy','blur'],
  data(){ return {
    filter: '', dLabel: 'Filter Items'
  } },
  computed: {
    clear_filter(){ return _.get(this.$store.state.public,'clear_filter',false) },
    focus_filter(){ return _.get(this.$store.state.public,'focus_filter',false) },
  },
  watch: {
    clear_filter(status){ if(!status) return; this.$store.commit('public',{ clear_filter:false }); this.filter = ''; this.$emit('text','') },
    focus_filter(status){ if(!status) return; this.$store.commit('public',{ focus_filter:false }); this.$refs['filter_input'].$el.focus() },
  }
}
</script>
