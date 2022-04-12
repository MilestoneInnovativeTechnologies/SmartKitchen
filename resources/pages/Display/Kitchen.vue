<template>
  <q-page>
    <q-bar class="q-py-lg text-white" :class="'bg-' + color">
      <q-btn dense flat icon="kitchen" />
      <div>
        <q-select v-model="selected_kitchen" :options="Object.values(kitchens)" option-label="name" option-value="id" emit-value map-options borderless dark />
      </div>
      <q-space />
      <div style="font-size: 0.8rem">{{ time_now }}</div>
      <q-space />
      <q-btn dense flat :icon="skd.auto_accept === 'Yes' ? 'published_with_changes' : 'sync_problem'" :title="'Auto Accept - ' + skd.auto_accept" />
      <q-btn dense flat :icon="skd.cloud === 'Yes' ? 'cloud' : 'cloud_off'" :title="'Cloud - ' + skd.cloud" />
      <q-btn dense flat :icon="'print' + (skd.printer ? '' : '_disabled')" :title="skd.printer || 'No Printer Assigned'" />
      <q-btn dense flat :icon="'notifications' + (skd.status === 'Active' ? '' : '_off')" :title="'Status - ' + skd.status" />
      <q-btn dense flat icon="person_pin" :label="users[skd.full_timer].name" no-caps title="Full Timer" v-if="skd.full_timer" />
      <q-btn dense flat icon="groups" :label="user_names(skd.users).join(', ')" no-caps title="Chefs" v-if="skd.users && skd.users.length" />
    </q-bar>
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

  </q-page>
</template>

<script>

import Tokens from "assets/mixins/Tokens";
import {mapState} from "vuex";
import {image} from "assets/helpers";
import Masonry from "components/Masonry";

export default {
  name: 'DisplayKitchen',
  components: {Masonry},
  mixins: [Tokens],
  props: ['color'],
  data(){ return {
    selected_kitchen: null,
    time_now: '00:00:00'
  } },
  computed: {
    ...mapState({
      kitchens:state => state.kitchens.data,
      users:state => state.users.data,
    }),
    skd(){ return this.selected_kitchen ? _.assign({},_.get(this.kitchens,this.selected_kitchen),this.$store.state.kitchens.status[this.selected_kitchen]) : {} },
    Tokens(){
      return _.filter(this.tokens_own,(token) => ['New','Processing'].includes(token.progress) && _.some(token.items,item => _.get(item,['kitchen','id']) === this.selected_kitchen))
    }
  },
  methods: {
    user_names(users){ return _.map(users,user => _.truncate(_.get(this.users,[user,'name']),{ length:5,omission:'..' })) },
    lg: _.get, image,
  },
  created(){
    setInterval(vm => vm.time_now = new Date().toTimeString().split(" ")[0],1000,this)
  }
}
</script>
