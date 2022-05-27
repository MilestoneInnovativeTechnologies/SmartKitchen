(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[31],{e7c8:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("q-list",{attrs:{separator:""}},t._l(t.showing,(function(e){return a("q-item",{key:"archive-payments-"+e.id,attrs:{clickable:""},on:{click:function(a){return t.detail(e)}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-badge",{staticClass:"q-pa-sm",staticStyle:{"font-size":"0.65rem"},attrs:{color:"info",label:e.bill}})],1),a("q-item-section",[a("q-item-label",{staticClass:"text-bold text-cyan"},[t._v(t._s(parseFloat(e.amount).toFixed(2)))]),a("q-item-label",{attrs:{caption:""}},[t._v("Payment ID: "+t._s(e.id))])],1),a("q-item-section",[a("q-item-label",{staticClass:"text-cyan"},[t._v(t._s(e.type))])],1),a("q-item-section",{attrs:{side:""}},[a("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.time(e.date)))]),a("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.human_date(e.date)))])],1),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"Active"===e.status?"done_all":"remove_done",color:"Active"===e.status?"cyan":"grey-6"}})],1)],1)})),1),a("q-dialog",{attrs:{persistent:"","transition-show":"flip-down","transition-hide":"flip-up"},model:{value:t.details,callback:function(e){t.details=e},expression:"details"}},[a("q-card",{staticStyle:{width:"80vw"}},[a("q-card-section",{staticClass:"row items-center q-pa-sm bg-grey-4"},[a("q-icon",{staticClass:"q-mr-sm",attrs:{name:"account_balance"}}),a("span",[t._v("Payment Details")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",size:"sm",flat:"",round:"",dense:""}})],1),t.payment?a("q-card-section",[a("div",{staticClass:"row justify-between"},[a("div",{staticClass:"text-h5 text-teal text-bold"},[t._v(t._s(parseFloat(t.payment.amount).toFixed(2)))]),a("div",{staticClass:"text-center"},[a("div",{staticClass:"text-bold text-teal"},[t._v(t._s(t.payment.type))]),a("div",{staticClass:"text-caption text-uppercase",staticStyle:{"font-size":"0.65rem"}},[t._v("payment type")])])]),a("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Status"}},[t._v(t._s(t.payment.status))]),a("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Payment Time"}},[t._v(t._s(t.time(t.payment.date)))]),a("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Payment Date"}},[t._v(t._s(t.human_date2(t.payment.date)))])],1):t._e(),a("q-separator"),t.bill?a("q-card-section",{staticClass:"q-pys"},[a("q-item-label",{staticClass:"text-primary q-px-none q-py-none text-uppercase text-bold",attrs:{header:""}},[t._v("Bill Details")]),a("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Customer"}},[t._v(t._s(t.customer?t.customer.name:""))]),a("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Bill Date"}},[t._v(t._s(t.human_date2(t.bill.date)))]),a("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Bill Amount"}},[t._v(t._s(parseFloat(t.bill.amount).toFixed(2)))]),a("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Bill Discount"}},[t._v(t._s(parseFloat(t.bill.discount).toFixed(2)))])],1):t._e(),a("q-separator"),t.others.length?a("q-card-section",{staticClass:"q-pys"},[a("q-list",{attrs:{separator:""}},[a("q-item-label",{staticClass:"text-primary q-px-none q-py-none text-uppercase text-bold",attrs:{header:""}},[t._v("Other Payments")]),t._l(t.others,(function(e){return a("q-item",{key:"payment-"+t.payment.id+"-other-payments-"+e.id,staticClass:"q-px-none"},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{staticClass:"text-white",attrs:{size:"md",color:"teal",rounded:""}},[t._v(t._s(e.id))])],1),a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.payment.type))]),a("q-item-label",{staticStyle:{"font-size":"0.55rem"},attrs:{caption:""}},[t._v(t._s(t.human_date2(e.date)))])],1),a("q-item-section",{attrs:{side:""}},[a("q-item-label",{staticClass:"text-primary text-bold"},[t._v(t._s(parseFloat(e.amount).toFixed(2)))])],1)],1)}))],2)],1):t._e(),a("q-card-actions",{directives:[{name:"show",rawName:"v-show",value:t.payment&&"Active"===t.payment.status,expression:"payment && payment.status === 'Active'"}],staticClass:"bg-grey-3",attrs:{align:"right"}},[a("q-btn",{attrs:{dense:"",color:"red",size:"sm",loading:t.loading,label:"Cancel Payment"},on:{click:t.cancel}}),a("q-btn",{attrs:{dense:"",color:"teal",size:"sm",disable:t.loading,label:"Print"},on:{click:function(e){return t.print(t.payment)}}})],1)],1)],1),a("Pagination",{attrs:{records:t.payments,color:"info"},model:{value:t.showing,callback:function(e){t.showing=e},expression:"showing"}})],1)},i=[],l=(a("26e9"),a("ded3")),n=a.n(l),r=a("2f62"),o=a("b1c1"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._b({staticClass:"row justify-between"},"div",t.$attrs,!1),[a("div",{staticClass:"text-caption"},[t._v(t._s(t.label))]),a("div",{staticClass:"text-caption text-bold"},[t._t("default")],2)])},m=[],d={name:"ItemDetailWide",props:["label"]},p=d,u=a("2877"),b=Object(u["a"])(p,c,m,!1,null,null,null),y=b.exports,v=a("1799"),q={name:"PageArchivePayments",components:{Pagination:v["a"],ItemDetailWide:y},computed:n()(n()({},Object(r["d"])("payments",{payments:t=>_(t.data).sortBy((({date:t})=>Object(o["d"])(t).getTime())).reverse().value()})),{},{bill(){return this.payment?_.get(this.$store.state.bills.data,_.toInteger(this.payment.bill)):null},customer(){return this.bill?_.get(this.$store.state.customers.data,_.toInteger(this.bill.customer)):null},others(){return this.bill?_.filter(this.payments,(({bill:t,id:e,status:a})=>_.toInteger(t)===_.toInteger(this.bill.id)&&_.toInteger(e)!==_.toInteger(this.payment.id)&&"Active"===a)):[]}}),data(){return{details:!1,payment:null,loading:!1,showing:null}},methods:{human_date:o["f"],human_date2:o["g"],time:o["C"],detail(t){this.details=!0,this.payment=t},cancel(){this.loading=!0;let t=this;this.$store.dispatch("payments/cancel",this.payment,{root:!0}).then((e=>t.loading=!1))},print({id:t}){post("payment","print",{id:t})}}},h=q,x=a("9989"),g=a("1c1c"),C=a("66e5"),f=a("4074"),w=a("58a8"),I=a("0170"),D=a("0016"),Q=a("24e8"),P=a("f09f"),k=a("a370"),F=a("2c91"),A=a("9c40"),S=a("eb85"),W=a("cb32"),z=a("4b7e"),B=a("7f67"),j=a("eebe"),$=a.n(j),O=Object(u["a"])(h,s,i,!1,null,null,null);e["default"]=O.exports;$()(O,"components",{QPage:x["a"],QList:g["a"],QItem:C["a"],QItemSection:f["a"],QBadge:w["a"],QItemLabel:I["a"],QIcon:D["a"],QDialog:Q["a"],QCard:P["a"],QCardSection:k["a"],QSpace:F["a"],QBtn:A["a"],QSeparator:S["a"],QAvatar:W["a"],QCardActions:z["a"]}),$()(O,"directives",{ClosePopup:B["a"]})}}]);