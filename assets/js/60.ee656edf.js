(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[60],{"88ef":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[t.item?a("ReportCard",{attrs:{title:"Item Wise Sales Summary",head:t.head,table:t.table,right:["Amount"],center:["Quantity"],foot:t.foot}}):a("div",{staticClass:"text-center"},[t._v("Select Item")])],1)},s=[],n=(a("5db7"),a("73d9"),a("8f5b")),r=a("b1c1"),m=a("58d1"),u={name:"PageReportItemWiseSaleSummary",components:{ReportCard:n["a"]},mixins:[m["a"]],computed:{range(){return Object(r["u"])(this.$store.state.public.range)},item(){return this.$store.state.public.item},head(){return _.zipObject(["Item","Start Date","End Date"],[this.item.name,Object(r["w"])("DD/MM/YYYY hh:mm A",this.range.from),Object(r["w"])("DD/MM/YYYY hh:mm A",this.range.to)])},date_bills(){return _(this.bills).filter((({date:t,progress:e})=>"Cancelled"!==e&&Object(r["h"])(t,this.range.from,this.range.to))).keyBy("id").value()},items(){let t=_.map(this.date_bills,"token.id");return _(this.tokens).filter((({id:e})=>t.includes(e))).flatMap((({items:t,type:e,customer:a,date:i})=>_.map(t,(t=>t.item.id===this.item.id?Object.assign({},t,{type:e,customer:a,date:i}):null)))).filter().value()},table(){return _(this.items).sortBy((({date:t})=>Object(r["c"])(t).getTime())).map((t=>_.zipObject(["Date","Token","Type","Customer","Quantity","Amount"],[Object(r["w"])("DD/MMM hh:mm a",t.date),t.token,t.type,_.get(t,["customer","name"],""),t.quantity,this.amount(t.token)]))).value()},type_summary(){return _(this.table).groupBy("Type").mapValues((t=>`(${_.sumBy(t,"Quantity")}), ${Object(r["t"])(_.sumBy(t,(({Amount:t})=>_.toNumber(t))),2)}`)).value()},foot(){return Object.assign({},this.type_summary,{Total:`(${_.sumBy(this.table,"Quantity")}), ${Object(r["t"])(_.sumBy(this.table,(({Amount:t})=>_.toNumber(t))),2)}`})}},methods:{amount(t){let e=_.find(this.bills,(({progress:e,token:a})=>a&&"Cancelled"!==e&&a.id===t)),{price:a,discount:i,quantity:s}=_.find(e.contents,["item",this.item.id]);return Object(r["t"])(_.toNumber(a)*_.toNumber(s)-_.toNumber(i),2)}}},o=u,l=a("2877"),c=a("9989"),b=a("eebe"),d=a.n(b),p=Object(l["a"])(o,i,s,!1,null,null,null);e["default"]=p.exports;d()(p,"components",{QPage:c["a"]})}}]);