<template>
  <q-item>
    <q-item-section><q-item-label caption lines="3">{{ name }}</q-item-label></q-item-section>
    <q-item-section><q-item-label caption><q-input dense type="number" v-model.lazy="params.stock" /></q-item-label></q-item-section>
    <q-item-section><q-item-label caption><q-input dense type="number" v-model.lazy="params.duration" /></q-item-label></q-item-section>
    <q-item-section><q-item-label caption><q-select dense :options="['Yes','No']" v-model="params.auto_process" /></q-item-label></q-item-section>
    <q-item-section side><q-spinner-hourglass v-if="loading" size="xs" color="primary" /></q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "KitchenItemsDisplayItemRow",
  props: ['id','name'],
  data(){ return {
    params: { stock:0,duration:0,auto_process:'No',id:null },
    ready: false, loading: false
  } },
  created(){
    _.forEach(['stock','duration','auto_process'],k => this.params[k] = this.$attrs[k])
    this.params.id = this.id; this.$nextTick(() => this.ready = true);
  },
  watch: {
    params: {
      deep: true,
      handler(params){
        this.loading = true;
        if(!this.ready || !params.id) return this.loading = false;
        post('kitchen','item',params).then(() => this.loading = false)
      }
    }
  }
}
</script>
