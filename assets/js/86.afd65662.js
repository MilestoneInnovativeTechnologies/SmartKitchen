(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[86],{"3ef2":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{attrs:{padding:""}},[r("ReportCard",{attrs:{title:"Day - Remote Orders Deliveries",head:e.head,table:e.table,right:["Progress"],center:["Token"],foot:e.foot}})],1)},i=[],s=(r("5db7"),r("73d9"),r("b1c1")),o=r("460a"),n=r("58d1"),d={name:"PageReportDayWiseRemoteOrderDelivery",components:{ReportCard:o["a"]},mixins:[n["a"]],computed:{date(){return this.$store.state.public.date+" 00:00:00"},head(){return _.zipObject(["Delivery Date"],[Object(s["E"])("DD/MMM (dddd)",this.date)])},remote_order_items(){return _(this.bills).filter((({progress:e})=>"Cancelled"!==e)).flatMap("token.items").filter((({deliver:e})=>Object(s["k"])(e,this.date,"day"))).value()},table(){return _(this.remote_order_items).map((e=>_.zipObject(["Time","Item","Quantity","Customer","Token","Progress"],[Object(s["D"])(e.deliver),e.item.name,e.quantity,_.get(this.tokens,[e.token,"customer","name"]),e.token,e.progress]))).value()},foot(){return _.zipObject(["Orders","Quantities"],[_.size(this.remote_order_items),l(this.remote_order_items,"quantity")])}}};function l(e,t){return _.sumBy(e,(e=>_.toNumber(_.get(e,t,0))))}var u=d,m=r("2877"),c=r("9989"),p=r("eebe"),b=r.n(p),h=Object(m["a"])(u,a,i,!1,null,null,null);t["default"]=h.exports;b()(h,"components",{QPage:c["a"]})}}]);