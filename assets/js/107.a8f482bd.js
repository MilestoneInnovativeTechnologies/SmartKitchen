(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[107],{c84d:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("q-page",{attrs:{padding:""}},[e("ReportCard",{attrs:{title:"Bill Details - Tax",head:t.head,index:"",table:t.table,html:["Tax Detail"],right:["Bill Amount","Tax","Paid"],foot:t.foot}})],1)},l=[],r=a("460a"),i=a("b1c1"),c=a("58d1"),s=a("8808"),o={name:"PageReportTaxBillDetail",components:{ReportCard:r["a"]},mixins:[c["a"]],computed:{range(){return Object(i["A"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Bill Details - Tax",Object(i["E"])("ddd DD/MMM hh:mm",this.range.from),Object(i["E"])("ddd DD/MMM hh:mm",this.range.to)])},range_bills(){return _.filter(this.bills,(({progress:t,date:e})=>"Cancelled"!==t&&Object(i["j"])(e,this.range.from,this.range.to)))},table(){return _(this.range_bills).map((({id:t,contents:e,payable:a,nature:n,paid:l})=>_.zipObject(["Bill ID","Nature","Bill Amount","Tax","Tax Detail","Paid"],[t,n,Object(i["z"])(a),Object(i["z"])(Object(s["b"])({contents:e})),Object(i["F"])(_.mapValues(Object(s["c"])({contents:e}),(t=>Object(i["z"])(t,2)))),Object(i["z"])(l)]))).value()},foot(){let t={};return _.forEach(this.range_bills,(function(e){_.forEach(Object(s["c"])(e),(function(e,a){_.has(t,a)||Object.assign(t,{[a]:0}),t[a]+=_.toNumber(e)}))})),_.mapValues(t,(t=>Object(i["z"])(t)))}}},b=o,d=a("2877"),u=a("9989"),p=a("eebe"),h=a.n(p),j=Object(d["a"])(b,n,l,!1,null,null,null);e["default"]=j.exports;h()(j,"components",{QPage:u["a"]})}}]);