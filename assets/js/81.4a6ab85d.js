(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[81],{a041:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Payments",head:t.head,table:t.table,index:"",right:["Amount"],foot:t.foot,center:["Payments"]}})],1)},r=[],o=a("460a"),s=a("b1c1"),m={name:"PageReportPaymentsByType",components:{ReportCard:o["a"]},computed:{range(){return Object(s["x"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Payments",Object(s["z"])("ddd DD/MMM hh:mm",this.range.from),Object(s["z"])("ddd DD/MMM hh:mm",this.range.to)])},table(){return _(this.$store.state.payments.data).filter((({date:t,status:e})=>"Active"===e&&Object(s["h"])(t,this.range.from,this.range.to))).groupBy("type").map(((t,e)=>_.zipObject(["Type","Payments","Amount"],[e,_.size(t),Object(s["w"])(_.sumBy(t,(({amount:t})=>_.toNumber(t))))]))).value()},foot(){return _.zipObject(["Total"],[Object(s["w"])(_.sumBy(this.table,(({Amount:t})=>_.toNumber(t))))])}}},u=m,p=a("2877"),c=a("9989"),i=a("eebe"),b=a.n(i),d=Object(p["a"])(u,n,r,!1,null,null,null);e["default"]=d.exports;b()(d,"components",{QPage:c["a"]})}}]);