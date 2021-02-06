<template>
  <q-btn-group>
    <q-btn color="secondary" glossy label="Progress Mode" @click="$emit('mode','progress')" />
    <q-btn color="secondary" glossy label="Token Mode" @click="$emit('mode','token')" />
    <q-btn color="secondary" glossy label="Both" @click="$emit('mode','both')" />
  </q-btn-group>
</template>

<script>
export default {
  name: "KitchenTokenDisplayMode"
}
</script>
