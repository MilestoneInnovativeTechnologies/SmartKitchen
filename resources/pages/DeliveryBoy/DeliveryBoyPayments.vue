<template>
  <q-page padding>
    <OrderSummaryDeliveryBoy :tokens="bill_tokens" payment />
  </q-page>
</template>

<script>
import Bills from "assets/mixins/Bills";
import {extract_date, is_today} from "assets/helpers";
import OrderSummaryDeliveryBoy from "components/Order/OrderSummaryDeliveryBoy";

export default {
  name: "DeliveryBoyPayments",
  components: {OrderSummaryDeliveryBoy},
  mixins: [Bills],
  data(){ return {
    me: parseInt(this.$route.meta.me.id)
  } },
  computed: {
    Bills(){ return _(this.bills).filter(({date}) => is_today(date)).filter(['user.id', this.me]).value() },
    bill_tokens(){ return _(this.Bills).sortBy(({ payments }) => extract_date(_.get(_.last(payments),'date')).getTime()).map('token').value() }
  }
}
</script>
