<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Update {{ name }}</div><q-space />
      <q-btn icon="close" flat round dense @click="$emit('close',null)" />
    </q-card-section>
    <q-card-section class="q-gutter-xs q-pb-none">
      <q-input dense outlined type="number" label="Quantity" v-model.number="params.quantity"/>
      <q-input dense outlined type="number" label="Delay in Minutes" v-model.number="params.delay"/>
      <q-input dense type="textarea" outlined label="Narration if any" v-model="params.narration"/>
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-xs">
      <q-btn color="negative" label="Cancel Item" type="submit" @click.prevent="cancel" :disable="loading" icon="delete" />
      <q-space />
      <q-btn color="warning" flat label="Close" type="submit" @click.prevent="$emit('close',null)" :disable="loading" />
      <q-btn color="primary" label="Update Item" type="submit" @click.prevent="update" :loading="loading"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "OrderSummaryItemUpdate",
  props: ['token'],
  data(){ return {
    loading: false,
    params: {
      item: null, quantity: 1, narration: '', delay: 0, id: null
    }
  } },
  computed: {
    name(){ return _.get(this.$store.state.items,[this.params.item,'name']) },
  },
  methods: {
    cancel(){
      this.loading = true;
      post('token','cancel',{ id:this.params.id })
        .then(() => {
          this.$emit('close');
        }).catch().then(() => this.loading = false);
    },
    update(){
      this.loading = true;
      post('token','item',this.params)
        .then(() => this.$emit('close')).catch().then(() => this.loading = false)
    }
  },
  created(){
    _.forEach(['quantity','narration','id'],key => this.params[key] = _.get(this.$attrs,key))
    this.params.item = _.get(this.$attrs,['item','id'])
    if(this.$attrs.delay && this.$attrs.delay > 0 && this.$attrs.delay * 1000 > new Date().getTime()){
      this.params.delay = _.ceil((this.$attrs.delay - _.toInteger(new Date().getTime()/1000))/60)
    } else this.params.delay = 0;
  }
}
</script>
