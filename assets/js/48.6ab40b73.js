(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[48],{"9d5b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Bill Summary by Tax Nature",head:e.head,index:"",table:e.table,html:["Tax"],right:["Payable","Total Tax"]}})],1)},n=[],l=a("8f5b"),s=a("b1c1"),u=a("58d1"),b=a("8808"),i={name:"PageReportBillSummaryTaxNature",components:{ReportCard:l["a"]},mixins:[u["a"]],computed:{range(){return Object(s["s"])(this.$store.state.public.range)},nature(){return this.$store.state.public.nature},head(){return _.zipObject(["Report","Tax Nature","Start Date","End Date"],["Bill Summary by Tax Nature",this.nature,Object(s["u"])("ddd DD/MMM hh:mm",this.range.from),Object(s["u"])("ddd DD/MMM hh:mm",this.range.to)])},range_bills(){return _.filter(this.bills,(({progress:e,date:t,nature:a})=>"Cancelled"!==e&&a===this.nature&&Object(s["f"])(t,this.range.from,this.range.to)))},table(){return _(this.range_bills).map((({id:e,date:t,contents:a,payable:r,customer:{name:n}})=>_.zipObject(["Date","Bill ID","Customer","Payable","Tax","Total Tax"],[Object(s["u"])("Do hh:mm a",t),e,n,Object(s["r"])(r),Object(s["v"])(_.mapValues(Object(b["c"])({contents:a}),(e=>Object(s["r"])(e,2)))),Object(s["r"])(Object(b["b"])({contents:a}))]))).value()},foot(){return _(["Payable","Taxable","Tax"]).mapKeys((e=>"Total "+e)).mapValues((e=>Object(s["r"])(_.sumBy(this.table,(t=>_.toNumber(t[e])))))).value()}}},o=i,c=a("2877"),m=a("9989"),d=a("eebe"),p=a.n(d),h=Object(c["a"])(o,r,n,!1,null,null,null);t["default"]=h.exports,p()(h,"components",{QPage:m["a"]})}}]);