<template>
  <q-card :flat="!card">
    <q-card-section v-if="card" class="bg-grey-2 row items-center"><div class="text-bold">{{ kitchen.name }}</div><q-space /><KitchenTokenDisplayMode v-if="pView" @mode="mode = $event" /></q-card-section>
    <q-card-section v-else-if="pView" class="row items-center"><div>&nbsp;</div><q-space /><KitchenTokenDisplayMode @mode="mode = $event" /></q-card-section>
    <q-card-section class="row q-col-gutter-sm" v-show="tokens.length && pView && (mode === 'progress' || mode === 'both')">
      <div class="col-4"><KitchenTokenBundle :kitchen="id" type="New" stock action="true" /></div>
      <div class="col-4"><KitchenTokenBundle :kitchen="id" type="Accepted" action="true" /></div>
      <div class="col-4"><KitchenTokenBundle :kitchen="id" type="Processing" action="true" /></div>
    </q-card-section>
    <hr v-show="mode === 'both'" />
    <q-card-section class="row q-col-gutter-sm" v-show="tokens.length && (mode === 'token' || mode === 'both')">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="token in tokens" :key="hKey(token)">
        <TokenDetailCard :id="token" :kitchen="kitchen.id" :multiple="card" />
      </div>
    </q-card-section>
    <q-card-section v-if="tokens.length === 0" class="text-center">
      NO TOKENS
    </q-card-section>
  </q-card>
</template>

<script>
import TokenDetailCard from "components/Tokens/TokenDetailCard";
import {mapState} from "vuex";
import {h_key} from "assets/helpers";
import KitchenTokenBundle from "components/Kitchen/KitchenTokenBundle";
import KitchenTokenDisplayMode from "components/Kitchen/KitchenTokenDisplayMode";

export default {
  name: "KitchenTokens",
  components: {KitchenTokenDisplayMode, KitchenTokenBundle, TokenDetailCard},
  props: ['id','card'],
  data(){ return {
    processing: ['Accepted','Processing'],
    mode: 'both',
  } },
  computed: mapState({
    pView(){ return this.$q.screen.width > 799 },
    kitchen:function({ kitchens:{ data } }){ return _.get(data,_.toInteger(this.id)) },
    items: function({ kitchens:{ items } }){ return _.map(items[this.kitchen.id],'item') },
    tokens: function({ tokens: { items } }){ return _(items).flatMap().map((ti) => this.isAct(ti) ? ti.token : null).filter().uniq().value() },
  }),
  methods: {
    hKey(token){ return h_key('kitchen',this.id,'tokens','detail',token) },
    isAct({ item,progress,kitchen }){ return (kitchen === this.kitchen.id && this.processing.includes(progress)) || (progress === 'New' && _.includes(this.items,item)) }
  }
}
</script>
