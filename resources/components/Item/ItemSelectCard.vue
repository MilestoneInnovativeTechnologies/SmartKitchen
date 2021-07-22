<template>
  <q-card v-if="item" @click="$emit('selected',item)" style="cursor: pointer">
    <q-card-section class="q-py-xs bg-teal"></q-card-section>
    <CardImageTitle :title="item.name" :image="image" info="true" @info="info = !info" />
    <q-card-section class="q-pa-none q-ma-none" v-if="info">
      <q-card-actions align="right" class="q-pb-none"><q-badge color="positive" :label="price" class="q-py-sm q-px-md text-weight-bolder" /></q-card-actions>
      <q-list v-if="kitchen_items.length" style="font-size: 0.75rem">
        <q-item v-for="i_kitchen in kitchen_items" :key="hKey(i_kitchen)">
          <q-item-section>
            <q-item-label><q-spinner-radio color="positive" size="0.6rem" class="q-ml-md absolute-top" v-show="live.includes(i_kitchen.kitchen)"/>{{ kName(i_kitchen) }}</q-item-label>
            <q-item-label caption style="font-size: 0.6rem">Duration: {{ Math.ceil(i_kitchen.duration/60) }} Min</q-item-label>
            <q-item-label v-if="pending(i_kitchen)" caption style="font-size: 0.6rem">Pending: {{ pending(i_kitchen) }}</q-item-label>
          </q-item-section>
          <q-item-section side class="text-bold text-black" style="font-size: 0.9rem">{{ i_kitchen.stock }}</q-item-section>
          <q-item-section side v-if="i_kitchen.auto_process === 'Yes'"><q-icon name="done_all" color="positive" /></q-item-section>
        </q-item>
      </q-list>
      <q-card-section v-else class="text-caption text-center text-warning q-pa-none q-pt-xs" style="font-size: 0.65rem">Not available in any active kitchens!!</q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-caption" style="font-size: 0.65rem; line-height: 0.8rem"><q-separator class="q-my-xs" /> {{ item.detail }}</div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import { mapState,mapGetters } from "vuex";
import {h_key, image} from "assets/helpers";
export default {
  name: "ItemSelectCard",
  components: {CardImageTitle},
  props: ['id','price_list','remote'],
  data(){ return {
    info:false,processing_status: ['Accepted','Processing']
  } },
  computed: {
    ...mapState({ items: state => state.items.data, prices: state => state.prices.data,
      s_kitchens: function(state){ return _(state.kitchens.data).filter(({ cloud }) => cloud === (this.remote ? 'Yes' : 'No')).keyBy(({ id }) => _.toInteger(id)).value() },
      k_items: state => state.kitchens.items, t_items: state => _(state.tokens.items).flatMap().value() }),
    ...mapGetters('kitchens',['live']),
    s_kitchen_ids(){ return _.map(this.s_kitchens,({ id }) => _.toInteger(id)) },
    intID(){ return _.toInteger(this.id) }, intPL(){ return _.toInteger(this.price_list) },
    item(){ return _.get(this.items,this.intID) }, image(){ return image(this.item.image) },
    price(){ return this.price_list ? _.toNumber(_.get(_.find(this.prices,this.matchItemPriceList),'price',0)) : 0 },
    kitchen_items(){ return _(this.k_items).flatMap().filter(['item',this.intID]).filter(({ kitchen }) => _.includes(this.s_kitchen_ids,_.toInteger(kitchen))).value() },
    processing(){ return _(this.t_items).filter(({ item,progress }) => item === this.intID && this.processing_status.includes(progress)).value() }
  },
  methods: {
    hKey({ id,kitchen }){ return h_key('isc',this.id,'kitchen',kitchen,'stock',id) },
    matchItemPriceList({ item,price_list }){ return (_.toInteger(item) === this.intID) && (_.toInteger(price_list) === this.intPL) },
    kName({ kitchen }){ return _.truncate(_.get(this.s_kitchens,[_.toInteger(kitchen),'name']),{ length:15, omission: '..' }) },
    pending(i){ return _.sumBy(this.processing,({ quantity,kitchen }) => _.toInteger(kitchen) === i.kitchen ? _.toNumber(quantity) : 0) },
  }
}
</script>
