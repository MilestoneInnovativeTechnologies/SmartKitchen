<template>
<!--  <q-list dense bordered separator>
    <q-item v-for="(item,idx) in products" :key="'qoid-i-'+item.item+'-'+idx">
      <q-item-section side><q-item-label caption class="text-primary text-weight-bold">{{ idx+1 }}</q-item-label></q-item-section>
      <q-item-section avatar><q-avatar rounded><q-img v-if="item && item.img" :src="item.img" /></q-avatar></q-item-section>
      <q-item-section>
        <div style="font-size: 0.55rem; line-height: 0.65" class="text-primary">{{ item.prop }}</div>
        <q-item-label class="text-weight-bold text-primary" caption>{{ item.name }}</q-item-label>
      </q-item-section>
      <q-item-section side><q-item-label class="text-weight-bold text-primary" caption style="">{{ item.quantity }}x {{ item.price }}</q-item-label></q-item-section>
      <q-item-section side><q-item-label caption class="text-primary text-weight-bold">{{ item.amount }}</q-item-label></q-item-section>
    </q-item>
  </q-list>-->
  <div>
    <div class="row text-caption text-primary text-weight-bold" v-show="count">
      <div class="col">#</div>
      <div class="col">Code</div>
      <div class="col-7">Details</div>
      <div class="col-2 text-right">Total</div>
    </div>
    <div class="row  text-caption text-primary" v-for="(item,idx) in products" :key="'qoid-i-'+item.item+'-'+idx">
      <div class="col">{{ count-idx }}</div>
      <div class="col">{{ item.prop }}</div>
      <div class="col-7">{{ item.quantity }}x {{ item.price }} {{ item.name }}</div>
      <div class="col-2 text-right">{{ item.amount }}</div>
    </div>
  </div>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {image, precision} from "assets/helpers";
import {mapState} from "vuex";
export default {
  name: "QuickOrderItemsDisplay",
  components: {CardImageTitle},
  props: ['items','prices','prop'],
  computed: {
    ...mapState('items',{ item_master:'data' }),
    products(){ return _.map(this.items,this.item_details).reverse() },
    count(){ return _.size(this.products) },
  },
  methods: {
    item_details(item){
      let i_id = item.item,
        name = _.get(this.item_master,[i_id,'name']),
        prop = _.get(this.item_master,[i_id,this.prop]),
        price = precision(_.get(this.prices,i_id)),
        amount = precision(price * item.quantity),
        img = image(_.get(this.item_master,[i_id,'image']));
      return Object.assign({},item,{ name,prop,price,amount,img })
    },
  }
}
</script>
