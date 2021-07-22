<template>
  <q-page padding class="q-gutter-y-sm">
    <ReceptionistBillSummary />
    <ReceptionistServableItems />
    <ReceptionistNonDiningTokens />
    <ReceptionistRemoteTokens />
  </q-page>
</template>

<script>
import ReceptionistBillSummary from "components/Receptionist/ReceptionistBillSummary";
import ReceptionistNonDiningTokens from "components/Receptionist/ReceptionistNonDiningTokens";
import ReceptionistServableItems from "components/Receptionist/ReceptionistServableItems";
import ReceptionistRemoteTokens from "components/Receptionist/ReceptionistRemoteTokens";

export default {
  name: "PageReceptionistIndex",
  components: {ReceptionistRemoteTokens, ReceptionistServableItems, ReceptionistNonDiningTokens, ReceptionistBillSummary},
}
</script>
