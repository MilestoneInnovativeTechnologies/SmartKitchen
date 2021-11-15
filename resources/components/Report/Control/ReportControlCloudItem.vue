<template>
  <q-select v-model="item" dark outlined dense label="Item" style="min-width: 6rem" :options="items" />
</template>

<script>
export default {
  name: "ReportControlCloudItem",
  computed: {
    items(){ return _(this.$store.state.remote.data).filter({ item:'kitchen_items' }).map(({ local_id }) => this.$store.getters['kitchens/map'][local_id]).map(ary => _.get(this.$store.state.kitchens.items,[ary[0],ary[1],'item'])).map(id => _.get(this.$store.state.items.data,id)).map(item => Object.assign({},item,{ label:item.name,value:item.id})).value() },
    item: {
      get(){ return this.$store.state.public.item || null },
      set(item){ this.$store.commit('public',{ item })}
    }
  }
}
</script>
