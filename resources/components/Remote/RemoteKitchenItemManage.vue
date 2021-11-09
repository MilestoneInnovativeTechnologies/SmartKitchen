<template>
  <q-card>
    <q-card-section class="bg-grey-2 text-bold text-caption justify-between items-center q-px-sm q-py-sm" horizontal><div>Manage Kitchen Item of Remote</div><q-btn icon="close" v-close-popup round dense flat /></q-card-section>
    <q-card-section v-if="kitchen" class="q-gutter-y-sm">
      <q-select outlined label="Item Add Type" :options="['Map','Create']" v-model="type" />
      <q-select :options="item_master" v-model="map" outlined v-if="type === 'Map'" />
      <q-form class="q-gutter-y-sm" v-else>
        <q-input outlined label="Name" v-model="item_params.item" />
        <q-input outlined label="Detail" v-model="item_params.detail" type="textarea" style="height: 5rem" />
        <div class="text-subtitle2">Prices</div>
        <div class="row q-col-gutter-xs">
          <div class="col-xs-6 col-md-4" v-for="({ id,name }) in item_prices" :key="'rkim-ip-p-'+id" >
            <q-input outlined :label="name" v-model.number="item_params.prices[id]" type="number" />
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-section v-else class="text-center q-gutter-y-sm text-primary text-uppercase text-bold">
      Kitchen not added
      <q-btn label="Click here to add kitchen" color="primary" @click="addKitchen()" />
    </q-card-section>
    <q-card-actions align="right" class="q-px-md bg-grey-2" v-show="kitchen">
      <q-btn color="primary" label="Save Details" @click="addKitchenItem" />
    </q-card-actions>
    <q-inner-loading :showing="loading"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
const item_params = ['id','item','detail','_location','_monitor','reference','kitchen','status','stock','duration','auto_process','auto_complete','prices']
const kitchen_params = ['name','auto_accept','cloud','status','online','users','reference','_location','_monitor']

export default {
  name: "RemoteKitchenItemManage",
  props: ['local','item','remote'],
  computed: {
    ...mapState({ price_lists:state => state.prices.list,item_master:state => _.map(state.items.data,item => Object.assign({},item,{ value:item.id,label:item.name })) }),
    kitchen_item_id(){ return _.get(_.findLast(this.$store.state.remote.data,{ item:'kitchen_items',reference:this.item.id }),'local_id') },
    item_id(){ return this.item_params.id || this.$store.getters['remote/item_id_of_kitchen_item'](this.kitchen_item_id) },
    kitchen(){ return this.local ? _.get(this.$store.state.kitchens.data,_.get(this.local,'local_id')) : null },
    item_data(){ return Object.assign({},this.item,{ reference:this.item.id,id:this.item_id,prices:{} }) },
    item_prices(){ let prices = _.get(this.$store.getters["items/prices"],this.item_id,{}); return _.map(this.price_lists,({ name,id }) => new Object({ id,name,price:_.get(prices,id,0) })) },
    map: {
      get(){ return _.find(this.item_master,{ value:this.item_params.id }) || null },
      set(map){ this.item_params.id = map.value }
    },
    type: {
      get(){ return this.v_type },
      set(type){ this.v_type = type; this.item_params.id = undefined },
    },
    kitchen_params(){ return _.fromPairs([...(_.map(kitchen_params,key => [key,_.get(this.remote,key)])),['reference',this.remote.id]]) }
  },
  data(){ return {
    loading: false, v_type: 'Map',
    item_params: _.zipObject(item_params,Array(item_params.length).fill(null)),
  } },
  methods: {
    addKitchen(){ this.loading = true; post('remote','kitchens',this.kitchen_params).then().catch().finally(() => setTimeout(vm => vm.loading = false,750,this)) },
    addKitchenItem(){ this.loading = true; post('remote','kitchen_items',this.item_params).then().catch().finally(() => setTimeout(vm => vm.loading = vm.$emit('close') && false,750,this)) },
  },
  watch: {
    item: {
      immediate: true,
      handler(){
        let vm = this;
        setTimeout(function(vm){
          let item_data = _.cloneDeep(vm.item_data); vm.loading = true;
          _.forEach(_.cloneDeep(vm.item_params),function(value,key){ if(value !== item_data[key]) vm.$set(vm.item_params,key,item_data[key]) })
          _.forEach(_.cloneDeep(vm.item_prices),({ id,price }) => vm.$set(vm.item_params.prices,id,_.toNumber(price)))
          vm.loading = false;
        },200,this)
      }
    }
  }
}
</script>
