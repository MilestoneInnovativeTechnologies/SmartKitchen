(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[41],{ef79:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("q-list",[a("q-item-label",{staticClass:"text-h6",attrs:{header:""}},[e._v("Own")]),e.own.length?e._e():a("q-item-label",{staticClass:"q-pl-lg",attrs:{caption:""}},[e._v("No Own Tokens")]),e._l(e.own,(function(t){return a("TokenDetailDeliveryBoyExpansion",{key:"dbc-own-"+t.id,attrs:{token:t,group:"own",color:"positive",popup:"",label:t.customer.name,caption:e.time(t.date)},on:{deliver:function(a){return e.deliver(t)},bill:function(a){return e.bill(t)}}})})),a("q-item-label",{staticClass:"text-h6",attrs:{header:""}},[e._v("Orphan")]),e.orphan.length?e._e():a("q-item-label",{staticClass:"q-pl-lg",attrs:{caption:""}},[e._v("No Orphan Tokens")]),e._l(e.orphan,(function(t){return a("TokenDetailDeliveryBoyExpansion",{key:"dbc-own-"+t.id,attrs:{token:t,group:"orphan",color:"accent",popup:"",label:t.customer.name,caption:e.pa(t)},on:{deliver:function(a){return e.deliver(t)},bill:function(a){return e.bill(t)}}})})),a("q-item-label",{staticClass:"text-h6",attrs:{header:""}},[e._v("Other")]),e.other.length?e._e():a("q-item-label",{staticClass:"q-pl-lg",attrs:{caption:""}},[e._v("No Others Tokens")]),e._l(e.other,(function(t){return a("TokenDetailDeliveryBoyExpansion",{key:"dbc-own-"+t.id,attrs:{token:t,group:"other",color:"secondary",popup:"",label:e.np(t),caption:e.wa(t)},on:{deliver:function(a){return e.deliver(t)},bill:function(a){return e.bill(t)}}})}))],2),a("q-dialog",{attrs:{persistent:""},on:{"before-hide":function(t){e.bill_mode=!1}},model:{value:e.bill_mode,callback:function(t){e.bill_mode=t},expression:"bill_mode"}},[e.selected?a("BillGenerateCard",{style:e.popup_width(),attrs:{token:e.selected},on:{generated:function(t){e.bill_mode=!1}}}):e._e()],1),a("q-dialog",{attrs:{persistent:""},on:{"before-hide":function(t){e.deliver_mode=!1}},model:{value:e.deliver_mode,callback:function(t){e.deliver_mode=t},expression:"deliver_mode"}},[e.selected?a("DeliveryBoyPaymentCard",{style:e.popup_width(),attrs:{token:e.selected},on:{paid:function(t){e.deliver_mode=!1}}}):e._e()],1),a("OrderNewFabDeliveryBoy")],1)},n=[],r=a("3758"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-expansion-item",e._b({scopedSlots:e._u([{key:"header",fn:function(){return[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:""}},[a("q-img",{attrs:{src:e.image(e.token.customer.image)}})],1)],1),a("q-item-section",[a("q-item-label",{class:"text-"+e.clr},[e._v(e._s(e.label))]),a("q-item-label",{attrs:{caption:""},domProps:{innerHTML:e._s(e.caption)}}),e.Bill?a("q-item-label",{staticClass:"text-red",attrs:{caption:""}},[a("q-icon",{attrs:{name:"done_all",size:"sm"}}),e._v(" Billed")],1):e._e()],1),a("q-item-section",{attrs:{side:""}},[a("q-badge",{staticClass:"q-py-xs q-px-sm",attrs:{outline:"",color:e.clr,label:e.precision(e.total)}})],1)]},proxy:!0}])},"q-expansion-item",e.$attrs,!1),[a("q-card",[a("q-card-section",[a("q-card-section",{staticClass:"q-pa-none row items-center justify-between q-col-gutter-xs"},[a("q-badge",{staticClass:"q-pa-sm",attrs:{label:e.token.date_human,outline:"","text-color":e.clr}}),a("q-badge",{staticClass:"q-pa-sm",attrs:{label:e.items.length+" Items",outline:"","text-color":e.clr}}),a("q-badge",{staticClass:"q-pa-sm",attrs:{label:e.quantities+" Quantities",outline:"","text-color":e.clr}})],1),e.token.narration?a("div",{staticClass:"q-py-sm",class:"text-"+e.clr,domProps:{textContent:e._s(e.token.narration)}}):e._e()],1),a("q-list",{attrs:{bordered:"",separator:""}},e._l(e.items,(function(t){return a("q-item",{key:"dbe-t"+e.token.id+"-ti-"+t.id+"-i-"+t.item.id},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:""}},[a("q-img",{attrs:{src:e.image(t.item.image)}})],1)],1),a("q-item-section",[a("q-item-label",{staticClass:"text-bold",class:"text-"+e.clr},[e._v(e._s(t.quantity)+"x "+e._s(t.item.name))]),t.narration?a("q-item-label",{staticClass:"text-red",attrs:{caption:""}},[e._v(e._s(t.narration))]):e._e(),a("q-item-label",{attrs:{caption:""}},[e._v("Rate: "+e._s(e.precision(t.price)))]),t.kitchen?a("q-item-label",{attrs:{caption:""}},[e._v("Kitchen: "+e._s(t.kitchen.name))]):e._e()],1),a("q-item-section",{staticClass:"text-bold",class:"text-"+e.clr,attrs:{side:""}},[e._v(e._s(e.precision(t.price*t.quantity)))])],1)})),1),e.token.customer.id?a("q-card-section",{staticClass:"q-gutter-y-xs bg-grey-1"},[a("q-input",{attrs:{label:"Customer Phone",value:e.token.customer.phone,outlined:"",dense:"",color:e.clr}}),a("q-input",{attrs:{label:"Customer Address",type:"textarea",value:e.token.customer.address,readonly:"",outlined:"",dense:"",autogrow:""}})],1):e._e(),a("q-card-actions",{staticClass:"row items-center justify-between q-px-md"},[e.Bill?a("div",[a("q-btn",{attrs:{flat:"",padding:"none",color:"positive",icon:"done_all",label:"Billed: "+e.Bill.payable}}),a("div",{staticClass:"q-pl-sm q-ml-lg",staticStyle:{"line-height":"0.75rem"}},[e._v(e._s(e.Bill.user.name))])],1):a("q-btn",{attrs:{label:"Generate Bill",color:"red",padding:"xs md"},on:{click:function(t){return e.$emit("bill")}}}),e.Bill?a("q-btn",{attrs:{label:"Delivered",color:"positive",padding:"xs md"},on:{click:function(t){return e.$emit("deliver")}}}):e._e()],1)],1)],1)},s=[],o=a("b1c1"),c=a("58d1"),d={name:"TokenDetailDeliveryBoyExpansion",props:["label","caption","token","color"],mixins:[c["a"]],computed:{clr(){return this.color||"primary"},items(){return _.get(this.token,"items")},quantities(){return _.sumBy(this.items,(({quantity:e})=>_.toNumber(e)))},total(){return _.sumBy(this.items,(({quantity:e,price:t})=>_.toNumber(e)*_.toNumber(t)))},Bill(){return _.find(this.bills,(e=>parseInt(_.get(e,["token","id"]))===parseInt(this.token.id)))}},methods:{precision:o["y"],image:o["h"]}},m=d,u=a("2877"),p=a("3b73"),b=a("4074"),q=a("cb32"),v=a("068f"),h=a("0170"),y=a("0016"),g=a("58a8"),f=a("f09f"),k=a("a370"),x=a("1c1c"),C=a("66e5"),w=a("27f9"),B=a("4b7e"),Q=a("9c40"),D=a("eebe"),T=a.n(D),I=Object(u["a"])(m,l,s,!1,null,null,null),N=I.exports;T()(I,"components",{QExpansionItem:p["a"],QItemSection:b["a"],QAvatar:q["a"],QImg:v["a"],QItemLabel:h["a"],QIcon:y["a"],QBadge:g["a"],QCard:f["a"],QCardSection:k["a"],QList:x["a"],QItem:C["a"],QInput:w["a"],QCardActions:B["a"],QBtn:Q["a"]});var O=a("bf22"),j=a("1cd8"),E=a("232e"),P=a("9416"),$={name:"DeliveryBoyCompleted",components:{OrderNewFabDeliveryBoy:P["a"],DeliveryBoyPaymentCard:j["a"],BillGenerateCard:O["a"],TokenDetailDeliveryBoyExpansion:N},mixins:[r["a"]],data(){return{me:parseInt(this.$route.meta.me.id),bill_mode:!1,deliver_mode:!1,selected:null}},computed:{Tokens(){return _(this.tokens).filter(["type","Home Delivery"]).filter(L).map((e=>e.customer?e:Object.assign({},e,{customer:E["NoCustomer"]}))).value()},own(){return _.filter(this.Tokens,["user",this.me])},orphan(){return _.filter(this.Tokens,(({user:e})=>_.isNull(e)))},other(){return _.filter(this.Tokens,(({user:e})=>!_.isNull(e)&&e!==this.me))}},methods:{time:o["A"],popup_width:o["x"],np({customer:e}){return[e.name,e.phone].join(", ")},pa({customer:e}){return[e.phone,e.address].join("<br />")},wa({waiter:e,customer:t}){return[t.address,"(User: "+e.name+")"].join("<br />")},bill({id:e}){this.selected=e,this.bill_mode=!0},deliver({id:e}){this.selected=e,this.deliver_mode=!0}}};function L({items:e}){return e.length&&_.every(e,(({progress:e})=>_.includes(["Cancelled","Completed"],e)))}var A=$,S=a("9989"),G=a("24e8"),F=Object(u["a"])(A,i,n,!1,null,null,null);t["default"]=F.exports;T()(F,"components",{QPage:S["a"],QList:x["a"],QItemLabel:h["a"],QDialog:G["a"]})}}]);