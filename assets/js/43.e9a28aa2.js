(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[43],{"05a4":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Bill Summary",head:e.head,table:e.table,right:["Payable","Paid","Balance"],index:"",foot:e.foot}})],1)},n=[],l=a("8f5b"),o=a("58d1"),b=a("b1c1"),i={name:"PageReportBillSummary",components:{ReportCard:l["a"]},mixins:[o["a"]],computed:{range(){return Object(b["o"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Bill Summary",Object(b["q"])("ddd DD/MMM hh:mm",this.range.from),Object(b["q"])("ddd DD/MMM hh:mm",this.range.to)])},table(){return _(this.bills).filter((({date:e,progress:t})=>"Cancelled"!==t&&Object(b["f"])(e,this.range.from,this.range.to))).map((({date:e,customer:{name:t},payable:a,paid:r})=>_.zipObject(["Time","Customer","Payable","Paid","Balance"],[Object(b["p"])(e),t,Object(b["n"])(a,2),Object(b["n"])(r,2),Object(b["n"])(a-r,2)]))).value()},foot(){return _.zipObject(["Total Payable","Total Paid","Total Balance"],[Object(b["n"])(_.sumBy(this.table,(({Payable:e})=>_.toNumber(e))),2),Object(b["n"])(_.sumBy(this.table,(({Paid:e})=>_.toNumber(e))),2),Object(b["n"])(_.sumBy(this.table,(({Balance:e})=>_.toNumber(e))),2)])}}},c=i,s=a("2877"),m=a("9989"),d=a("eebe"),u=a.n(d),p=Object(s["a"])(c,r,n,!1,null,null,null);t["default"]=p.exports;u()(p,"components",{QPage:m["a"]})}}]);