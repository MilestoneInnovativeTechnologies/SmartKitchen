(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[102],{a56e:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e._self._c;return t("q-page",{attrs:{padding:""}},[t("ReportCard",{attrs:{title:"Item Wise Remote Orders",head:e.head,table:e.table,center:["Orders","Quantities","New","Processing","Completed","Served"],foot:e.foot}})],1)},o=[],a=r("b1c1"),n=r("460a"),i=r("58d1"),m={name:"PageReportRemoteOrdersByItem",components:{ReportCard:n["a"]},mixins:[i["a"]],computed:{range(){return Object(a["A"])(this.$store.state.public.range)},head(){return _.zipObject(["Date From","Date To"],[Object(a["E"])("DD/MMM hh:mm A",this.range.from),Object(a["E"])("DD/MMM hh:mm A",this.range.to)])},remote_order_items(){return _(this.bills).filter((({progress:e,date:t,token:r})=>"Remote"===r.type&&"Cancelled"!==e&&Object(a["j"])(t,this.range.from,this.range.to))).flatMap("token.items").groupBy("item.name").value()},table(){return _(this.remote_order_items).map(((e,t)=>_.zipObject(["Item","Orders","Quantities","New","Processing","Completed","Served"],[t,_.size(e),u(e,"quantity"),d(e,"New")+d(e,"Accepted"),d(e,"Processing"),d(e,"Completed"),d(e,"Served")]))).value()},foot(){return _.zipObject(["Items","Orders","Quantities"],[_.size(this.remote_order_items),_.sum(_.map(this.remote_order_items,(e=>_.size(e)))),_.sum(_.map(this.remote_order_items,(e=>u(e,"quantity"))))])}}};function u(e,t){return _.sumBy(e,(e=>_.toNumber(_.get(e,t,0))))}function d(e,t){return _.sumBy(e,(e=>_.toSafeInteger(_.get(e,"progress")===t)))}var p=m,c=r("2877"),l=r("9989"),g=r("eebe"),h=r.n(g),b=Object(c["a"])(p,s,o,!1,null,null,null);t["default"]=b.exports;h()(b,"components",{QPage:l["a"]})}}]);