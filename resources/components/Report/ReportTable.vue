<template>
  <q-table :data="records" :columns="columns" dense class="no-shadow" bordered table-header-class="bg-blue-grey-10 text-white" square :pagination="{ rowsPerPage:0 }" hide-pagination>
    <template v-slot:[slot_name]="props" v-for="slot_name in html_slots">
      <q-td :props="props" v-html="props.value" />
    </template>
  </q-table>
</template>

<script>
export default {
  name: "ReportTable",
  props: ['data','right','center','index','html'],
  computed: {
    records(){ return this.index === undefined ? this.data : _.map(this.data,(obj,idx) => Object.assign({},{ '#':idx+1 },obj)) },
    columns(){ return _.map(_.first(this.records),(val,field) => _.zipObject(['name','field','sortable','label','align'],[
      field,field,false,field,
      _.includes(this.right,field) ? 'right' : (_.includes(this.center,field) ? 'center' : 'left')
    ])) },
    html_slots(){ return this.html ? _.map(this.html,this.dynamicSlotName) : [] }
  },
  methods: {
    dynamicSlotName(name){ return 'body-cell-' + name }
  }
}
</script>
