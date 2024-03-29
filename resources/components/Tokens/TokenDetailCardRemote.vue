<template>
  <q-card>
    <q-card-section class="q-pa-xs" :class="dtColor" v-if="!multiple"></q-card-section>
    <q-card-section class="bg-grey-2 row justify-between items-center q-py-sm">
      <div class="text-bold text-white text-weight-bolder q-gutter-x-xs">
        <q-badge :label="remote_token.location" class="q-py-sm q-px-sm" :class="dtColor" />
        <q-badge v-show="token_ref" :label="token_ref" class="q-py-sm q-px-sm" :class="dtColor" />
      </div>
      <div class="text-bold">{{ token_time }}</div>
    </q-card-section>
    <q-list bordered class="bg-grey-1" separator>
      <TokenDetailCardItem v-for="item in items" :key="hKey(item)" :token="token" :item="item" :kitchen="kitchen" @photo="photo" :offline_reference="items_offline_reference[item.id]" />
    </q-list>
    <q-dialog persistent v-model="view_image">
      <q-card style="min-width: 75vw" flat>
        <q-bar class="bg-secondary text-white"><q-space /><q-btn dense flat icon="close" v-close-popup><q-tooltip content-class="bg-white text-primary">Close</q-tooltip></q-btn></q-bar>
        <q-card-section><q-img :src="image_url" /></q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import TokenDetailCardItem from "components/Tokens/TokenDetailCardItem";
import {h_key} from "assets/helpers";
import {token_delivery_readable} from "assets/module_helpers";
import {storage_url} from "assets/modules/Remote";

export default {
  name: "TokenDetailCardRemote",
  components: {TokenDetailCardItem},
  props: ['id','kitchen','multiple'],
  data(){ return {
    view_image: false,
    image_url: '',
  } },
  computed: {
    ...mapState({
      token: function ({ tokens:{ data,items },seating,users,customers }) { let token = _.get(data,this.id); return Object.assign({},token,{ waiter:_.get(users,['data',token.user,'name']),seat:_.get(seating,['data',token.seating,'name']),items:items[token.id],customer:_.get(customers,['data',token.customer]) }) },
      remote_token: function({ remote:{ data } }){ return _.find(data,({ local_id,item }) => item === 'tokens' && _.toInteger(local_id) === _.toInteger(this.id)) || {} },
      rtk: function(state){ return _.filter(state.remote.data,{ item:'tokens' }) },
      img_cache: function({ tokens:{ img } }){ return img }
    }),
    token_time(){ return this.token.date_human },
    token_ref(){ return this.remote_token.reference },
    items(){ return _(this.token.items).map(item => Object.assign({},item,iMap(item))).value() },
    items_offline_reference(){ return _(this.items).mapKeys(({ id }) => _.toInteger(id)).mapValues(({ id }) => _.get(_.find(this.$store.state.remote.data,{ local_id:parseInt(id),item:'token_items' }),['extra','offline_reference'])).value() },
    dtColor(){ return 'bg-' + this.items[0].say_color },
  },
  methods: {
    hKey({ token,item,id }){ return h_key('token',token,'item','detail',item,'id',id) },
    photo(name){
      if(_.has(this.img_cache,name)) return this.view_image = !!(this.image_url = this.img_cache[name]);
      storage_url(name).then(url => this.photo(name,this.$store.commit('tokens/image',{ name,url },{ root:true })))
    }
  }
}
function iMap({ deliver }){ return token_delivery_readable(deliver) }
</script>
