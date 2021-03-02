<template>
  <q-card>
    <CardImageTitle :title="item.name" :image="src" />
    <q-card-section class="row items-center q-py-sm">
      <div class="text-primary text-bold">Stock</div><q-space /><q-avatar size="md" text-color="white" rounded color="primary">{{ iStock }}</q-avatar>
    </q-card-section>
    <q-list bordered dense>
      <template v-for="(itemObj,progress) in data">
        <q-item :class="bgClrCls(progress)" dense>
          <q-item-section avatar><q-avatar><q-icon name="file_download" color="white" /></q-avatar></q-item-section>
          <q-item-section><q-item-label header class="text-white text-bold">{{ progress }}</q-item-label></q-item-section>
        </q-item>
        <transition-group appear enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" mode="out-in">
          <KitchenTokenItemLine v-for="(detail,key) in itemObj" :key="hKey(key)" v-bind="detail" :progress="progress" @action="selected = [progress,detail]" />
        </transition-group>
      </template>
    </q-list>
    <q-card-section class="text-center text-bold">{{ total ? ('Total: ' + total) : 'No Items' }}</q-card-section>
    <q-dialog persistent :value="!!selected.length"><KitchenTokenItemAction v-bind="selected[1]" style="width: 50vw; max-width: 330px" @progress="progress" /></q-dialog>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {crypt, h_key, image, now} from "assets/helpers";
import KitchenTokenItemLine from "components/Kitchen/KitchenTokenItemLine";
import {TokenItemProgressColor} from "assets/assets";
import KitchenTokenItemAction from "components/Kitchen/KitchenTokenItemAction";

let tmeOut = null;
export default {
  name: "KitchenTokenItem",
  components: {KitchenTokenItemAction, KitchenTokenItemLine, CardImageTitle},
  data(){ return {
    src: image(this.item.image), selected: [],
    waits: [], showing: true,
    status: { New:'accept', Accepted:'process', Processing:'complete' },
  } },
  props: ['details','item','kitchen','stock'],
  computed: {
    data(){ let waits = this.waits.length; return _.mapValues(_.groupBy(this.details,'progress'),this.dist) },
    iStock(){ return _.get(this.stock,this.kitchen) },
    total(){ return _.sumBy(this.details,'quantity') },
  },
  methods: {
    hKey(key){ return h_key('kitchen',this.kitchen,'token','item','line',key) },
    dist(items){ return _(items).groupBy(this.crypt).mapValues(this.itmObj).value() },
    itmObj(itmAry){ let itm = itmAry[0]; return Object.assign({},this.pure(itm),{ total: _.sumBy(itmAry,'quantity'),token: _(itmAry).keyBy('token').mapValues(({ token,id,user,quantity }) => new Object({ token,id,user,quantity })).value() }) },
    pure({ item:{ id,name },delay,narration }){ return { wait:this.getWait(delay),narration,name,item:id } },
    crypt({ delay,item:{ id },narration }){ return crypt([id,this.getWait(delay),narration].join('|')) + '' },
    getWait(delay){ let wait = _.toInteger(delay) - now(); if(wait < 0) return 0; if(!this.waits.includes(wait)) this.waits.push(wait); return wait; },
    bgClrCls(progress){ return 'bg-' + TokenItemProgressColor[progress] },
    progress(selected){ this.post(this.selected[0],0,selected,this.kitchen) },
    post(progress,idx,ids,kitchen){
      if(!ids || ids.length <= idx) return this.selected = [];
      post('token',this.status[progress],{ id:ids[idx],kitchen }).then(() => setTimeout(this.post,300,progress,idx+1,ids,kitchen))
    }
  },
  watch: {
    waits(Ary){ return Ary.length ? tmeOut = setTimeout(vm => vm.waits = [],_.min(this.waits)*1000,this,clearTimeout(tmeOut)) : null },
  }
}
</script>
