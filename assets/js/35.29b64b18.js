(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[35],{"27e5":function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e._self._c;return n("q-page",{attrs:{padding:""}},[n("BillFilter",{staticClass:"q-mb-sm",attrs:{tokens:e.FTokens},model:{value:e.Tokens,callback:function(n){e.Tokens=n},expression:"Tokens"}}),n("Masonry",{attrs:{width:300,items:e.showing},scopedSlots:e._u([{key:"item",fn:function(t){return[e.token_bill[t.id]?n("BillMakePayment",{attrs:{bill:e.token_bill[t.id]},on:{action:e.OSA_action}}):"Home Delivery"===t.type?n("BillGenerateCard",{attrs:{token:t}}):n("TokenBillGenerate",{attrs:{token:t}})]}}])}),n("OrderSummaryActionPopups",e._b({on:{done:e.OSA_action_done}},"OrderSummaryActionPopups",e.OSA_CB,!1)),n("Pagination",{attrs:{records:e.Tokens},model:{value:e.showing,callback:function(n){e.showing=n},expression:"showing"}})],1)},s=[],i=(t("caad"),t("58d1")),a=t("ba49"),r=t("31e1"),l=t("c624"),c=t("c0e8"),d=t("1799"),u=t("bf22"),p=t("c9df"),k=t("3f08"),m={name:"PageBillReceptionist",components:{OrderSummaryActionPopups:p["a"],BillGenerateCard:u["a"],Pagination:d["a"],BillFilter:c["a"],Masonry:l["a"],BillMakePayment:r["a"],TokenBillGenerate:a["a"]},mixins:[i["a"],k["a"]],data(){return{filter_progress:["Completed","Pending","Partial"],Tokens:null,showing:null}},computed:{FTokens(){return _.filter(this.tokens,(({id:e,progress:n})=>this.filter_progress.includes(n)||this.filter_progress.includes(_.get(this.token_bill,[e,"progress"])))).reverse()}}},g=m,f=t("2877"),b=t("9989"),h=t("eebe"),w=t.n(h),P=Object(f["a"])(g,o,s,!1,null,null,null);n["default"]=P.exports;w()(P,"components",{QPage:b["a"]})}}]);