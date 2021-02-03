<template>
  <q-virtual-scroll :items="dGroups" virtual-scroll-horizontal>
    <template v-slot="{ item, index }">
      <div :key="hKey(item)" class="q-pa-xs cursor-pointer" @click="$emit('input',item)">
        <Jumbotron :text="item.name" v-bind="bindColorFont(item)" />
      </div>
    </template>
  </q-virtual-scroll>
</template>

<script>
import {h_key} from 'assets/helpers'
import Jumbotron from "components/Jumbotron";
import { mapState } from 'vuex'

export default {
  name: "MenuGroupScroll",
  components: {Jumbotron},
  props: ['value','groups'],
  computed: mapState({
    dGroups({ groups:{ data },items }){ return this.groups || _.concat([{ id:0,name:'All',items:_.map(items.data,({ id }) => _.toInteger(id)) }],_.map(data)) },
  }),
  methods: {
    hKey({ id }){ return h_key('menu','group','select',id) },
    bindColorFont(item){
      let def = { color:null,font:null }, val = this.value, active = { color:'secondary',font:'white' };
      if((!val && item.id === 0) || (val && val.id === item.id)) return active;
      return def;
    }
  },
  created(){
    this.$emit('input',this.dGroups[0])
  }
}
</script>
