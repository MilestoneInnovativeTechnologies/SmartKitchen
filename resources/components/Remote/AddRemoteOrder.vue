<template>
  <q-card>
    <q-bar class="text-grey-1" :class="'bg-'+color+'-7'"><span class="text-caption">Add Remote Order - Offline</span><q-space /><q-btn icon="close" flat dense v-close-popup /></q-bar>
    <template v-if="reference">
      <q-card-section class="q-py-md bg-grey-1 text-center" :class="'text-' + color"><div class="text-h5 text-bold">{{ r_ref }}</div></q-card-section>
      <q-card-section class="q-gutter-y-xs q-pt-none q-pb-xs">
        <div class="row q-col-gutter-xs">
          <q-input outlined readonly class="col-12" :input-class="'text-' + color" label="Token" :value="reference.token_date_code" />
          <q-input outlined readonly class="col" :input-class="'text-' + color" label="Item" :value="reference.server[1].item" />
          <q-input outlined readonly class="col" :input-class="'text-' + color" label="Quantity" :value="reference.server[1].quantity" />
        </div>
        <q-input outlined readonly :input-class="'text-' + color" label="Delivery" :value="reference.server[1].deliver" />
        <q-input outlined readonly :input-class="'text-' + color" label="Narration" :value="reference.server[1].narration" type="textarea" style="height: 6rem" />
      </q-card-section>
    </template>
    <q-card-section v-else class="q-gutter-y-xs q-pb-xs">
      <q-file clearable outlined dense :input-class="'text' + color" label="Import File" bottom-slots hide-bottom-space v-model="file"><template #prepend><q-icon name="cloud" :color="color" /></template></q-file>
      <div class="row q-gutter-xs">
        <q-input class="col-12" outlined dense :input-class="'text-' + color" label="Token Code" v-model="params.token_date_code" />
        <q-input class="col" outlined dense :input-class="'text-' + color" label="Location" v-model="ti_location" />
        <q-input class="col" outlined dense :input-class="'text-' + color" label="ID" v-model.number="ti_id" type="number" />
      </div>
<!--      <q-input outlined dense :input-class="'text-' + color" label="Reference ID" :value="params.name" :key="ref_make" readonly />-->
      <div class="row q-gutter-x-xs">
        <q-select class="col-9" outlined dense :input-class="'text-' + color" label="Select Item" v-model="params.item" :options="items" option-label="name" />
        <q-input class="col" outlined dense :input-class="'text-' + color" label="Quantity" v-model.number="params.quantity" type="number" />
      </div>
      <DateTime outlined dense :input-class="'text-' + color" label="Delivery" v-model="params.deliver" />
      <q-input outlined :input-class="'text-' + color" label="Narration" v-model="params.narration" type="textarea" style="height: 6rem" />
    </q-card-section>
    <q-card-actions class="q-px-md q-pt-none">
      <q-btn v-if="!!reference" label="Clear Upload" color="red" dense flat size="sm" @click="file = null" /><q-space />
      <q-btn :label="reference ? 'Import Data' : 'Add Order'" :color="color" glossy padding="sm xl" @click="addOrder" :loading="loading" />
    </q-card-actions>
    <q-dialog persistent :value="verified !== true" @before-hide="file = null">
      <q-card class="bg-red text-white" style="min-width: 65vw">
        <q-card-section class="bg-red-7"><div class="text-h6">Error</div></q-card-section>
        <q-card-section class="text-caption">
          The uploaded file is not valid because of any of the following reason.
          <li :class="{ 'text-bold':verified === 0 }">The uploaded data is corrupted</li>
          <li :class="{ 'text-bold':verified === 1 }">The uploaded data is not for this kitchen</li>
          <li :class="{ 'text-bold':verified === 2 }">The items are not processing in this kitchen</li>
          <li :class="{ 'text-bold':verified === 3 }">The reference name is not provided</li>
          <li :class="{ 'text-bold':verified === 4 }">The item is already present in this kitchen</li>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal"><q-btn flat label="Clear File" color="red-6" v-close-popup /></q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import DateTime from "components/DateTime";
import {to_format} from "assets/helpers";

export default {
  name: "AddRemoteOrder",
  components: {DateTime},
  props: ['kitchen'],
  data(){ return {
    color: 'light-blue', ti_location: '', ti_id: '', loading: false,
    params: { name:null, item:null, quantity:null, deliver:null, narration:null, token_date_code: '' },
    file:null, reference: null, verified: true,
  } },
  computed: {
    ...mapGetters('remote',['item_id_of_kitchen_item']),
    ...mapState({
      items({ items,remote }){ return _(remote.data).filter({ item:'kitchen_items',location:_BRANCH }).map(rmt => Object.assign({},{ kitchen_item_id:rmt.local_id,kitchen_item_reference:rmt.reference,kitchen_item_location:rmt.location,item_id:this.item_id_of_kitchen_item(rmt.local_id) })).map(obj => Object.assign({},obj,_.get(items.data,obj.item_id))).value() },
      offline_remotes({ remote }){ return _(remote.data).filter(({ extra }) => _.has(extra,'r_ref')).keyBy('extra.r_ref').value() },
    }),
    kitchen_reference(){ return _.get(_.find(this.$store.state.remote.data,{ item:'kitchens',local_id:this.kitchen }),'reference') },
    kitchen_item_references(){ return _.map(this.items,'kitchen_item_reference') },
    r_ref(){ return _.get(this.reference,'name') },
    ref_make(){ return this.ti_location + 'TI' + _.padStart(this.ti_id,6,0) },
    reference_exists(){ return this.reference ? (_.has(this.offline_remotes,this.reference.name) && this.offline_remotes[this.reference.name].reference === this.reference.token_item_reference) : null },
    kitchen_remote(){ return _.find(this.$store.state.remote.data,{ item:'kitchens',local_id:parseInt(this.kitchen) }) },
  },
  methods: {
    setReference(res){ this.reference = res ? JSON.parse(_.get(res,['target','result'])) : null; if(res) this.verifyReference() },
    verifyReference(){
      if(!this.reference) return this.verified = 0;
      if(this.kitchen_reference !== _.get(this.reference,['server',1,'kitchen'])) return this.verified = 1;
      if(this.reference.kitchen_item_location !== _BRANCH || !this.kitchen_item_references.includes(this.reference.kitchen_item_reference)) return this.verified = 2;
      if(!this.reference.name) return this.verified = 3;
      if(this.reference_exists) return this.verified = 4;
    },
    addOrder() {
      if (this.reference) {
        this.loading = true;
        this.$store.dispatch('remote/addOffline', { offline_reference: this.reference.name, data: this.reference, kitchen: this.kitchen }, { root:true })
      } else if(!_.every(_.pick(this.params, ['name', 'item', 'quantity', 'deliver', 'token_date_code'])))
        return this.$q.notify({ textColor:'white',message:'All except narration is mandatory, please fill them all..',type:'negative',position:'center',closeBtn:'Try Again' })
      else {
        let server = [
          { date:to_format('YYYY-MM-DD HH:mm:ss',new Date),narration:this.params.narration,progress:'New' },
          {
            quantity: 1, narration: this.params.narration, deliver: this.params.deliver, photo: null, progress: 'Accepted',
            kitchen: this.kitchen_remote.reference, item: this.params.item.name, kitchen_item_reference: _.get(this.params,['item','kitchen_item_reference']), kitchen_item_location: _.get(this.params,['item','kitchen_item_location']),
            token: null, detail: this.params.item.detail, status: this.params.item.status,
          }
        ], reference = { token_source_location:this.ti_location,token_reference:null,token_item_reference:null,token_item_source_id:this.ti_id,name:this.params.name,server,token_date:code2date(this.params.token_date_code), token_date_code:this.params.token_date_code }
        this.$store.dispatch('remote/addOffline',{ offline_reference: this.params.name, data: reference, kitchen: this.kitchen },{ root:true })
      }
      setTimeout(function(vm){ vm.loading = false; vm.$emit('imported') },1000,this)
    }
  },
  watch: {
    file(file){
      if(!file) return this.setReference(file);
      let reader = new FileReader(); reader.onload = this.setReference;
      reader.readAsText(file);
    },
    ref_make(ref){ this.params.name = ref },
    ti_location(txt){ if(_.toUpper(txt) !== txt) this.ti_location = _.toUpper(txt) },
  }
}

function code2date(code){
  let rule = {4:'-',6:'-',8:' ',10:':',12:':'}, split = code.split(""), date = "";
  for(let x in split) date += (_.has(rule,x) ? rule[x] : '') + split[x]
  return date;
}
</script>
