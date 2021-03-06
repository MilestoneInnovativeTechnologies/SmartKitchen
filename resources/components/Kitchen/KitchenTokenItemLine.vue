<template>
  <q-item clickable v-ripple class="bg-grey-1" @click="$emit('action')">
<!--    <q-item-section avatar>{{ progress }}<q-avatar size="md" rounded text-color="white" :color="color">12</q-avatar></q-item-section>-->
    <q-item-section>
      <q-item-label class="text-bold" :class="'text-' + color">{{ progress }}</q-item-label>
      <q-item-label v-show="Wait" caption class="text-red text-bold">Wait: {{ Wait }}</q-item-label>
      <q-item-label v-if="prop('narration')" class="text-bold" caption>{{ prop('narration') }}</q-item-label>
      <q-item-label caption v-for="(quantity,type) in tCount" :key="hKey(progress,type,quantity)">{{ type }}: {{ quantity }}</q-item-label>
    </q-item-section>
    <q-item-section side><q-avatar size="md" rounded text-color="white" :color="color">{{ prop('total') }}</q-avatar></q-item-section>
    <q-inner-loading :showing="showing" transition-hide="fadeOut" transition-show="fadeIn"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-item>
</template>

<script>
import {TokenItemProgressColor} from "assets/assets";
import {h_key} from "assets/helpers";

let tmeOut = null;
export default {
  name: "KitchenTokenItemLine",
  props: ['progress','wait'],
  data(){ return { since: 0 } },
  computed: {
    color(){ return TokenItemProgressColor[this.progress] },
    Wait(){ let wait = _.toInteger(this.wait); return wait <= this.since ? 0 : wait - this.since },
    tTokens(){ return _.keys(this.prop('token')) },
    tCount(){ return _(this.prop('token')).groupBy('type').mapValues(Ary => _.sumBy(Ary,'quantity')).value() },
    showing: {
      get(){ return !!this.Wait },
      set(){ this.since = parseInt(this.wait) }
    }
  },
  methods: {
    prop(key){ return _.get(this.$attrs,key) },
    hKey(prg,type,qty){ return _.kebabCase(h_key(prg,type,qty)) }
  },
  watch: {
    since: {
      immediate: true,
      handler(){ return this.Wait ? setTimeout(vm => vm.since++,1000,this) : null }
    }
  }
}
</script>
