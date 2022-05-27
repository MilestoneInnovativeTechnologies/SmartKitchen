<template>
  <q-page padding class="q-gutter-y-sm">
    <ReceptionistBillSummary />
    <ReceptionistServableItems />
    <ReceptionistHomeDeliveryStatuses />
    <OnlineOrdersPendingList color="purple" title="Pending Online Orders" />
    <ReceptionistNonDiningTokens color="teal" @action="OSA_action" />
    <ReceptionistRemoteTokens />
    <OrderSummaryActionPopups @done="OSA_action_done" v-bind="OSA_CB" />
  </q-page>
</template>

<script>
import ReceptionistBillSummary from "components/Receptionist/ReceptionistBillSummary";
import ReceptionistNonDiningTokens from "components/Receptionist/ReceptionistNonDiningTokens";
import ReceptionistServableItems from "components/Receptionist/ReceptionistServableItems";
import ReceptionistRemoteTokens from "components/Receptionist/ReceptionistRemoteTokens";
import ReceptionistHomeDeliveryStatuses from "components/Receptionist/ReceptionistHomeDeliveryStatuses";
import OnlineOrdersPendingList from "components/Order/OnlineOrdersPendingList";
import OrderSummaryActions from "assets/mixins/OrderSummaryActions";
import OrderSummaryActionPopups from "components/Order/OrderSummaryActionPopups";

export default {
  name: "PageReceptionistIndex",
  components: {
    OrderSummaryActionPopups,
    OnlineOrdersPendingList, ReceptionistRemoteTokens, ReceptionistServableItems, ReceptionistNonDiningTokens, ReceptionistBillSummary, ReceptionistHomeDeliveryStatuses},
  mixins: [OrderSummaryActions]
}
</script>
