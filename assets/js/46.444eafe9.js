(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{"05a4":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Bill Summary",head:e.head,table:e.table,right:["Payable","Paid","Balance"],index:"",foot:e.foot}})],1)},l=[],n=a("8f5b"),b=a("58d1"),i=a("b1c1"),o={name:"PageReportBillSummary",components:{ReportCard:n["a"]},mixins:[b["a"]],computed:{range(){return Object(i["s"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Bill Summary",Object(i["u"])("ddd DD/MMM hh:mm",this.range.from),Object(i["u"])("ddd DD/MMM hh:mm",this.range.to)])},table(){return _(this.bills).filter((({date:e,progress:t})=>"Cancelled"!==t&&Object(i["f"])(e,this.range.from,this.range.to))).map((({date:e,customer:{name:t},payable:a,paid:r})=>_.zipObject(["Time","Customer","Payable","Paid","Balance"],[Object(i["t"])(e),t,Object(i["r"])(a,2),Object(i["r"])(r,2),Object(i["r"])(a-r,2)]))).value()},foot(){return _.zipObject(["Total Payable","Total Paid","Total Balance"],[Object(i["r"])(_.sumBy(this.table,(({Payable:e})=>_.toNumber(e))),2),Object(i["r"])(_.sumBy(this.table,(({Paid:e})=>_.toNumber(e))),2),Object(i["r"])(_.sumBy(this.table,(({Balance:e})=>_.toNumber(e))),2)])}}},c=o,s=a("2877"),m=a("9989"),u=a("eebe"),d=a.n(u),p=Object(s["a"])(c,r,l,!1,null,null,null);t["default"]=p.exports,d()(p,"components",{QPage:m["a"]})}}]);