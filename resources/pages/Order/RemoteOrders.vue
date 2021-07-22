<template>
  <q-page padding class="q-gutter-y-md">
    <div v-show="delivery_today_pending.length">
      <div class="text-h6 q-px-xs text-subtitle1">Today Deliverable Orders</div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item v-for="token in delivery_today_pending" :key="hKey('dpo',token)" group="dpo" switch-toggle-side>
          <template v-slot:header>
            <q-item-section>
              <q-item-label v-if="token.customer">{{ customers[parseInt(token.customer)].name }}</q-item-label>
              <q-item-label caption>{{ token.date_human }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge :color="tpc[token.progress]" :label="token.progress" class="q-px-sm q-py-sm" />
            </q-item-section>
          </template>
          <q-card class="bg-grey-1">
            <q-card-section class="q-py-xs">
              <q-list separator>
                <q-item v-for="item in token.items" :key="hKey('roti',item)">
                  <q-item-section avatar><q-avatar square><img :src="image(items[item.item].image)"></q-avatar></q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.quantity }} x {{ items[item.item].name }}</q-item-label>
                    <q-item-label caption>Delivery On: {{ item.deliver_human }}</q-item-label>
                    <q-item-label caption v-if="item.kitchen">Kitchen: {{ kitchens[item.kitchen].name }}</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-badge :color="tipc[item.progress]" :label="item.progress" class="q-px-sm q-py-xs" /></q-item-section>
                  <q-item-section side v-if="cancelable.includes(item.progress)"><q-btn icon="close" color="red" dense round size="sm" @click="cancel(item,token,false)" /></q-item-section>
                  <q-item-section side v-if="serve_able.includes(item.progress)"><q-btn icon="how_to_reg" color="positive" dense round size="sm" @click="serve(item,token,false)" /></q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div v-show="delivery_past_pending.length">
      <div class="text-h6 q-px-xs text-subtitle1">Pending Past Orders</div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item v-for="token in delivery_past_pending" :key="hKey('dpp',token)" group="dpp" switch-toggle-side>
          <template v-slot:header>
            <q-item-section>
              <q-item-label v-if="token.customer">{{ customers[parseInt(token.customer)].name }}</q-item-label>
              <q-item-label caption>{{ token.date_human }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge :color="tpc[token.progress]" :label="token.progress" class="q-px-sm q-py-sm" />
            </q-item-section>
          </template>
          <q-card class="bg-grey-1">
            <q-card-section class="q-py-xs">
              <q-list separator>
                <q-item v-for="item in token.items" :key="hKey('roti',item)">
                  <q-item-section avatar><q-avatar square><img :src="image(items[item.item].image)"></q-avatar></q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.quantity }} x {{ items[item.item].name }}</q-item-label>
                    <q-item-label caption>Delivery On: {{ item.deliver_human }}</q-item-label>
                    <q-item-label caption v-if="item.kitchen">Kitchen: {{ kitchens[item.kitchen].name }}</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-badge :color="tipc[item.progress]" :label="item.progress" class="q-px-sm q-py-xs" /></q-item-section>
                  <q-item-section side v-if="cancelable.includes(item.progress)"><q-btn icon="close" color="red" dense round size="sm" @click="cancel(item,token,false)" /></q-item-section>
                  <q-item-section side v-if="serve_able.includes(item.progress)"><q-btn icon="how_to_reg" color="positive" dense round size="sm" @click="serve(item,token,false)" /></q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div v-show="delivery_tomorrow.length">
      <div class="text-h6 q-px-xs text-subtitle1">Tomorrow Deliverable Orders</div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item v-for="token in delivery_tomorrow" :key="hKey('tdo',token)" group="tdo" switch-toggle-side>
          <template v-slot:header>
            <q-item-section>
              <q-item-label v-if="token.customer">{{ customers[parseInt(token.customer)].name }}</q-item-label>
              <q-item-label caption>{{ token.date_human }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge :color="tpc[token.progress]" :label="token.progress" class="q-px-sm q-py-sm" />
            </q-item-section>
          </template>
          <q-card class="bg-grey-1">
            <q-card-section class="q-py-xs">
              <q-list separator>
                <q-item v-for="item in token.items" :key="hKey('roti',item)">
                  <q-item-section avatar><q-avatar square><img :src="image(items[item.item].image)"></q-avatar></q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.quantity }} x {{ items[item.item].name }}</q-item-label>
                    <q-item-label caption>Delivery On: {{ item.deliver_human }}</q-item-label>
                    <q-item-label caption v-if="item.kitchen">Kitchen: {{ kitchens[item.kitchen].name }}</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-badge :color="tipc[item.progress]" :label="item.progress" class="q-px-sm q-py-xs" /></q-item-section>
                  <q-item-section side v-if="cancelable.includes(item.progress)"><q-btn icon="close" color="red" dense round size="sm" @click="cancel(item,token,false)" /></q-item-section>
                  <q-item-section side v-if="serve_able.includes(item.progress)"><q-btn icon="how_to_reg" color="positive" dense round size="sm" @click="serve(item,token,false)" /></q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div v-show="delivery_tomorrow.length">
      <div class="text-h6 q-px-xs text-subtitle1">Upcoming Orders</div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item v-for="token in delivery_upcoming" :key="hKey('dup',token)" group="dup" switch-toggle-side>
          <template v-slot:header>
            <q-item-section>
              <q-item-label v-if="token.customer">{{ customers[parseInt(token.customer)].name }}</q-item-label>
              <q-item-label caption>{{ token.date_human }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge :color="tpc[token.progress]" :label="token.progress" class="q-px-sm q-py-sm" />
            </q-item-section>
          </template>
          <q-card class="bg-grey-1">
            <q-card-section class="q-py-xs">
              <q-list separator>
                <q-item v-for="item in token.items" :key="hKey('roti',item)">
                  <q-item-section avatar><q-avatar square><img :src="image(items[item.item].image)"></q-avatar></q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.quantity }} x {{ items[item.item].name }}</q-item-label>
                    <q-item-label caption>Delivery On: {{ item.deliver_human }}</q-item-label>
                    <q-item-label caption v-if="item.kitchen">Kitchen: {{ kitchens[item.kitchen].name }}</q-item-label>
                  </q-item-section>
                  <q-item-section side><q-badge :color="tipc[item.progress]" :label="item.progress" class="q-px-sm q-py-xs" /></q-item-section>
                  <q-item-section side v-if="cancelable.includes(item.progress)"><q-btn icon="close" color="red" dense round size="sm" @click="cancel(item,token,false)" /></q-item-section>
                  <q-item-section side v-if="serve_able.includes(item.progress)"><q-btn icon="how_to_reg" color="positive" dense round size="sm" @click="serve(item,token,false)" /></q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab || !orders.length" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'orders_remote_new' }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
    <q-dialog :value="!!confirm" persistent @before-hide="confirm = false">
      <q-card v-if="confirm">
        <q-card-section class="text-white" :class="'bg-'+property[prop][0]"><div class="text-h6">Are you sure???</div><div>{{ property[prop][1] }}</div></q-card-section>
        <q-card-section>
          <q-list dense separator>
            <q-item clickable><q-item-section>Customer</q-item-section><q-item-section side class="text-bold text-red">{{ customers[confirm.customer].name }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Token ID</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.token }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Order Date</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.date_human }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Deliver Date</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.deliver }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Item Name</q-item-section><q-item-section side class="text-bold text-red">{{ items[confirm.item].name }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Item Quantity</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.quantity }} </q-item-section></q-item>
          </q-list>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" v-close-popup />
          <q-btn :loading="loading" :color="property[prop][0]" class="q-px-md" label="Yes, Proceed" @click="prop === 'cancel' ? cancel(confirm,confirm,true) : serve(confirm,confirm,true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {h_key, image, is_today, is_past_day, is_tomorrow, is_future_day, extract_date} from "assets/helpers";
import {TokenItemProgressColor, TokenProgressColor} from "assets/assets";

export default {
  name: 'PageRemoteOrders',
  data(){ return {
    tpc: TokenProgressColor, tipc: TokenItemProgressColor,
    fab: true, offset: [24,24],
    confirm: false, loading: false,
    cancelable: ['New','Accepted'], serve_able: ['Completed'],
    prop:'', property: { cancel:['red','You are about to cancel an item of remote order'],serve:['positive','You are about to serve an item of remote order'] },
  } },
  computed: {
    ...mapState({ customers:state => state.customers.data,items:state => state.items.data,kitchens:state => state.kitchens.data }),
    ...mapGetters({ orders:'tokens/remote' }),
    delivery_today_pending(){ return _.filter(this.orders,({ items }) => _.some(items,({ deliver,progress }) => is_today(deliver) && filter_nap({ progress }))) },
    delivery_past_pending(){ return _.filter(this.orders,({ items }) => _.some(items,({ deliver,progress }) => is_past_day(deliver,8) && filter_nap({ progress }))) },
    delivery_tomorrow(){ return _.filter(this.orders,({ items }) => _.some(items,({ deliver,progress }) => is_tomorrow(deliver) && filter_nap({ progress }))) },
    delivery_upcoming(){ return _(this.orders).filter(({ items }) => _.some(items,({ deliver }) => is_future_day(deliver) && !is_tomorrow(deliver))).sortBy(sort_delivery).value() },
  },
  methods: {
    ip: is_tomorrow,
    hKey(item,{ id }){ return h_key(item,id) },
    image(url){ return image(url) },
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] },
    cancel(item,token,confirm){
      this.prop = 'cancel';
      if(!confirm) return this.confirm = Object.assign({},token,item,{ token:token.id }); this.loading = true; let vm = this;
      post('token','cancel',{ id:item.id }).then(() => vm.confirm = false).catch().then(() => this.loading = false);
    },
    serve(item,token,confirm){
      this.prop = 'serve';
      if(!confirm) return this.confirm = Object.assign({},token,item,{ token:token.id }); this.loading = true; let vm = this;
      post('token','served',{ id:item.id }).then(() => vm.confirm = false).catch().then(() => this.loading = false);
    }
  }
}

function filter({ progress }){ return ['New','Processing','Completed','Billed'].includes(progress) }
function filter_nap({ progress }){ return ['New','Processing','Accepted'].includes(progress) }
function sort_delivery({ items }){ return _(items).map(({ deliver }) => extract_date(deliver,'YYYY-MM-DD HH:mm:ss').getTime()).min() }
</script>
