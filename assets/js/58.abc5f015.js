(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[58],{"301d":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("ReportCard",{attrs:{title:"Sales Summary By Type",head:t.head,table:t.table,foot:t.foot,right:["Amount"]}})],1)},s=[],r=a("8f5b"),n=a("58d1"),l=a("b1c1"),i=a("8808"),c={name:"PageReportSalesSummaryByType",components:{ReportCard:r["a"]},mixins:[n["a"]],computed:{control_date(){return Object(l["o"])(this.$store.state.public.range)},head(){return _.zipObject(["Report","Order Type","Start Date","End Date"],["Sales By Type Summary",this.$store.state.public.sale_type,Object(l["q"])("DD/MM/YYYY hh:mm A",this.control_date.from),Object(l["q"])("DD/MM/YYYY hh:mm A",this.control_date.to)])},available_tokens(){return _.get(_(this.tokens).groupBy("type").mapValues((t=>_.map(t,"id"))).value(),this.$store.state.public.sale_type)},list_bills(){return _.filter(this.$store.state.bills.data,(({date:t,progress:e,token:a})=>"Cancelled"!==e&&_.includes(this.available_tokens,a)&&Object(l["f"])(t,this.control_date.from,this.control_date.to)))},table(){return _.map(this.list_bills,(t=>_.zipObject(["Time","Token","Customer","Amount"],[Object(l["p"])(t.date),t.token,_.get(_.find(this.tokens,["id",t.token]),["customer","name"],"NA"),Object(l["n"])(Object(i["a"])(t),2)])))},foot(){return _.zipObject(["Total Sales","Total Amount"],[_.size(this.table),Object(l["n"])(_.sumBy(this.table,(({Amount:t})=>_.toNumber(t))),2)])}}},p=c,u=a("2877"),b=a("9989"),m=a("eebe"),d=a.n(m),h=Object(u["a"])(p,o,s,!1,null,null,null);e["default"]=h.exports,d()(h,"components",{QPage:b["a"]})}}]);