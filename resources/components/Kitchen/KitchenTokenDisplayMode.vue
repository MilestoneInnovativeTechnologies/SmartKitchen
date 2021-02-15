<template>
  <q-btn-group>
    <q-btn color="secondary" glossy label="Token" @click="$emit('mode','token')" />
    <q-btn color="secondary" glossy label="Item" @click="$emit('mode','item')" />
    <q-btn color="secondary" glossy label="Progress" @click="$emit('mode','progress')" />
<!--    <q-btn color="secondary" glossy label="Both" @click="$emit('mode','both')" />-->
  </q-btn-group>
</template>

<script>
export default {
  name: "KitchenTokenDisplayMode"
}
</script>
