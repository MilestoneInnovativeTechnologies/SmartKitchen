<template>
  <q-card>
    <q-card-section class="text-weight-bold bg-grey-1 flex justify-between q-py-xs">
      <div>{{ label || 'Choose Groups' }}</div>
    </q-card-section>
    <q-card-section>
      <FilterInputText class="q-mb-sm" @text="fTxt = $event" />
      <q-chip color="secondary" v-for="(grp) in item_groups" :key="'igc-' + grp.id" :outline="!groups.includes(grp.id)" clickable @click="toggle(grp)" :label="grp.name" />
    </q-card-section>
  </q-card>
</template>

<script>
import FilterInputText from "components/FilterInputText";
import {matches} from "assets/helpers";

export default {
  name: "ItemGroupsChoose",
  components: {FilterInputText},
  props: ['value','label'],
  data(){ return {
    fTxt: ''
  } },
  computed: {
    all_item_groups(){ return this.$store.state.groups.data },
    item_groups(){ return this.fTxt ? _.filter(this.all_item_groups,grp => matches(grp,['name'],this.fTxt)) : this.all_item_groups },
    groups: {
      get(){ return this.value },
      set(groups){ this.$emit('input',groups) },
    }
  },
  methods: {
    toggle({ id }){ let idx = _.indexOf(this.groups,id); if(idx > -1) this.groups.splice(idx,1); else this.groups.push(id) }
  }
}
</script>
