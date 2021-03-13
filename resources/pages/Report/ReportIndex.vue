<template>
  <q-page padding class="q-gutter-y-sm">
    <ReportDashboardMetricsMain />
    <q-card v-for="(reports,title) in reports" :key="'rpt-card-' + title" flat square class="q-mt-lg">
      <q-card-section class="bg-grey text-bold q-py-xs text-white bg-blue-grey-10">{{ title }}</q-card-section>
      <q-card-section class="row q-col-gutter-xs q-pa-none q-pt-xs">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1" v-for="report in reports" :key="'rpt-section-'+title+'-'+report" @click="$router.push({ name: masters[report][1] })">
          <Jumbotron :text="masters[report][0]"  class="text-center text-white cursor-pointer" color="teal-14" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ReportDashboardMetricsMain from "components/Report/ReportDashboardMetricsMain";
import {h_key} from "assets/helpers";
import Jumbotron from "components/Jumbotron";
export default {
  name: "PageReportIndex",
  components: {Jumbotron, ReportDashboardMetricsMain},
  created(){ this.$store.commit('public',{ mode:'report' }) },
  data(){ return {
    reports: {
      Token: [0,14,15],
      Sales: [1,2,3,4,5],
      Bill: [7,8,9,10],
      Tax: [8,9,10,13],
      Kitchen: [6,16],
      Stock: [6],
      Item: [4,5,17],
      Waiter: [14,15],
      Chef: [18],
      Performance: [14,15,16,17,18]
    },
    masters: [
      ['Daily Token Summary', 'day_token_summary'],//0
      ['Sales Summary', 'day_sale_summary'],//1
      ['Sales By Type', 'sales_by_type'],//2
      ['Sales Summary by Type', 'sales_summary_by_type'],//3
      ['Sales Count by Item', 'sales_count_by_item'],//4
      ['Item Wise Sales Summary', 'item_wise_sale_summary'],//5
      ['Kitchen Stock', 'kitchen_stock'],//6
      ['Bill Summary', 'bill_summary'],//7
      ['Bill Summary - Tax', 'bill_summary_tax'],//8
      ['Bill Summary - Nature', 'bill_summary_tax_nature'],//9
      ['Tax Bill Details', 'tax_bill_detail'],//10
      ['Payments', 'payments'],//11
      ['Payments By Type', 'payments_by_type'],//12
      ['Tax Details', 'tax_details'],//13
      ['Orders by Waiter', 'orders_by_waiter'],//14
      ['Waiter Orders', 'waiter_orders'],//15
      ['Kitchen Processing', 'kitchen_processing'],//16
      ['Item Processing', 'item_processing'],//17
      ['Chef Performance', 'chef_performance'],//18
    ]
  } },
  methods: {
    hKey(item){ return _.kebabCase(h_key('rib',item)) }
  }
}
</script>
