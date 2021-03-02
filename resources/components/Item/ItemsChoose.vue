<template>
  <q-card>
    <q-card-section class="text-weight-bold bg-grey-1">{{ label || 'Choose Items' }}</q-card-section>
    <q-card-section>
      <q-chip color="secondary" :outline="!chosen.includes(item.id)" clickable @click="toggle(item)" v-for="item in items" :key="'tic-' + item.id"><q-avatar><q-img :src="image(item)" /></q-avatar>{{ item.name }}</q-chip>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import {image} from "assets/helpers";

export default {
  name: "ItemsChoose",
  data(){ return {
    chosen: [],
  } },
  props: ['label','value'],
  computed: {
    ...mapState('items',{ items({ data }){ return _.map(data,({ id,name }) => _.zipObject(['id','name'],[id,name])) } }),
  },
  methods: {
    toggle({ id }){
      let idx = _.indexOf(this.chosen,id);
      if(idx > -1) this.chosen.splice(idx,1)
      else this.chosen.push(id);
      this.$emit('input',this.chosen)
    },
    image(item){ return image(item.image) }
  },
  watch: {
    value: {
      immediate: true, deep: true,
      handler(){ this.chosen = _.clone((this.value ? (_.isArray(this.value) ? this.value : [this.value]) : [])) }
    }
  }
}
</script>
