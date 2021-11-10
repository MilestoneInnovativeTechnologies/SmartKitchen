<template>
  <q-page padding class="q-gutter-y-md">
    <div v-show="delivery_today_pending.length">
      <div class="text-h6 q-px-xs text-subtitle1">Today Deliverable Orders</div>
      <RemoteTokensList name="dpo" :tokens="delivery_today_pending" :customers="customers" :items="items" :kitchens="kitchens" :bills="token_bills" />
    </div>
    <div v-show="delivery_past_pending.length">
      <div class="text-h6 q-px-xs text-subtitle1">Pending Past Orders</div>
      <RemoteTokensList name="dpp" :tokens="delivery_past_pending" :customers="customers" :items="items" :kitchens="kitchens" :bills="token_bills" />
    </div>
    <div v-show="delivery_tomorrow.length">
      <div class="text-h6 q-px-xs text-subtitle1">Tomorrow Deliverable Orders</div>
      <RemoteTokensList name="tdo" :tokens="delivery_tomorrow" :customers="customers" :items="items" :kitchens="kitchens" :bills="token_bills" />
    </div>
    <div v-show="delivery_upcoming.length">
      <div class="text-h6 q-px-xs text-subtitle1">Upcoming Orders</div>
      <RemoteTokensList name="dup" :tokens="delivery_upcoming" :customers="customers" :items="items" :kitchens="kitchens" :bills="token_bills" />
    </div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab || !orders.length" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'orders_remote_new' }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {is_today, is_past_day, is_tomorrow, is_future_day, extract_date} from "assets/helpers";
import RemoteTokensList from "components/Order/RemoteTokensList";

export default {
  name: 'PageRemoteOrders',
  components: {RemoteTokensList},
  data(){ return {
    fab: true, offset: [24,24],
  } },
  computed: {
    ...mapState({ customers:state => state.customers.data,items:state => state.items.data,kitchens:state => state.kitchens.data }),
    ...mapState({ token_bills:state => _(state.bills.data).filter(({ progress }) => progress !== 'Cancelled').keyBy(({ token }) => _.toInteger(token)).value() }),
    ...mapGetters({ orders:'tokens/remote',progresses:'bills/token_progresses' }),
    delivery_today_pending(){ return _.filter(this.orders,({ items,id }) => _.some(items,({ deliver }) => is_today(deliver)) && (!this.is_paid(id) || have_non_served(items))) },
    delivery_past_pending(){ return _.filter(this.orders,({ items,id }) => _.some(items,({ deliver,progress }) => is_past_day(deliver,8)) && (!this.is_paid(id) || have_non_served(items))) },
    delivery_tomorrow(){ return _.filter(this.orders,({ items,id }) => _.some(items,({ deliver,progress }) => is_tomorrow(deliver)) && (!this.is_paid(id) || have_non_served(items))) },
    delivery_upcoming(){ return _(this.orders).filter(({ items,id }) => _.some(items,({ deliver }) => is_future_day(deliver,365) && !is_tomorrow(deliver)) && (!this.is_paid(id) || have_non_served(items))).sortBy(sort_delivery).value() },
  },
  methods: {
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] },
    is_paid(id){ return _.get(this.progresses,id) === 'Paid' }
  }
}

function filter({ progress }){ return ['New','Processing','Completed','Billed'].includes(progress) }
function filter_non_served({ progress }){ return ['New','Processing','Accepted','Completed'].includes(progress) }
function sort_delivery({ items }){ return _(items).map(({ deliver }) => extract_date(deliver,'YYYY-MM-DD HH:mm:ss').getTime()).min() }
function have_non_served(items){ return _.some(items,filter_non_served) }
</script>
