<template>
  <q-page padding class="q-gutter-y-sm">
    <ReportDashboardMetricsMain />
    <q-card v-for="(reports,title) in reports" :key="hKey(title)" flat square class="q-mt-lg" v-if="reports.length">
      <q-card-section class="bg-grey text-bold q-py-xs text-white bg-blue-grey-10">{{ title }}</q-card-section>
      <q-card-section class="row q-col-gutter-xs q-pa-none q-pt-xs">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1" v-for="report in reports" :key="hKey(title,report)" @click="$router.push({ name: report[1] })">
          <Jumbotron :text="report[0]"  class="text-center text-white cursor-pointer" color="teal-14" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ReportDashboardMetricsMain from "components/Report/ReportDashboardMetricsMain";
import {h_key} from "assets/helpers";
import Jumbotron from "components/Jumbotron";
import { FEATURES } from "boot/subscription";
import {masters,reports,subscription_reports as s_reports} from "assets/reports";
export default {
  name: "PageReportIndex",
  components: {Jumbotron, ReportDashboardMetricsMain},
  created(){ this.$store.commit('public',{ mode:'report' }) },
  computed: {
    r_subs(){ let sr = {}; _.forEach(s_reports,(reps,sub) => _.forEach(reps,rep => { if(!_.has(sr,rep)) sr[rep] = []; sr[rep].push(sub) })); return sr; },
    reports(){
      return _(reports)
        .mapValues(reps => _.filter(reps,rep => !_.has(this.r_subs,rep) || _.every(_.get(this.r_subs,rep),sub => _.get(FEATURES,sub) !== 'No')))
        .mapValues(reps => _.map(reps,rep => _.get(masters,rep)))
        .value()
    },
  },
  methods: {
    hKey(title,rep){ return rep ? h_key('rpt','section',title,rep) : h_key('rpt','card',title) }
  }
}
</script>
