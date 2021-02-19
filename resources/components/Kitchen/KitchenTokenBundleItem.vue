<template>
  <q-item :disable="wait > 0 || $attrs.processing" clickable @click="$emit('proceed',$attrs.identify)">
    <q-item-section avatar><q-avatar rounded><q-img :src="src" /></q-avatar></q-item-section>
    <q-item-section>
      <q-item-label caption v-if="$attrs['show-stock'] !== undefined">Stock: {{ $attrs.stock }}</q-item-label>
      <q-item-label class="text-weight-bold">{{ $attrs.name }}</q-item-label>
      <q-item-label caption class="text-bold" v-if="wait">Wait: {{ wait }}</q-item-label>
      <q-item-label caption class="text-red text-bold" v-if="$attrs.narration">{{ $attrs.narration }}</q-item-label>
    </q-item-section>
    <q-item-section side><q-avatar :color="color" rounded text-color="white" class="text-weight-bold">{{ $attrs.total }}</q-avatar></q-item-section>
    <q-inner-loading :showing="$attrs.processing" transition-hide="fadeOut" transition-show="fadeIn"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-item>
</template>

<script>
import {images} from "src/assets/default_images";
import {TokenItemProgressColor} from "assets/assets";

export default {
  name: "KitchenTokenBundleItem",
  data(){ return {
    wait: _.toInteger(this.$attrs.wait),
    src:images.item,
    interval: 0, color: TokenItemProgressColor[this.$attrs.progress]
  } },
  created() {
    if(!this.wait) return;
    this.interval = setInterval(vm => vm.wait--,1000,this);
    setTimeout(vm => clearInterval(vm.interval),this.wait * 1000,this)
  }
}
</script>
