(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[66],{"0dc3":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{attrs:{padding:""}},[e.item?i("ReportCard",{attrs:{title:"Item Processing",head:e.head,index:"",table:e.table,center:["Tokens","Quantities","Accept","Start","Process","Complete","Serve"]}}):i("div",{staticClass:"text-center text-bold"},[e._v("Select Item")])],1)},a=[],n=(i("5db7"),i("73d9"),i("5319"),i("ded3")),r=i.n(n),m=i("8f5b"),o=i("b1c1"),c=i("3758"),u=i("8808"),p={name:"PageReportItemProcessing",components:{ReportCard:m["a"]},mixins:[c["a"]],computed:{range(){return Object(o["v"])(this.$store.state.public.range)},item(){return this.$store.state.public.item},head(){return _.zipObject(["Report","Item","Date Range","Unit"],["Item Processing",this.item.name,Object(o["x"])("DD/MMM HH:mm",this.range.from)+" - "+Object(o["x"])("DD/MMM HH:mm",this.range.to),"Minutes"])},items(){return _(this.tokens_own).filter((({date:e,progress:t,items:i})=>"Cancelled"!==t&&Object(o["h"])(e,this.range.from,this.range.to)&&_.some(i,(({item:{id:e}})=>this.item.id===e)))).flatMap("items").filter(["item.id",this.item.id]).groupBy("kitchen.name").value()},table(){return _(this.items).map(((e,t)=>Object.assign({},{Kitchen:t},this.properties(e[0].kitchen),{Tokens:_.size(e),Quantities:_.sumBy(e,"quantity")},_(Object(u["i"])(this.timings(e),this.quantities(e))).mapKeys(((e,t)=>_.startCase(t))).mapValues((e=>_.round(e/60))).value()))).value()}},methods:{properties({id:e,auto_accept:t}){let i=r()({auto_accept:t},_.find(this.$store.state.kitchens.items[e],["item",this.item.id]));return{Time:_.toInteger(_.get(i,"duration",0)/60),Auto:_(i).map(((e,t)=>"Yes"===e?_.startCase(t.replace("auto_","")):null)).filter().value().join(", ")}},timings(e){return _.map(e,"progress_timing")},quantities(e){return _.sumBy(e,"quantity")}}},l=p,d=i("2877"),h=i("9989"),g=i("eebe"),b=i.n(g),f=Object(d["a"])(l,s,a,!1,null,null,null);t["default"]=f.exports;b()(f,"components",{QPage:h["a"]})}}]);