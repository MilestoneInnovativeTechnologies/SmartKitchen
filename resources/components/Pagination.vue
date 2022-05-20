<template>
  <div class="q-pa-lg flex flex-center" v-show="more"><q-pagination v-model="page" color="primary" :min="1" :max="max" :max-pages="pages || 7" :ellipses="true" :boundary-numbers="true" /></div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['value','records','pages'],
  data(){ return {
    page: 1,
  } },
  computed: {
    ipp(){ return this.$store.getters['settings/items_per_page'] },
    max(){ return (this.records && _.isArray(this.records)) ? _.ceil(this.records.length/this.ipp) : 1 },
    more(){ return (this.records && _.isArray(this.records)) && (this.records.length > this.ipp) },
    from(){ return (this.page - 1) * this.ipp },
    to(){ return (this.page) * this.ipp },
    show(){ return _.slice(this.records,this.from,this.to) },
  },
  watch: {
    show: { immediate:true,deep:true,handler(show){ this.$emit('input',show) } }
  }
}
</script>
