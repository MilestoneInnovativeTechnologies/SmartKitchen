<template>
  <div class="row justify-between" v-bind="$attrs">
    <div class="text-caption">{{ label }}</div>
    <div class="text-caption text-bold"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetailWide',
  props: ['label'],
}
</script>
