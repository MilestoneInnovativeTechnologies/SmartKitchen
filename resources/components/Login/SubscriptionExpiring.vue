<template>
  <q-card flat class="q-mt-md" v-if="SUBSCRIPTION_NOTIFY">
    <q-card-section v-if="!EXPIRED" class="text-red">
      <q-card-section v-if="DAYS_TO_EXPIRE > 15" class="text-grey-6"><span class="text-bold">Note: </span> Your subscription is about to expire.. Only <span class="text-weight-bolder">{{ DAYS_TO_EXPIRE }}</span> days remaining...</q-card-section>
      <q-card-section v-else-if="DAYS_TO_EXPIRE > 10" class="text-black"><span class="text-bold">Note: </span> Your subscription is about to expire.. Only <span class="text-weight-bolder">{{ DAYS_TO_EXPIRE }}</span> days remaining...</q-card-section>
      <q-card-section v-else-if="DAYS_TO_EXPIRE > 7" class="text-red"><span class="text-bold">Note: </span> Your subscription is getting expired.. Only <span class="text-weight-bolder">{{ DAYS_TO_EXPIRE }}</span> days remaining...</q-card-section>
      <q-card-section v-else-if="DAYS_TO_EXPIRE > 5" class="text-red-10" style="border: 5px double #B71C1C"><span class="text-bold">Note: </span> Your subscription is expiring.. Only <span class="text-weight-bolder">{{ DAYS_TO_EXPIRE }}</span> days remaining...</q-card-section>
      <q-card-section v-else-if="DAYS_TO_EXPIRE > 2" class="text-red bg-grey-3"><span class="text-bold">Note: </span> Your subscription is expiring.. Only <span class="text-weight-bolder">{{ DAYS_TO_EXPIRE }}</span> days remaining...</q-card-section>
      <q-card-section v-else-if="DAYS_TO_EXPIRE > 1" class="text-white bg-red-8"><span class="text-bold">Note: </span> Your subscription is expiring.. Only <span class="text-weight-bolder">{{ DAYS_TO_EXPIRE }}</span> days remaining...</q-card-section>
      <q-card-section v-else-if="DAYS_TO_EXPIRE > 0" class="text-white bg-red-10 text-center">
        <div class="text-bold">ATTENTION</div>
        <div class="text-bold">SUBSCRIPTION ENDS TOMORROW</div>
        <div class="text-bold">PLEASE RENEW NOW ITSELF FOR UNINTERRUPTED SERVICE</div>
      </q-card-section>
      <q-card-section v-else class="text-center" style="border: 1px solid #b71c1c">
        <div class="text-bold bg-red-10 text-white q-py-sm q-mb-sm">ATTENTION</div>
        <div class="text-bold">SUBSCRIPTION ENDING TODAY</div>
        <div class="text-bold">SERVICES WILL BE LIMITED FROM TOMORROW ONWARDS</div>
      </q-card-section>
    </q-card-section>
    <q-card-section v-else>
      <q-card-section class="text-center" style="border: 1px solid #b71c1c">
        <div class="text-bold bg-red-10 text-white q-py-sm q-mb-sm">SUBSCRIPTION EXPIRED</div>
        <div class="text-bold text-red-10">ONLY ADMINISTRATOR CAN LOGIN</div>
        <div class="text-bold text-red">OTHER LOGINS ARE TEMPORARILY DISABLED UNTIL NEW SUBSCRIPTION ADDED</div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import Subscription from "assets/mixins/Subscription";

export default {
  name: "SubscriptionExpiring",
  mixins: [Subscription],
}
</script>
