(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[64],{"9b8c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[e.waiter?a("ReportCard",{attrs:{title:"Waiter Tokens",head:e.head,index:"",table:e.table,right:["Amount"],foot:e.foot}}):a("div",{staticClass:"text-center text-bold"},[e._v("Select a Waiter")])],1)},s=[],o=a("8f5b"),n=a("b1c1"),i=a("58d1"),u={name:"PageReportWaiterOrders",components:{ReportCard:o["a"]},mixins:[i["a"]],computed:{date(){return this.$store.state.public.date+" 00:00:00"},waiter(){return this.$store.state.public.user},head(){return _.zipObject(["Report","Waiter","Date"],["Waiter Tokens",this.waiter.name,Object(n["u"])("ddd - Do MMM",this.date)])},token_amounts(){return _(this.bills).filter((({progress:e})=>"Cancelled"!==e)).mapKeys("token.id").mapValues((({amount:e,payable:t})=>_.zipObject(["amount","payable"],[_.toNumber(e),_.toNumber(t)]))).value()},date_tokens(){return _(this.tokens).filter((({progress:e,date:t,user:a})=>a===this.waiter.id&&"Cancelled"!==e&&Object(n["g"])(t,this.date,"day"))).value()},table(){return _(this.date_tokens).map((({date:e,id:t,customer:a,progress:r})=>_.zipObject(["Time","Token","Customer","Progress","Amount"],[Object(n["t"])(e),t,a?a.name:"-",r,Object(n["r"])(_.get(this.token_amounts,[t,"amount"],0))]))).value()},foot(){return Object.assign({},_.countBy(this.table,(({Progress:e})=>e+" Tokens")),_.zipObject(["Tokens","Amount"],[_.size(this.table),Object(n["r"])(_.sumBy(this.table,(({Amount:e})=>_.toNumber(e))))]))}}},l=u,d=a("2877"),b=a("9989"),c=a("eebe"),p=a.n(c),m=Object(d["a"])(l,r,s,!1,null,null,null);t["default"]=m.exports,p()(m,"components",{QPage:b["a"]})}}]);