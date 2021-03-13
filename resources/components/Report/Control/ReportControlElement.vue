<template>
  <component :is="component" v-bind="$attrs" />
</template>

<script>
import ReportControlDate from "components/Report/Control/ReportControlDate";
import ReportControlRange from "components/Report/Control/ReportControlRange";
import ReportControlSaleType from "components/Report/Control/ReportControlSaleType";
import ReportControlItem from "components/Report/Control/ReportControlItem";
import ReportControlKitchen from "components/Report/Control/ReportControlKitchen";
import ReportControlTaxNature from "components/Report/Control/ReportControlTaxNature";
import ReportControlTax from "components/Report/Control/ReportControlTax";
import ReportControlUser from "components/Report/Control/ReportControlUser";

export default {
  name: "ReportControlElement",
  props: ['name'],
  components: {
    ReportControlUser,
    ReportControlTax, ReportControlTaxNature, ReportControlKitchen, ReportControlItem, ReportControlSaleType, ReportControlRange, ReportControlDate},
  computed: {
    component(){ return 'ReportControl' + _.startCase(this.name).replace(/\s/g,'') }
  }
}
</script>
