<template>
  <Masonry :items="filtered_items" width="180">
    <template #item="item">
      <ItemSelectCard @selected="$emit('item',$event)" :id="item.id" :price_list="price_list" />
    </template>
  </Masonry>
</template>

<script>
import {matches} from "assets/helpers";
import ItemSelectCard from "components/Item/ItemSelectCard";
import Masonry from "components/Masonry";
import {mapState} from "vuex";

export default {
  name: "GroupItemsSelect",
  components: {Masonry, ItemSelectCard},
  props: ['selected','filter','price_list'],
  data(){ return {
  } },
  computed: {
    ...mapState({ item_master:state => state.items.data, group_master:state => state.groups.data }),
    group_items(){
      return this.selected
        ? _(_.get(this.group_master,[_.toInteger(this.selected),'items'],[])).map(iId => this.item_master[_.toInteger(iId)]).filter(['status','Active']).value()
        : _.filter(this.item_master,['status','Active'])
    },
    filtered_items(){
      return this.filter
        ? _.filter(this.group_items,item => matches(item,['id','name','detail'],this.filter))
        : this.group_items
    },
  },
}
</script>
