(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[36],{"509f":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{directives:[{name:"scroll",rawName:"v-scroll",value:e.scrolled,expression:"scrolled"}],attrs:{padding:""}},[a("Masonry",{attrs:{width:"280",items:e.tokens},scopedSlots:e._u([{key:"item",fn:function(e){return[a("OrderSummaryWaiterItem",{attrs:{id:e.id}})]}}])}),a("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[a("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:e.fab||!e.tokens.length,expression:"fab || !tokens.length"}],attrs:{position:"bottom-right",offset:e.offset}},[a("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add",color:"primary",glossy:"",to:{name:"order_new"}}})],1)],1)],1)},s=[],o=a("ded3"),n=a.n(o),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-card",[a("CardImageTitle",{attrs:{image:e.src,title:e.seat.name}}),a("q-card-actions",[a("q-badge",{staticClass:"q-py-sm q-px-sm",attrs:{label:e.token.id}}),a("q-badge",{staticClass:"q-py-sm q-ml-sm",attrs:{label:e.token.progress}}),a("q-space"),"Billed"!==e.token.progress?a("q-btn",{attrs:{icon:"add_box",color:"primary",flat:"",padding:"0"},on:{click:function(t){e.add_mode=!0}}}):e._e()],1),a("OrderSummaryWaiterOrderItemsList",{attrs:{order:e.id}}),"Billed"!==e.token.progress?a("q-dialog",{attrs:{persistent:""},model:{value:e.add_mode,callback:function(t){e.add_mode=t},expression:"add_mode"}},[a("OrderSummaryItemAdd",{staticStyle:{width:"700px","max-width":"90vw"},attrs:{token:e.id},on:{close:function(t){e.add_mode=!1}}})],1):e._e()],1)},d=[],c=a("a861"),m=a("e97b"),l=a("43fa"),u=a("b1c1"),p={components:{CardImageTitle:l["a"],OrderSummaryItemAdd:m["a"],OrderSummaryWaiterOrderItemsList:c["a"]},data(){return{add_mode:!1}},props:["id"],name:"OrderSummaryWaiterOrder",computed:{token(){return _.get(this.$store.state.tokens.data,_.toSafeInteger(this.id))},seat(){return _.get(this.$store.state.seating.data,_.toSafeInteger(this.token.seating))},src(){return Object(u["e"])(this.seat.image)}}},f=p,g=a("2877"),h=a("f09f"),b=a("4b7e"),v=a("58a8"),y=a("2c91"),k=a("9c40"),w=a("24e8"),O=a("eebe"),q=a.n(O),S=Object(g["a"])(f,i,d,!1,null,null,null),x=S.exports;q()(S,"components",{QCard:h["a"],QCardActions:b["a"],QBadge:v["a"],QSpace:y["a"],QBtn:k["a"],QDialog:w["a"]});var I=a("2f62"),Q=a("1c16"),C=a("c624"),j={name:"PageOrders",components:{Masonry:C["a"],OrderSummaryWaiterItem:x},data(){return{fab:!0,timeout:0,offset:[24,24],progresses:["New","Processing","Completed"]}},computed:n()({},Object(I["d"])("tokens",{tokens({data:e}){return _(e).filter((({progress:e})=>this.progresses.includes(e))).value()}})),methods:{hKey({id:e}){Object(u["d"])("order","summary","order",e)},scrolled:Object(Q["a"])((function(){this.fab=!1}),500,!0),move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]}},watch:{fab:{immediate:!0,handler:function(e){e||(clearTimeout(this.timeout),this.timeout=setTimeout((e=>e.fab=!0),1500,this))}}}},P=j,T=a("9989"),W=a("de5e"),B=a("c294"),N=a("4396"),$=a("75c3"),A=Object(g["a"])(P,r,s,!1,null,null,null);t["default"]=A.exports,q()(A,"components",{QPage:T["a"],QPageSticky:W["a"],QFab:B["a"]}),q()(A,"directives",{Scroll:N["a"],TouchPan:$["a"]})}}]);