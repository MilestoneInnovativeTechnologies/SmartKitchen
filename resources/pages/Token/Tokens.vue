<template>
  <q-page padding>
    <div class="row q-col-gutter-xs" v-for="kitchen in my_kitchens" :key="hKey(kitchen,'kitchen',kitchen)">
      <div class="col-12 text-bold">{{ kitchen_details[parseInt(kitchen)].name }}</div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="token in tokens" :key="hKey(kitchen,'token',token)">
        <TokenDetailCard :id="token" :kitchen="kitchen" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import TokenDetailCard from "components/Tokens/TokenDetailCard";
import {h_key} from "assets/helpers";
export default {
  name: 'PageTokens',
  components: {TokenDetailCard},
  computed: {
    ...mapState('tokens',{ token_item:({ items }) => _(items).flatMap().filter(({ progress }) => ['New','Accepted','Processing'].includes(progress)).value() }),
    ...mapGetters('kitchens',['kitchen_items','kitchen_item_stocks']),
    ...mapState('kitchens',{ my_kitchens:'assign',kitchen_details:'data' }),
    my_kitchen_token_items(){ return _.filter(this.token_item,({ kitchen,item }) => _.includes(this.kitchen_items,_.toSafeInteger(item)) && (!kitchen || _.includes(this.my_kitchens,_.toSafeInteger(kitchen)))) },
    tokens(){ return _.uniq(_.map(this.my_kitchen_token_items,({ token }) => _.toSafeInteger(token))) }
  },
  methods: {
    hKey(kitchen,item,id){ return h_key('kitchen',kitchen,item,'detail',id) }
  }
}
</script>
