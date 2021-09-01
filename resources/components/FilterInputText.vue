<template>
  <q-input v-if="lazy !== undefined" :label="label || dLabel" outlined dense clearable debounce="500" v-model="filter" @input="$emit('text',filter)" />
  <q-input v-else-if="blur !== undefined" :label="label || dLabel" outlined dense clearable v-model="filter" @blur="$emit('text',filter)" />
  <q-input v-else :label="label || dLabel" outlined dense clearable v-model="filter" @input="$emit('text',filter)" />
</template>

<script>
export default {
  name: "FilterInputText",
  props: ['label','lazy','blur'],
  data(){ return {
    filter: '', dLabel: 'Filter Items'
  } }
}
</script>
