<template>
  <div ref="masonry-container" class="column full-width masonry-container content-start" :class="['masonry' + cols,'q-col-gutter-' + (gutter || 'xs')]" :style="{ height:containerHeight }">
    <div :style="{ flex: '1 0 100%',width: 0 }" :class="{ hidden: !idx }" v-for="(col,idx) in cols"></div>
    <div v-for="(item, idn, idx) in items" :key="hKey(idn)" :style="{ width: cell_width }" tabindex="0" class="q-mb-xs">
      <slot name="item" v-bind="(typeof item !== 'object' || Array.isArray(item)) ? { item } : item" :identity="idn" :index="idx" />
    </div>
  </div>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollHeight } = scroll
import {h_key} from "assets/helpers";

export default {
  name: "Masonry",
  props: ['columns','items','gutter','width'],
  data () { return {
    arg: 0, containerHeight: 0
  } },
  computed: {
    cols(){ return this.columns ? _.toInteger(this.columns) : this.masonry_cols(this.width) },
    cell_width(){ return _.floor(100/this.cols) + '%' },
    items_size(){ return _.size(this.items) },
  },
  methods: {
    hKey(idx){ return h_key('masonry','row',idx) },
    masonry_cols(width) { return [1,1,2,3,4,5,6,7,8,9,10,11][_.floor(this.$q.screen.width/(_.toInteger(width || 175)))] || 12 },
    set_height(){
      this.containerHeight = null; let vm = this;
      this.$nextTick(function(){
        let height = getScrollHeight(vm.$refs['masonry-container']), items = vm.items_size;
        let itemHeight = _.ceil(height/items), itemsPerCol = _.ceil(items/vm.cols);
        vm.containerHeight = (itemHeight * itemsPerCol) + itemHeight + 'px'
      })
    },
    set_height_after(){ setTimeout(this.set_height,((this.items_size/50)+1)*175) }
  },
  created(){ this.arg = _.isArray(this.items) ? 0 : 1 },
  watch: {
    items_size: { immediate:true, handler:'set_height_after' }
  }
}
</script>
