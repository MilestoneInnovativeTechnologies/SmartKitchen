<template>
  <q-card style="min-width: 65vw" flat>
    <q-bar class="bg-secondary text-white"><q-space /><q-btn dense flat icon="close" v-close-popup><q-tooltip content-class="bg-white text-primary">Close</q-tooltip></q-btn></q-bar>
    <q-card-section><q-img :src="url" /></q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "ImageViewCard",
  props: ['url'],
}
</script>
