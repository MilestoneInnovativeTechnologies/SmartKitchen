<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Update Order Item</div><q-space />
      <q-btn icon="close" flat round dense @click="$emit('close',null)" />
    </q-card-section>
    <q-card-section class="q-gutter-xs q-pb-none">
      <q-input dense outlined type="number" label="Quantity" v-model.number="quantity"/>
      <q-input dense outlined type="number" label="Delay in Minutes" v-model.number="delay"/>
      <q-input dense type="textarea" outlined label="Narration if any" v-model="narration"/>
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-xs">
      <q-btn color="primary" label="Update" type="submit" @click.prevent="update"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "OrderItemUpdateForm",
  props: ['item'],
  data(){ return {
    quantity: 1, delay: 0, narration: null
  } },
  created() {
    _.forEach(['quantity','delay','narration'],key => this[key] = (_.toNumber(this.$attrs[key]) == this.$attrs[key]) ? _.toNumber(this.$attrs[key]) : this.$attrs[key])
  },
  methods: {
    update(){ this.$emit('update',{
      item:_.toSafeInteger(this.item),
      quantity:_.toNumber(this.quantity),
      delay:_.toNumber(this.delay), narration:this.narration || null
    }) }
  }
}
</script>
