(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[35],{"27e5":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{attrs:{padding:""}},[s("BillFilter",{staticClass:"q-mb-sm",attrs:{tokens:e.FTokens},model:{value:e.Tokens,callback:function(t){e.Tokens=t},expression:"Tokens"}}),s("Masonry",{attrs:{width:300,items:e.Tokens},scopedSlots:e._u([{key:"item",fn:function(t){return["Completed"===t.progress?s("TokenBillGenerate",{attrs:{token:t}}):s("BillMakePayment",{attrs:{bill:e.Bills[t.id]}})]}}])})],1)},l=[],i=(s("fb6a"),s("58d1")),r=s("ba49"),a=s("31e1"),o=s("c624"),c=s("c0e8"),p={name:"PageBillReceptionist",components:{BillFilter:c["a"],Masonry:o["a"],BillMakePayment:a["a"],TokenBillGenerate:r["a"]},mixins:[i["a"]],data(){return{filter_progress:["Completed","Pending","Partial"],Tokens:null}},computed:{FTokens(){return _.filter(this.tokens,(({progress:e})=>this.filter_progress.includes(e)))},Bills(){return _(this.bills).filter((({token:e})=>e&&this.filter_progress.slice(1).includes(e.progress))).keyBy((({token:e})=>e.id)).value()}}},u=p,k=s("2877"),d=s("9989"),m=s("eebe"),f=s.n(m),g=Object(k["a"])(u,n,l,!1,null,null,null);t["default"]=g.exports;f()(g,"components",{QPage:d["a"]})}}]);