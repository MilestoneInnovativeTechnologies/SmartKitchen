(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[100],{"72c5":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e._self._c;return t("q-page",{attrs:{padding:""}},[e.customer?t("ReportCard",{attrs:{title:"Remote Orders by Customer",head:e.head,table:e.table,right:["Amount","Discount","Payable","Status"],center:["Token"],foot:e.foot}}):t("div",{staticClass:"text-center text-bold"},[e._v("Select A Customer")])],1)},s=[],a=r("b1c1"),n=r("460a"),u=r("58d1"),i={name:"PageReportRemoteOrderSummaryByCustomer",components:{ReportCard:n["a"]},mixins:[u["a"]],computed:{date(){return this.$store.state.public.date+" 00:00:00"},range(){return Object(a["A"])(this.$store.state.public.range)},customer(){return this.$store.state.public.customer||{}},head(){return _.zipObject(["Customer","From","To"],[_.get(this.customer,"name"),Object(a["E"])("DD/MMM",this.range.from),Object(a["E"])("DD/MMM",this.range.to)])},remote_orders(){return _.filter(this.bills,(({token:{date:e,progress:t,type:r,customer:o}})=>o.id===this.customer.id&&"Remote"===r&&"Cancelled"!==t&&Object(a["j"])(e,this.range.from,this.range.to)))},table(){return _(this.remote_orders).map((({token:e,amount:t,discount:r,payable:o})=>_.zipObject(["Time","Token","Amount","Discount","Payable","Status"],[Object(a["f"])(e.date,!0),e.id,Object(a["z"])(t),Object(a["z"])(r),Object(a["z"])(o),e.progress]))).value()},foot(){return _.zipObject(["Orders","Discount","Total Payable","Total Paid"],[_.size(this.remote_orders),Object(a["z"])(_.sumBy(this.remote_orders,(({discount:e})=>_.toNumber(e)))),Object(a["z"])(_.sumBy(this.remote_orders,"payable")),Object(a["z"])(_.sumBy(this.remote_orders,(({payments:e})=>_.sumBy(e,(({amount:e})=>_.toNumber(e))))))])}}},c=i,m=r("2877"),b=r("9989"),d=r("eebe"),l=r.n(d),p=Object(m["a"])(c,o,s,!1,null,null,null);t["default"]=p.exports;l()(p,"components",{QPage:b["a"]})}}]);