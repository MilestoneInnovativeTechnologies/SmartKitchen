<template>
  <q-card square>
    <q-bar class="bg-primary text-white q-py-lg">Cart Items <q-space /><q-btn icon="close" flat dense round v-close-popup class="text-bold" /></q-bar>
    <q-list>
      <transition-group appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <q-item v-for="(item,idx) in items" :key="'om-ci-i-' + item.id" style="border-bottom: 1px solid #E5E5E5">
          <q-item-section avatar class="col-shrink">{{ idx+1 }}</q-item-section>
          <q-item-section avatar class="col-shrink q-gutter-y-xs">
            <q-btn icon="add" dense color="primary" size="xs" @click="increment(idx)" />
            <q-btn icon="remove" dense color="primary" size="xs" @click="decrement(idx)" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Rate: {{ precision(item.rate) }}</q-item-label>
            <q-item-label style="font-size: .85rem"><span class="text-bold text-primary" style="font-size: .95rem">{{ item.quantity }}x</span> {{ item.name }}</q-item-label>
          </q-item-section>
          <q-item-section side><q-item-label class="text-bold text-primary" style="font-size: .95rem">{{ precision(item.rate * item.quantity) }}</q-item-label></q-item-section>
        </q-item>
      </transition-group>
      <q-item style="border-bottom: 1px solid #E5E5E5">
        <q-item-section class="text-center"><q-item-label class="text-primary text-bold">{{ items.length }}</q-item-label><q-item-label caption style="font-size: 0.60rem">Total Items</q-item-label></q-item-section>
        <q-item-section class="text-center"><q-item-label class="text-primary text-bold">{{ sumBy(items,'quantity') }}</q-item-label><q-item-label caption style="font-size: 0.60rem">Total Quantity</q-item-label></q-item-section>
        <q-item-section class="text-center"><q-item-label class="text-primary text-bold" style="font-size: 1rem">{{ precision(sumBy(items,({ quantity,rate }) => quantity * rate)) }}</q-item-label><q-item-label caption style="font-size: 0.60rem">Total Amount</q-item-label></q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="right">
      <q-btn label="Place Order" color="primary" padding="xs md" glossy @click="$emit('order')" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {precision} from "assets/helpers";

export default {
  name: "OnlineMenuCartDialogueCart",
  props: ['items'],
  methods: {
    precision, sumBy:_.sumBy,
    increment(idx){ this.$store.commit('update',{ path:['cart',idx,'quantity'],value:this.items[idx].quantity+1 }) },
    decrement(idx){
      let value = this.items[idx].quantity - 1
      this.$store.commit('update',{ path:['cart',idx,'quantity'],value })
      if(value < 1) setTimeout((vm,idx) => vm.$store.commit('splice',{ path:['cart'],start:idx,length:1 }),1500,this,idx)
    },
  }
}
</script>
