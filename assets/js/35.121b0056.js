(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[35],{"27e5":function(e,n,t){"use strict";t.r(n);var s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("q-page",{attrs:{padding:""}},[t("BillFilter",{staticClass:"q-mb-sm",attrs:{tokens:e.FTokens},model:{value:e.Tokens,callback:function(n){e.Tokens=n},expression:"Tokens"}}),t("Masonry",{attrs:{width:300,items:e.showing},scopedSlots:e._u([{key:"item",fn:function(n){return["Completed"===n.progress?t("TokenBillGenerate",{attrs:{token:n}}):t("BillMakePayment",{attrs:{bill:e.token_bill[n.id]}})]}}])}),t("Pagination",{attrs:{records:e.Tokens},model:{value:e.showing,callback:function(n){e.showing=n},expression:"showing"}})],1)},i=[],l=t("58d1"),o=t("ba49"),a=t("31e1"),r=t("c624"),c=t("c0e8"),p=t("1799"),u={name:"PageBillReceptionist",components:{Pagination:p["a"],BillFilter:c["a"],Masonry:r["a"],BillMakePayment:a["a"],TokenBillGenerate:o["a"]},mixins:[l["a"]],data(){return{filter_progress:["Completed","Pending","Partial"],Tokens:null,showing:null}},computed:{FTokens(){return _.filter(this.tokens,(({id:e,progress:n})=>this.filter_progress.includes(n)||this.filter_progress.includes(_.get(this.token_bill,[e,"progress"]))))}}},k=u,d=t("2877"),g=t("9989"),m=t("eebe"),f=t.n(m),h=Object(d["a"])(k,s,i,!1,null,null,null);n["default"]=h.exports;f()(h,"components",{QPage:g["a"]})}}]);