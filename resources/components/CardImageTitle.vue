<template>
  <q-img basic :src="image">
    <div v-if="title" class="absolute-bottom text-subtitle2 text-center" v-text="title" />
  </q-img>
</template>

<script>
export default {
  name: "CardImageTitle",
  props: ['image','title']
}
</script>
