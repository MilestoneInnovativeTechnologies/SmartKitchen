<template>
  <q-img basic :src="image">
    <div v-if="title" class="absolute-bottom text-subtitle2 text-center" v-text="title" />
    <span v-if="info !== undefined" class="absolute-top-right bg-transparent q-pr-xs q-pt-xs"><q-btn @click.stop="$emit('info',true)" icon="error_outline" style="transform: rotate(180deg)" flat round padding="0" size="md" color="white" dense /></span>
  </q-img>
</template>

<script>
export default {
  name: "CardImageTitle",
  props: ['image','title','info']
}
</script>
