<template>
  <q-item>
    <q-item-section avatar class="col-shrink text-bold">{{ idx+1 }}</q-item-section>
    <q-item-section>
      <q-item-label caption :class="'text-' + clr">Rate: {{ item.rate }}</q-item-label>
      <q-item-label style="font-size: 0.75rem"><span class="text-bold" :class="'text-' + clr">{{ item.quantity }}x</span> {{ item.name }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn icon="edit" color="amber" round outline @click="edit_mode = true" />
    </q-item-section>
    <q-dialog persistent v-if="edit_mode" v-model="show_edit"><q-card :style="popup_width">
      <q-bar class="text-white text-subtitle2" :class="'bg-' + clr">{{ item.name }}<q-space /><q-btn icon="close" flat round v-close-popup /></q-bar>
      <q-card-section>
        <q-card-section class="q-gutter-xs">
          <q-input dense outlined type="number" label="Quantity" v-model.number="params.quantity"/>
          <q-input dense outlined type="number" label="Delay in Minutes" v-model.number="params.delay"/>
          <q-input dense type="textarea" outlined label="Narration if any" v-model="params.narration"/>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="right" class="bg-grey-1">
        <q-btn label="update" :color="clr" @click="update" />
      </q-card-actions>
    </q-card></q-dialog>
  </q-item>
</template>

<script>
import {popup_width} from "assets/helpers";

export default {
  name: "OnlineOrderItemEdit",
  props: ['color','order','idx'],
  data(){ return {
    edit_mode: false, show_edit: false,
    params: { delay:0,narration:'',quantity:1 },
    popup_width: popup_width()
  } },
  computed: {
    clr(){ return this.color || 'info' },
    order_details(){ return _.get(this.$store.state.online.data,this.order) },
    item(){ return _.get(this.order_details,['items',this.idx]) }
  },
  methods: {
    update(){
      let iData = _.defaults({},this.params,this.item);
      let data = _.set(_.cloneDeep(this.order_details),['items',this.idx],iData)
      this.$store.dispatch('online/update',{ id:this.order,data },{ root:true }).then(() => this.show_edit = false)
    }
  },
  watch: {
    show_edit(s){ if(!s) setTimeout((vm) => vm.edit_mode = false,250,this) },
    edit_mode(s){ if(s) setTimeout((vm) => vm.show_edit = true,250,this) },
  },
  created(){
    _.forEach(this.params,(val,key) => this.$set(this.params,key,_.get(this.item,key,null)))
  }
}
</script>
