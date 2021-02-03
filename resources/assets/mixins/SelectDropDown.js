export default {
  props: ['value','get','name'],
  computed: {
    options(){ return {} },
    optValue(){ return this.get === undefined ? this.value : _.find(this.options,[this.get,this.value]) },
  },
  methods: {
    doEmit(sel){ this.$emit('input',this.get ? sel[this.get] : sel) },
    getName(obj){ return this.name ? this.name(obj) : obj.name }
  }
}
