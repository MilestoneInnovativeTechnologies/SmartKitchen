(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[57],{a56a:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[a("ReportDashboardMetricsMain"),e._l(e.reports,(function(t,s){return a("q-card",{key:"rpt-card-"+s,staticClass:"q-mt-lg",attrs:{flat:"",square:""}},[a("q-card-section",{staticClass:"bg-grey text-bold q-py-xs text-white bg-blue-grey-10"},[e._v(e._s(s))]),a("q-card-section",{staticClass:"row q-col-gutter-xs q-pa-none q-pt-xs"},e._l(t,(function(t){return a("div",{key:"rpt-section-"+s+"-"+t,staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1",on:{click:function(a){return e.$router.push({name:e.masters[t][1]})}}},[a("Jumbotron",{staticClass:"text-center text-white cursor-pointer",attrs:{text:e.masters[t][0],color:"teal-14"}})],1)})),0)],1)}))],2)},r=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row q-col-gutter-xs"},[a("div",{staticClass:"col"},[a("DigitMetric",{attrs:{value:e.Tokens.length,bg:"green",text:"white",title:"Sales",icon:"shopping_cart"}})],1),a("div",{staticClass:"col"},[a("DigitMetric",{attrs:{value:e.total_payments,bg:"purple",text:"white",title:"Payments",icon:"account_balance_wallet"}})],1),a("div",{staticClass:"q-mt-md col-12"},[a("q-card",{attrs:{flat:"",square:""}},[a("q-card-section",{staticClass:"bg-grey text-bold q-py-xs text-white bg-blue-grey-10 q-mt-lg"},[e._v("Sales by Type")]),a("q-card-section",{staticClass:"row q-col-gutter-xs q-pa-none q-pt-xs"},e._l(e.sales_by_type,(function(t,s){return a("div",{key:e.hKey("sbt",s),staticClass:"col-xs-6 col-sm-3"},[a("DigitMetric",{attrs:{value:t,bg:e.iconColor_sbt[s][1],text:"white",title:s,icon:e.iconColor_sbt[s][0]}})],1)})),0)],1)],1),a("div",{staticClass:"q-mt-md col-12"},[a("q-card",{attrs:{flat:"",square:""}},[a("q-card-section",{staticClass:"bg-grey text-bold q-py-xs text-white bg-blue-grey-10 q-mt-lg"},[e._v("Payments by Type")]),a("q-card-section",{staticClass:"row q-col-gutter-xs q-pa-none q-pt-xs"},e._l(e.payments_by_type,(function(t,s){return a("div",{key:e.hKey("pbt",s),staticClass:"col-xs-6 col-sm-3"},[a("DigitMetric",{attrs:{value:t,bg:e.iconColor_pyt[s][1],text:"white",title:s,icon:e.iconColor_pyt[s][0]}})],1)})),0)],1)],1)])},n=[],l=a("ded3"),o=a.n(l),c=a("84ba"),y=a("3758"),m=a("b1c1"),u=a("2f62"),p=a("232e"),d={name:"ReportDashboardMetricsMain",components:{DigitMetric:c["a"]},mixins:[y["a"]],data(){return{iconColor_sbt:{Dining:["local_dining","purple"],"Home Delivery":["delivery_dining","amber"],"Take Away":["home","green"],Other:["stream","light-blue"],Sale:["shopping_cart","indigo"],Remote:["online_prediction","brown"]},iconColor_pyt:{Cash:["money","green"],Card:["payment","teal"],Wallet:["account_balance","purple"],Credit:["money_off","red"]}}},computed:o()(o()({},Object(u["d"])({payments:({payments:{data:e}})=>e})),{},{Tokens(){return _.filter(this.tokens_own,(({date:e,progress:t})=>Object(m["l"])(e)&&"Cancelled"!==t))},Payments(){return _(this.payments).filter((({status:e,date:t})=>"Active"===e&&Object(m["l"])(t))).value()},total_payments(){return _.sumBy(this.Payments,(({amount:e})=>_.toNumber(e)))},sales_by_type(){let e=_.zipObject(p["OrderTypes"],Array(p["OrderTypes"].length).fill(0));return _.defaults(_.countBy(this.Tokens,"type"),e)},payments_by_type(){let e=_.zipObject(p["PaymentsTypes"],Array(p["PaymentsTypes"].length).fill(0));return _.forEach(this.Payments,(({type:t,amount:a})=>e[t]+=_.toNumber(a))),e}}),methods:{hKey(e,t){return _.kebabCase(Object(m["d"])(e,t))}}},b=d,g=a("2877"),h=a("f09f"),x=a("a370"),C=a("eebe"),q=a.n(C),f=Object(g["a"])(b,i,n,!1,null,null,null),v=f.exports;q()(f,"components",{QCard:h["a"],QCardSection:x["a"]});var w=a("ec70"),k={name:"PageReportIndex",components:{Jumbotron:w["a"],ReportDashboardMetricsMain:v},created(){this.$store.commit("public",{mode:"report"})},data(){return{reports:{Token:[0,14,19,20,15],Sales:[1,2,3,4,5],Bill:[7,8,9,10],Tax:[8,9,10,13],Kitchen:[6,16],Stock:[6],Item:[4,5,17],Waiter:[14,15],Chef:[18],Receptionist:[19],"Delivery Boy":[20],Performance:[14,15,16,17,18]},masters:[["Daily Token Summary","day_token_summary"],["Sales Summary","day_sale_summary"],["Sales By Type","sales_by_type"],["Sales Summary by Type","sales_summary_by_type"],["Sales Count by Item","sales_count_by_item"],["Item Wise Sales Summary","item_wise_sale_summary"],["Kitchen Stock","kitchen_stock"],["Bill Summary","bill_summary"],["Bill Summary - Tax","bill_summary_tax"],["Bill Summary - Nature","bill_summary_tax_nature"],["Tax Bill Details","tax_bill_detail"],["Payments","payments"],["Payments By Type","payments_by_type"],["Tax Details","tax_details"],["Orders by Waiter","orders_by_waiter"],["User Orders","user_orders"],["Kitchen Processing","kitchen_processing"],["Item Processing","item_processing"],["Chef Performance","chef_performance"],["Orders by Receptionist","orders_by_receptionist"],["Orders by Delivery Boy","orders_by_delivery_boy"]]}},methods:{hKey(e){return _.kebabCase(Object(m["d"])("rib",e))}}},S=k,T=a("9989"),O=Object(g["a"])(S,s,r,!1,null,null,null);t["default"]=O.exports;q()(O,"components",{QPage:T["a"],QCard:h["a"],QCardSection:x["a"]})}}]);