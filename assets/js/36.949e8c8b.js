(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[36],{9796:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{attrs:{padding:""}},[n("BillFilter",{staticClass:"q-mb-sm",attrs:{tokens:e.FTokens},model:{value:e.Tokens,callback:function(t){e.Tokens=t},expression:"Tokens"}}),n("Masonry",{attrs:{width:300,items:e.Tokens},scopedSlots:e._u([{key:"item",fn:function(t){return["Completed"===t.progress?n("TokenBillGenerate",{attrs:{token:t}}):n("BillMakePayment",{attrs:{bill:e.Bills[t.id]}})]}}])})],1)},i=[],l=n("58d1"),r=n("ba49"),a=n("31e1"),o=n("c624"),c=n("b1c1"),k=n("c0e8"),p={name:"PageBillWaiter",components:{BillFilter:k["a"],Masonry:o["a"],BillMakePayment:a["a"],TokenBillGenerate:r["a"]},mixins:[l["a"]],data(){return{Tokens:null}},computed:{filter_progress(){return _.concat(!1!==Object(c["A"])(settings("waiter_generate_bills"))?["Completed"]:[],!1!==Object(c["A"])(settings("waiter_make_payments"))?["Pending","Partial"]:[])},FTokens(){return _.filter(this.tokens,(({progress:e,type:t})=>"Dining"===t&&this.filter_progress.includes(e)))},token_ids(){return _.map(this.Tokens,"id")},Bills(){return _(this.bills).filter((({token:e})=>e&&this.token_ids.includes(e.id)&&"Completed"!==e.progress)).keyBy((({token:e})=>e.id)).value()}}},u=p,d=n("2877"),m=n("9989"),g=n("eebe"),b=n.n(g),f=Object(d["a"])(u,s,i,!1,null,null,null);t["default"]=f.exports;b()(f,"components",{QPage:m["a"]})}}]);