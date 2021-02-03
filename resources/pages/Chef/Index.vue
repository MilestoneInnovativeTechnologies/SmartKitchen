<template>
  <q-page padding class="q-gutter-y-sm">
    <KitchenItemDayProcess />
    <KitchenItemAcceptable />
    <div class="row q-col-gutter-sm q-mt-xs">
      <div class="col-xs-12 col-sm-6"><KitchenItemLeastStock /></div>
      <div class="col-xs-12 col-sm-6"><KitchenItemDayMostProcessing /></div>
    </div>
    <div class="q-mt-sm q-mx-auto q-gutter-y-sm" style="max-width: 360px; width: 90vw">
<!--      <KitchenAssigned />-->
    </div>
  </q-page>
</template>

<script>
import KitchenAssigned from "components/Kitchen/KitchenAssigned";
import KitchenItemDayProcess from "components/Kitchen/KitchenItemDayProcess";
import KitchenItemDayMostProcessing from "components/Kitchen/KitchenItemDayMostProcessing";
import KitchenItemLeastStock from "components/Kitchen/KitchenItemLeastStock";
import KitchenItemAcceptable from "components/Kitchen/KitchenItemAcceptable";
export default {
  name: "PageChefIndex",
  components: {
    KitchenItemAcceptable,
    KitchenItemLeastStock, KitchenItemDayMostProcessing, KitchenItemDayProcess, KitchenAssigned},
}
</script>
