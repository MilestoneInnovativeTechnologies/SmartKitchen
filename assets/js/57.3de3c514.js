(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[57],{"458d":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{directives:[{name:"scroll",rawName:"v-scroll",value:e.scrolled,expression:"scrolled"}],attrs:{padding:""}},[a("Masonry",{attrs:{width:"280",items:e.showing},scopedSlots:e._u([{key:"item",fn:function(e){return[a("OrderSummaryWaiterOrder",{attrs:{token:e}})]}}])}),a("Pagination",{attrs:{records:e.Tokens},model:{value:e.showing,callback:function(t){e.showing=t},expression:"showing"}}),a("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[a("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:e.fab||!e.Tokens.length,expression:"fab || !Tokens.length"}],attrs:{position:"bottom-right",offset:e.offset}},[a("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add",color:"primary",glossy:"",to:{name:"order_new",params:{seat:!0,user:e.$route.meta.me.id,type:"Dining"}}}})],1)],1)],1)},r=[],n=a("b1c1"),o=a("1c16"),i=a("c624"),d=a("1799"),l=a("58d1"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-card",[a("CardImageTitle",{attrs:{image:e.src,title:e.seat.name}}),a("q-card-actions",[a("q-badge",{staticClass:"q-py-sm q-px-sm",attrs:{label:e.token.id}}),a("q-badge",{staticClass:"q-py-sm q-ml-sm",attrs:{label:e.token.progress}}),a("q-space"),"Billed"!==e.token.progress?a("q-btn",{attrs:{icon:"add_box",color:"primary",flat:"",padding:"0"},on:{click:function(t){e.add_mode=!0}}}):e._e()],1),a("OrderSummaryWaiterOrderItemsList",{attrs:{token:e.token}}),"Billed"!==e.token.progress?a("q-dialog",{attrs:{persistent:""},model:{value:e.add_mode,callback:function(t){e.add_mode=t},expression:"add_mode"}},[a("OrderSummaryItemAdd",{staticStyle:{width:"700px","max-width":"90vw"},attrs:{token:e.token.id},on:{close:function(t){e.add_mode=!1}}})],1):e._e()],1)},c=[],u=a("a861"),p=a("e97b"),f=a("43fa"),g={components:{CardImageTitle:f["a"],OrderSummaryItemAdd:p["a"],OrderSummaryWaiterOrderItemsList:u["a"]},data(){return{add_mode:!1}},props:["token"],name:"OrderSummaryWaiterOrder",computed:{seat(){return _.get(this.token,"seating")},src(){return Object(n["h"])(this.seat.image)}}},h=g,b=a("2877"),v=a("f09f"),w=a("4b7e"),k=a("58a8"),y=a("2c91"),O=a("9c40"),q=a("24e8"),x=a("eebe"),S=a.n(x),Q=Object(b["a"])(h,m,c,!1,null,null,null),T=Q.exports;S()(Q,"components",{QCard:v["a"],QCardActions:w["a"],QBadge:k["a"],QSpace:y["a"],QBtn:O["a"],QDialog:q["a"]});var I={name:"PageDiningOrders",components:{OrderSummaryWaiterOrder:T,Pagination:d["a"],Masonry:i["a"]},mixins:[l["a"]],data(){return{fab:!0,timeout:0,offset:[24,24],progresses:["New","Processing","Completed"],showing:null}},computed:{Tokens(){return _.filter(this.tokens,this.mine)},me(){return _.get(this.$route,["meta","me","id"])},receptionists(){return _(this.$store.state.users.data).filter(["role","Receptionist"]).map((e=>_.toSafeInteger(e.id))).value()},allowable_users(){return _.concat(null,this.me,this.receptionists)}},methods:{mine({progress:e,type:t,user:a}){return"Dining"===t&&this.progresses.includes(e)&&_.includes(this.allowable_users,a)},hKey({id:e}){Object(n["e"])("order","summary","order",e)},scrolled:Object(o["a"])((function(){this.fab=!1}),500,!0),move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]}},watch:{fab:{immediate:!0,handler:function(e){e||(clearTimeout(this.timeout),this.timeout=setTimeout((e=>e.fab=!0),1500,this))}}}},C=I,P=a("9989"),j=a("de5e"),W=a("c294"),$=a("4396"),B=a("75c3"),D=Object(b["a"])(C,s,r,!1,null,null,null);t["default"]=D.exports;S()(D,"components",{QPage:P["a"],QPageSticky:j["a"],QFab:W["a"]}),S()(D,"directives",{Scroll:$["a"],TouchPan:B["a"]})}}]);