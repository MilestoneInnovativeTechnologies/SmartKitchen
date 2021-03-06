<template>
  <q-page padding class="q-gutter-y-sm">
    <ReceptionistBillSummary />
    <ReceptionistServableItems />
    <ReceptionistNonDiningTokens />
  </q-page>
</template>

<script>
import ReceptionistBillSummary from "components/Receptionist/ReceptionistBillSummary";
import ReceptionistNonDiningTokens from "components/Receptionist/ReceptionistNonDiningTokens";
import ReceptionistServableItems from "components/Receptionist/ReceptionistServableItems";
export default {
  name: "PageReceptionistIndex",
  components: {ReceptionistServableItems, ReceptionistNonDiningTokens, ReceptionistBillSummary},
}
</script>
