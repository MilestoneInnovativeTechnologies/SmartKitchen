(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[42],{a56a:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[a("ReportDashboardMetricsMain"),t._l(t.reports,(function(e,s){return a("q-card",{key:"rpt-card-"+s,staticClass:"q-mt-lg",attrs:{flat:"",square:""}},[a("q-card-section",{staticClass:"bg-grey text-bold q-py-xs text-white bg-blue-grey-10"},[t._v(t._s(s))]),a("q-card-section",{staticClass:"row q-col-gutter-xs q-pa-none q-pt-xs"},t._l(e,(function(e){return a("div",{key:"rpt-section-"+s+"-"+e,staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1",on:{click:function(a){return t.$router.push({name:t.masters[e][1]})}}},[a("Jumbotron",{staticClass:"text-center text-white cursor-pointer",attrs:{text:t.masters[e][0],color:"teal-14"}})],1)})),0)],1)}))],2)},r=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row q-col-gutter-xs"},[a("div",{staticClass:"col"},[a("DigitMetric",{attrs:{value:t.Tokens.length,bg:"green",text:"white",title:"Sales",icon:"shopping_cart"}})],1),a("div",{staticClass:"col"},[a("DigitMetric",{attrs:{value:t.total_payments,bg:"purple",text:"white",title:"Payments",icon:"account_balance_wallet"}})],1),a("div",{staticClass:"q-mt-md col-12"},[a("q-card",{attrs:{flat:"",square:""}},[a("q-card-section",{staticClass:"bg-grey text-bold q-py-xs text-white bg-blue-grey-10 q-mt-lg"},[t._v("Sales by Type")]),a("q-card-section",{staticClass:"row q-col-gutter-xs q-pa-none q-pt-xs"},t._l(t.sales_by_type,(function(e,s){return a("div",{key:t.hKey("sbt",s),staticClass:"col-xs-6 col-sm-3"},[a("DigitMetric",{attrs:{value:e,bg:t.iconColor_sbt[s][1],text:"white",title:s,icon:t.iconColor_sbt[s][0]}})],1)})),0)],1)],1),a("div",{staticClass:"q-mt-md col-12"},[a("q-card",{attrs:{flat:"",square:""}},[a("q-card-section",{staticClass:"bg-grey text-bold q-py-xs text-white bg-blue-grey-10 q-mt-lg"},[t._v("Payments by Type")]),a("q-card-section",{staticClass:"row q-col-gutter-xs q-pa-none q-pt-xs"},t._l(t.payments_by_type,(function(e,s){return a("div",{key:t.hKey("pbt",s),staticClass:"col-xs-6 col-sm-3"},[a("DigitMetric",{attrs:{value:e,bg:t.iconColor_pyt[s][1],text:"white",title:s,icon:t.iconColor_pyt[s][0]}})],1)})),0)],1)],1)])},i=[],n=a("ded3"),o=a.n(n),c=a("84ba"),m=a("3758"),y=a("b1c1"),u=a("2f62"),p=a("232e"),b={name:"ReportDashboardMetricsMain",components:{DigitMetric:c["a"]},mixins:[m["a"]],data(){return{iconColor_sbt:{Dining:["local_dining","purple"],"Home Delivery":["delivery_dining","amber"],"Take Away":["home","green"],Other:["stream","light-blue"]},iconColor_pyt:{Cash:["money","green"],Card:["payment","teal"],Wallet:["account_balance","purple"],Credit:["money_off","red"]}}},computed:o()(o()({},Object(u["d"])({payments:({payments:{data:t}})=>t})),{},{Tokens(){return _.filter(this.tokens,(({date:t,progress:e})=>Object(y["h"])(t)&&"Cancelled"!==e))},Payments(){return _(this.payments).filter((({status:t,date:e})=>"Active"===t&&Object(y["h"])(e))).value()},total_payments(){return _.sumBy(this.Payments,(({amount:t})=>_.toNumber(t)))},sales_by_type(){let t=_.zipObject(p["e"],Array(p["e"].length).fill(0));return _.forEach(this.Tokens,(({type:e})=>t[e]++)),t},payments_by_type(){let t=_.zipObject(p["f"],Array(p["f"].length).fill(0));return _.forEach(this.Payments,(({type:e,amount:a})=>t[e]+=_.toNumber(a))),t}}),methods:{hKey(t,e){return _.kebabCase(Object(y["d"])(t,e))}}},d=b,g=a("2877"),h=a("f09f"),x=a("a370"),C=a("eebe"),f=a.n(C),q=Object(g["a"])(d,l,i,!1,null,null,null),v=q.exports;f()(q,"components",{QCard:h["a"],QCardSection:x["a"]});var w=a("ec70"),k={name:"PageReportIndex",components:{Jumbotron:w["a"],ReportDashboardMetricsMain:v},created(){this.$store.commit("public",{mode:"report"})},data(){return{reports:{Token:[0,14,15],Sales:[1,2,3,4,5],Bill:[7,8,9,10],Tax:[8,9,10,13],Kitchen:[6,16],Stock:[6],Item:[4,5,17],Waiter:[14,15],Chef:[18],Performance:[14,15,16,17,18]},masters:[["Daily Token Summary","day_token_summary"],["Sales Summary","day_sale_summary"],["Sales By Type","sales_by_type"],["Sales Summary by Type","sales_summary_by_type"],["Sales Count by Item","sales_count_by_item"],["Item Wise Sales Summary","item_wise_sale_summary"],["Kitchen Stock","kitchen_stock"],["Bill Summary","bill_summary"],["Bill Summary - Tax","bill_summary_tax"],["Bill Summary - Nature","bill_summary_tax_nature"],["Tax Bill Details","tax_bill_detail"],["Payments","payments"],["Payments By Type","payments_by_type"],["Tax Details","tax_details"],["Orders by Waiter","orders_by_waiter"],["Waiter Orders","waiter_orders"],["Kitchen Processing","kitchen_processing"],["Item Processing","item_processing"],["Chef Performance","chef_performance"]]}},methods:{hKey(t){return _.kebabCase(Object(y["d"])("rib",t))}}},S=k,T=a("9989"),D=Object(g["a"])(S,s,r,!1,null,null,null);e["default"]=D.exports,f()(D,"components",{QPage:T["a"],QCard:h["a"],QCardSection:x["a"]})}}]);