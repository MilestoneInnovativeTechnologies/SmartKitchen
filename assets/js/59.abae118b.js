(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[59],{ba33:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Bill Summary",head:e.head,table:e.table,right:["Payable","Paid","Balance"],index:"",foot:e.foot}})],1)},l=[],n=a("460a"),o=a("58d1"),b=a("b1c1"),i={name:"PageReportBillSummaryCustomer",components:{ReportCard:n["a"]},mixins:[o["a"]],computed:{range(){return Object(b["v"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Bill Summary",Object(b["x"])("ddd DD/MMM hh:mm",this.range.from),Object(b["x"])("ddd DD/MMM hh:mm",this.range.to)])},table(){return _(this.bills).filter((({date:e,progress:t})=>"Cancelled"!==t&&Object(b["h"])(e,this.range.from,this.range.to))).map((({date:e,payable:t,paid:a,customer:r})=>_.zipObject(["Time","Customer","Payable","Paid","Balance"],[Object(b["w"])(e),_.get(r,"name"),Object(b["u"])(t,2),Object(b["u"])(a,2),Object(b["u"])(t-a,2)]))).value()},foot(){return _.zipObject(["Total Payable","Total Paid","Total Balance"],[Object(b["u"])(_.sumBy(this.table,(({Payable:e})=>_.toNumber(e))),2),Object(b["u"])(_.sumBy(this.table,(({Paid:e})=>_.toNumber(e))),2),Object(b["u"])(_.sumBy(this.table,(({Balance:e})=>_.toNumber(e))),2)])}}},u=i,c=a("2877"),s=a("9989"),m=a("eebe"),d=a.n(m),p=Object(c["a"])(u,r,l,!1,null,null,null);t["default"]=p.exports;d()(p,"components",{QPage:s["a"]})}}]);