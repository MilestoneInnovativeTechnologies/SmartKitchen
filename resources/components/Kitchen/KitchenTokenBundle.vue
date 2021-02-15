<template>
  <q-card>
    <q-card-section :class="colClass" class="text-white text-bold">{{ type }}</q-card-section>
    <q-list bordered separator v-show="Object.keys(dist).length > 0">
      <transition-group appear enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" mode="out-in">
        <KitchenTokenBundleItem v-for="(bind,key) in dist" :key="hKey(key)" :identify="key" v-bind="bind" :show-stock="stock" :processing="processing.includes(key)" @proceed="item = $event" />
      </transition-group>
    </q-list>
    <q-card-section class="text-center text-bold">{{ total ? ('Total: ' + total) : 'No Items' }}</q-card-section>
    <q-dialog v-if="action !== undefined" persistent v-model="dialog"><KitchenTokenBundleAction v-bind="dist[item]" @progress="progress"  style="width: 50vw; max-width: 330px" /></q-dialog>
  </q-card>
</template>

<script>
import {TokenItemProgressColor} from "assets/assets";
import Tokens from "assets/mixins/Tokens";
import {crypt, h_key, now} from "assets/helpers";
import {mapState} from "vuex";
import KitchenTokenBundleItem from "components/Kitchen/KitchenTokenBundleItem";
import KitchenTokenBundleAction from "components/Kitchen/KitchenTokenBundleAction";

export default {
  name: "KitchenTokenBundle",
  components: {KitchenTokenBundleAction, KitchenTokenBundleItem},
  mixins: [Tokens],
  props: ['kitchen','type','stock','action'],
  data(){ return {
    colClass: 'bg-' + TokenItemProgressColor[this.type],
    waits: [], timeout: 0, item: null, processing: [],
    status: { New:'accept', Accepted:'process', Processing:'complete' },
  } },
  computed: {
    ...mapState({
      kItems({ kitchens:{ items } }){ return _.map(items[this.kitchen],({ item,stock }) => Object.assign({},{ item,stock })) },
      items(){ return _(this.tokens).flatMap('items').filter(this.isAct).value() },
      dist(){ return _(this.items).groupBy(this.crypt).mapValues(this.itmObj).value() },
      total(){ return _.sumBy(Object.values(this.dist),'total') },
    }),
    dialog: {
      get(){ return !!this.item },
      set(status){ this.item = !status ? null : status }
    }
  },
  methods: {
    hKey(key){ return h_key('kitchen',this.id,'tokens','bundle',key) },
    isAct({ item,progress,kitchen }){ return (!kitchen && progress === 'New' && this.type === 'New' && _.some(this.kItems,['item',item.id])) || (kitchen && kitchen.id === _.toInteger(this.kitchen) && this.type === progress) },
    itmObj(itmAry){ let itm = itmAry[0]; return Object.assign({},this.pure(itm),{ total: _.sumBy(itmAry,'quantity'),token: _(itmAry).keyBy('token').mapValues(({ token,id,user,quantity }) => new Object({ token,id,user,quantity })).value() }) },
    crypt({ delay,item:{ id },narration }){ return crypt([id,this.getWait(delay),narration].join('|')) + '' },
    pure({ item:{ id,name },delay,narration }){ return { wait:this.getWait(delay),narration,name,item:id,stock:_.get(_.find(this.kItems,['item',id]),'stock') } },
    getWait(delay){ let wait = _.toInteger(delay) - now(); if(wait < 0) return 0; if(!this.waits.includes(wait)) this.waits.push(wait); return wait; },
    progress(selected){
      let item = this.item; if(selected.length) this.processing.push(item); this.dialog = false;
      this.post(0,selected,item,this.kitchen)
    },
    post(idx,ids,item,kitchen){
      if(ids.length <= idx) return this.processing = _.difference(this.processing,[item])
      post('token',this.status[this.type],{ id:ids[idx],kitchen }).then(() => setTimeout(this.post,300,idx+1,ids,item,kitchen))
    }
  },
  watch: {
    waits: {
      immediate: true,
      handler(waits){ if(!waits.length) return; let wait = _.min(waits) * 1000; clearTimeout(this.timeout); this.timeout = setTimeout(vm => vm.waits = [],wait,this); }
    }
  }
}
</script>
