(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[99],{a041:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("q-page",{attrs:{padding:""}},[e("ReportCard",{attrs:{title:"Payments",head:t.head,table:t.table,index:"",right:["Amount"],foot:t.foot,center:["Payments"]}})],1)},r=[],o=a("460a"),s=a("b1c1"),u={name:"PageReportPaymentsByType",components:{ReportCard:o["a"]},computed:{range(){return Object(s["A"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Payments",Object(s["E"])("ddd DD/MMM hh:mm",this.range.from),Object(s["E"])("ddd DD/MMM hh:mm",this.range.to)])},table(){return _(this.$store.state.payments.data).filter((({date:t,status:e})=>"Active"===e&&Object(s["j"])(t,this.range.from,this.range.to))).groupBy("type").map(((t,e)=>_.zipObject(["Type","Payments","Amount"],[e,_.size(t),Object(s["z"])(_.sumBy(t,(({amount:t})=>_.toNumber(t))))]))).value()},foot(){return _.zipObject(["Total"],[Object(s["z"])(_.sumBy(this.table,(({Amount:t})=>_.toNumber(t))))])}}},m=u,p=a("2877"),i=a("9989"),c=a("eebe"),b=a.n(c),d=Object(p["a"])(m,n,r,!1,null,null,null);e["default"]=d.exports;b()(d,"components",{QPage:i["a"]})}}]);