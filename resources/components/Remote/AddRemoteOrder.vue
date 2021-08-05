<template>
  <q-card>
    <q-bar class="text-grey-1" :class="'bg-'+color+'-7'"><span class="text-caption">Add Remote Order</span><q-space /><q-btn icon="close" flat dense v-close-popup /></q-bar>
    <template v-if="reference">
      <q-card-section class="q-py-md bg-grey-1 text-center" :class="'text-' + color"><div class="text-h5 text-bold">{{ r_ref }}</div></q-card-section>
      <q-card-section class="q-gutter-y-xs q-pt-none q-pb-xs">
        <div class="row q-col-gutter-x-xs">
          <q-input outlined readonly class="col" :input-class="'text-' + color" label="Item" :value="reference.server[1].item" />
          <q-input outlined readonly class="col" :input-class="'text-' + color" label="Quantity" :value="reference.server[1].quantity" />
        </div>
        <q-input outlined readonly :input-class="'text-' + color" label="Delivery" :value="reference.server[1].deliver" />
        <q-input outlined readonly :input-class="'text-' + color" label="Narration" :value="reference.server[1].narration" type="textarea" style="height: 6rem" />
      </q-card-section>
    </template>
    <q-card-section v-else class="q-gutter-y-xs q-pb-xs">
      <q-file clearable outlined dense :input-class="'text' + color" label="Import File" bottom-slots hide-bottom-space v-model="file"><template #prepend><q-icon name="cloud" :color="color" /></template></q-file>
      <div class="row q-gutter-x-xs">
        <q-input class="col" outlined dense :input-class="'text-' + color" label="Location" v-model="ti_location" />
        <q-input class="col" outlined dense :input-class="'text-' + color" label="ID" v-model.number="ti_id" type="number" />
      </div>
      <q-input outlined dense :input-class="'text-' + color" label="Reference ID" :value="params.name" :key="ref_make" />
      <div class="row q-gutter-x-xs">
        <q-select class="col" outlined dense :input-class="'text-' + color" label="Select Item" v-model="params.item" :options="kitchen_items" option-label="name" />
        <q-input class="col" outlined dense :input-class="'text-' + color" label="Quantity" v-model.number="params.quantity" type="number" />
      </div>
      <DateTime outlined dense :input-class="'text-' + color" label="Delivery" v-model="params.deliver" />
      <q-input outlined :input-class="'text-' + color" label="Narration" v-model="params.narration" type="textarea" style="height: 6rem" />
    </q-card-section>
    <q-card-actions class="q-px-md q-pt-none">
      <q-btn v-if="!!reference" label="Clear Upload" color="red" dense flat size="sm" @click="file = null" /><q-space />
      <q-btn :label="reference ? 'Import Data' : 'Add Order'" :color="color" glossy padding="sm xl" @click="addOrder" :loading="loading" />
    </q-card-actions>
    <q-dialog persistent :value="!verified" @before-hide="file = null">
      <q-card class="bg-red text-white" style="min-width: 65vw">
        <q-card-section class="bg-red-7"><div class="text-h6">Error</div></q-card-section>
        <q-card-section class="text-caption">
          The uploaded file is not valid because of any of the following reason.
          <li>The uploaded data is not valid for this kitchen</li>
          <li>The items are not processing in this kitchen</li>
          <li>The reference name is not provided</li>
          <li>The item is already present in this kitchen</li>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal"><q-btn flat label="Clear File" color="red-6" v-close-popup /></q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>

import {mapState} from "vuex";
import DateTime from "components/DateTime";
import {to_format} from "assets/helpers";

export default {
  name: "AddRemoteOrder",
  components: {DateTime},
  props: ['kitchen'],
  data(){ return {
    color: 'light-blue', ti_location: '', ti_id: '', loading: false,
    params: { name:null, item:null, quantity:null, deliver:null, narration:null },
    file:null, reference: null, verified: true,
  } },
  computed: {
    ...mapState({
      kitchen_items({ kitchens,items,remote }){ return _(kitchens.items[this.kitchen]).map(({ item }) => _.get(items.data,item)).map((item) => Object.assign({},item,{ reference:_.get(_.find(remote.data,{ item:'kitchen_items',local_id:parseInt(item.id) }),'reference') })).value() },
      read_ref_remotes({ remote }){ return _(remote.data).filter(({ extra }) => _.has(extra,'r_ref')).keyBy('extra.r_ref').value() },
    }),
    remote_items(){ return _.map(this.kitchen_items,'reference') },
    r_ref(){ return _.get(this.reference,'name') },
    ref_make(){ return this.ti_location + 'TI' + _.padStart(this.ti_id,6,0) },
    reference_exists(){ return this.reference ? (_.has(this.read_ref_remotes,this.reference.name) && this.read_ref_remotes[this.reference.name].reference === this.reference.token_item_reference) : null },
    kitchen_remote(){ return _.find(this.$store.state.remote.data,{ item:'kitchens',local_id:parseInt(this.kitchen) }) },
  },
  methods: {
    setReference(res){ this.reference = res ? JSON.parse(_.get(res,['target','result'])) : null; this.verifyReference() },
    verifyReference(){
      if(this.reference === null) return this.verified = true;
      if(this.reference.kitchen_item_location !== _BRANCH || !this.remote_items.includes(this.reference.kitchen_item_reference)) return this.verified = false;
      if(!this.reference.name) return this.verified = false;
      if(this.reference_exists) return this.verified = false;
    },
    addOrder() {
      if (this.reference) {
        this.loading = true;
        this.$store.dispatch('remote/processReference', {
          r_ref: this.reference.name,
          reference: this.reference
        }, {root: true})
      } else if(!_.every(_.pick(this.params, ['name', 'item', 'quantity', 'deliver'])))
        return this.$q.notify({ textColor:'white',message:'All except narration is mandatory, please fill them all..',type:'negative',position:'center',closeBtn:'Try Again' })
      else {
        let server = [
          { date:to_format('YYYY-MM-DD HH:mm:ss',new Date),narration:this.params.narration,progress:'New' },
          { quantity: 1, narration: this.params.narration, deliver: this.params.deliver, photo: null, kitchen: this.kitchen_remote.reference, progress: 'Accepted', item: this.params.item.name, kitchen_item_reference: this.params.item.reference, kitchen_item_location: _BRANCH }
        ], reference = { token_source_location:this.ti_location,token_reference:null,token_item_reference:null,token_item_source_id:this.ti_id,name:this.params.name,server }
        // console.log(reference)
        this.$store.dispatch('remote/referenceToken',{ r_ref:this.params.name,reference },{ root:true })
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
</script>
