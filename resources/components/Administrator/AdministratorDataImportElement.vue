<template>
  <q-card>
    <q-card-section class="bg-cyan text-white text-bold q-py-sm">{{ label }}</q-card-section>
    <q-card-section><q-input type="textarea" :value="value" @input="$emit('input',$event)" outlined /></q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "AdministratorDataImportElement",
  props: ['label','value']
}
</script>
