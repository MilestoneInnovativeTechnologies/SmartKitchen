(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{c2e6:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[s("OrderWaiterSummary",{staticClass:"q-mx-auto",staticStyle:{"max-width":"360px",width:"90vw"}}),s("OrderWaiterServable",{staticClass:"q-mx-auto",staticStyle:{"max-width":"360px",width:"90vw"}})],1)},r=[],i=(s("ddb0"),s("2b3d"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"bg-purple-2 q-pa-xs"}),s("q-card-section",{},[s("div",{staticClass:"text-h6"},[t._v("Orders")]),s("div",{staticClass:"text-subtitle2"},[t._v("Today Total: "+t._s(t.total))])]),s("q-list",{attrs:{dense:""}},t._l(t.d_status,(function(e){return s("q-item",{key:"order-waiter-summary-status-"+e},[s("q-item-section",[t._v(t._s(e))]),s("q-item-section",{attrs:{side:""}},[t._v(t._s(t.orderOfStatus(e)))])],1)})),1)],1)}),n=[],o={name:"OrderWaiterSummary",data(){return{d_status:["New","Processing","Completed","Billed","Cancelled"]}},computed:{orders(){return this.$store.getters["tokens/today"]},total(){return _.size(this.orders)}},methods:{orderOfStatus(t){return _.sumBy(_.values(this.orders),(({progress:e})=>_.toSafeInteger(t===e)))}}},l=o,d=s("2877"),c=s("f09f"),m=s("a370"),u=s("1c1c"),g=s("66e5"),p=s("4074"),h=s("eebe"),v=s.n(h),b=Object(d["a"])(l,i,n,!1,null,null,null),q=b.exports;v()(b,"components",{QCard:c["a"],QCardSection:m["a"],QList:u["a"],QItem:g["a"],QItemSection:p["a"]});var S=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"bg-lime-2 q-pa-xs"}),s("q-card-section",[s("div",{staticClass:"text-h6"},[t._v("Order Items to Serve")]),s("div",{staticClass:"text-subtitle2"},[t._v("Total: "+t._s(t.servable.length))])]),s("q-list",{attrs:{separator:"",bordered:""}},t._l(t.servable,(function(e){return s("q-item",{key:"order-waiter-servable-item-"+e.id},[s("q-item-section",[s("q-item-label",[t._v(t._s(e.quantity)+" X "+t._s(t.itemName(e.item)))]),s("q-item-label",{attrs:{caption:""}},[t._v("Kitchen: "+t._s(t.kitchenName(e.kitchen)))]),s("q-item-label",{attrs:{caption:""}},[t._v("Seating: "+t._s(t.SeatingName(e.token)))])],1),s("q-item-section",{attrs:{side:""}},[s("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.itemTiming(e.progress_timing))+" ago")])],1)],1)})),1)],1)},w=[],C=(s("5db7"),s("73d9"),{name:"OrderWaiterServable",data(){return{d_status:["New","Processing","Completed","Billed","Cancelled"]}},computed:{orders(){return this.$store.getters["tokens/today"]},items(){return _.flatMap(_.pick(this.$store.state.tokens.items,_.keys(this.orders)))},servable(){return _.filter(this.items,["progress","Completed"])}},methods:{itemName(t){return _.get(this.$store.state.items.data,[t,"name"])},kitchenName(t){return _.get(this.$store.state.kitchens.data,[t,"name"])},SeatingName(t){return _.get(this.$store.state.seating.data,[_.get(this.orders,[t,"seating"]),"name"])},since(t){let e=_.get(_.last(t),"time"),s=_.toInteger((new Date).getTime()/1e3);return s-e},itemTiming(t){let e=this.since(t);return e<60?e+" seconds":e<3600?_.toInteger(e/60)+" minutes":_.toInteger(e/3600)+" hours"}}}),f=C,k=s("0170"),x=Object(d["a"])(f,S,w,!1,null,null,null),y=x.exports;v()(x,"components",{QCard:c["a"],QCardSection:m["a"],QList:u["a"],QItem:g["a"],QItemSection:p["a"],QItemLabel:k["a"]});var O={name:"PageWaiterIndex",components:{OrderWaiterServable:y,OrderWaiterSummary:q},data(){return{token:new URLSearchParams(document.location.search.substring(1)).get("token")}}},Q=O,I=s("9989"),$=Object(d["a"])(Q,a,r,!1,null,null,null);e["default"]=$.exports,v()($,"components",{QPage:I["a"]})}}]);