<template>
  <q-item tag="label" v-ripple v-bind="$attrs">
    <q-item-section avatar><q-radio @input="$emit('input',$event)" :value="value" :val="val" /></q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "AdministratorDataImportModeElement",
  props: ['label','caption','value','val'],
}
</script>
