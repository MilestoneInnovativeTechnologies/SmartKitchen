<template>
  <q-page padding class="q-gutter-y-sm">
    <Jumbotron text="No remote kitchen feature enabled" class="text-center text-red" v-if="!remote" />
    <Jumbotron text="Remote Kitchen Reference is missing in subscription" class="text-center text-red" v-if="!reference" />
    <Jumbotron text="Remote kitchen client is not enabled" class="text-center text-red" v-if="!client" />
    <template v-if="remote && reference && client">
      <div class="text-center" v-if="Object.keys(remote_records).length === 0"><q-btn label="Load from Server" color="primary" icon="file_download" @click="load_data"/></div>
      <div v-else class="q-gutter-y-sm">
        <q-card v-for="(r_kitchen,ref) in remote_records" :key="ref">
          <q-card-section class="text-bold bg-secondary text-white flex justify-between items-center"><div><q-icon name="done_all" color="white" size="xs" v-show="local_records.hasOwnProperty(ref)" /> {{ r_kitchen.name }} (Auto Accept: {{ r_kitchen.auto_accept }})</div><div>{{ r_kitchen._location }}</div></q-card-section>
          <q-list separator>
            <q-item v-for="(item,idx) in r_kitchen.items" :key="'rkm-rk-'+ref+'-ki-idx-'+idx">
              <q-item-section top>
                <q-item-label class="text-positive text-bold">{{ item.item }}</q-item-label>
                <q-item-label caption>
                  <div class="flex justify-between"><div>Auto Process</div><div>{{ item.auto_process }}</div></div>
                  <div class="flex justify-between"><div>Auto Complete</div><div>{{ item.auto_complete }}</div></div>
                  <div class="flex justify-between"><div>Duration</div><div>{{ item.duration }}</div></div>
                  <div class="flex justify-between"><div>Stock</div><div>{{ item.stock }}</div></div>
                </q-item-label>
              </q-item-section>
              <q-item-section side class="text-center"><q-icon name="forward" color="primary" /></q-item-section>
              <q-item-section v-bind="{ top:kitchen_item_locally_exists(ref,item.id) }">
                <template v-if="kitchen_item_locally_exists(ref,item.id)">
                  <q-item-label class="text-positive text-bold">{{ kitchen_item_name(ref,item.id) }}</q-item-label>
                  <q-item-label caption>
                    <div class="flex justify-between" v-for="(price,list,idx2) in kitchen_item_prices(ref,item.id)" :key="'rkm-rk-'+ref+'-ki-idx-'+idx+'-pr-'+idx2"><div>{{ list }}</div><div>{{ price }}</div></div>
                  </q-item-label>
                </template>
                <div v-else class="text-center"><q-btn label="Add" color="secondary" @click="manage = {ref,item}" /></div>
              </q-item-section>
              <q-item-section side v-show="kitchen_item_locally_exists(ref,item.id)"><q-btn icon="edit" round dense flat color="primary" @click="manage = {ref,item}" /></q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <q-dialog persistent v-model="manage">
        <RemoteKitchenItemManage :style="popup_width()" v-bind="manage_attrs" @close="manage = false" />
      </q-dialog>
    </template>
  </q-page>
</template>

<script>
import Jumbotron from "components/Jumbotron";
import {remote_query} from "assets/modules/Remote";
import {mapGetters, mapState} from "vuex";
import {popup_width} from "assets/helpers";
import RemoteKitchenItemManage from "components/Remote/RemoteKitchenItemManage";
const { CC71V,DP71V,KK99V } = require('boot/subscription').FEATURES
export default {
  name: 'PageRemoteKitchenManage',
  components: {RemoteKitchenItemManage, Jumbotron},
  data(){ return {
    remote:CC71V === 'Yes',reference:_.trim(DP71V),client:KK99V === 'Yes',
    remote_records: {},
    v_manage: null
  } },
  computed: {
    ...mapState({ remotes:state => state.remote.data, kitchen_master:state => state.kitchens.data, kitchen_items:state => state.kitchens.items, item_master:state => state.items.data, price_master:state => state.prices.list }),
    ...mapGetters({ prices:'items/prices' }),
    kitchen_item_reference(){ return _(this.remotes).filter(['item','kitchen_items']).mapKeys('local_id').mapValues('reference').value() },
    local_records(){ return _(this.remotes).filter(['item','kitchens']).mapKeys('reference').mapValues(rmt => Object.assign({},rmt,_.get(this.kitchen_master,rmt.local_id),{ items: this.kitchen_item_details(rmt.local_id) })).value() },
    manage: {
      get(){ return !_.isNull(this.v_manage) },
      set(data){ this.v_manage = data ? [data.ref,data.item] : null }
    },
    manage_attrs(){
      let vm = this.v_manage;
      return vm ? { local:_.get(this.local_records,vm[0]),remote:_.get(this.remote_records,vm[0]),item:vm[1] } : null
    }
  },
  methods: {
    popup_width,
    load_data(){
      let $vm = this;
      Promise.all([remote_query('kitchens',[{ _monitor:true },{ _location:_BRANCH, operand: '!=' }],true),remote_query('kitchen_items',[{ _monitor:true },{ _location:_BRANCH, operand: '!=' }],true)])
        .then(function(snapsArray){
          let kitchensSnaps = snapsArray[0], itemsSnaps = snapsArray[1];
          kitchensSnaps.forEach(snap => $vm.$set($vm.remote_records,snap.id,{ ...(snap.data()),id:snap.id,items:[] }))
          itemsSnaps.forEach(snap => $vm.remote_records[snap.get('kitchen')].items.push({ ...(snap.data()),id:snap.id }))
        })
    },
    kitchen_item_locally_exists(kitchen,item){ return _.has(this.local_records,[kitchen,'items',item]) },
    kitchen_item_details(kitchen){ return _(_.get(this.kitchen_items,kitchen)).map(({ id,item }) => Object.assign({},_.get(this.item_master,item),{ reference:_.get(this.kitchen_item_reference,id) },{ prices: _.mapKeys(_.get(this.prices,item),(r,pid) => _.get(this.price_master,[pid,'name'])) })).mapKeys('reference').value(); },
    kitchen_item_name(k_ref,i_ref){ return _.get(this.local_records,[k_ref,'items',i_ref,'name']) },
    kitchen_item_prices(k_ref,i_ref){ return _.get(this.local_records,[k_ref,'items',i_ref,'prices']) },
  }
}
</script>
