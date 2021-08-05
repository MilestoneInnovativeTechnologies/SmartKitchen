<template>
  <q-list separator>
    <q-item v-for="item in items" :key="hKey('roti',item)">
      <q-item-section avatar><q-avatar square><img :src="image(item_master[item.item].image)"></q-avatar></q-item-section>
      <q-item-section>
        <q-item-label>{{ item.quantity }} x {{ item_master[item.item].name }}</q-item-label>
        <q-item-label caption>Delivery On: {{ item.deliver_human }}</q-item-label>
        <q-item-label caption v-if="item.kitchen">Kitchen: {{ kitchen_master[item.kitchen].name }}</q-item-label>
        <q-item-label caption>
          Read Ref:
          <q-btn v-if="read_refs && read_refs.hasOwnProperty(item.id) && read_refs[item.id]" :label="read_refs[item.id]" size="sm" padding="none" color="light-blue" flat dense @click="readRef(item)" />
          <q-btn v-else label="Add Read Reference" size="sm" padding="none" color="light-blue" flat dense @click="rRef(item)" />
        </q-item-label>
      </q-item-section>
      <q-item-section side><q-badge :color="tipc[item.progress]" :label="item.progress" class="q-px-sm q-py-xs" /></q-item-section>
      <q-item-section side v-if="cancelable.includes(item.progress)"><q-btn icon="close" color="red" dense round size="sm" @click="cancel(item,false)" /></q-item-section>
      <q-item-section side v-if="serve_able.includes(item.progress)"><q-btn icon="how_to_reg" color="positive" dense round size="sm" @click="serve(item,false)" /></q-item-section>
    </q-item>
    <q-dialog :value="!!confirm" persistent @before-hide="confirm = false">
      <q-card v-if="confirm">
        <q-card-section class="text-white" :class="'bg-'+property[prop][0]"><div class="text-h6">Are you sure???</div><div>{{ property[prop][1] }}</div></q-card-section>
        <q-card-section>
          <q-list dense separator>
            <q-item clickable><q-item-section>Customer</q-item-section><q-item-section side class="text-bold text-red">{{ customer_master[confirm.customer].name }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Token ID</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.token }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Order Date</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.date_human }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Deliver Date</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.deliver }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Item Name</q-item-section><q-item-section side class="text-bold text-red">{{ item_master[confirm.item].name }}</q-item-section></q-item>
            <q-item clickable><q-item-section>Item Quantity</q-item-section><q-item-section side class="text-bold text-red">{{ confirm.quantity }} </q-item-section></q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" v-close-popup />
          <q-btn :loading="loading" :color="property[prop][0]" class="q-px-md" label="Yes, Proceed" @click="prop === 'cancel' ? cancel(confirm,true) : serve(confirm,true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog persistent v-model="add_ref">
      <q-card style="width: 22rem">
        <q-bar class="bg-teal text-white"><span class="text-caption">Add Read Reference</span><q-space /><q-btn flat round dense icon="close" v-close-popup /></q-bar>
        <q-card-section class="q-gutter-y-sm"><q-input outlined label="Reference" v-model="r_ref" /></q-card-section>
        <q-card-actions align="right" class="q-px-md q-pt-none"><q-btn color="teal" class="q-px-md" push label="Add" @click="addRef" :loading="loading" /></q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog persistent v-model="view_read_ref">
      <ReadReferenceCard v-if="view_read_ref && r_ref_id" :id="r_ref_id" style="width: 22rem" />
    </q-dialog>
  </q-list>
</template>

<script>
import {h_key, image} from "assets/helpers";
import {TokenItemProgressColor} from "assets/assets";
import ReadReferenceCard from "components/Remote/ReadReferenceCard";

export default {
  name: "RemoteTokenItemsList",
  components: {ReadReferenceCard},
  props: ['token','items','item_master','kitchen_master','customer_master'],
  data(){ return {
    tipc: TokenItemProgressColor,
    cancelable: ['New','Accepted'], serve_able: ['Completed'],
    confirm: false,
    prop: '', loading: false,
    property: { cancel:['red','You are about to cancel an item of remote order'],serve:['positive','You are about to serve an item of remote order'] },
    add_ref: false, r_ref: '', r_ref_id: null, view_read_ref: false,
  } },
  computed: {
    ti_ids(){ return _.map(this.items,({ id }) => parseInt(id)) },
    read_refs(){ return _(this.$store.state.remote.data).filter(({ item,local_id }) => item === 'token_items' && this.ti_ids.includes(parseInt(local_id))).mapKeys(({ local_id }) => parseInt(local_id)).mapValues(({ extra }) => _.get(extra,'r_ref')).value() },
    ti_kitchens(){ return _(this.items).mapKeys(({ id }) => parseInt(id)).mapValues(({ item }) => _.findKey(this.$store.state.kitchens.items,(items) => _.find(items,['item',item]))).mapValues(_.toInteger).value(); },
  },
  methods: {
    hKey(item,{ id }){ return h_key(item,id) },
    image(url){ return image(url) },
    cancel(item,confirm){
      this.prop = 'cancel';
      if(!confirm) return this.confirm = Object.assign({},this.token,item,{ token:this.token.id }); this.loading = true; let vm = this;
      post('token','cancel',{ id:item.id }).then(() => vm.confirm = false).catch().then(() => this.loading = false);
    },
    serve(item,confirm){
      this.prop = 'serve';
      if(!confirm) return this.confirm = Object.assign({},this.token,item,{ token:this.token.id }); this.loading = true; let vm = this;
      post('token','served',{ id:item.id }).then(() => vm.confirm = false).catch().then(() => this.loading = false);
    },
    remote(id){ return _.find(this.$store.state.remote.data,{ item:'token_items',local_id:parseInt(id) }) },
    rRef({ id }){ this.r_ref = _BRANCH + 'TI' + _.padStart(id,6,"0"); this.r_ref_id = parseInt(id); this.add_ref = true; },
    addRef(){
      let id = _.get(this.remote(this.r_ref_id),'id'), reference = this.r_ref, kitchen = this.ti_kitchens[this.r_ref_id], vm = this; this.loading = true;
      if(!id || !reference || !kitchen) return this.loading = false;
      post('remote','readReference',{ id,reference,kitchen }).then(() => vm.add_ref = vm.loading = false)
    },
    readRef({ id }){
      this.r_ref_id = parseInt(id); this.view_read_ref = true;
    }
  }
}
</script>
