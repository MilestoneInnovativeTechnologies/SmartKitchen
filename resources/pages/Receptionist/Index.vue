<template>
  <q-page padding class="q-gutter-y-sm">
    <ReceptionistBillSummary />
    <ReceptionistServableItems />
    <ReceptionistHomeDeliveryStatuses />
    <ReceptionistNonDiningTokens />
    <ReceptionistRemoteTokens />
  </q-page>
</template>

<script>
import ReceptionistBillSummary from "components/Receptionist/ReceptionistBillSummary";
import ReceptionistNonDiningTokens from "components/Receptionist/ReceptionistNonDiningTokens";
import ReceptionistServableItems from "components/Receptionist/ReceptionistServableItems";
import ReceptionistRemoteTokens from "components/Receptionist/ReceptionistRemoteTokens";
import ReceptionistHomeDeliveryStatuses from "components/Receptionist/ReceptionistHomeDeliveryStatuses";

export default {
  name: "PageReceptionistIndex",
  components: {ReceptionistRemoteTokens, ReceptionistServableItems, ReceptionistNonDiningTokens, ReceptionistBillSummary, ReceptionistHomeDeliveryStatuses},
}
</script>
