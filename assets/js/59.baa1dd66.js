(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[59],{f572:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{directives:[{name:"scroll",rawName:"v-scroll",value:e.scrolled,expression:"scrolled"}],attrs:{padding:""}},[s("BillFilter",{staticClass:"q-mb-sm",attrs:{tokens:e.active_tokens},model:{value:e.Tokens,callback:function(t){e.Tokens=t},expression:"Tokens"}}),s("Masonry",{attrs:{width:"280",items:e.showing},scopedSlots:e._u([{key:"item",fn:function(t){return[s("OrderSummaryReceptionistOrder",{attrs:{token:t},on:{action:e.OSA_action}})]}}])}),s("OrderSummaryActionPopups",e._b({on:{done:e.OSA_action_done}},"OrderSummaryActionPopups",e.OSA_CB,!1)),s("Pagination",{attrs:{records:e.Tokens},model:{value:e.showing,callback:function(t){e.showing=t},expression:"showing"}}),s("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[s("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:!e.order&&(e.fab||e.tokens.length<6),expression:"!order && (fab || tokens.length < 6)"}],attrs:{position:"bottom-right",offset:e.offset}},[s("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add","active-icon":"add",color:"primary",glossy:""},on:{click:function(t){e.order=!0}}})],1)],1),s("q-dialog",{attrs:{persistent:""},model:{value:e.order,callback:function(t){e.order=t},expression:"order"}},[s("OrderNewBasic",{style:e.popup_width(),attrs:{after:"orders"}})],1)],1)},r=[],a=s("b1c1"),i=s("3b1b"),n=s("c624"),c=s("3cdb"),l=s("c0e8"),d=s("1799"),p=s("58d1"),u=s("c9df"),m=s("3f08"),f={name:"PageReceptionistOrders",components:{OrderSummaryActionPopups:u["a"],Pagination:d["a"],BillFilter:l["a"],OrderNewBasic:c["a"],Masonry:n["a"],OrderSummaryReceptionistOrder:i["a"]},mixins:[p["a"],m["a"]],data(){return{fab:!0,timeout:0,offset:[24,24],progress_includes:{Completed:[],Billed:["Completed"],Paid:["Completed","Pending","Partial"]},order:!1,Tokens:null,showing:[]}},computed:{settings_progress(){return settings("keep_tokens_in_orders_until")||"Completed"},progresses(){return _.concat(["New","Processing"],this.progress_includes[this.settings_progress])},active_tokens(){return _(this.tokens).filter((e=>"Remote"!==e.type&&this.progresses.includes(e.progress))).map((e=>Object.assign({},e,{bill:this.token_bill[e.id]}))).value()}},methods:{popup_width:a["x"],hKey({id:e}){Object(a["e"])("order","summary","order",e)},scrolled(e){this.fab=!0},move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]}},watch:{fab:{immediate:!0,handler:function(e){e&&(clearTimeout(this.timeout),this.timeout=setTimeout((e=>e.fab=!1),7500,this))}}}},h=f,g=s("2877"),v=s("9989"),b=s("de5e"),k=s("c294"),w=s("24e8"),y=s("4396"),O=s("75c3"),P=s("eebe"),S=s.n(P),x=Object(g["a"])(h,o,r,!1,null,null,null);t["default"]=x.exports;S()(x,"components",{QPage:v["a"],QPageSticky:b["a"],QFab:k["a"],QDialog:w["a"]}),S()(x,"directives",{Scroll:y["a"],TouchPan:O["a"]})}}]);