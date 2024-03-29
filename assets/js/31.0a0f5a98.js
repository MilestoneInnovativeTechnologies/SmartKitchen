(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[31],{e7c8:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("q-page",[e("FilterInputText",{staticClass:"q-ma-md",on:{text:function(e){t.filter=e}}}),e("q-list",{attrs:{separator:""}},t._l(t.showing,(function(a){return e("q-item",{key:"archive-payments-"+a.id,attrs:{clickable:""},on:{click:function(e){return t.detail(a)}}},[e("q-item-section",{attrs:{avatar:""}},[e("q-badge",{staticClass:"q-pa-sm",staticStyle:{"font-size":"0.65rem"},attrs:{color:"info",label:a.bill.id}})],1),e("q-item-section",[e("q-item-label",{staticClass:"text-bold text-cyan"},[t._v(t._s(parseFloat(a.amount).toFixed(2)))]),e("q-item-label",{attrs:{caption:""}},[t._v("Token: "+t._s(a.bill.token.id)+", Type: "+t._s(a.bill.token.type))])],1),e("q-item-section",[e("q-item-label",{staticClass:"text-cyan"},[t._v(t._s(a.type))]),e("q-item-label",{attrs:{caption:""}},[t._v(t._s(a.bill.customer.name))])],1),e("q-item-section",{attrs:{side:""}},[e("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.time(a.date)))]),e("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.human_date(a.date)))])],1),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"Active"===a.status?"done_all":"remove_done",color:"Active"===a.status?"cyan":"grey-6"}})],1)],1)})),1),e("q-dialog",{attrs:{persistent:"","transition-show":"flip-down","transition-hide":"flip-up"},model:{value:t.details,callback:function(e){t.details=e},expression:"details"}},[e("q-card",{staticStyle:{width:"80vw"}},[e("q-card-section",{staticClass:"row items-center q-pa-sm bg-grey-4"},[e("q-icon",{staticClass:"q-mr-sm",attrs:{name:"account_balance"}}),e("span",[t._v("Payment Details")]),e("q-space"),e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",size:"sm",flat:"",round:"",dense:""}})],1),t.payment?e("q-card-section",[e("div",{staticClass:"row justify-between"},[e("div",{staticClass:"text-h5 text-teal text-bold"},[t._v(t._s(parseFloat(t.payment.amount).toFixed(2)))]),e("div",{staticClass:"text-center"},[e("div",{staticClass:"text-bold text-teal"},[t._v(t._s(t.payment.type))]),e("div",{staticClass:"text-caption text-uppercase",staticStyle:{"font-size":"0.65rem"}},[t._v("payment type")])])]),e("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Status"}},[t._v(t._s(t.payment.status))]),e("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Payment Time"}},[t._v(t._s(t.time(t.payment.date)))]),e("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Payment Date"}},[t._v(t._s(t.human_date2(t.payment.date)))])],1):t._e(),e("q-separator"),t.bill?e("q-card-section",{staticClass:"q-pys"},[e("q-item-label",{staticClass:"text-primary q-px-none q-py-none text-uppercase text-bold",attrs:{header:""}},[t._v("Bill Details")]),e("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Customer"}},[t._v(t._s(t.customer?t.customer.name:""))]),e("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Bill Date"}},[t._v(t._s(t.human_date2(t.bill.date)))]),e("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Bill Amount"}},[t._v(t._s(parseFloat(t.bill.amount).toFixed(2)))]),e("ItemDetailWide",{staticClass:"q-mt-sm text-uppercase",attrs:{label:"Bill Discount"}},[t._v(t._s(parseFloat(t.bill.discount).toFixed(2)))])],1):t._e(),e("q-separator"),t.others.length?e("q-card-section",{staticClass:"q-pys"},[e("q-list",{attrs:{separator:""}},[e("q-item-label",{staticClass:"text-primary q-px-none q-py-none text-uppercase text-bold",attrs:{header:""}},[t._v("Other Payments")]),t._l(t.others,(function(a){return e("q-item",{key:"payment-"+t.payment.id+"-other-payments-"+a.id,staticClass:"q-px-none"},[e("q-item-section",{attrs:{avatar:""}},[e("q-avatar",{staticClass:"text-white",attrs:{size:"md",color:"teal",rounded:""}},[t._v(t._s(a.id))])],1),e("q-item-section",[e("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.payment.type))]),e("q-item-label",{staticStyle:{"font-size":"0.55rem"},attrs:{caption:""}},[t._v(t._s(t.human_date2(a.date)))])],1),e("q-item-section",{attrs:{side:""}},[e("q-item-label",{staticClass:"text-primary text-bold"},[t._v(t._s(parseFloat(a.amount).toFixed(2)))])],1)],1)}))],2)],1):t._e(),e("q-card-actions",{directives:[{name:"show",rawName:"v-show",value:t.payment&&"Active"===t.payment.status,expression:"payment && payment.status === 'Active'"}],staticClass:"bg-grey-3",attrs:{align:"right"}},[e("q-btn",{attrs:{dense:"",color:"red",size:"sm",loading:t.loading,label:"Cancel Payment"},on:{click:t.cancel}}),e("q-btn",{attrs:{dense:"",color:"teal",size:"sm",disable:t.loading,label:"Print"},on:{click:function(e){return t.print(t.payment)}}})],1)],1)],1),e("Pagination",{attrs:{records:t.payments,color:"info"},model:{value:t.showing,callback:function(e){t.showing=e},expression:"showing"}})],1)},i=[],l=(a("caad"),a("b1c1")),n=function(){var t=this,e=t._self._c;return e("div",t._b({staticClass:"row justify-between"},"div",t.$attrs,!1),[e("div",{staticClass:"text-caption"},[t._v(t._s(t.label))]),e("div",{staticClass:"text-caption text-bold"},[t._t("default")],2)])},r=[],o={name:"ItemDetailWide",props:["label"]},c=o,m=a("2877"),p=Object(m["a"])(c,n,r,!1,null,null,null),d=p.exports,u=a("1799"),b=a("5ab9"),y=a("58d1"),v={name:"PageArchivePayments",components:{FilterInputText:b["a"],Pagination:u["a"],ItemDetailWide:d},mixins:[y["a"]],computed:{keyed_bills(){return Object(l["h"])(this.bills)},Payments(){return _(this.$store.state.payments.data).filter(["status","Active"]).map(this.payment_data).reverse().value()},bill(){return _.get(this.payment,"bill")},customer(){return _.get(this.payment,["bill","customer"])},others(){return this.bill?_.filter(this.payments,(({bill:t,id:e,status:a})=>_.toInteger(t)===_.toInteger(this.bill.id)&&_.toInteger(e)!==_.toInteger(this.payment.id)&&"Active"===a)):[]},payments(){return this.filter?_.filter(this.Payments,(t=>_.includes(t.slug,this.filter.toLowerCase()))):this.Payments}},data(){return{filter:"",details:!1,payment:null,loading:!1,showing:null}},methods:{human_date:l["f"],human_date2:l["g"],time:l["D"],payment_data(t){let e=_.get(this.keyed_bills,t.bill),a=[e.token.id,e.id,e.amount,t.amount,e.token.type,e.customer.name,e.customer.phone].join(" ").toLowerCase();return Object.assign({},t,{bill:e,slug:a})},detail(t){this.details=!0,this.payment=t},cancel(){this.loading=!0;let t=this;this.$store.dispatch("payments/cancel",this.payment,{root:!0}).then((e=>t.loading=!1))},print({id:t}){post("payment","print",{id:t})}}},q=v,h=a("9989"),x=a("1c1c"),g=a("66e5"),C=a("4074"),f=a("58a8"),w=a("0170"),I=a("0016"),k=a("24e8"),D=a("f09f"),P=a("a370"),Q=a("2c91"),F=a("9c40"),A=a("eb85"),S=a("cb32"),W=a("4b7e"),j=a("7f67"),z=a("eebe"),B=a.n(z),O=Object(m["a"])(q,s,i,!1,null,null,null);e["default"]=O.exports;B()(O,"components",{QPage:h["a"],QList:x["a"],QItem:g["a"],QItemSection:C["a"],QBadge:f["a"],QItemLabel:w["a"],QIcon:I["a"],QDialog:k["a"],QCard:D["a"],QCardSection:P["a"],QSpace:Q["a"],QBtn:F["a"],QSeparator:A["a"],QAvatar:S["a"],QCardActions:W["a"]}),B()(O,"directives",{ClosePopup:j["a"]})}}]);