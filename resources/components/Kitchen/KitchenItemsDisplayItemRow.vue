<template>
  <q-item>
    <q-item-section><q-item-label caption lines="3">{{ name }}</q-item-label></q-item-section>
    <q-item-section><q-item-label caption><q-input dense type="number" v-model.lazy="params.stock" /></q-item-label></q-item-section>
    <q-item-section><q-item-label caption><q-input dense type="number" v-model.lazy="params.duration" /></q-item-label></q-item-section>
    <q-item-section><q-item-label caption><q-select dense :options="['Yes','No']" v-model="params.auto_process" /></q-item-label></q-item-section>
    <q-item-section><q-item-label caption><q-select dense :options="['Yes','No']" v-model="params.auto_complete" /></q-item-label></q-item-section>
    <q-item-section side>
      <q-spinner-hourglass v-if="loading" size="xs" color="primary" />
      <q-btn v-else size="md" color="red" dense flat icon="clear" round @click="del" />
    </q-item-section>
  </q-item>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "KitchenItemsDisplayItemRow",
  props: ['id','name'],
  data(){ return {
    params: { stock:0,duration:0,auto_process:'No',auto_complete:'No',id:null },
    ready: false, loading: false
  } },
  methods: {
    ...mapMutations('kitchens',['item_remove']),
    del(){
      this.loading = true;
      post('kitchen','item',{ delete: this.id }).then(() => this.loading = this.item_remove({ kitchen:this.$attrs['kitchen'],id:this.id }) && false)
    }
  },
  created(){
    _.forEach(['stock','duration','auto_process','auto_complete'],k => this.params[k] = this.$attrs[k])
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
