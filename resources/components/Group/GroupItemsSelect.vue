<template>
  <div>
    <Masonry :items="page_items" width="180">
      <template #item="item">
        <ItemSelectCard @selected="$emit('item',$event)" :id="item.id" :price_list="price_list" :quantity="(item_quantities && item_quantities[item.id]) ? item_quantities[item.id] : 0" @quantity="$emit('quantity',$event)" />
      </template>
    </Masonry>
    <q-page-sticky position="bottom-right" :offset="offset" v-if="pages > 1">
      <q-fab v-model="pages_show" label="Pages" vertical-actions-align="center" color="indigo" hide-icon direction="up" glossy push v-touch-pan.prevent.mouse="move">
        <q-fab-action v-for="page_num in pages" color="indigo" :label="page_num" square glossy push @click="page = page_num" :key="'gis-p-' + page_num" v-bind="fab_attrs(page_num)" />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>
import {matches} from "assets/helpers";
import ItemSelectCard from "components/Item/ItemSelectCard";
import Masonry from "components/Masonry";
import {mapGetters, mapState} from "vuex";

export default {
  name: "GroupItemsSelect",
  components: {Masonry, ItemSelectCard},
  props: ['selected','filter','price_list','type','item_quantities'],
  data(){ return {
    offset: [0,80], pages_show: true, page: 1
  } },
  computed: {
    type_name(){ return (this.type && this.type !== 'Dining') ? _.snakeCase([this.type,'Menu'].join(' ')) : null },
    ...mapState({ item_master:state => state.items.data, group_master:state => state.groups.data, menus(state){ return this.type_name ? _.get(state.public,this.type_name,[]) : state.menus.s_items } }),
    items_per_page(){ return this.$store.getters['settings/items_per_page'] },
    group_items(){
      return this.selected
        ? _(_.get(this.group_master,[_.toInteger(this.selected),'items'],[])).map(iId => this.item_master[_.toInteger(iId)]).filter(['status','Active']).value()
        : (_.isEmpty(this.menus) ? [] : this.menu_items(this.menus[0]))
    },
    filter_search_keys(){ return settings('items_search_fields',this.type) },
    filtered_items(){
      return this.filter
        ? _.filter(this.group_items,item => matches(item,this.filter_search_keys,this.filter))
        : this.group_items
    },
    pages(){ return _.ceil(_.size(this.filtered_items)/this.items_per_page) },
    page_items(){ return _.slice(this.filtered_items,((this.page-1) * this.items_per_page),(this.page * this.items_per_page)) },
  },
  methods: {
    menu_items(menu){
      let groups = _.get(this.$store.state.menus.data,[menu,'groups'])
      let items = _.uniq(_.flatMap(groups,group => _.get(this.group_master,[group,'items'])))
      return _(items).map(id => _.get(this.item_master,[id])).filter(['status','Active']).value()
    },
    fab_attrs(num){ return this.page === num ? { disable:true,padding:'xs',icon:'reply_all' } : { padding:'sm' } },
    move(ev){ this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y] },
  },
  watch:{
    filter(n,o){ if(!o && n) this.page = 1 },
    selected(){ this.page = 1 },
    pages(num){ if(num < this.page) this.page = num || 1 },
  }
}
</script>
