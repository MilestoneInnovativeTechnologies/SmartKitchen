<template>
  <q-page padding>
    <div class="q-mx-auto" style="width: 90vw">
      <KitchenItemsDisplay :kitchen="id" class="q-mb-sm" />
    </div>
  </q-page>
</template>

<script>
import KitchenItemsDisplay from "components/Kitchen/KitchenItemsDisplay";

export default {
  name: 'PageKitchenItems',
  props: ['id'],
  components: {KitchenItemsDisplay},
  computed: {

  },
  methods: {
  }
}
</script>
