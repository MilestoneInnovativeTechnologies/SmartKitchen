(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[72],{ce5b:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Day Token Summary",table:t.table,index:"",head:t.head,foot:t.foot,right:["Amount"]}})],1)},n=[],s=a("3758"),r=a("b1c1"),u=a("8808"),i=a("460a"),l={name:"PageReportDayTokenSummary",components:{ReportCard:i["a"]},mixins:[s["a"]],computed:{control_date(){return this.$store.state.public.date+" 00:00:00"},token_amount(){return _(this.$store.state.bills.data).groupBy("token").mapValues((t=>_.sumBy(t,(t=>"Cancelled"!==t.progress?Object(u["a"])(t):0)))).value()},day_tokens(){return _.filter(this.tokens_own,(({date:t,progress:e})=>"Cancelled"!==e&&Object(r["j"])(t,this.control_date,"day")))},table(){return _(this.day_tokens).sortBy((({date:t})=>Object(r["d"])(t).getTime())).map((({id:t,date:e,progress:a})=>_.zipObject(["Token","Time","Status","Amount"],[t,Object(r["A"])(e),a,Object(r["y"])(_.get(this.token_amount,t,0))]))).value()},head(){return _.zipObject(["Date","Day"],[Object(r["B"])("MMM/YYYY",this.control_date),Object(r["B"])("Do - ddd",this.control_date)])},foot(){return Object.assign(_.countBy(this.table,(({Status:t})=>t+" Tokens")),{"Total Tokens":_.size(this.table)},{"Total Amount":Object(r["y"])(_.sumBy(this.table,(({Amount:t})=>_.toNumber(t))))})}}},c=l,d=a("2877"),b=a("9989"),m=a("eebe"),p=a.n(m),h=Object(d["a"])(c,o,n,!1,null,null,null);e["default"]=h.exports;p()(h,"components",{QPage:b["a"]})}}]);