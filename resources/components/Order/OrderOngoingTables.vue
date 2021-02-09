<template>
  <q-table :data="tokens" grid title="Ongoing Seating" :pagination="{ rowsPerPage:16 }">
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1">
        <q-card :class="'bg-' + cColor[props.row.progress]">
          <q-card-section class="text-center">
            <div class="text-h6">{{ props.row.seating.name }}</div>
            <div class="text-subtitle2" v-if="props.row.customer">{{ props.row.customer.name }}</div>
            <div>
              <component :is="spinners[props.row.progress]" :color="bColor[props.row.progress]" size="sm" />
              <q-badge :color="bColor[props.row.progress]" :label="props.row.progress" class="q-ml-xs" />
            </div>
          </q-card-section>
          <q-list v-if="props.row.items.length" bordered>
            <q-item v-for="(item,idx) in props.row.items" :key="hKey(props.row.id,idx,item.id)">
              <q-item-section>
                <q-item-label class="text-bold">{{ item.quantity }} X {{ item.name }}</q-item-label>
                <q-item-label caption v-if="item.kitchen"><q-icon size="xs" name="outdoor_grill" /> {{ item.kitchen }}</q-item-label>
                <q-item-label caption v-if="item.narration" class="text-italic">{{ item.narration }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge color="blue" :label="item.progress" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import { mapState } from 'vuex'
import {h_key} from "assets/helpers";
import {TokenProgressColor} from "assets/assets";

export default {
  name: "OrderOngoingTables",
  data(){ return {
    cColor: { New:'cyan-2',Processing:'orange-2',Completed:'green-2' },
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
  },
}
</script>
