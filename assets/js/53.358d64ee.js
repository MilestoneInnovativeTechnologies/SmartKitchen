(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[53],{e7a8:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e._self._c;return t("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[t("OnlineOrdersPendingList",{attrs:{color:"primary",title:"Pending Confirmation"}}),t("OnlineOrdersConfirmed",{attrs:{title:"Confirmed",color:"primary"}})],1)},n=[],i=s("79d0"),a=function(){var e=this,t=e._self._c;return t("q-card",[e.title?t("q-card-section",{staticClass:"row justify-between text-bold text-white",class:"bg-"+e.clr},[t("div",[e._v(e._s(e.title))])]):e._e(),t("q-card-section",{directives:[{name:"show",rawName:"v-show",value:!e.orders.length,expression:"!orders.length"}],staticClass:"text-center text-caption text-h6"},[e._v("NO ANY CONFIRMED ORDERS")]),t("q-list",{directives:[{name:"show",rawName:"v-show",value:e.orders.length,expression:"orders.length"}],attrs:{separator:""}},e._l(e.orders,(function(s,r){return t("q-expansion-item",{key:e.h_key("oo-cl-o",r,"t",s.token),attrs:{label:e.label(s),caption:e.caption(s)}},[t("q-card",[t("q-list",e._l(s.items,(function(n){return t("q-item",{key:e.h_key("oo-cl-o",r,"t",s.token,"i",n.item)},[t("q-item-section",{staticClass:"col-shrink",attrs:{avatar:""}},[e._v(" ")]),t("q-item-section",[t("q-item-label",[e._v(e._s(n.quantity)+"x "+e._s(n.name))]),t("q-item-label",{attrs:{caption:""}},[e._v("Rate: "+e._s(n.rate))])],1),t("q-item-section",{attrs:{side:""}},[t("q-item-label",[e._v(e._s(n.progress))])],1)],1)})),1)],1)],1)})),1)],1)},o=[],l=s("b1c1"),c={name:"OnlineOrdersConfirmed",props:["title","color","only"],computed:{clr(){return this.color||"purple"},orders(){return _.filter(this.$store.state.online.data,(({active:e,type:t,token:s})=>e&&(!this.only||this.only===t)&&s))},pls(){return this.$store.state.prices.list},seats(){return this.$store.state.seating.data},customers(){return this.$store.state.customers.data}},methods:{h_key:l["e"],label({type:e,seating:t,customer:s,token:r,progress:n}){return _.filter([r,e,"aDining"===e?_.get(this.seats,[t,"name"]):"Home Delivery"===e?_.get(this.customers,[s,"name"]):null,n]).join(" - ")},caption({time:e,price_list:t}){return`Time: ${this.t2DateTime({time:e})} - Price List: ${_.get(this.pls,[t,"name"])}`},t2DateTime({time:e}){let t=Object(l["t"])()-e;return Object(l["E"])(t>86400?"hh:mm A (dddd)":"hh:mm A",1e3*_.toNumber(e))}}},m=c,d=s("2877"),u=s("f09f"),p=s("a370"),h=s("1c1c"),g=s("3b73"),b=s("66e5"),v=s("4074"),O=s("0170"),f=s("eebe"),q=s.n(f),y=Object(d["a"])(m,a,o,!1,null,null,null),w=y.exports;q()(y,"components",{QCard:u["a"],QCardSection:p["a"],QList:h["a"],QExpansionItem:g["a"],QItem:b["a"],QItemSection:v["a"],QItemLabel:O["a"]});var k={name:"PageOnlineMenuOrders",components:{OnlineOrdersConfirmed:w,OnlineOrdersPendingList:i["a"]}},x=k,C=s("9989"),Q=Object(d["a"])(x,r,n,!1,null,null,null);t["default"]=Q.exports;q()(Q,"components",{QPage:C["a"]})}}]);