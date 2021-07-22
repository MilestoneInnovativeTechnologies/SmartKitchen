<template>
  <q-card class="q-pa-none">
    <q-card-section class="bg-grey-2"><div class="text-bold">Most Processing Items</div></q-card-section>
    <q-table v-if="items.length" :data="items" :columns="columns" dense :pagination="{ rowsPerPage:40 }" rows-per-page-label="Items per page" />
    <q-card-actions align="center" v-else>No items processed yet</q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Tokens from "assets/mixins/Tokens"

export default {
  name: "KitchenItemDayMostProcessing",
  mixins: [Tokens],
  data(){ return {
    columns: [
      {name:'item',label:'Item',field:'item',align:'left',sortable:true},
      {name:'quantity',label:'Quantity',field:'quantity',align:'left',sortable:true},
      {name:'time',label:'Total Time',field:'time',align:'left',sortable:true,format:(s) => (s < 60) ? s + ' secs' : (_.floor(s/60) + ' mins')},
      {name:'average',label:'Average',field:'time',align:'left',sortable:true,format(time,{ quantity }){ let s = _.round(time/quantity); return (s < 60) ? s + ' secs' : _.floor(s/60) + ' mins' } },
    ]
  } },
  computed: {
    ...mapGetters({ today:'tokens/today',kitchens:'kitchens/assign' }),
    items(){ let today = _.map(this.today,'id'); return _.map(_.groupBy(_.flatMap(this.tokens,({ items,id }) => today.includes(id) ? _.filter(items,({ kitchen,progress }) => kitchen && this.kitchens[_USER.id].includes(kitchen.id) && progress !== 'Cancelled') : []),'item.id'),(items,item) => _.zipObject(
      ['item','quantity','time'],
      [_.get(items,[0,'item','name']),_.sumBy(items,'quantity'),this.pTime(items)]
    )) }
  },
  methods: {
    pTime(items){ return _.sumBy(items,({ progress_timing }) => {
      let pStart = _.find(progress_timing,['status','Processing']), pComplete = _.find(progress_timing,['status','Completed']);
      if(!pStart || !pComplete) return 0;
      return _.toInteger(_.get(pComplete,'time')) - _.toInteger(_.get(pStart,'time'))
    }) }
  }
}
</script>
