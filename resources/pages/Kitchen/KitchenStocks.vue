<template>
  <q-page padding>
    <div class="q-mx-auto" style="width: 90vw">
      <KitchenStocksDisplay :kitchen="id" class="q-mb-sm" />
    </div>
  </q-page>
</template>

<script>
import KitchenStocksDisplay from "components/Kitchen/KitchenStockDisplay";

export default {
  name: 'PageKitchenStocks',
  props: ['id'],
  components: {KitchenStocksDisplay},
}
</script>
