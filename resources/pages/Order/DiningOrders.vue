<template>
  <q-page padding v-scroll="scrolled">
    <Masonry width="280" :items="tokens">
      <template #item="token">
        <OrderSummaryWaiterItem :id="token.id" />
      </template>
    </Masonry>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-page-sticky v-show="fab || !tokens.length" position="bottom-right" :offset="offset">
        <q-fab icon="add" color="primary" glossy :to="{ name: 'order_new',params:{ seat:true,user:$route.meta.me.id,type:'Dining' } }" v-touch-pan.prevent.mouse="move" />
      </q-page-sticky>
    </transition>
  </q-page>
</template>

<script>
import OrderSummaryWaiterItem from "components/Order/OrderSummaryWaiterOrder";
import {h_key} from "assets/helpers";
import {mapState} from "vuex";
import { debounce } from 'quasar'
import Masonry from "components/Masonry";
export default {
  name: 'PageDiningOrders',
  components: {Masonry, OrderSummaryWaiterItem},
  data(){ return {
    fab: true, timeout: 0, offset: [24,24],
    progresses: ['New','Processing','Completed'],
  } },
  computed: {
    ...mapState('tokens',{
      tokens({ data }){ return _(data).filter(({ progress,type,user }) => this.progresses.includes(progress) && type === 'Dining' && _.includes(this.allowable_users,user)).value() },
    }),
    me(){ return _.get(this.$route,['meta','me','id']) },
    receptionists(){ return _(this.$store.state.users.data).filter(['role','Receptionist']).map(user => _.toSafeInteger(user.id)).value() },
    allowable_users(){ return _.concat(null,this.me,this.receptionists) }
  },
  methods: {
    hKey({ id }){ h_key('order','summary','order',id) },
    scrolled: debounce(function(){this.fab = false},500,true),
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] }
  },
  watch: {
    fab: {
      immediate: true,
      handler: function(s){ if(s) return; clearTimeout(this.timeout); this.timeout = setTimeout(vm => vm.fab = true,1500,this) }
    }
  }
}
</script>
