(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[50],{d1f4:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-page",{attrs:{padding:""}},[t.kitchen?i("ReportCard",{attrs:{title:"Kitchen Processing",head:t.head,index:"",table:t.table,center:["Time","Tokens","Quantities","Accept","Process","Complete"]}}):i("div",{staticClass:"text-center text-bold"},[t._v("Select Kitchen")])],1)},n=[],a=(i("5db7"),i("73d9"),i("5319"),i("8f5b")),r=i("b1c1"),c=i("3758"),o=i("8808"),u={name:"PageReportKitchenProcessing",components:{ReportCard:a["a"]},mixins:[c["a"]],computed:{date(){return this.$store.state.public.date+" 00:00:00"},kitchen(){let t=this.$store.state.public.kitchen;return Object.assign({},t,{items:_.keyBy(this.$store.state.kitchens.items[t.id],"item")})},head(){return _.zipObject(["Report","Kitchen","Auto Accept","Date","Unit"],["Kitchen Processing",this.kitchen.name,this.kitchen.auto_accept,Object(r["q"])("ddd - Do MMM",this.date),"Minutes"])},date_tokens(){return _(this.tokens).filter((({date:t,progress:e})=>"Cancelled"!==e&&Object(r["g"])(t,this.date,"day"))).value()},kitchen_items(){return _(this.date_tokens).flatMap("items").filter((({kitchen:t})=>t&&t.id===this.kitchen.id)).groupBy("item.name").value()},table(){return _(this.kitchen_items).map(((t,e)=>Object.assign({},{Item:e},this.properties(t[0].item.id),{Tokens:_.size(t),Quantities:_.sumBy(t,"quantity")},_(Object(o["e"])(this.timings(t),this.quantities(t))).mapKeys(((t,e)=>_.startCase(e))).mapValues((t=>_.round(t/60))).omit(["Start","Serve","Yes"===this.kitchen.auto_accept?"Accept":null]).value()))).sortBy("Item").value()}},methods:{properties(t){return t=_.get(this.kitchen.items,t),{Time:_.toInteger(_.get(t,"duration",0)/60),Auto:_(t).map(((t,e)=>"Yes"===t?_.startCase(e.replace("auto_","")):null)).filter().value().join(", ")}},timings(t){return _.map(t,"progress_timing")},quantities(t){return _.sumBy(t,"quantity")}}},h=u,p=i("2877"),l=i("9989"),d=i("eebe"),m=i.n(d),k=Object(p["a"])(h,s,n,!1,null,null,null);e["default"]=k.exports;m()(k,"components",{QPage:l["a"]})}}]);