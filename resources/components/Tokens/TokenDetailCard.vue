<template>
  <q-card>
    <q-card-section class="bg-light-blue-3 q-pa-xs"></q-card-section>
    <q-card-actions>
      <div class="text-bold">ID: {{ token.id }}</div><q-space /><q-badge :label="token.type" />
    </q-card-actions>
    <q-list bordered>
      <TokenDetailCardItem v-for="item in items" :key="hKey(item)" :token="token" v-bind="item" :user_kitchen="kitchen" />
    </q-list>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import TokenDetailCardItem from "components/Tokens/TokenDetailCardItem";
import {h_key} from "assets/helpers";

export default {
  name: "TokenDetailCard",
  components: {TokenDetailCardItem},
  props: ['id','kitchen'],
  computed: {
    ...mapState('tokens',{ all:'data',token_items:'items' }),
    token(){ return _.get(this.all,_.toSafeInteger(this.id)) },
    items(){ return this.token_items[this.token.id] }
  },
  methods: {
    hKey({ token,item,id }){ return h_key('token',token,'detail','item',item,'id',id) }
  }
}
</script>
