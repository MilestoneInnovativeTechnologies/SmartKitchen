<template>
  <q-card v-if="item" @click="$emit('selected',item)" style="cursor: pointer">
    <q-img basic :src="src">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ item.name }}
      </div>
    </q-img>
  </q-card>
</template>

<script>
export default {
  name: "ItemSelectCard",
  props: ['id'],
  computed: {
    item(){ return _.get(this.$store.state.items.data,_.toSafeInteger(this.id)) },
    src(){ return 'https://cdn.quasar.dev/img/parallax2.jpg'; /*images.seating*/ }
  }

}
</script>
