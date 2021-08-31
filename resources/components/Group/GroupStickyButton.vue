<template>
  <q-page-sticky position="top-right" :offset="offset" ref="sticky">
    <q-fab v-for="i in count" :key="'grp-set-' + i" :ref="'fab'+i" v-model="fab" v-bind="attrs(i)" direction="down" vertical-actions-align="left">
      <q-fab-action v-if="i === 1" glossy push square label="All" color="indigo" :icon="is_sel({ id:0 }) ? 'reply_all' : ''" :padding="is_sel({ id:0 }) ? 'md' : 'xs sm'" @click="$emit('input',0)" />
      <q-fab-action v-for="group in groups.slice(max*(i-1),max*i)" :key="'gsb-gr-' + group.id" glossy push square color="indigo" :label="group.name" :icon="is_sel(group) ? 'reply_all' : ''" :padding="is_sel(group) ? 'md' : 'xs sm'" @click="$emit('input',group.id)" />
    </q-fab>
  </q-page-sticky>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "GroupStickyButton",
  props: ['value'],
  data() { return {
    fab: false, offset: [-50,15],
    xoffset: 0,
  } },
  computed: {
    ...mapState('menus',{ menus:'data',selected:'s_items' }),
    group_ids(){ return _.flatMap(_.isEmpty(this.selected) ? this.menus : _.pick(this.menus,this.selected),'groups') },
    groups(){ return _(this.group_ids).uniq().map(id => this.$store.state.groups.data[parseInt(id)]).filter(['status','Active']).value() },
    max(){ return _.toInteger((this.$q.screen.height-200)/45) },
    count(){ return _.ceil(this.groups.length/this.max) },
  },
  methods: {
    is_sel({ id }){ return _.toSafeInteger(this.value) === _.toInteger(id) },
    attrs(i){
      return { color:i === 1 ? 'indigo' : 'white',glossy:i === 1,push:i === 1,icon:'keyboard_arrow_down' ,label:'Groups',unelevated: i !== 1,padding: i === 1 ? 'md md' : 'xs md' }
    }
  },
  mounted(){
    setTimeout(function(vm){
      let tWidth = _.reduce(_.range(1,vm.count+1),function(sum,num){ return sum + vm.$refs['fab'+num][0].$el.clientWidth },0);
      let fWidth = vm.$refs['fab1'][0].$el.clientWidth;
      vm.xoffset = 0-tWidth+_.toInteger(fWidth/2.5)
      vm.offset = [vm.xoffset,15]
    },500,this);

  },
  watch: {
    fab(fab){ if(!fab) this.offset = [this.xoffset,15]; else this.offset = [50,15] },
  }
}
</script>
