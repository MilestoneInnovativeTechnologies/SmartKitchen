(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[78],{"4e04":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Tax Details",head:t.head,index:"",table:t.table,right:["Amount"]}})],1)},s=[],r=(a("5db7"),a("73d9"),a("8f5b")),i=a("b1c1"),l=a("58d1"),c=a("8808"),o={name:"PageReportTaxDetails",components:{ReportCard:r["a"]},mixins:[l["a"]],computed:{range(){return Object(i["v"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Tax Details",Object(i["x"])("ddd DD/MMM hh:mm",this.range.from),Object(i["x"])("ddd DD/MMM hh:mm",this.range.to)])},range_bills(){return _.filter(this.bills,(({progress:t,date:e})=>"Cancelled"!==t&&Object(i["h"])(e,this.range.from,this.range.to)))},taxes(){return _.uniq(_.flatMap(this.$store.state.tax.data,(({contents:t,status:e})=>"Active"===e?_.map(t,"name"):[])))},table(){let t=Object.assign({},_(_.cloneDeep(this.taxes)).mapKeys((t=>t)).mapValues((t=>0)).value(),Object(c["c"])({contents:_.flatMap(this.range_bills,"contents")}));return _.map(t,((t,e)=>Object({Tax:e,Amount:Object(i["u"])(t)})))}}},d=o,p=a("2877"),b=a("9989"),u=a("eebe"),h=a.n(u),m=Object(p["a"])(d,n,s,!1,null,null,null);e["default"]=m.exports;h()(m,"components",{QPage:b["a"]})}}]);