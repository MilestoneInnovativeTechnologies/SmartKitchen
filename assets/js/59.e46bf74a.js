(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[59],{c84d:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Bill Details - Tax",head:t.head,index:"",table:t.table,html:["Tax Detail"],right:["Bill Amount","Tax","Paid"],foot:t.foot}})],1)},r=[],l=a("8f5b"),i=a("b1c1"),c=a("58d1"),o=a("8808"),s={name:"PageReportTaxBillDetail",components:{ReportCard:l["a"]},mixins:[c["a"]],computed:{range(){return Object(i["o"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Bill Details - Tax",Object(i["q"])("ddd DD/MMM hh:mm",this.range.from),Object(i["q"])("ddd DD/MMM hh:mm",this.range.to)])},range_bills(){return _.filter(this.bills,(({progress:t,date:e})=>"Cancelled"!==t&&Object(i["f"])(e,this.range.from,this.range.to)))},table(){return _(this.range_bills).map((({id:t,contents:e,payable:a,nature:n,paid:r})=>_.zipObject(["Bill ID","Nature","Bill Amount","Tax","Tax Detail","Paid"],[t,n,Object(i["n"])(a),Object(i["n"])(Object(o["b"])({contents:e})),Object(i["r"])(_.mapValues(Object(o["c"])({contents:e}),(t=>Object(i["n"])(t,2)))),Object(i["n"])(r)]))).value()},foot(){let t={};return _.forEach(this.range_bills,(function(e){_.forEach(Object(o["c"])(e),(function(e,a){_.has(t,a)||Object.assign(t,{[a]:0}),t[a]+=_.toNumber(e)}))})),_.mapValues(t,(t=>Object(i["n"])(t)))}}},b=s,d=a("2877"),u=a("9989"),p=a("eebe"),h=a.n(p),m=Object(d["a"])(b,n,r,!1,null,null,null);e["default"]=m.exports,h()(m,"components",{QPage:u["a"]})}}]);