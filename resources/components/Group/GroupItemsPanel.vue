<template>
  <q-tab-panels v-model="value" animated transition-prev="slide-down" transition-next="slide-up">
    <q-tab-panel name="group-all" class="row q-col-gutter-xs">
      <Masonry :items="all_items" width="180">
        <template #item="item">
          <ItemSelectCard @selected="$emit('item',$event)" :id="item.item" :price_list="price_list" />
        </template>
      </Masonry>
    </q-tab-panel>
    <q-tab-panel v-for="group in m_groups" :name="'group-' + group" :key="hKey({ id:group},'group')" class="row q-col-gutter-xs">
      <Masonry :items="groupItems(group)" width="180">
        <template #item="item">
          <ItemSelectCard @selected="$emit('item',$event)" :id="item.item" :price_list="price_list" />
        </template>
      </Masonry>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import {h_key} from "assets/helpers";
import ItemSelectCard from "components/Item/ItemSelectCard";
import Masonry from "components/Masonry";

export default {
  name: "GroupItemsPanel",
  components: {Masonry, ItemSelectCard},
  props: ['selected','filter','price_list'],
  data(){ return {
    card_class: 'col-xs-6 col-sm-4 col-md-3 col-2'
  } },
  computed: {
    menus(){ return this.$store.state.menus.s_items },
    m_groups(){ return _.flatMap(_.pick(this.$store.state.menus.data,this.menus),({ groups }) => _.map(groups,_.toSafeInteger)) },
    value(){ return 'group-' + (this.selected || 'all') },
    all_items(){ return this.filtered(_.uniq(_.flatMap(this.m_groups,this.groupItems))) },
  },
  methods: {
    groupItems(group_id){ return this.filtered(_.uniq(_.map(_.get(this.$store.state.groups.data,[_.toSafeInteger(group_id),'items']),_.toSafeInteger))) },
    hKey({ id },i){ return h_key('group','items','panel',i,id) },
    filtered(keys){ return this.filter ? _.intersection(keys,this.filterKeys()) : keys },
    filterKeys(){ return _(this.$store.state.items.data).filter(({ id,name,detail }) => [id,name,detail].join(' ').toLowerCase().includes(this.filter.toLowerCase())).map(({ id }) => _.toInteger(id)).value() },
  }
}
</script>
