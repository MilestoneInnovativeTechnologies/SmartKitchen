<template>
  <q-card flat>
    <q-card-section class="q-px-none q-pb-none"><q-skeleton type="rect" style="height:8rem" /></q-card-section>
    <q-card-section horizontal class="q-pa-none">
      <q-card-section class="q-pa-none q-pt-xs col-8"><q-skeleton type="rect" style="height: 2rem" /></q-card-section>
      <q-card-section class="q-pa-none q-pt-xs col-3 offset-1"><q-skeleton type="rect" style="height: 2rem" /></q-card-section>
    </q-card-section>
    <q-card-actions class="q-px-none" align="right"><q-skeleton type="rect" style="width: 5rem; height: 2.5rem" /></q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "OnlineMenuItemSkeleton"
}
</script>
