(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[56],{"8eb3":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Tokens By Waiter",head:e.head,index:"",table:e.table,center:["Tokens"],right:["Amount","Payable"],foot:e.foot}})],1)},n=[],o=a("8f5b"),s=a("b1c1"),u=a("58d1"),i={name:"PageReportOrdersByWaiter",components:{ReportCard:o["a"]},mixins:[u["a"]],computed:{range(){return Object(s["s"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Tokens By Waiter",Object(s["u"])("ddd DD/MMM hh:mm",this.range.from),Object(s["u"])("ddd DD/MMM hh:mm",this.range.to)])},token_amounts(){return _(this.bills).filter((({progress:e})=>"Cancelled"!==e)).mapKeys("token.id").mapValues((({amount:e,payable:t})=>_.zipObject(["amount","payable"],[_.toNumber(e),_.toNumber(t)]))).value()},waiter_tokens(){return _(this.tokens).filter((({date:e,progress:t,waiter:a})=>"Cancelled"!==t&&a&&Object(s["f"])(e,this.range.from,this.range.to))).groupBy("waiter.name").mapValues((e=>_.map(e,(({id:e})=>_.get(this.token_amounts,e,{amount:0,payable:0}))))).value()},table(){return _.map(this.waiter_tokens,((e,t)=>Object({Waiter:t,Tokens:_.size(e),Amount:Object(s["r"])(_.sumBy(e,"amount")),Payable:Object(s["r"])(_.sumBy(e,"payable"))})))},foot(){let e=_.sumBy(this.table,(({Amount:e})=>_.toNumber(e))),t=_.sumBy(this.table,(({Payable:e})=>_.toNumber(e)));return _.zipObject(["Total Tokens","Total Amount","Total Payable","Discount/Round"],[_.sumBy(this.table,"Tokens"),Object(s["r"])(e),Object(s["r"])(t),Object(s["r"])(e-t)])}}},l=i,b=a("2877"),m=a("9989"),p=a("eebe"),c=a.n(p),d=Object(b["a"])(l,r,n,!1,null,null,null);t["default"]=d.exports;c()(d,"components",{QPage:m["a"]})}}]);