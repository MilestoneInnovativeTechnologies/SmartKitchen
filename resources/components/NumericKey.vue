<template>
  <q-btn :label="label" :icon="icon" color="primary" padding="md" push @click="$emit('click',label === undefined ? icon : label)" />
</template>

<script>
export default {
  name: "NumericKey",
  props: ['label','icon']
}
</script>
