(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[102],{f03a:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Sales By Type",head:t.head,table:t.table,foot:t.foot,center:["Sales"],right:["Amount"]}})],1)},r=[],s=a("460a"),n=a("58d1"),l=a("b1c1"),p=a("8808"),i={name:"PageReportSalesByType",components:{ReportCard:s["a"]},mixins:[n["a"]],computed:{control_date(){return Object(l["z"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Start Date","End Date"],["Sales By Type Summary",Object(l["D"])("DD/MM/YYYY hh:mm A",this.control_date.from),Object(l["D"])("DD/MM/YYYY hh:mm A",this.control_date.to)])},range_bills(){return _.filter(this.$store.state.bills.data,(({date:t,progress:e})=>"Cancelled"!==e&&Object(l["i"])(t,this.control_date.from,this.control_date.to)))},token_type(){return _(this.tokens).mapKeys("id").mapValues("type").value()},type_grouped(){return _(this.range_bills).groupBy((({token:t})=>_.get(this.token_type,t,"-"))).value()},table(){return _.map(this.type_grouped,((t,e)=>_.zipObject(["Type","Sales","Amount"],[e,_.size(t),Object(l["y"])(_.sumBy(t,(t=>Object(p["a"])(t))),2)])))},foot(){return _.zipObject(["Total Sales","Total Amount"],[_.sumBy(this.table,"Sales"),Object(l["y"])(_.sumBy(this.table,(({Amount:t})=>_.toNumber(t))),2)])}}},u=i,c=a("2877"),b=a("9989"),m=a("eebe"),d=a.n(m),h=Object(c["a"])(u,o,r,!1,null,null,null);e["default"]=h.exports;d()(h,"components",{QPage:b["a"]})}}]);