(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[39],{f572:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{directives:[{name:"scroll",rawName:"v-scroll",value:e.scrolled,expression:"scrolled"}],attrs:{padding:""}},[s("Masonry",{attrs:{width:"300",items:e.tokens},scopedSlots:e._u([{key:"item",fn:function(e){return[s("OrderSummaryReceptionistOrder",{attrs:{id:e.id}})]}}])}),s("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:e.fab||Object.keys(e.tokens).length<6,expression:"fab || Object.keys(tokens).length < 6"}],attrs:{position:"bottom-right",offset:e.offset}},[s("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add",color:"primary",glossy:"",to:{name:"receptionist_order_new"}}})],1)],1)},r=[],a=s("b1c1"),i=s("2f62"),n=s("3b1b"),c=s("c624"),d={name:"PageReceptionistOrders",components:{Masonry:c["a"],OrderSummaryReceptionistOrder:n["a"]},data(){return{fab:!0,timeout:0,offset:[24,24],progresses:["New","Processing"]}},computed:Object(i["d"])("tokens",{tokens({data:e}){return _(e).filter((({progress:e})=>this.progresses.includes(e))).mapKeys("id").value()}}),methods:{hKey({id:e}){Object(a["d"])("order","summary","order",e)},scrolled(e){this.fab=!0},move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]}},watch:{fab:{immediate:!0,handler:function(e){e&&(clearTimeout(this.timeout),this.timeout=setTimeout((e=>e.fab=!1),7500,this))}}}},m=d,l=s("2877"),u=s("9989"),f=s("de5e"),p=s("c294"),h=s("4396"),b=s("75c3"),v=s("eebe"),w=s.n(v),y=Object(l["a"])(m,o,r,!1,null,null,null);t["default"]=y.exports,w()(y,"components",{QPage:u["a"],QPageSticky:f["a"],QFab:p["a"]}),w()(y,"directives",{Scroll:h["a"],TouchPan:b["a"]})}}]);