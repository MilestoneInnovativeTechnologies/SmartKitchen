(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[57],{"458d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{directives:[{name:"scroll",rawName:"v-scroll",value:e.scrolled,expression:"scrolled"}],attrs:{padding:""}},[a("Masonry",{attrs:{width:"280",items:e.showing},scopedSlots:e._u([{key:"item",fn:function(e){return[a("OrderSummaryWaiterOrder",{attrs:{token:e}})]}}])}),a("Pagination",{attrs:{records:e.Tokens},model:{value:e.showing,callback:function(t){e.showing=t},expression:"showing"}}),a("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[a("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:e.fab||!e.Tokens.length,expression:"fab || !Tokens.length"}],attrs:{position:"bottom-right",offset:e.offset}},[a("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add",color:"primary",glossy:"",to:{name:"order_new",params:{seat:!0,user:e.$route.meta.me.id,type:"Dining"}}}})],1)],1)],1)},s=[],r=a("b1c1"),i=a("1c16"),o=a("c624"),l=a("1799"),d=a("58d1"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-card",[a("CardImageTitle",{attrs:{image:e.src,title:e.seat.name}}),a("q-card-actions",[a("q-badge",{staticClass:"q-py-sm q-px-sm",attrs:{label:e.token.id}}),a("q-badge",{staticClass:"q-py-sm q-ml-sm",attrs:{label:e.token.progress}}),a("q-space"),a("div",[e.can_generate_bill&&!e.bill?a("q-btn",{attrs:{icon:"receipt_long",color:"secondary",flat:"",padding:"0"},on:{click:function(t){e.bill_generate_mode=!0}}}):e._e(),e.can_make_payment&&e.can_pay?a("q-btn",{attrs:{icon:"payments",color:"green-10",flat:"",padding:"0"},on:{click:function(t){e.collect_payment_mode=!0}}}):e._e(),e.can_add?a("q-btn",{attrs:{icon:"add_box",color:"primary",flat:"",padding:"0"},on:{click:function(t){e.add_mode=!0}}}):e._e()],1)],1),a("OrderSummaryWaiterOrderItemsList",{attrs:{token:e.token}}),a("q-dialog",{attrs:{persistent:""},model:{value:e.bill_generate_mode,callback:function(t){e.bill_generate_mode=t},expression:"bill_generate_mode"}},[a("div",{style:e.popup_width()},[a("TokenBillGenerate",{attrs:{token:e.token,close:!0},on:{generated:function(t){e.bill_generate_mode=!1}}})],1)]),a("q-dialog",{attrs:{persistent:""},model:{value:e.collect_payment_mode,callback:function(t){e.collect_payment_mode=t},expression:"collect_payment_mode"}},[a("PaymentCollectCard",{style:e.popup_width(),attrs:{bill:e.token.bill},on:{paid:function(t){e.collect_payment_mode=!1}}})],1),"Billed"!==e.token.progress?a("q-dialog",{attrs:{persistent:""},model:{value:e.add_mode,callback:function(t){e.add_mode=t},expression:"add_mode"}},[a("OrderSummaryItemAdd",{staticStyle:{width:"700px","max-width":"90vw"},attrs:{token:e.token.id},on:{close:function(t){e.add_mode=!1}}})],1):e._e()],1)},m=[],p=a("a861"),u=a("e97b"),g=a("43fa"),b=a("ba49"),f=a("4092"),h={components:{PaymentCollectCard:f["a"],TokenBillGenerate:b["a"],CardImageTitle:g["a"],OrderSummaryItemAdd:u["a"],OrderSummaryWaiterOrderItemsList:p["a"]},data(){return{add_mode:!1,bill_generate_mode:!1,collect_payment_mode:!1}},props:["token"],name:"OrderSummaryWaiterOrder",computed:{seat(){return _.get(this.token,"seating")},src(){return Object(r["h"])(this.seat.image)},can_generate_bill(){return!1!==Object(r["A"])(settings("waiter_generate_bills"))},can_make_payment(){return!1!==Object(r["A"])(settings("waiter_make_payments"))},filter_progress(){return _.concat(!1!==Object(r["A"])(settings("waiter_generate_bills"))?["Completed"]:[],!1!==Object(r["A"])(settings("waiter_make_payments"))?["Pending","Partial"]:[])},bill(){return _.get(this.token,"bill")},can_pay(){return this.bill&&"Paid"!==_.get(this.bill,"progress")},can_add(){return!this.bill||(!0===Object(r["A"])(settings("enable_billed_dining_token_update"))||!1!==Object(r["A"])(settings("enable_billed_dining_token_update"))&&!0===Object(r["A"])(settings("enable_billed_token_update")))}},methods:{popup_width:r["x"]}},k=h,y=a("2877"),w=a("f09f"),v=a("4b7e"),O=a("58a8"),q=a("2c91"),x=a("9c40"),P=a("24e8"),j=a("eebe"),S=a.n(j),C=Object(y["a"])(k,c,m,!1,null,null,null),T=C.exports;S()(C,"components",{QCard:w["a"],QCardActions:v["a"],QBadge:O["a"],QSpace:q["a"],QBtn:x["a"],QDialog:P["a"]});var A={name:"PageDiningOrders",components:{OrderSummaryWaiterOrder:T,Pagination:l["a"],Masonry:o["a"]},mixins:[d["a"]],data(){return{fab:!0,timeout:0,offset:[24,24],showing:null,progress_includes:{Paid:["Pending","Partial"]}}},computed:{settings_progress(){let e=settings("keep_tokens_in_waiter_orders_until");return void 0!==e?e:settings("keep_tokens_in_waiter_orders_until")||"Billed"},progresses(){return _.concat(["New","Processing","Completed"],this.progress_includes[this.settings_progress])},Tokens(){return _(this.tokens).filter(this.mine).map((e=>Object.assign({},e,{bill:this.token_bill[e.id]}))).value()},me(){return _.get(this.$route,["meta","me","id"])},receptionists(){return _(this.$store.state.users.data).filter(["role","Receptionist"]).map((e=>_.toSafeInteger(e.id))).value()},allowable_users(){return _.concat(null,this.me,this.receptionists)}},methods:{mine({progress:e,type:t,user:a}){return"Dining"===t&&this.progresses.includes(e)&&_.includes(this.allowable_users,a)},hKey({id:e}){Object(r["e"])("order","summary","order",e)},scrolled:Object(i["a"])((function(){this.fab=!1}),500,!0),move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]}},watch:{fab:{immediate:!0,handler:function(e){e||(clearTimeout(this.timeout),this.timeout=setTimeout((e=>e.fab=!0),1500,this))}}}},Q=A,I=a("9989"),B=a("de5e"),W=a("c294"),$=a("4396"),D=a("75c3"),N=Object(y["a"])(Q,n,s,!1,null,null,null);t["default"]=N.exports;S()(N,"components",{QPage:I["a"],QPageSticky:B["a"],QFab:W["a"]}),S()(N,"directives",{Scroll:$["a"],TouchPan:D["a"]})}}]);