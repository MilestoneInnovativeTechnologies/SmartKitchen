<template>
  <q-card>
    <q-card-section class="row bg-deep-orange items-center text-white"><div class="text-h6">Cancel Item</div><q-space /><q-btn flat icon="clear" v-close-popup /></q-card-section>
    <q-item-section class="q-pa-md"><FilterInputText lazy="true" @text="filter = $event" /></q-item-section>
    <q-list bordered separator>
      <q-item-label header>Accepted Items</q-item-label>
      <KitchenItemCancelItem v-for="(item,idx) in accepted" :key="hKey('accepted',idx,item)" :item="item" :token="Tokens[item.token]" :selected="selected" @select="select" />
      <q-item-label header>Processing Items</q-item-label>
      <KitchenItemCancelItem v-for="(item,idx) in processing" :key="hKey('processing',idx,item)" :item="item" :token="Tokens[item.token]" :selected="selected" @select="select" />
      <q-item-label header>Completed Items</q-item-label>
      <KitchenItemCancelItem v-for="(item,idx) in completed" :key="hKey('completed',idx,item)" :item="item" :token="Tokens[item.token]" :selected="selected" @select="select" />
    </q-list>
    <q-card-actions align="right"><q-btn push :loading="$attrs.cancelling" color="deep-orange" label="Cancel Selected" @click="$emit('cancel',selected)" /></q-card-actions>
  </q-card>
</template>

<script>
import Tokens from "assets/mixins/Tokens";
import {h_key} from "assets/helpers";
import KitchenItemCancelItem from "components/Kitchen/KitchenItemCancelItem";
import FilterInputText from "components/FilterInputText";

export default {
  name: "KitchenItemCancel",
  components: {FilterInputText, KitchenItemCancelItem},
  data(){ return { selected: [], filter: '' } },
  props: ['kitchen'],
  mixins: [Tokens],
  computed: {
    Tokens(){ return _(this.tokens).filter(({ progress }) => ['New','Processing'].includes(progress)).keyBy('id').value() },
    items(){ return _(this.Tokens).flatMap('items').filter(this.isAct).value() },
    filtered(){ return (this.filter === '') ? this.items : _.filter(this.items,({ item:{ name } }) => _.includes(_.toLower(name),_.toLower(this.filter))) },
    accepted(){ return _.filter(this.filtered,['progress','Accepted']) },
    processing(){ return _.filter(this.filtered,['progress','Processing']) },
    completed(){ return _.filter(this.filtered,['progress','Completed']) },
  },
  methods: {
    hKey(type,idx,{ id }){ return h_key('kitchen','item','cancel',type,id,idx) },
    isAct({ kitchen,progress }){ return kitchen && kitchen.id === _.toInteger(this.kitchen) && ['Accepted','Processing','Completed'].includes(progress) },
    select(id){ if(this.selected.includes(id)) return this.selected = _.difference(this.selected,[id]); this.selected.push(id) }
  },
}
</script>
