<template>
  <q-item-section v-if="div === undefined">
    <q-item-label caption :class="'text-' + color" class="text-uppercase" style="font-size: 0.65rem; line-height: 0rem !important;">{{ label }}</q-item-label>
    <q-item-label class="text-bold" caption style="font-size: 0.75rem"><slot /></q-item-label>
  </q-item-section>
  <div v-else>
    <div caption :class="'text-' + color" class="text-uppercase" style="font-size: 0.65rem; line-height: 0rem !important;">{{ label }}</div>
    <div class="text-bold" caption style="font-size: 0.75rem"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetailStackLeft',
  props: ['div','label','color'],
}
</script>
