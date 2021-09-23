<template>
  <q-page padding>
    <q-input outlined v-model="filter" class="q-mb-xs" label="Search Items" />
    <q-scroll-area style="height: calc(100vh - 126px)">
      <div class="row q-col-gutter-sm">
        <div :class="view === 'grid' ? 'col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'" v-for="item in filter_items" :key="'omli-i-' + item.id">
          <OnlineMenuItem v-bind="item" :price="prices[item.id]" :image="getImage(item)" :order="can_order" @click.native="can_order ? add(item) : null" />
        </div>
      </div>
    </q-scroll-area>

    <q-inner-loading :showing="expired">
      <q-spinner-comment size="15rem" color="red" />
      <div class="text-h5 text-red text-uppercase text-bold text-center">sorry <br />menu expired!!</div>
    </q-inner-loading>
  </q-page>
</template>

<script>
import OnlineMenuItem from "components/Menu/OnlineMenuItem";
import {image, matches} from "assets/helpers";
export default {
  name: 'PageOnlineMenuIndex',
  components: {OnlineMenuItem},
  data(){ return {
    filter: ''
  } },
  computed: {
    expired(){ let validity = _.get(this.$store.state.public,['params','validity'],false); return !!(validity && new Date(validity) < new Date()) },
    group(){ return this.$store.state.public.group_selected },
    items(){ return _.values(_.get(this.$store.state.public,'Items')) },
    group_items(){ return this.group ? _.filter(this.items,({ groups }) => groups.includes(this.group)) : this.items },
    display_items(){ return this.expired ? _.slice(this.group_items,0,4) : this.group_items },
    filter_items(){ return this.filter ? _.filter(this.display_items,item => matches(item,['name','id'],this.filter)) : this.display_items },
    prices(){ return _(_.get(this.$store.state.public,'Prices')).filter(['list',this.$store.state.public.params.price_list]).keyBy('item').mapValues('price').value() },
    can_order(){ return !!_.get(this.$store.state.public,['params','type'],false) },
    view(){ return this.$store.state.public.view },
    images(){ return this.$store.state.public.images }
  },
  methods: {
    add({ id,name }){
      let idx = _.findIndex(this.$store.state.public.cart,['id',id]);
      if(idx === -1) this.$store.commit('push', { path:'cart',value:{ id,name,rate:_.toNumber(this.prices[id]),quantity:1 } })
      else this.$store.commit('update',{ path:['cart',idx,'quantity'],value:this.$store.state.public.cart[idx].quantity+1 })
    },
    getImage({ id,image:iImage }){ return this.images ? _.get(this.images,_.toInteger(id),_.get(this.images,0)) : image(iImage) }
  }
}
</script>
