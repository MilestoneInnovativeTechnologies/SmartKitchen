(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[49],{ae47:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{attrs:{padding:""}},[e.chef?i("ReportCard",{attrs:{title:"Chef Performance",head:e.head,index:"",table:e.table,center:["Tokens","Quantities","Accept","Start","Process","Complete"]}}):i("div",{staticClass:"text-center text-bold"},[e._v("Select A Chef")])],1)},n=[],a=(i("5db7"),i("73d9"),i("5319"),i("ded3")),r=i.n(a),o=i("8f5b"),u=i("b1c1"),c=i("3758"),m=i("8808"),h={name:"PageReportChefPerformance",components:{ReportCard:o["a"]},mixins:[c["a"]],computed:{range(){return Object(u["s"])(this.$store.state.public.range)},chef(){return this.$store.state.public.user},head(){return _.zipObject(["Report","Chef","Date Range","Unit"],["Chef Performance",this.chef.name,Object(u["u"])("DD/MMM HH:mm",this.range.from)+" - "+Object(u["u"])("DD/MMM HH:mm",this.range.to),"Minutes"])},items(){return _(this.tokens).filter((({date:e,progress:t,items:i})=>"Cancelled"!==t&&Object(u["f"])(e,this.range.from,this.range.to)&&_.some(i,(({progress_timing:e})=>_.findIndex(e,["auth",this.chef.id])>-1||_.findIndex(e,["user",this.chef.id])>-1)))).flatMap("items").filter((({progress_timing:e})=>_.findIndex(e,["auth",this.chef.id])>-1||_.findIndex(e,["user",this.chef.id])>-1)).groupBy((({item:e,kitchen:t})=>e.name+"|"+t.name)).value()},table(){return _(this.items).map(((e,t)=>Object.assign({},{Item:t.split("|")[0],Kitchen:t.split("|")[1]},this.properties(e[0].item,e[0].kitchen),{Tokens:_.size(e),Quantities:_.sumBy(e,"quantity")},_(Object(m["j"])(this.timings(e),this.quantities(e))).mapKeys(((e,t)=>_.startCase(t))).mapValues((e=>_.round(e/60))).omit(["Serve"]).value()))).sortBy("Item").value()}},methods:{properties(e,t){let i=r()({auto_accept:t.auto_accept},_.find(this.$store.state.kitchens.items[t.id],["item",e.id]));return{Time:_.toInteger(_.get(i,"duration",0)/60),Auto:_(i).map(((e,t)=>"Yes"===e?_.startCase(t.replace("auto_","")):null)).filter().value().join(", ")}},timings(e){return _.map(e,"progress_timing")},quantities(e){return _.sumBy(e,"quantity")}}},p=h,d=i("2877"),l=i("9989"),f=i("eebe"),g=i.n(f),b=Object(d["a"])(p,s,n,!1,null,null,null);t["default"]=b.exports;g()(b,"components",{QPage:l["a"]})}}]);