<template>
  <q-card flat bordered square style="font-size: 0.8rem">
    <q-card-section v-show="title" class="bg-blue-grey-10 text-white text-bold q-py-sm">{{ title }}</q-card-section>
    <ReportHead v-show="head" :data="head" />
    <ReportTable :data="table" v-bind="$attrs" />
    <ReportFoot :data="foot" />
  </q-card>
</template>

<script>
import ReportTable from "components/Report/ReportTable";
import ReportHead from "components/Report/ReportHead";
import ReportFoot from "components/Report/ReportFoot";

export default {
  name: "ReportCard",
  components: {ReportFoot, ReportTable, ReportHead},
  props: ['head','foot','table','title']
}
</script>

<style scoped>

</style>
