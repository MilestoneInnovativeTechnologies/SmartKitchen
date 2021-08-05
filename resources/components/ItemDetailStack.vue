<template>
  <div class="text-center text-bold text-caption" style="font-size:0.7rem; line-height: 1.3">
    <slot /><br />
    <span class="text-uppercase" :class="'text-' + (color || 'primary')" style="font-size: 0.65rem">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'ItemDetailStack',
  props: ['label','color'],
}
</script>
