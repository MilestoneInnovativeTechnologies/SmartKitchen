<template>
  <component :is="component" v-bind="$attrs" />
</template>

<script>
import ReportControlDate from "components/Report/Control/ReportControlDate";
import ReportControlRange from "components/Report/Control/ReportControlRange";
import ReportControlSaleType from "components/Report/Control/ReportControlSaleType";
import ReportControlItem from "components/Report/Control/ReportControlItem";
import ReportControlCloudItem from "components/Report/Control/ReportControlCloudItem";
import ReportControlCustomer from "components/Report/Control/ReportControlCustomer";
import ReportControlKitchen from "components/Report/Control/ReportControlKitchen";
import ReportControlTaxNature from "components/Report/Control/ReportControlTaxNature";
import ReportControlTax from "components/Report/Control/ReportControlTax";
import ReportControlUser from "components/Report/Control/ReportControlUser";
import ReportControlDeliveryBoy from "components/Report/Control/ReportControlDeliveryBoy";
import ReportControlDownloadTemplate from "components/Report/Control/ReportControlDownloadTemplate";
import ReportControlPaymentType from "components/Report/Control/ReportControlPaymentType";
import ReportControlGroup from "components/Report/Control/ReportControlGroup";

export default {
  name: "ReportControlElement",
  props: ['name'],
  components: {
    ReportControlUser, ReportControlTax, ReportControlTaxNature, ReportControlKitchen, ReportControlItem, ReportControlCustomer,
    ReportControlSaleType, ReportControlRange, ReportControlDate, ReportControlDownloadTemplate, ReportControlDeliveryBoy,
    ReportControlCloudItem, ReportControlPaymentType, ReportControlGroup
  },
  computed: {
    component(){ return 'ReportControl' + _.startCase(this.name).replace(/\s/g,'') }
  }
}
</script>
