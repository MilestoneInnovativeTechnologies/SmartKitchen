<template>
  <div>
    <div class="text-h6 q-mb-sm q-ml-sm">Ongoing Seating</div>
    <Masonry :items="tokens" width="300">
      <template v-slot:item="row">
        <div class="q-pa-xs col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1">
          <q-card :class="'bg-' + cColor[row.progress]">
            <q-card-section class="q-py-xs" :class="'bg-' + cColor[row.progress]"></q-card-section>
            <q-img basic :src="media(row.seating.image)">
              <div class="absolute-bottom text-subtitle2 text-center">
                <div class="text-h6">{{ row.seating.name }}</div>
                <div class="text-subtitle2" v-if="row.customer">{{ row.customer.name }}</div>
                <div>
                  <component :is="spinners[row.progress]" :color="bColor[row.progress]" size="sm" />
                  <q-badge :color="bColor[row.progress]" :label="row.progress" class="q-ml-xs q-py-xs" />
                  <q-badge :color="bColor[row.progress]" :label="row.id" class="q-ml-xs q-py-xs" />
                </div>
              </div>
            </q-img>
            <q-list v-if="row.items.length" bordered separator>
              <q-item v-for="(item,idx) in row.items" :key="hKey(row.id,idx,item.id)">
                <q-item-section>
                  <q-item-label class="text-bold">{{ item.quantity }} X {{ item.name }}</q-item-label>
                  <q-item-label caption v-if="item.kitchen"><q-icon size="xs" name="outdoor_grill" /> {{ item.kitchen }}</q-item-label>
                  <q-item-label caption v-if="item.narration" class="text-italic">{{ item.narration }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge color="blue" :label="item.progress" class="q-py-xs" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </Masonry>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {h_key, image} from "assets/helpers";
import {TokenProgressColor} from "assets/assets";
import CardImageTitle from "components/CardImageTitle";
import Masonry from "components/Masonry";

export default {
  name: "OrderOngoingTables",
  components: {Masonry, CardImageTitle},
  data(){ return {
    cColor: { New:'red-2',Processing:'purple-2',Completed:'green-2' },
    bColor: TokenProgressColor,
    spinners: { New:'q-spinner-ball', Processing: 'q-spinner-rings', Completed: null }
  } },
  computed: {
    fProgress(){ return _.keys(this.cColor) },
    ...mapState({
      items({ items:{ data } }){ return _(data).mapValues('name').value() },
      kitchens({ kitchens:{ data } }){ return _(data).mapValues('name').value() },
      tokens({ tokens:{ data,items },seating,customers }){
        return _(data).filter(({ progress }) => this.fProgress.includes(progress)).map(token => Object.assign({},token,
          { items: this.iNameAttach(items[token.id]) },
          { seating: _.get(seating,['data',token.seating]) },
          { customer: _.get(customers,['data',token.customer]) },
        )).value()
      }
    })
  },
  methods: {
    iNameAttach(items){ return _(items).map(item => Object.assign({},item,{ name: _.get(this.items,[item.item]),kitchen: _.get(this.kitchens,[item.kitchen],null) })).value() },
    hKey(token,idx,item){ return h_key('order','ongoing','tables','order',token,'item','index',idx,'item',item) },
    media(link){ return image(link) }
  },
}
</script>
