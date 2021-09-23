<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>Order Online</q-toolbar-title>
        <ToolbarButton icon="grid_view" @click.native="view('grid')" />
        <ToolbarButton icon="view_day" @click.native="view('list')" />
        <q-btn v-show="quantities" flat round dense icon="shopping_basket" @click="cart_show = !cart_show">
          <q-badge color="red" floating :label="quantities" />
        </q-btn>
        <div class="q-px-md">&nbsp;</div>
        <q-btn flat round dense icon="menu" @click="drawer = !drawer">
          <q-badge v-if="order" rounded color="red" class="q-pa-xs absolute-top-right" :offset="[15,15]" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container v-if="ready">
      <router-view />
    </q-page-container>
    <q-page-container v-else>
      <q-page padding>
        <div class="row q-col-gutter-sm"><div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1" v-for="i in 5" :key="'om-s-' + i"><OnlineMenuItemSkeleton /></div></div>
      </q-page>
    </q-page-container>

    <q-drawer v-model="drawer" side="right" overlay bordered>
      <q-card class="q-ma-xs" v-if="order">
        <q-card-section class="bg-teal text-white text-bold q-py-lg flex">
          <div>Order Details<div v-if="order.token" class="text-caption text-bold text-italic">Token ID: {{ order.token }}</div></div>
          <q-space />
          <q-btn v-if="!order.progress || order.progress === 'Paid'" flat icon="delete" @click="removeOrder(order)" />
        </q-card-section>
        <q-list separator>
          <q-item v-for="(item,idx) in order.items" :key="'om-o-oi-i-' + item.item">
            <q-item-section>
              <q-item-label caption>Rate: {{ precision(item.rate) }}</q-item-label>
              <q-item-label style="font-size: 0.85rem" class="text-teal"><span class="text-teal text-bold">{{ item.quantity }}x</span> {{ item.name }}</q-item-label>
              <q-item-label caption v-if="item.narration" class="text-red text-italic" style="font-size: 0.75rem">{{ item.narration }}</q-item-label>
              <q-item-label caption v-if="item.progress" class="text-teal" style="font-size: 0.65rem">{{ item.progress }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-teal text-bold">{{ precision(parseFloat(item.rate) * parseFloat(item.quantity)) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-card-section class="q-pa-none text-white">
          <q-list>
            <q-item class="bg-teal q-pa-none text-bold">
              <q-item-section class="q-pa-md">
                <q-input :value="order_status" label="Status" readonly dense borderless input-class="text-white text-bold" label-color="white" />
                <q-linear-progress indeterminate color="white" />
              </q-item-section>
              <q-item-section side class="bg-teal-7 text-white"><q-item-label class="q-px-md" style="font-size: 1rem">{{ precision(order_total) }}</q-item-label></q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

<!--      <q-item-label header class="text-primary">Item Groups</q-item-label>-->

      <q-list separator bordered style="border-right: none; border-left: none">
        <q-item clickable v-ripple :class="group_selected === 0 ? ['bg-primary','text-white','q-py-md'] : ['text-primary']" @click="select_group(0)">
          <q-item-section avatar class="col-shrink"><q-icon :name="'reply' + (group_selected === 0 ? '_all' : '')" /></q-item-section>
          <q-item-section class="text-bold">All</q-item-section>
        </q-item>
        <q-item clickable v-ripple :class="group_selected === group.id ? ['bg-primary','text-white','q-py-md'] : ['text-primary']" v-for="group in groups" :key="'mlr-gl-g-' + group.id" @click="select_group(group.id)">
          <q-item-section avatar class="col-shrink"><q-icon :name="'reply' + (group_selected === group.id ? '_all' : '')" /></q-item-section>
          <q-item-section class="text-bold">{{ group.name }}</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-dialog persistent v-model="cart_show"><OnlineMenuCartDialogueCart :items="cart" :style="popup" @order="add_order" /></q-dialog>
    <q-dialog v-model="confirm_delete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm">You are about to remove this order. Are you sure??</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" color="info" v-close-popup /><q-space />
          <q-btn label="Yes, Remove Order" color="red" v-close-popup @click="removeOrder(true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import ToolbarButton from "components/ToolbarButton";
import axios from 'axios'
import OnlineMenuItemSkeleton from "components/Menu/OnlineMenuItemSkeleton";
import OnlineMenuCartDialogueCart from "components/Menu/OnlineMenuCartDialogueCart";
import {now, popup_width, precision} from "assets/helpers";
import {asset_url, all_images, orderPost, onSnapshot, orderRef, updateDoc} from "assets/modules/OnlineMenu";
export default {
  name: 'MenuLayout',
  components: {OnlineMenuCartDialogueCart, OnlineMenuItemSkeleton, ToolbarButton},
  props: ['reference','code'],
  data(){ return {
    ready: false,
    drawer: false, cart_show: false,
    confirm_delete: false,
  } },
  computed: {
    menu(){ return this.ready ? _.toInteger(this.$store.state.public.params.menu) : 0 },
    groups(){ return this.ready ? _.filter(this.$store.state.public.Groups,({ menus }) => menus.includes(this.menu)) : [] },
    branch(){ return this.$store.state.public.branch },
    group_selected(){ return _.get(this.$store.state.public,'group_selected',0) },
    cart(){ return this.$store.state.public.cart },
    quantities(){ return _.sumBy(this.cart,'quantity') },
    order(){ return this.$store.state.public.order },
    order_total(){ return this.order ? _.sumBy(this.order.items,({ rate,quantity }) => _.toNumber(rate)*_.toNumber(quantity)) : 0 },
    order_status(){ let { status,progress } = this.order; if(!progress) return status; return (progress === 'New') ? 'Order Confirmed' : (progress === 'Processing' ? 'Confirmed - Preparing' : (progress === 'Completed' ? 'Items Served' : (progress === 'Billed' ? 'Served - Bill Generated' : (progress === 'Partial' ? 'Paid Partially' : progress)))) },
    popup(){ return popup_width() },
  },
  methods: {
    precision,
    public(params){ this.$store.commit('public',params) },
    select_group(value){ this.$store.commit('update',{ path:['group_selected'],value }); this.drawer = false },
    view(value){ this.$store.commit('update',{ path:['view'],value }) },
    load_assets(){
      const vm = this;
      return new Promise(async function(resolve){
        localStorage.setItem(vm.reference,
          vm.reference === 'local'
            ? JSON.stringify(_.get(await axios.get('http://sk/assets/online/menu.js?_=' + Math.random()),'data'))
            : JSON.stringify(_.get(await axios.get(await asset_url(vm.reference)),'data'))
        );
        vm.public(JSON.parse(localStorage.getItem(vm.reference))); resolve(vm)
      })
    },
    clear_cart(){
      this.$store.commit('splice',{ path:'cart',start:0,length:this.cart.length })
      this.cart_show = false
    },
    add_order(){
      let params = _.pick(this.$store.state.public.params,['type','seating','price_list','customer']);
      params.items = _.map(this.cart,({ id,quantity,rate,name }) => _.zipObject(['item','quantity','rate','name','progress'],[id,quantity,rate,name,null]))
      params = _.assign({},params,{ status:'Waiting for Approval',token:null,active:true,time:now(),progress:null })
      if(this.reference === 'local'){ }
      else remotePost(this.reference,this.branch,params,this.clear_cart,this.orderUpdate)
    },
    orderUpdate({ id,data }){
      if(!data.active || (data.progress === 'Paid' && ((now() - data.time) > 1800)) || data.progress === 'Cancelled') return delOrderId(id)
      if(!_.has(data,'id')) data.id = id;
      this.public({ order:data })
    },
    removeOrder(status){
      if(status === true) {
        if(this.order.token) delOrderId(this.order.id)
        else delOrderId(this.order.id,this.reference,this.branch);
        location.reload()
      } else this.confirm_delete = true;
    }
  },
  created(){
    const init = function(vm){
      const params = JSON.parse(atob(vm.code)), group_selected = 0
      params['price_list'] = params.price_list || _.get(vm.$store.state.public,['Seats',params.seating,'price_list'])
      vm.public({ params,group_selected,cart:[],view:'grid',branch:params.branch }); vm.ready = true
    }
    if(!localStorage.getItem(this.reference)) this.load_assets().then(init)
    else {
      setTimeout(this.load_assets,90000);
      this.public(JSON.parse(localStorage.getItem(this.reference))); init(this)
    }
    if(this.reference === 'local') this.public({ images: null })
    else all_images(this.reference).then(images => this.public({ images }))

    if(this.reference === 'local') {

    } else {
      const orders = JSON.parse(localStorage.getItem('online_orders') || '[]');
      if(!_.isEmpty(orders)) onSnapshot(orderRef(this.reference,this.branch,orders[0]),(snap) => this.orderUpdate({ id:snap.id,data:snap.data() }))
    }
  }
}

function localPost(params){}
function remotePost(reference,branch,params,afterCB,snapCB){ orderPost(reference,branch,params).then(ref => { addOrderId(ref.id); afterCB(); onSnapshot(ref,(snap) => snapCB({ id:snap.id,data:snap.data() })) }) }
function addOrderId(id){
  const orders = JSON.parse(localStorage.getItem('online_orders') || '[]');
  if(!orders.includes(id)) { orders.unshift(id); localStorage.setItem('online_orders',JSON.stringify(orders)) }
  return id;
}
function delOrderId(id,reference,branch){
  let orders = JSON.parse(localStorage.getItem('online_orders') || '[]');
  if(orders.includes(id)) { orders = _.difference(orders,[id]); localStorage.setItem('online_orders',JSON.stringify(orders)) }
  if(reference && branch){ updateDoc(orderRef(reference,branch,id),{ active:false }) }
  return id;
}
</script>
