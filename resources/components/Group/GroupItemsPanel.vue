<template>
  <q-scroll-area>
    <q-tab-panels v-model="value" animated transition-prev="slide-down" transition-next="slide-up">
      <q-tab-panel name="group-all" class="row q-col-gutter-xs">
        <div v-for="item in all_items" :key="hKey({ id:item },'all-item')" class="col-xs-6 col-sm-4 col-md-3 col-2">
          <ItemSelectCard @selected="$emit('item',$event)" :id="item" />
        </div>
      </q-tab-panel>
      <q-tab-panel v-for="group in m_groups" :name="'group-' + group" :key="hKey({ id:group},'group')" class="row q-col-gutter-xs">
        <div v-for="item in groupItems(group)" :key="hKey({ id:item },group + '-item')" class="col-xs-6 col-sm-4 col-md-3 col-2">
          <ItemSelectCard @selected="$emit('item',$event)" :id="item" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-scroll-area>
</template>

<script>
import {h_key} from "assets/helpers";
import ItemSelectCard from "components/Item/ItemSelectCard";

export default {
  name: "GroupItemsPanel",
  components: {ItemSelectCard},
  props: ['selected'],
  computed: {
    menus(){ return this.$store.state.menus.s_items },
    m_groups(){ return _.flatMap(_.pick(this.$store.state.menus.data,this.menus),({ groups }) => _.map(groups,_.toSafeInteger)) },
    value(){ return 'group-' + (this.selected || 'all') },
    all_items(){ return _.uniq(_.flatMap(this.m_groups,this.groupItems)) }
  },
  methods: {
    groupItems(group_id){ return _.uniq(_.map(_.get(this.$store.state.groups.data,[_.toSafeInteger(group_id),'items']),_.toSafeInteger)) },
    hKey({ id },i){ return h_key('group','items','panel',i,id) }
  }
}
</script>
