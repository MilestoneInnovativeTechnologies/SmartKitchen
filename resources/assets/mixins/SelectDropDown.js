export default {
  props: ['value','get','name'],
  computed: {
    options(){ return {} },
    optValue(){ return this.get === undefined ? this.value : _.find(this.options,[this.get,this.value]) },
  },
  methods: {
    clear(){ this.$emit('input',null) },
    doEmit(sel){ this.$emit('input',this.get ? _.get(sel,this.get,null) : sel) },
    getName(obj){ return this.name ? this.name(obj) : obj.name }
  },
  created() {
    if(_.has(this.$attrs,'clearable') || this.value) return;
    this.doEmit(_.head(this.options));
  }
}
