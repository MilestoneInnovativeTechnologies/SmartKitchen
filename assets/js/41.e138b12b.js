(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[41],{ef79:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{attrs:{padding:""}},[r("div",{staticClass:"q-px-md q-mb-sm"},[r("FilterInputText",{attrs:{label:"Filter",lazy:"true"},on:{text:function(t){e.filter=t}}})],1),r("q-list",e._l(e.FilteredTokens,(function(t){return r("TokenDetailDeliveryBoyExpansion",{key:"dbc-cm-tk-"+t.id,attrs:{token:t,group:"own",color:"purple",popup:"",label:e.label(t),caption:e.caption(t)},on:{action:e.OSA_action}})})),1),r("q-btn",{directives:[{name:"show",rawName:"v-show",value:!e.filter&&e.AllTokens.length>e.show,expression:"!filter && AllTokens.length > show"}],staticClass:"full-width q-mt-md",attrs:{label:"Show more",flat:"",dense:"",color:"amber"},on:{click:function(t){e.page++}}}),r("OrderSummaryActionPopups",e._b({on:{done:e.OSA_action_done}},"OrderSummaryActionPopups",e.OSA_CB,!1)),r("OrderNewFabDeliveryBoy")],1)},o=[],s=(r("26e9"),r("faa7")),l=r("b1c1"),i=r("1cd8"),a=r("232e"),c=r("9416"),u=r("3758"),d=r("5ab9"),p=r("3c10"),m=r("c9df"),h=r("3f08"),f={name:"DeliveryBoyCompleted",components:{OrderSummaryActionPopups:m["a"],FilterInputText:d["a"],OrderNewFabDeliveryBoy:c["a"],DeliveryBoyPaymentCard:i["a"],TokenDetailDeliveryBoyExpansion:s["a"]},mixins:[u["a"],h["a"]],data(){return{me:parseInt(this.$route.meta.me.id),filter:"",page:1}},computed:{billed_tokens(){return this.$store.getters["tokens/billed"]},show(){return this.page*_.ceil((settings("items_per_page")||p["d"])/3)},AllTokens(){return _(this.tokens).filter((e=>"Home Delivery"===e.type&&"Cancelled"!==e.progress&&y(e)&&!_.includes(this.billed_tokens,e.id))).map((e=>e.customer?e:Object.assign({},e,{customer:a["NoCustomer"]}))).map((e=>Object.assign({},e,{slug:g(e)}))).sortBy("id").reverse().value()},FilteredTokens(){return this.filter?_.filter(this.AllTokens,(e=>_.includes(e.slug,_.toLower(this.filter)))):_.take(this.AllTokens,this.show)}},methods:{popup_width:l["y"],label(e){return`${e.id}, ${e.customer.name}`},caption(e){return b(_.get(e,["customer","address"],""))}}};function b(e){return(e||"").replaceAll(/\n/g,", ")}function y({items:e}){return e.length&&_.every(e,(({progress:e})=>_.includes(["Cancelled","Completed","Served"],e)))}function g({id:e,customer:t}){return _.toLower([e,t.name,t.phone,b(t.address)].join(" "))}var w=f,k=r("2877"),v=r("9989"),A=r("1c1c"),O=r("9c40"),T=r("eebe"),x=r.n(T),B=Object(k["a"])(w,n,o,!1,null,null,null);t["default"]=B.exports;x()(B,"components",{QPage:v["a"],QList:A["a"],QBtn:O["a"]})}}]);