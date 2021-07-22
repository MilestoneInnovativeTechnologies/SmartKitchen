<template>
  <q-card :flat="!card">
    <q-card-section v-if="card" class="bg-grey-2">
      <div class="text-bold">{{ kitchen.name }}</div>
    </q-card-section>
    <q-card-section v-show="Tokens.length === 0" class="text-center">NO TOKENS</q-card-section>
    <q-card-section v-show="Tokens.length !== 0" class="q-pa-none q-ma-none">
      <q-card-section class="row q-col-gutter-sm" v-show="mode === 'Item'">
        <Masonry width="250" :items="items">
          <template #item="item">
            <KitchenTokenItem :kitchen="id" :details="item.item" :item="getItem(item.item)" :stock="getStock(item.item)" />
          </template>
        </Masonry>
      </q-card-section>
      <q-card-section class="row q-col-gutter-sm" v-show="mode === 'Progress'">
        <div class="col-xs-12 col-sm-4"><KitchenTokenBundle :kitchen="id" type="New" stock="true" action="true" /></div>
        <div class="col-xs-12 col-sm-4"><KitchenTokenBundle :kitchen="id" type="Accepted" action="true" /></div>
        <div class="col-xs-12 col-sm-4"><KitchenTokenBundle :kitchen="id" type="Processing" action="true" /></div>
      </q-card-section>
      <q-card-section class="row q-col-gutter-sm" v-show="mode === 'Token'">
        <Masonry width="320" gutter="xs" :items="cloud ? sTokens : Tokens">
          <template #item="token">
            <component :is="cloud ? 'TokenDetailCardRemote' : 'TokenDetailCard'" :id="token.id" :kitchen="kitchen.id" :multiple="card" />
          </template>
        </Masonry>
      </q-card-section>
    </q-card-section>
    <q-dialog persistent v-model="reset"><KitchenItemCancel :kitchen="id"  style="width: 80vw; max-width: 330px" @cancel="doReset" :cancelling="cancelling" /></q-dialog>
  </q-card>
</template>

<script>
import TokenDetailCard from "components/Tokens/TokenDetailCard";
import {mapState,mapGetters} from "vuex";
import {attention, h_key} from "assets/helpers";
import KitchenTokenBundle from "components/Kitchen/KitchenTokenBundle";
import KitchenTokenDisplayMode from "components/Kitchen/KitchenTokenDisplayMode";
import KitchenItemCancel from "components/Kitchen/KitchenItemCancel";
import Tokens from "assets/mixins/Tokens";
import KitchenTokenItem from "components/Kitchen/KitchenTokenItem";
import Masonry from "components/Masonry";
import TokenDetailCardRemote from "components/Tokens/TokenDetailCardRemote";
import {tokens_sort_item_delivery_fn} from "assets/module_helpers";

export default {
  name: "KitchenTokens",
  mixins: [Tokens],
  components: {
    TokenDetailCardRemote, Masonry,
    KitchenTokenItem, KitchenItemCancel, KitchenTokenDisplayMode, KitchenTokenBundle, TokenDetailCard},
  props: ['id','card'],
  data(){ return {
    processing: ['Accepted','Processing'],
    cancelling: false,
  } },
  computed: {
    ...mapState({
      kitchen({ kitchens:{ data } }){ return _.get(data,_.toInteger(this.id)) },
      kItems({ kitchens:{ items } }){ return _.map(items[this.kitchen.id],'item') },
    }),
    cloud(){ return this.kitchen.cloud === 'Yes' },
    mode(){ return _.get(this.$store.state,['public','mode'],'Token') },
    reset: {
      get(){ return _.get(this.$store.state,['public','reset'],false) },
      set(state){ return this.$store.commit('public',{ reset: !!state }) },
    },
    ...mapGetters('kitchens',['stock']),
    pView(){ return this.$q.screen.width > 799 },
    Tokens(){ return _(this.tokens).filter(({ progress,items }) => ['New','Processing'].includes(progress) && _.some(items,this.isAct)).value() },
    items(){ return _(this.Tokens).flatMap(({ items,type }) => _(items).filter(this.isAct).map(item => Object.assign({},item,{ type })).value()).groupBy('item.id').value() },
    sTokens(){ return _.sortBy(this.Tokens,({ items }) => tokens_sort_item_delivery_fn(items)) },
  },
  methods: {
    hKey({ id },item){ return h_key('kitchen',this.id,item,'detail',id) },
    isAct({ item:{ id },progress,kitchen }){ return (progress === 'New' && _.includes(this.kItems,id)) || (kitchen && kitchen.id === this.kitchen.id && this.processing.includes(progress)) },
    doReset(selected){ if(selected.length) this.cancelling = true; this.post(0,selected,this.id) },
    getItem(Ary){ return _.get(Ary,[0,'item']) },
    getStock(Ary){ return _.get(this.stock,this.getItem(Ary)['id']) },
    post(idx,ids,kitchen){
      if(!ids || ids.length === 0 || ids.length <= idx) return this.reset = this.cancelling = false;
      post('token','reset',{ id:ids[idx],kitchen }).then(() => setTimeout(this.post,300,idx+1,ids,kitchen))
    }
  },
  watch: {
    Tokens(Nw,Ol){ if(!Ol || Nw.length > Ol.length) attention() }
  }
}
</script>
