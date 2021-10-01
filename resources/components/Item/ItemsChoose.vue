<template>
  <q-card>
    <q-card-section class="text-weight-bold bg-grey-1 flex justify-between">
      <div>{{ label || 'Choose Items' }}</div>
      <q-toggle v-model="ims" checked-icon="check" color="red" label="Items with Image" unchecked-icon="clear" />
    </q-card-section>
    <q-card-section>
      <FilterInputText class="q-mb-sm" @text="fTxt" />
      <q-chip color="secondary" :outline="!chosen.includes(item.id)" clickable @click="toggle(item)" v-for="item in items" :key="'tic-' + item.id"><q-avatar v-if="ims"><q-img :src="item.image" /></q-avatar>{{ item.name }}</q-chip>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapState} from "vuex";
import {image} from "assets/helpers";
import FilterInputText from "components/FilterInputText";

export default {
  name: "ItemsChoose",
  components: {FilterInputText},
  data(){ return {
    chosen: [], filter: '', ims: false,
  } },
  props: ['label','value'],
  computed: {
    ...mapState('items',{ items({ data }){ return this.filter ? _(data).filter(this.has).map(this.itmObj).value() : _.map(data,this.itmObj) }}),
  },
  methods: {
    fTxt(txt){ this.filter = txt ? txt.toLowerCase() : '' },
    toggle({ id }){
      let idx = _.indexOf(this.chosen,id);
      if(idx > -1) this.chosen.splice(idx,1)
      else this.chosen.push(id);
      this.$emit('input',this.chosen)
    },
    image(path){ return image(path) },
    itmObj({ id,name,image }){ return _.zipObject(['id','name','image'],[id,name,this.image(image)]) },
    has({ name }){ return name.toLowerCase().includes(this.filter) }
  },
  watch: {
    value: {
      immediate: true, deep: true,
      handler(){ this.chosen = _.clone((this.value ? (_.isArray(this.value) ? this.value : [this.value]) : [])) }
    }
  }
}
</script>
