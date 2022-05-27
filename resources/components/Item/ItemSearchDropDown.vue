<template>
  <q-select use-input hide-selected fill-input input-debounce="0" :value="optValue" @input="doEmit" :options="options" @filter="filter" v-bind="$attrs" :label="label || 'Select Item'" />
</template>

<script>
import SelectDropDown from "assets/mixins/SelectDropDown";
import {matches, options} from "assets/helpers";

export default {
  name: "ItemSearchDropDown",
  mixins: [SelectDropDown],
  props: ['label'],
  data(){ return {
    options: [],
  } },
  computed: {
    options_master(){ return options(this.$store.state.items.data,['name']) },
    search_keys(){ return _.split(settings('items_search_fields') || 'name',",") },
  },
  methods: {
    filter(val, update) {
      update(() => {
        const needle = (val || '').toLowerCase();
        this.options = needle
          ? _.filter(this.options_master,item => matches(item,this.search_keys,needle))
          : this.options_master
      })
    },
  },
  created() {
    this.options = this.options_master;
  }
}
</script>
