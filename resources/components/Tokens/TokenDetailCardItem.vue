<template>
  <q-item :disable="!eligible" v-if="item.progress !== 'Cancelled'">
    <q-item-section>
      <q-item-label v-if="eligible && wait" class="text-weight-bolder text-red" style="font-size: 0.8rem">Wait {{ item.delay - now }} seconds</q-item-label>
      <q-item-label v-if="eligible && item.narration && !wait" class="text-weight-bolder text-red" style="font-size: 0.8rem">{{ item.narration }}</q-item-label>
      <q-item-label><span class="text-weight-bolder">{{ item.quantity }}</span> x {{ name }}</q-item-label>
      <q-item-label caption :temp="next">{{ time }} {{ unit }} ago</q-item-label>
      <q-item-label caption v-if="item.kitchen && item.kitchen !== kitchen">Kitchen: {{ kName(item.kitchen) }}</q-item-label>
    </q-item-section>
    <q-item-section side v-if="item.progress === 'Processing' && eligible && !loading && !wait"><q-spinner-dots color="primary" size="2em" /></q-item-section>
    <q-item-section side>
      <q-badge :color="color[item.progress]" :label="item.progress" class="q-py-xs" />
    </q-item-section>
    <q-item-section side v-if="eligible && action.hasOwnProperty(item.progress)">
      <q-btn icon="reply_all" class="flip-horizontal" color="primary" @click="progress" round size="sm" />
    </q-item-section>
    <q-inner-loading v-if="eligible && (wait || loading)" :showing="true"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-item>
</template>

<script>
import {mapState} from "vuex";
import { TokenItemProgressColor } from "assets/assets";

export default {
  name: "TokenDetailCardItem",
  props: ['token','item','kitchen'],
  data(){ return {
    color: TokenItemProgressColor,
    action: { New:'accept', Accepted:'process', Processing:'complete' },
    now: _.toInteger(new Date().getTime()/1000),
    loading: false,
  } },
  computed: {
    ...mapState({
      name({ items:{ data }}){ return _.get(data,[this.item.item,'name']) },
      available({ kitchens:{ items } }){ return !!_.filter(_.get(items,this.kitchen),['item',this.item.item]).length }
    }),
    eligible(){ return this.item.kitchen === this.kitchen || (!this.item.kitchen && this.available) },
    since(){ return _.toInteger(_.get(_.last(this.item.progress_timing),'time')) },
    time(){ let s = this.now - this.since; let time = (s < 60) ? s : ((s < 3600) ? _.toInteger(s/60) : _.toInteger(s/3600)); return _.toInteger(time); },
    unit(){ let s = this.now - this.since; return (s < 60) ? 'seconds' : ((s < 3600) ? 'minutes' : 'hours') },
    wait(){ return (this.item.delay > 0 && this.now < this.item.delay)  },
    next(){ let now = this.now; return setTimeout((vm) => vm.now = _.toInteger(new Date().getTime()/1000),(this.wait || this.unit === 'seconds') ? 1000 : (this.unit === 'minutes' ? 60000 : 3600000),this) }
  },
  methods: {
    kName(id){ return _.get(this.$store.state.kitchens.data,[id,'name']) },
    progress(){
      this.loading = true;
      post('token',this.action[this.item.progress],{ id:this.item.id,kitchen:this.kitchen })
        .then(() => this.loading = false)
    },
  },
}
</script>
