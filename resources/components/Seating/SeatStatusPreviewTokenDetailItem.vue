<template>
  <q-item v-bind="$attrs" style="padding-left: 0px !important;">
    <q-item-section avatar style="min-width: 1.5rem; height: 1.5rem" class="q-px-none"><q-icon :name="icon" size="xs" /></q-item-section>
    <q-item-section><q-item-label class="q-mb-none text-caption" lines="2">{{ label }}</q-item-label></q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "SeatStatusPreviewTokenDetailItem",
  props: ['icon','label']
}
</script>
