(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[72],{d6cc:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("q-page",{attrs:{padding:""}},[t("ReportCard",{attrs:{title:"Bill Summary with Tax",head:e.head,table:e.table,right:["Payable","Taxable","Tax"],foot:e.foot,index:""}})],1)},l=[],n=a("460a"),b=a("b1c1"),i=a("58d1"),s=a("8808"),o={name:"PageBillSummaryTax",components:{ReportCard:n["a"]},mixins:[i["a"]],computed:{range(){return Object(b["A"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Bill Summary with Tax",Object(b["E"])("ddd DD/MMM hh:mm",this.range.from),Object(b["E"])("ddd DD/MMM hh:mm",this.range.to)])},range_bills(){return _.filter(this.bills,(({progress:e,date:t})=>"Cancelled"!==e&&Object(b["j"])(t,this.range.from,this.range.to)))},table(){return _(this.range_bills).map((({id:e,date:t,contents:a,payable:r})=>_.zipObject(["Date","Bill ID","Payable","Taxable","Tax"],[Object(b["E"])("Do hh:mm a",t),e,Object(b["z"])(r),Object(b["z"])(Object(s["d"])({contents:a})),Object(b["z"])(Object(s["b"])({contents:a}))]))).value()},foot(){return _(["Payable","Taxable","Tax"]).mapKeys((e=>"Total "+e)).mapValues((e=>Object(b["z"])(_.sumBy(this.table,(t=>_.toNumber(t[e])))))).value()}}},c=o,d=a("2877"),m=a("9989"),u=a("eebe"),h=a.n(u),p=Object(d["a"])(c,r,l,!1,null,null,null);t["default"]=p.exports;h()(p,"components",{QPage:m["a"]})}}]);