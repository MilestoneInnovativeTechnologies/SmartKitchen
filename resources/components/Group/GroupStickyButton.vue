<template>
  <q-page-sticky position="top-left" :offset="[xoffset,15]" ref="sticky" style="transition: all 500ms" :style="{ width }">
    <q-fab v-for="i in count" :key="'grp-set-' + i" :ref="'fab'+i" v-model="fab" v-bind="attrs(i)" direction="down" vertical-actions-align="left">
      <q-fab-action v-if="i === 1" glossy push square label="All" color="indigo" :icon="is_sel({ id:0 }) ? 'reply_all' : ''" :padding="is_sel({ id:0 }) ? 'md' : 'xs sm'" @click="$emit('input',0)" />
      <q-fab-action v-for="group in groups.slice(max*(i-1),max*i)" :key="'gsb-gr-' + group.id" glossy push square color="indigo" :label="group.name" :icon="is_sel(group) ? 'reply_all' : ''" :padding="is_sel(group) ? 'md' : 'xs sm'" @click="$emit('input',group.id)" />
    </q-fab>
  </q-page-sticky>
</template>

<script>
import {mapState} from "vuex";
import {active, of_ids} from "assets/helpers";

export default {
  name: "GroupStickyButton",
  props: ['value','type'],
  data() { return {
    fab: false, xoffset: 0, width:0
  } },
  computed: {
    ...mapState({ menus:state => active(state.menus.data),selected:state => state.menus.s_items,group_master:state => active(state.groups.data) }),
    group_ids(){
      let sel = this.selected || [], sel_groups = sel.length > 0 ? _.flatMap(_.filter(this.menus,({ id }) => _.includes(sel,id)),'groups') : []
      return _.get(settings('menu',this.type),'groups',sel_groups);
    },
    groups(){ return of_ids(this.group_master,this.group_ids) },
    max(){ return _.toInteger((this.$q.screen.height-200)/45) },
    count(){ return _.ceil(this.groups.length/this.max) },
  },
  methods: {
    is_sel({ id }){ return _.toSafeInteger(this.value) === _.toInteger(id) },
    rearrange(){
      let vm = this;
      let sWidth = vm.$q.screen.width; vm.xoffset = sWidth-50;
      let tWidth = _.reduce(_.range(1,vm.count+1),function(sum,num){ return sum + vm.$refs['fab'+num][0].$el.clientWidth },0);
      vm.width = tWidth + 5 + 'px';
    },
    attrs(i){
      return { color:i === 1 ? 'indigo' : 'white',glossy:i === 1,push:i === 1,icon:'keyboard_arrow_down' ,label:'Groups',unelevated: i !== 1,padding: i === 1 ? 'md md' : 'xs md' }
    }
  },
  mounted(){ let $vm = this; this.$nextTick(function(){ setTimeout($vm.rearrange,500) }) },
  watch: {
    fab(fab){ this.xoffset = fab ? 0 : (this.$q.screen.width - 50) },
    group_ids(ids){ if(ids && _.isArray(ids) && _.size(ids)>0) setTimeout(this.rearrange,500) }
  }
}
</script>
