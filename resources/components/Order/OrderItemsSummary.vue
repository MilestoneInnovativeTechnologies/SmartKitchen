<template>
  <q-list bordered separator>
    <q-item v-for="(obj,idx) in items" :key="hKey(obj)">
      <q-item-section avatar>{{ idx+1 }}</q-item-section>
      <q-item-section>
        <q-item-label class="row justify-between items-center">
          <div class="text-weight-bold text-grey-9">{{ obj.quantity }} x {{ item(obj.item).name }}</div>
<!--          <q-input dense outlined type="number" class="q-pa-none" style="width: 3rem;" :value="obj.quantity" @change="quantity(obj.item,$event)" />-->
        </q-item-label>
        <q-item-label caption lines="1" v-if="obj.delay">Delay: {{ obj.delay }} minutes</q-item-label>
        <q-item-label caption lines="1" v-if="obj.narration">{{ obj.narration }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="text-bold" v-text="iTotal(obj)" />
      </q-item-section>
      <q-item-section side>
        <q-btn icon="delete" dense color="negative" flat @click="$emit('delete',obj)" />
        <q-btn icon="edit" dense color="warning" flat @click="edit(obj)" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label class="content-end">
          <div class="text-weight-bold text-h6 text-grey-9">Total</div>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="text-h6" v-text="precision(total,2)" />
      </q-item-section>
    </q-item>
    <q-dialog persistent v-model="update_mode" transition-show="scale" transition-hide="scale">
      <OrderItemUpdateForm style="width: 700px; max-width: 60vw;" @close="close" @update="update" v-if="update_obj" v-bind="update_obj" />
    </q-dialog>
  </q-list>
</template>

<script>
import {h_key, precision} from "assets/helpers";
import OrderItemUpdateForm from "components/Order/OrderItemUpdateForm";

export default {
  name: "OrderItemsSummary",
  components: {OrderItemUpdateForm},
  data(){ return {
    update_mode: false,
    update_obj: null,
  } },
  props: ['items','price_list'],
  computed: {
    price(){ return _(this.$store.state.prices.data).filter(['price_list',_.toSafeInteger(this.price_list)]).mapKeys('item').mapValues('price').value() },
    total(){ return _.sumBy(this.items,({ item,quantity }) => (_.toNumber(quantity) || 0) * (_.toNumber(_.get(this.price,item)) || 0) ) }
  },
  methods: {
    hKey({ item }){ return h_key('order','summary','item',item) },
    item(id){ return _.get(this.$store.state.items.data,_.toSafeInteger(id)) },
    quantity(item,evt){ this.$emit('quantity',{ item,quantity:_.toNumber(evt.target.value)  }) },
    iTotal({ item,quantity }){ return precision(quantity * this.price[item],2) },
    precision(amount){ return precision(amount,2) },
    edit(obj){ this.update_obj = obj; this.update_mode = true  },
    update(obj){ this.$emit('update',obj); this.close() },
    close(){ this.update_mode = false; this.update_obj = null }
  }
}
</script>
