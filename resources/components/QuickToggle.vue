<template>
  <q-toggle v-model="quick" icon="offline_bolt" color="indigo" />
</template>

<script>
import QuickMode from "assets/mixins/QuickMode";

export default {
  name: "QuickToggle",
  mixins: [QuickMode]
}
</script>
