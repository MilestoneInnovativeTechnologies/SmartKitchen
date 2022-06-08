<template>
  <q-drawer side="right" :value="true" :mini="miniState" mini-to-overlay :width="200" :breakpoint="200" bordered class="bg-grey-3" elevated style="z-index: -5000">
    <q-scroll-area class="fit" style="padding-bottom: 56px">
      <q-list padding separator>
        <q-item clickable v-ripple @click="miniState = !miniState" active>
          <q-item-section avatar><q-avatar text-color="white" size="md" icon="menu" rounded color="primary" /></q-item-section>
          <q-item-section>Groups</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="sel({ id:0 })">
          <q-item-section avatar><q-avatar text-color="white" size="md" rounded :color="is_sel({ id:0 }) ? 'secondary' : 'primary'">A</q-avatar></q-item-section>
          <q-item-section>All</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-for="group in groups" :key="'gsb-g-' + group.id" @click="sel(group)">
          <q-item-section avatar><q-avatar text-color="white" size="md" rounded :color="is_sel(group) ? 'secondary' : 'primary'">{{ group.name.slice(0,1).toUpperCase() }}</q-avatar></q-item-section>
          <q-item-section>{{ group.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import {mapState} from "vuex";
import {active, of_ids} from "assets/helpers";
export default {
  name: "GroupStickyButton",
  props: ['value','type'],
  data(){ return {
    miniState: true,
  } },
  computed: {
  type_name(){ return (this.type && this.type !== 'Dining') ? _.snakeCase([this.type,'Menu'].join(' ')) : null },
    ...mapState({ menus:state => active(state.menus.data),selected(state){ return this.type_name ? _.get(state.public,this.type_name,[]) : state.menus.s_items },group_master:state => active(state.groups.data) }),
    group_ids(){
      let sel = this.selected || [], sel_groups = sel.length > 0 ? _.flatMap(_.filter(this.menus,({ id }) => _.includes(sel,id)),'groups') : []
      return _.get(settings('menu',this.type),'groups',sel_groups);
    },
    groups(){ return of_ids(this.group_master,this.group_ids) },
  },
  methods: {
    is_sel({ id }){ return _.toSafeInteger(this.value) === _.toInteger(id) },
    sel({ id }){ this.$emit('input',id); this.miniState = true }
  }
}
</script>
