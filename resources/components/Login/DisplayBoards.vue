<template>
  <q-card>
    <q-card-section class="bg-primary text-white"><div class="text-h6">Display Screens</div></q-card-section>
    <q-list separator>
      <q-item clickable v-ripple>
        <q-item-section avatar><q-avatar text-color="primary" rounded icon="person" /></q-item-section>
        <q-item-section>
          <q-item-label class="text-primary text-bold">Kitchen</q-item-label>
          <q-item-label caption>Displays kitchen items</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar><q-avatar text-color="primary" rounded icon="logout" /></q-item-section>
        <q-item-section>
          <q-item-label class="text-primary text-bold">Home Delivery</q-item-label>
          <q-item-label caption>Delivery orders tracking</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "DisplayBoards"
}
</script>
