<template>
  <q-scroll-area>
    <div class="row text-center q-col-gutter-y-xs q-pa-xs text-primary">
      <div class="col-12" style="cursor: pointer" @click="$emit('selected',null)">
        <Jumbotron text="All" />
      </div>
      <div class="col-12" style="cursor: pointer" @click="$emit('selected',group)" v-for="group in groups" :key="hKey(group)">
        <Jumbotron :text="group.name" />
      </div>

    </div>
  </q-scroll-area>
</template>

<script>
import {h_key} from 'assets/helpers'
import Jumbotron from "components/Jumbotron";

export default {
  name: "MenuGroupTabs",
  components: {Jumbotron},
  data(){ return {
    tab: 'all'
  } },
  computed: {
    menus(){ return this.$store.state.menus.s_items },
    m_groups(){ return _.flatMap(_.pick(this.$store.state.menus.data,this.menus),({ groups }) => _.map(groups,_.toSafeInteger)) },
    groups(){ return _.pick(this.$store.state.groups.data,this.m_groups) }
  },
  methods: {
    hKey({ id }){ return h_key('menu','group','select',id) }
  }
}
</script>
