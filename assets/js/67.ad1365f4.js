(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[67],{c2e6:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{directives:[{name:"scroll",rawName:"v-scroll",value:e.scrolled,expression:"scrolled"}],staticClass:"q-gutter-y-sm",attrs:{padding:""}},[s("OrderWaiterSummary",{staticClass:"q-mt-md"}),s("OrderWaiterServable",{staticClass:"q-mt-md"}),s("OrderOngoingTables",{staticClass:"q-mt-md"}),s("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[s("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:e.fab,expression:"fab"}],attrs:{position:"bottom-right",offset:e.offset}},[s("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add",color:"primary",glossy:"",to:{name:"order_new"}}})],1)],1)],1)},r=[],i=(s("ddb0"),s("2b3d"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row q-col-gutter-xs"},e._l(e.d_status,(function(t,a){return s("div",{key:"order-waiter-summary-status-"+t,staticClass:"col-xs-6 col-sm-3"},[s("DigitMetric",{attrs:{value:e.orderOfStatus(t),title:t,bg:e.prop[a][0],text:"white",icon:e.prop[a][1]}})],1)})),0)}),n=[],o=s("84ba"),l={name:"OrderWaiterSummary",components:{DigitMetric:o["a"]},data(){return{d_status:["New","Processing","Completed","Billed"],prop:[["cyan","note_add"],["orange","published_with_changes"],["green","done"],["blue","done_outline"]]}},computed:{orders(){return this.$store.getters["tokens/today"]},total(){return _.size(this.orders)}},methods:{orderOfStatus(e){return _.sumBy(_.values(this.orders),(({progress:t})=>_.toSafeInteger(e===t)))}}},c=l,m=s("2877"),d=Object(m["a"])(c,i,n,!1,null,null,null),u=d.exports,g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-card",[s("q-card-section",{staticClass:"row justify-between text-bold bg-green text-white"},[s("div",[e._v("Order Items to Serve")]),e.servable.length>0?s("div",[e._v(e._s(e.servable.length))]):e._e()]),e.servable.length?s("q-list",{attrs:{separator:"",bordered:""}},e._l(e.servable,(function(t){return s("q-item",{key:"order-waiter-servable-item-"+t.id},[s("q-item-section",[s("q-item-label",[e._v(e._s(t.quantity)+" X "+e._s(e.itemName(t.item)))]),s("q-item-label",{attrs:{caption:""}},[e._v("Kitchen: "+e._s(e.kitchenName(t.kitchen)))]),s("q-item-label",{attrs:{caption:""}},[e._v("Seating: "+e._s(e.SeatingName(t.token)))])],1),s("q-item-section",{attrs:{side:""}},[s("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.itemTiming(t.progress_timing))+" ago")])],1),s("q-item-section",{attrs:{side:""}},[s("q-btn",{attrs:{icon:"how_to_reg",color:"positive",round:"",dense:""},on:{click:function(s){return e.served(t)}}})],1),e.serving.includes(t.id)?s("q-inner-loading",{attrs:{showing:!0}},[s("q-spinner-facebook",{attrs:{color:"primary",size:"2em"}})],1):e._e()],1)})),1):s("q-card-section",{staticClass:"text-center"},[e._v("NO ITEMS")])],1)},p=[],b=(s("5db7"),s("73d9"),s("b1c1")),h={name:"OrderWaiterServable",data(){return{d_status:["New","Processing","Completed","Billed","Cancelled"],serving:[]}},computed:{orders(){return this.$store.getters["tokens/today"]},items(){return _.flatMap(_.pick(this.$store.state.tokens.items,_.keys(this.orders)))},servable(){return _.filter(this.items,["progress","Completed"])}},methods:{itemName(e){return _.get(this.$store.state.items.data,[e,"name"])},kitchenName(e){return _.get(this.$store.state.kitchens.data,[e,"name"])},SeatingName(e){return _.get(this.$store.state.seating.data,[_.get(this.orders,[e,"seating"]),"name"])},since(e){let t=_.get(_.last(e),"time"),s=_.toInteger((new Date).getTime()/1e3);return s-t},itemTiming(e){let t=this.since(e);return t<60?t+" seconds":t<3600?_.toInteger(t/60)+" minutes":_.toInteger(t/3600)+" hours"},served({id:e}){this.serving.push(e),post("token","served",{id:e}).then((()=>this.serving=_.difference(this.serving,[e])))}},watch:{servable(e,t){(!t||e.length>t.length)&&Object(b["a"])()}}},v=h,f=s("f09f"),q=s("a370"),C=s("1c1c"),k=s("66e5"),x=s("4074"),y=s("0170"),w=s("9c40"),O=s("74f7"),S=s("e669"),Q=s("eebe"),I=s.n(Q),N=Object(m["a"])(v,g,p,!1,null,null,null),j=N.exports;I()(N,"components",{QCard:f["a"],QCardSection:q["a"],QList:C["a"],QItem:k["a"],QItemSection:x["a"],QItemLabel:y["a"],QBtn:w["a"],QInnerLoading:O["a"],QSpinnerFacebook:S["a"]});var P=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"text-h6 q-mb-sm q-ml-sm"},[e._v("Ongoing Seating")]),s("Masonry",{attrs:{items:e.tokens},scopedSlots:e._u([{key:"item",fn:function(t){return[s("div",{staticClass:"q-pa-xs col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1"},[s("q-card",{class:"bg-"+e.cColor[t.progress]},[s("q-card-section",{staticClass:"q-py-xs",class:"bg-"+e.cColor[t.progress]}),s("q-img",{attrs:{basic:"",src:e.media(t.seating.image)}},[s("div",{staticClass:"absolute-bottom text-subtitle2 text-center"},[s("div",{staticClass:"text-h6"},[e._v(e._s(t.seating.name))]),t.customer?s("div",{staticClass:"text-subtitle2"},[e._v(e._s(t.customer.name))]):e._e(),s("div",[s(e.spinners[t.progress],{tag:"component",attrs:{color:e.bColor[t.progress],size:"sm"}}),s("q-badge",{staticClass:"q-ml-xs q-py-xs",attrs:{color:e.bColor[t.progress],label:t.progress}}),s("q-badge",{staticClass:"q-ml-xs q-py-xs",attrs:{color:e.bColor[t.progress],label:t.id}})],1)])]),t.items.length?s("q-list",{attrs:{bordered:"",separator:""}},e._l(t.items,(function(a,r){return s("q-item",{key:e.hKey(t.id,r,a.id)},[s("q-item-section",[s("q-item-label",{staticClass:"text-bold"},[e._v(e._s(a.quantity)+" X "+e._s(a.name))]),a.kitchen?s("q-item-label",{attrs:{caption:""}},[s("q-icon",{attrs:{size:"xs",name:"outdoor_grill"}}),e._v(" "+e._s(a.kitchen))],1):e._e(),a.narration?s("q-item-label",{staticClass:"text-italic",attrs:{caption:""}},[e._v(e._s(a.narration))]):e._e()],1),s("q-item-section",{attrs:{side:""}},[s("q-badge",{staticClass:"q-py-xs",attrs:{color:"blue",label:a.progress}})],1)],1)})),1):e._e()],1)],1)]}}])})],1)},T=[],$=s("ded3"),M=s.n($),W=s("2f62"),B=s("232e"),L=s("43fa"),E=s("c624"),z={name:"OrderOngoingTables",components:{Masonry:E["a"],CardImageTitle:L["a"]},data(){return{cColor:{New:"red-2",Processing:"purple-2",Completed:"green-2"},bColor:B["TokenProgressColor"],spinners:{New:"q-spinner-ball",Processing:"q-spinner-rings",Completed:null}}},computed:M()({fProgress(){return _.keys(this.cColor)}},Object(W["d"])({items({items:{data:e}}){return _(e).mapValues("name").value()},kitchens({kitchens:{data:e}}){return _(e).mapValues("name").value()},tokens({tokens:{data:e,items:t},seating:s,customers:a}){return _(e).filter((({progress:e})=>this.fProgress.includes(e))).map((e=>Object.assign({},e,{items:this.iNameAttach(t[e.id])},{seating:_.get(s,["data",e.seating])},{customer:_.get(a,["data",e.customer])}))).value()}})),methods:{iNameAttach(e){return _(e).map((e=>Object.assign({},e,{name:_.get(this.items,[e.item]),kitchen:_.get(this.kitchens,[e.kitchen],null)}))).value()},hKey(e,t,s){return Object(b["d"])("order","ongoing","tables","order",e,"item","index",t,"item",s)},media(e){return Object(b["e"])(e)}}},D=z,K=s("068f"),A=s("58a8"),F=s("0016"),J=s("a403"),R=s("792f"),V=Object(m["a"])(D,P,T,!1,null,null,null),X=V.exports;I()(V,"components",{QCard:f["a"],QCardSection:q["a"],QImg:K["a"],QBadge:A["a"],QList:C["a"],QItem:k["a"],QItemSection:x["a"],QItemLabel:y["a"],QIcon:F["a"],QSpinnerBall:J["a"],QSpinnerRings:R["a"]});var U=s("1c16"),G={name:"PageWaiterIndex",components:{OrderOngoingTables:X,DigitMetric:o["a"],OrderWaiterServable:j,OrderWaiterSummary:u},data(){return{token:new URLSearchParams(document.location.search.substring(1)).get("token"),fab:!0,offset:[24,24]}},methods:{scrolled:Object(U["a"])((function(){this.fab=!1}),500,!0),move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]}},watch:{fab(e){e||(clearTimeout(this.timeout),this.timeout=setTimeout((e=>e.fab=!0),1500,this))}}},H=G,Y=s("9989"),Z=s("de5e"),ee=s("c294"),te=s("4396"),se=s("75c3"),ae=Object(m["a"])(H,a,r,!1,null,null,null);t["default"]=ae.exports,I()(ae,"components",{QPage:Y["a"],QPageSticky:Z["a"],QFab:ee["a"]}),I()(ae,"directives",{Scroll:te["a"],TouchPan:se["a"]})}}]);