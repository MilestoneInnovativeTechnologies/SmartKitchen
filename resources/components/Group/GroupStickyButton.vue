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

export default {
  name: "GroupStickyButton",
  props: ['value','sale'],
  data() { return {
    fab: false, xoffset: 0, width:0
  } },
  computed: {
    ...mapState('menus',{ menus:'data',selected:'s_items' }),
    menu(){ return this.sale ? (this.$store.getters['menus/sale'] ? _.pick(this.menus,this.$store.getters['menus/sale']) : this.menus) : (_.isEmpty(this.selected) ? this.menus : _.pick(this.menus,this.selected)) },
    group_ids(){ return _.flatMap(this.menu,'groups') },
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
      let sWidth = vm.$q.screen.width; vm.xoffset = sWidth-50;
      let tWidth = _.reduce(_.range(1,vm.count+1),function(sum,num){ return sum + vm.$refs['fab'+num][0].$el.clientWidth },0);
      vm.width = tWidth + 5 + 'px';
    },500,this);

  },
  watch: {
    fab(fab){ this.xoffset = fab ? 0 : (this.$q.screen.width - 50) },
  }
}
</script>
