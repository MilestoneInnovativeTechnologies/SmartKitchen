<template>
  <q-card :flat="flat === undefined ? false : flat" :bordered="bordered === undefined ? false : bordered">
    <q-img basic :src="img" v-if="img">
      <div class="absolute-bottom text-subtitle2 text-center">{{ text }}</div>
    </q-img>
    <q-card-section v-else>
      <q-icon v-if="icon" :name="icon" :size="size || 'sm'"/>
      <div :class="'text-' + (weight || 'bold')">{{  text }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Jumbotron",
  props: ['text','icon','weight','size','bordered','flat','img']
}
</script>
