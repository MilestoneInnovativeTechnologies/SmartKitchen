<template>
  <q-page padding class="q-gutter-y-sm">
    <ReceptionistBillSummary />
    <ReceptionistServableItems />
    <ReceptionistHomeDeliveryStatuses />
    <OnlineOrdersPendingList color="purple" title="Pending Online Orders" />
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
import OnlineOrdersPendingList from "components/Order/OnlineOrdersPendingList";

export default {
  name: "PageReceptionistIndex",
  components: {OnlineOrdersPendingList, ReceptionistRemoteTokens, ReceptionistServableItems, ReceptionistNonDiningTokens, ReceptionistBillSummary, ReceptionistHomeDeliveryStatuses},
}
</script>
