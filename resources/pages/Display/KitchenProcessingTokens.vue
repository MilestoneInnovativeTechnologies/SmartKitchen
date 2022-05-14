<template>
  <q-page>
    <q-bar class="q-py-lg text-white" :class="'bg-' + color">
      <q-btn dense flat icon="kitchen" />
      <div><q-select v-model="selected_kitchen" :options="Object.values(kitchens)" option-label="name" option-value="id" emit-value map-options borderless dark /></div>
      <q-space />
      <q-btn dense flat :icon="skd.auto_accept === 'Yes' ? 'published_with_changes' : 'sync_problem'" :title="'Auto Accept - ' + skd.auto_accept" />
      <q-btn dense flat :icon="skd.cloud === 'Yes' ? 'cloud' : 'cloud_off'" :title="'Cloud - ' + skd.cloud" />
      <q-btn dense flat :icon="'print' + (skd.printer ? '' : '_disabled')" :title="skd.printer || 'No Printer Assigned'" />
      <q-btn dense flat :icon="'notifications' + (skd.status === 'Active' ? '' : '_off')" :title="'Status - ' + skd.status" />
      <q-btn dense flat icon="person_pin" :label="users[skd.full_timer].name" no-caps title="Full Timer" v-if="skd.full_timer" />
      <q-btn dense flat icon="groups" :label="user_names(skd.users).join(', ')" no-caps title="Chefs" v-if="skd.users && skd.users.length" />
    </q-bar>
    <q-card flat>
      <q-card-section horizontal class="fit row">
        <q-card-section>
          <q-card class="q-mt-xs">
            <q-card-section :class="'bg-' + color" class="text-white q-py-xs text-center text-caption text-bold">{{ time_now }}</q-card-section>
            <q-list dense separator>
              <q-item v-for="(ary,idx) in data" :key="'kts-' + idx">
                <q-item-section><q-item-label caption class="text-bold">{{ ary[0] }}</q-item-label></q-item-section>
                <q-item-section side class="text-right text-bold">{{ ary[1] }}</q-item-section>
              </q-item>
            </q-list>
            <q-card-section :class="'bg-' + color" class="text-white q-py-xs text-center text-caption text-bold"></q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="col-grow q-pl-none">
          <Masonry :items="Tokens" :width="260" class="q-mt-xs" gutter="xs">
            <template #item="token">
              <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
                <q-card :key="'token-'+token.id">
                  <q-card-section class="text-white q-py-xs flex justify-between items-center text-caption text-weight-bold" :class="'bg-' + color">
                    <div>{{ token.type }}</div>
                    <transition appear enter-active-class="animated zoomIn text-red" leave-active-class="animated zoomOut" mode="out-in">
                      <div :key="token.progress">{{ token.progress }}</div>
                    </transition>
                  </q-card-section>
                  <q-list separator>
                    <q-item clickable v-for="item in token.items" :key="'token_item-' + item.id">
                      <q-item-section avatar><q-avatar rounded><img :src="image(lg(item,['item','image']))"></q-avatar></q-item-section>
                      <q-item-section>
                        <q-item-label>{{ lg(item,'quantity') }}x {{ lg(item,['item','name']) }}</q-item-label>
                        <q-item-label caption v-if="item.narration" class="text-red">{{ item.narration }}</q-item-label>
                        <transition appear :enter-active-class="'animated zoomIn text-' + color" leave-active-class="animated fadeOut" mode="out-in">
                          <q-item-label caption :key="item.progress" class="text-weight-bold">{{ item.progress }}</q-item-label>
                        </transition>
                        <q-item-label caption v-if="lg(item,['kitchen','id']) !== selected_kitchen">Kitchen: {{ lg(item,['kitchen','name']) }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-card-section class="text-white q-pa-none" :class="'bg-' + color">
                    <q-list separator dense>
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar class="text-weight-bold">{{ token.id }}</q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label v-if="token.waiter" style="font-size: 0.70rem">User: {{ token.waiter.name }}</q-item-label>
                          <q-item-label v-if="token.customer" style="font-size: 0.70rem">Customer: {{ token.customer.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </transition>
            </template>
          </Masonry>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import Tokens from "assets/mixins/Tokens";
import {mapState} from "vuex";
import {image, is_today} from "assets/helpers";
import Masonry from "components/Masonry";

export default {
  name: 'DisplayKitchenProcessingTokens',
  components: {Masonry},
  mixins: [Tokens],
  props: ['color'],
  data(){ return {
    selected_kitchen: null,
    time_now: '00:00:00',
    summary: {
      Tokens:'Total Tokens',tokens_new:'New Tokens',
      tokens_processing:'Processing Tokens',token_items:'Total Items',items_accepted:'Process Pending Items',items_processing:'Processing Items',
      tokens_today:'Tokens Today', token_items_processed_today:'Items Processed Today'
    }
  } },
  computed: {
    ...mapState({
      kitchens:state => state.kitchens.data,
      users:state => state.users.data,
    }),
    skd(){ return this.selected_kitchen ? _.assign({},_.get(this.kitchens,this.selected_kitchen),this.$store.state.kitchens.status[this.selected_kitchen]) : {} },
    Tokens(){ return _.filter(this.tokens,({ progress,items }) => ['New','Processing'].includes(progress) && any_item_in_kitchen(items,this.selected_kitchen) && not_all_completed(items,this.selected_kitchen)) },
    tokens_new(){ return _.filter(this.Tokens,['progress','New']) },
    tokens_processing(){ return _.filter(this.Tokens,['progress','Processing']) },
    token_items(){ return _(this.Tokens).flatMap('items').filter(item => _.get(item,['kitchen','id']) === this.selected_kitchen).value() },
    items_accepted(){ return _(this.token_items).filter(['progress','Accepted']).value() },
    items_processing(){ return _(this.token_items).filter(['progress','Processing']).value() },
    data(){ return _.map(this.summary,(title,fn) => [title,_.size(this[fn])]) },
    tokens_today(){ return _(this.tokens).filter(token => is_today(token.date)).filter(token => any_item_in_kitchen(token.items,this.selected_kitchen)).value() },
    token_items_today(){ return _(this.tokens_today).flatMap('items').filter(item => _.get(item,['kitchen','id']) === this.selected_kitchen).value() },
    token_items_processed_today(){ return _.filter(this.token_items_today,item => ['Completed','Served'].includes(item.progress)) },
    item_processed(){ return _(this.token_items_today).countBy(item => _.get(item,['item','name'])).map((count,item) => [item,count]).sortBy(ary => ary[1]).reverse().value() },
    least_stock_items(){ return _(_.get(this.$store.state.kitchens,['items',this.selected_kitchen])).sortBy('stock').map(ki => [_.get(this.$store.state.items.data,[ki.item,'name']),ki.stock]).value() }
  },
  methods: {
    user_names(users){ return _.map(users,user => _.truncate(_.get(this.users,[user,'name']),{ length:5,omission:'..' })) },
    lg: _.get, image,
  },
  created(){
    setInterval(vm => vm.time_now = new Date().toTimeString().split(" ")[0],1000,this)
  }
}

function any_item_in_kitchen(items,kitchen){ return _.some(items,item => _.get(item,['kitchen','id']) === kitchen) }
function not_all_completed(items,kitchen){ return _(items).filter(item => ['Accepted','Processing'].includes(item.progress)).filter(item => _.get(item,['kitchen','id']) === kitchen).size() > 0 }
</script>
