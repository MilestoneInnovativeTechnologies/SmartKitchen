(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[94],{"0c39":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("q-page",{attrs:{padding:""}},[t("ReportCard",{attrs:{title:"Tokens By Delivery Boy",head:e.head,index:"",table:e.table,center:["Tokens"],right:["Amount","Payable"],foot:e.foot}})],1)},s=[],o=(a("caad"),a("460a")),n=a("b1c1"),u=a("58d1"),i={name:"PageReportOrdersByDeliveryBoy",components:{ReportCard:o["a"]},mixins:[u["a"]],computed:{range(){return Object(n["A"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Tokens By Delivery Boy",Object(n["E"])("ddd DD/MMM hh:mm",this.range.from),Object(n["E"])("ddd DD/MMM hh:mm",this.range.to)])},token_amounts(){return _(this.bills).filter((({progress:e})=>"Cancelled"!==e)).mapKeys("token.id").mapValues((({amount:e,payable:t})=>_.zipObject(["amount","payable"],[_.toNumber(e),_.toNumber(t)]))).value()},user_ids(){return _.map(this.$store.getters["users/role_users"]("Delivery Boy"),"id")},user_tokens(){return _(this.tokens).filter((({user:e})=>_.includes(this.user_ids,e))).filter((({date:e,progress:t,waiter:a})=>"Cancelled"!==t&&a&&Object(n["j"])(e,this.range.from,this.range.to))).groupBy("waiter.name").mapValues((e=>_.map(e,(({id:e})=>_.get(this.token_amounts,e,{amount:0,payable:0}))))).value()},table(){return _.map(this.user_tokens,((e,t)=>Object({Waiter:t,Tokens:_.size(e),Amount:Object(n["z"])(_.sumBy(e,"amount")),Payable:Object(n["z"])(_.sumBy(e,"payable"))})))},foot(){let e=_.sumBy(this.table,(({Amount:e})=>_.toNumber(e))),t=_.sumBy(this.table,(({Payable:e})=>_.toNumber(e)));return _.zipObject(["Total Tokens","Total Amount","Total Payable","Discount/Round"],[_.sumBy(this.table,"Tokens"),Object(n["z"])(e),Object(n["z"])(t),Object(n["z"])(e-t)])}}},l=i,b=a("2877"),m=a("9989"),c=a("eebe"),d=a.n(c),p=Object(b["a"])(l,r,s,!1,null,null,null);t["default"]=p.exports;d()(p,"components",{QPage:m["a"]})}}]);