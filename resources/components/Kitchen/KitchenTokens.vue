<template>
  <q-card :flat="!card">
    <q-card-section v-if="card" class="bg-grey-2"><div class="text-bold">{{ kitchen.name }}</div></q-card-section>
    <q-card-section class="row q-col-gutter-sm" v-if="tokens.length">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="token in tokens" :key="hKey(token)">
        <TokenDetailCard :id="token" :kitchen="kitchen.id" :multiple="card" />
      </div>
    </q-card-section>
    <q-card-section v-else class="text-center">
      NO TOKENS
    </q-card-section>
  </q-card>
</template>

<script>
import TokenDetailCard from "components/Tokens/TokenDetailCard";
import {mapState} from "vuex";
import {h_key} from "assets/helpers";

export default {
  name: "KitchenTokens",
  components: {TokenDetailCard},
  props: ['id','card'],
  data(){ return {
    processing: ['Accepted','Processing']
  } },
  computed: mapState({
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
