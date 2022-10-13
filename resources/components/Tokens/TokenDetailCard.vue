<template>
  <q-card>
    <q-card-section class="q-pa-xs" :class="dtColor" v-if="!multiple"></q-card-section>
    <q-card-section class="bg-grey-2 row justify-between items-center q-py-sm">
      <div class="text-bold q-py-xs q-px-sm text-white text-weight-bolder rounded-borders" :class="dtColor">{{ id }}</div>
      <div class="text-bold">{{ token_time }}</div>
    </q-card-section>
    <q-card-section class="row justify-between items-center q-py-xs">
      <q-chip square color="cyan-7" text-color="white" v-if="token.waiter"><q-avatar text-color="white"><q-icon name="local_dining" /></q-avatar>{{ token.waiter.name }}</q-chip>
      <q-chip square color="amber-9" text-color="white" v-if="token.seating"><q-avatar text-color="white"><q-icon name="event_seat" /></q-avatar>{{  token.seating.name }}</q-chip>
      <q-chip square color="accent" text-color="white" v-if="token.type !== 'Dining' && token.customer"><q-avatar text-color="white"><q-icon name="person_outline" /></q-avatar>{{  token.customer.name }}</q-chip>
      <q-chip square color="teal-9" text-color="white"><q-avatar text-color="white"><q-icon name="rule" /></q-avatar>{{  token.type }}</q-chip>
    </q-card-section>
    <q-list bordered class="bg-grey-1" separator>
      <TokenDetailCardItem v-for="item in token.items" :key="hKey(item)" :token="token" :item="item" :kitchen="kitchen" />
    </q-list>
    <BrowserPrintCardActions :token="token" />
  </q-card>
</template>

<script>
import TokenDetailCardItem from "components/Tokens/TokenDetailCardItem";
import {h_key, time} from "assets/helpers";
import {DiningTypeColor} from "assets/assets";
import Tokens from "assets/mixins/Tokens";
import BrowserPrintCardActions from "components/BrowserPrintCardActions";

export default {
  name: "TokenDetailCard",
  components: {BrowserPrintCardActions, TokenDetailCardItem},
  props: ['id','kitchen','multiple'],
  mixins: [Tokens],
  computed: {
    token(){ return _.find(this.tokens,['id',this.id]) },
    token_time(){ return time(this.token.date) },
    dtColor(){ return 'bg-' + DiningTypeColor[this.token.type] }
  },
  methods: {
    hKey({ token,item,id }){ return h_key('token',token,'item','detail',item,'id',id) },
  }
}
</script>
