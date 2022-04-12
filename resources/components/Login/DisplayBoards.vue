<template>
  <q-card>
    <q-card-section class="bg-primary text-white"><div class="text-h6">Display Screens</div></q-card-section>
    <q-list separator>
      <q-item clickable v-ripple v-for="(screen,idx) in screens" :key="'ds-' + idx" :to="screen.to">
        <q-item-section avatar><q-avatar :text-color="textColor" rounded :icon="screen.icon" /></q-item-section>
        <q-item-section>
          <q-item-label class="text-primary text-bold">{{ screen.name }}</q-item-label>
          <q-item-label caption>{{ screen.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import screens from "assets/display_screens";

export default {
  name: "DisplayBoards",
  data(){ return {
    textColor: 'primary',
    screens
  } }
}
</script>
