(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[93],{"8e32":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{attrs:{padding:""}},[e.item?r("ReportCard",{attrs:{title:"Remote Orders Summary of Item",head:e.head,table:e.table,center:["Orders","Quantities","New","Processing","Completed","Served"],foot:e.foot}}):r("div",{staticClass:"text-center text-bold"},[e._v("Select An Item")])],1)},n=[],a=(r("5db7"),r("73d9"),r("b1c1")),s=r("460a"),o=r("58d1"),m={name:"PageRemoteOrdersSummaryByItem",components:{ReportCard:s["a"]},mixins:[o["a"]],computed:{range(){return Object(a["z"])(this.$store.state.public.range)},item(){return _.get(this.$store.state.public,"item",null)},head(){return _.zipObject(["Item","Date From","Date To"],[this.item.name,Object(a["D"])("DD/MMM hh:mm A",this.range.from),Object(a["D"])("DD/MMM hh:mm A",this.range.to)])},remote_order_items(){return _(this.bills).filter((({progress:e,date:t})=>"Cancelled"!==e&&Object(a["i"])(t,this.range.from,this.range.to))).flatMap("token.items").filter((({item:e})=>e.id===this.item.id)).value()},table(){return _(this.remote_order_items).map((e=>_.zipObject(["Customer","Token","Quantity","Kitchen","Delivery","Progress"],[_.get(this.tokens,[e.token,"customer","name"]),e.token,e.quantity,_.get(e,["kitchen","name"],"--no-kitchen--"),e.deliver_human,e.progress]))).value()},foot(){return _.zipObject(["Orders","Quantities"],[_.size(this.table),u(this.table,"Quantity")])}}};function u(e,t){return _.sumBy(e,(e=>_.toNumber(_.get(e,t,0))))}var l=m,c=r("2877"),d=r("9989"),h=r("eebe"),b=r.n(h),p=Object(c["a"])(l,i,n,!1,null,null,null);t["default"]=p.exports;b()(p,"components",{QPage:d["a"]})}}]);