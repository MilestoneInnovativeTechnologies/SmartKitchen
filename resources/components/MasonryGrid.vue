<template>
<!--  <div ref="masonry-container" class="column full-width masonry-container content-start" :class="['masonry' + cols,'q-col-gutter-' + (gutter || 'xs')]" :style="{ height:containerHeight }">
    <div :style="{ flex: '1 0 100%',width: 0 }" :class="{ hidden: !idx }" v-for="(col,idx) in cols"></div>
    <div v-for="(item, idn, idx) in items" :key="hKey(idn)" :style="{ width: cell_width }" tabindex="0" class="q-mb-xs">
      <slot name="item" v-bind="(typeof item !== 'object' || Array.isArray(item)) ? { item } : item" :identity="idn" :index="idx" />
    </div>
  </div>-->
  <div class="row content-start" :class="'q-col-gutter-' + (gutter || 'xs')" :key="hKey(update)">
    <div v-for="(item, idn, idx) in items" :key="hKey(idn)" :class="'col-' + col_width">
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
    update: Math.random(),
  } },
  computed: {
    col_width(){ return _.ceil(12/(_.floor(this.$q.screen.width/_.toInteger(this.width || 220)) || 1)) },
    items_size(){ return _.size(this.items) },
  },
  methods: {
    hKey(idx){ return h_key('masonry','row',idx) },
  },
  watch: {
    items_size: { immediate:true, handler(){ this.update = Math.random() } }
  }
}
</script>
