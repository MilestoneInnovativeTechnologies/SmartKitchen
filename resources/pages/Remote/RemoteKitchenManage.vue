<template>
  <q-page padding class="q-gutter-y-sm">
    <Jumbotron text="No remote kitchen feature enabled" class="text-center text-red" v-if="!remote" />
    <Jumbotron text="Remote Kitchen Reference is missing in subscription" class="text-center text-red" v-if="!reference" />
    <Jumbotron text="Remote kitchen client is not enabled" class="text-center text-red" v-if="!client" />
    <template v-if="remote && reference && client">
      <div class="text-center" v-if="Object.keys(remote_records).length === 0"><q-btn label="Load from Server" color="primary" icon="file_download" @click="load_data"/></div>
      <div v-else class="q-gutter-y-sm">
        <q-card v-for="(r_kitchen,ref) in remote_records" :key="ref">
          <q-card-section class="text-bold bg-secondary text-white flex justify-between"><div>{{ r_kitchen.name }} (Auto Accept: {{ r_kitchen.auto_accept }})</div><div>{{ r_kitchen._location }}</div></q-card-section>
          <q-list separator>
            <q-item v-for="(item,idx) in r_kitchen.items" :key="'rkm-rk-'+ref+'-ki-idx-'+idx">
              <q-item-section side><q-icon name="done_all" color="positive" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-positive text-bold">{{ item.item }}</q-item-label>
                <q-item-label caption>
                  <div class="flex justify-between"><div>Auto Process</div><div>{{ item.auto_process }}</div></div>
                  <div class="flex justify-between"><div>Auto Complete</div><div>{{ item.auto_complete }}</div></div>
                  <div class="flex justify-between"><div>Duration</div><div>{{ item.duration }}</div></div>
                  <div class="flex justify-between"><div>Stock</div><div>{{ item.stock }}</div></div>
                </q-item-label>
              </q-item-section>
              <q-item-section><q-icon name="forward" color="primary" /></q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-page>
</template>

<script>
import Jumbotron from "components/Jumbotron";
import {remote_query} from "assets/modules/Remote";
import {mapState} from "vuex";
const { CC71V,DP71V,KK99V } = require('boot/subscription').FEATURES
export default {
  name: 'PageRemoteKitchenManage',
  components: {Jumbotron},
  data(){ return {
    remote:CC71V === 'Yes',reference:_.trim(DP71V),client:KK99V === 'Yes',
    remote_records: {"EjMc1TYAFfdineP6cb1Z":{"status":"Active","_location":"RSP","name":"Modern Cloud","extra":null,"online":false,"_monitor":true,"auto_accept":"No","cloud":"Yes","users":[],"id":"EjMc1TYAFfdineP6cb1Z","items":[{"kitchen":"EjMc1TYAFfdineP6cb1Z","_location":"RSP","detail":"","auto_process":"Yes","stock":59,"status":"Active","item":"Samoosa","_monitor":false,"duration":60,"auto_complete":"Yes","extra":null,"id":"Z7s15Ul6cbmcVWt7nmeW"},{"status":"Active","_monitor":false,"duration":60,"auto_process":"Yes","_location":"RSP","auto_complete":"Yes","stock":38,"kitchen":"EjMc1TYAFfdineP6cb1Z","extra":null,"item":"Pazham Pori","detail":"","id":"bYTkcWA0UWWlslIVqQHn"},{"_location":"RSP","detail":"","status":"Active","item":"Pups","_monitor":false,"duration":60,"extra":null,"auto_process":"Yes","auto_complete":"Yes","kitchen":"EjMc1TYAFfdineP6cb1Z","stock":97,"id":"vveaWlP7DfX2vH4LgmA3"},{"stock":70,"duration":60,"kitchen":"EjMc1TYAFfdineP6cb1Z","status":"Active","_location":"RSP","extra":null,"_monitor":false,"auto_process":"Yes","detail":"","item":"Cutlet","auto_complete":"Yes","id":"yTDM6g5Ue9lPrx3abvvM"}]},"TVURCX43P0QC9LEAA3Bz":{"online":true,"name":"Heritage remote kitchen","users":[4],"status":"Active","cloud":"Yes","extra":null,"_location":"Rasp01","auto_accept":"Yes","_monitor":true,"id":"TVURCX43P0QC9LEAA3Bz","items":[{"_location":"Rasp01","detail":"","item":"Heritage Special Cake","stock":120,"auto_complete":"No","status":"Active","extra":null,"_monitor":true,"kitchen":"TVURCX43P0QC9LEAA3Bz","auto_process":"Yes","duration":60,"id":"zuITbHUGCSSpCIyIBTL3"}]}},
  } },
  computed: {
    ...mapState({ remotes:({ remote }) => remote.data }),
    local_records(){
      return _(this.remotes).filter(['item','kitchen_items']).value()
    },
  },
  methods: {
    load_data(){
      let $vm = this;
      Promise.all([remote_query('kitchens',[{ _monitor:true },{ _location:_BRANCH, operand: '!=' }],true),remote_query('kitchen_items',[{ _monitor:true },{ _location:_BRANCH, operand: '!=' }],true)])
        .then(function(snapsArray){
          let kitchensSnaps = snapsArray[0], itemsSnaps = snapsArray[1];
          kitchensSnaps.forEach(snap => $vm.$set($vm.remote_records,snap.id,{ ...(snap.data()),id:snap.id,items:[] }))
          itemsSnaps.forEach(snap => $vm.remote_records[snap.get('kitchen')].items.push({ ...(snap.data()),id:snap.id }))
        })
    }
  }
}
</script>
