(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[69],{"0c39":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Tokens By Receptionist",head:e.head,index:"",table:e.table,center:["Tokens"],right:["Amount","Payable"],foot:e.foot}})],1)},s=[],o=a("8f5b"),n=a("b1c1"),u=a("58d1"),i={name:"PageReportOrdersByDeliveryBoy",components:{ReportCard:o["a"]},mixins:[u["a"]],computed:{range(){return Object(n["v"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Tokens By Delivery Boy",Object(n["x"])("ddd DD/MMM hh:mm",this.range.from),Object(n["x"])("ddd DD/MMM hh:mm",this.range.to)])},token_amounts(){return _(this.bills).filter((({progress:e})=>"Cancelled"!==e)).mapKeys("token.id").mapValues((({amount:e,payable:t})=>_.zipObject(["amount","payable"],[_.toNumber(e),_.toNumber(t)]))).value()},user_ids(){return _.map(this.$store.getters["users/role_users"]("Delivery Boy"),"id")},user_tokens(){return _(this.tokens).filter((({user:e})=>_.includes(this.user_ids,e))).filter((({date:e,progress:t,waiter:a})=>"Cancelled"!==t&&a&&Object(n["h"])(e,this.range.from,this.range.to))).groupBy("waiter.name").mapValues((e=>_.map(e,(({id:e})=>_.get(this.token_amounts,e,{amount:0,payable:0}))))).value()},table(){return _.map(this.user_tokens,((e,t)=>Object({Waiter:t,Tokens:_.size(e),Amount:Object(n["u"])(_.sumBy(e,"amount")),Payable:Object(n["u"])(_.sumBy(e,"payable"))})))},foot(){let e=_.sumBy(this.table,(({Amount:e})=>_.toNumber(e))),t=_.sumBy(this.table,(({Payable:e})=>_.toNumber(e)));return _.zipObject(["Total Tokens","Total Amount","Total Payable","Discount/Round"],[_.sumBy(this.table,"Tokens"),Object(n["u"])(e),Object(n["u"])(t),Object(n["u"])(e-t)])}}},l=i,b=a("2877"),m=a("9989"),c=a("eebe"),p=a.n(c),d=Object(b["a"])(l,r,s,!1,null,null,null);t["default"]=d.exports,p()(d,"components",{QPage:m["a"]})}}]);