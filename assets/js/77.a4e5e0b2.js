(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[77],{c84d:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Bill Details - Tax",head:t.head,index:"",table:t.table,html:["Tax Detail"],right:["Bill Amount","Tax","Paid"],foot:t.foot}})],1)},l=[],r=a("8f5b"),i=a("b1c1"),c=a("58d1"),s=a("8808"),o={name:"PageReportTaxBillDetail",components:{ReportCard:r["a"]},mixins:[c["a"]],computed:{range(){return Object(i["v"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Bill Details - Tax",Object(i["x"])("ddd DD/MMM hh:mm",this.range.from),Object(i["x"])("ddd DD/MMM hh:mm",this.range.to)])},range_bills(){return _.filter(this.bills,(({progress:t,date:e})=>"Cancelled"!==t&&Object(i["h"])(e,this.range.from,this.range.to)))},table(){return _(this.range_bills).map((({id:t,contents:e,payable:a,nature:n,paid:l})=>_.zipObject(["Bill ID","Nature","Bill Amount","Tax","Tax Detail","Paid"],[t,n,Object(i["u"])(a),Object(i["u"])(Object(s["b"])({contents:e})),Object(i["y"])(_.mapValues(Object(s["c"])({contents:e}),(t=>Object(i["u"])(t,2)))),Object(i["u"])(l)]))).value()},foot(){let t={};return _.forEach(this.range_bills,(function(e){_.forEach(Object(s["c"])(e),(function(e,a){_.has(t,a)||Object.assign(t,{[a]:0}),t[a]+=_.toNumber(e)}))})),_.mapValues(t,(t=>Object(i["u"])(t)))}}},b=o,u=a("2877"),d=a("9989"),p=a("eebe"),h=a.n(p),m=Object(u["a"])(b,n,l,!1,null,null,null);e["default"]=m.exports,h()(m,"components",{QPage:d["a"]})}}]);