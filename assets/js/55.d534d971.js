(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[55],{f572:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{directives:[{name:"scroll",rawName:"v-scroll",value:e.scrolled,expression:"scrolled"}],attrs:{padding:""}},[r("Masonry",{attrs:{width:"280",items:e.tokens},scopedSlots:e._u([{key:"item",fn:function(e){return[r("OrderSummaryReceptionistOrder",{attrs:{id:e.id}})]}}])}),r("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[r("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:!e.order&&(e.fab||e.tokens.length<6),expression:"!order && (fab || tokens.length < 6)"}],attrs:{position:"bottom-right",offset:e.offset}},[r("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add","active-icon":"add",color:"primary",glossy:""},on:{click:function(t){e.order=!0}}})],1)],1),r("q-dialog",{attrs:{persistent:""},model:{value:e.order,callback:function(t){e.order=t},expression:"order"}},[r("OrderNewBasic",{style:e.popup_width(),attrs:{after:"orders"}})],1)],1)},a=[],o=r("b1c1"),i=r("2f62"),n=r("3b1b"),c=r("c624"),d=r("3cdb"),l={name:"PageReceptionistOrders",components:{OrderNewBasic:d["a"],Masonry:c["a"],OrderSummaryReceptionistOrder:n["a"]},data(){return{fab:!0,timeout:0,offset:[24,24],progresses:["New","Processing"],order:!1}},computed:Object(i["d"])("tokens",{tokens({data:e}){return _(e).filter((({progress:e,type:t})=>"Remote"!==t&&this.progresses.includes(e))).value()}}),methods:{popup_width:o["x"],hKey({id:e}){Object(o["e"])("order","summary","order",e)},scrolled(e){this.fab=!0},move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]}},watch:{fab:{immediate:!0,handler:function(e){e&&(clearTimeout(this.timeout),this.timeout=setTimeout((e=>e.fab=!1),7500,this))}}}},u=l,m=r("2877"),p=r("9989"),f=r("de5e"),h=r("c294"),v=r("24e8"),b=r("4396"),w=r("75c3"),g=r("eebe"),y=r.n(g),k=Object(m["a"])(u,s,a,!1,null,null,null);t["default"]=k.exports;y()(k,"components",{QPage:p["a"],QPageSticky:f["a"],QFab:h["a"],QDialog:v["a"]}),y()(k,"directives",{Scroll:b["a"],TouchPan:w["a"]})}}]);