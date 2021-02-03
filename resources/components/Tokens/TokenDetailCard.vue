<template>
  <q-card>
    <q-card-section class="bg-light-blue-3 q-pa-xs" v-if="!multiple"></q-card-section>
    <q-card-section class="bg-grey-2 row justify-between items-center q-py-sm">
      <div class="text-bold bg-light-blue q-py-xs q-px-sm text-white text-weight-bolder rounded-borders">{{ id }}</div>
      <div class="text-bold">{{ token_time }}</div>
    </q-card-section>
    <q-card-section class="row justify-between items-center q-py-xs">
      <q-chip square color="cyan-7" text-color="white" v-if="token.waiter"><q-avatar text-color="white"><q-icon name="local_dining" /></q-avatar>{{ token.waiter }}</q-chip>
      <q-chip square color="amber-9" text-color="white" v-if="token.seat"><q-avatar text-color="white"><q-icon name="deck" /></q-avatar>{{  token.seat }}</q-chip>
      <q-chip square color="accent" text-color="white" v-if="token.type !== 'Dining' && token.customer"><q-avatar text-color="white"><q-icon name="person_outline" /></q-avatar>{{  token.customer.name }}</q-chip>
      <q-chip square color="teal-9" text-color="white"><q-avatar text-color="white"><q-icon name="rule" /></q-avatar>{{  token.type }}</q-chip>
    </q-card-section>
    <q-list bordered class="bg-grey-1" separator>
      <TokenDetailCardItem v-for="item in token.items" :key="hKey(item)" :token="token" :item="item" :kitchen="kitchen" />
    </q-list>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import TokenDetailCardItem from "components/Tokens/TokenDetailCardItem";
import {h_key, time} from "assets/helpers";

export default {
  name: "TokenDetailCard",
  components: {TokenDetailCardItem},
  props: ['id','kitchen','multiple'],
  computed: {
    ...mapState({
      token: function ({ tokens:{ data,items },seating,users,customers }) { let token = _.get(data,this.id); return Object.assign({},token,{ waiter:_.get(users,['data',token.user,'name']),seat:_.get(seating,['data',token.seating,'name']),items:items[token.id],customer:_.get(customers,['data',token.customer]) }) },
    }),
    token_time(){ return time(this.token.date) }
  },
  methods: {
    hKey({ token,item,id }){ return h_key('token',token,'item','detail',item,'id',id) },
  }
}
</script>
