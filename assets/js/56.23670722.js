(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[56],{a6fa:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{staticClass:"q-gutter-y-md",attrs:{padding:""}},[s("FilterInputText",{attrs:{label:"Filter for orders"},on:{text:function(t){e.filter=t}}}),s("div",{directives:[{name:"show",rawName:"v-show",value:e.delivery_today_pending.length,expression:"delivery_today_pending.length"}]},[s("div",{staticClass:"text-h6 q-px-xs text-subtitle1"},[e._v("Today Deliverable Orders")]),s("RemoteTokensList",{attrs:{name:"dpo",tokens:e.delivery_today_pending,customers:e.customers,items:e.items,kitchens:e.kitchens,bills:e.token_bills}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:e.delivery_past_pending.length,expression:"delivery_past_pending.length"}]},[s("div",{staticClass:"text-h6 q-px-xs text-subtitle1"},[e._v("Pending Past Orders")]),s("RemoteTokensList",{attrs:{name:"dpp",tokens:e.delivery_past_pending,customers:e.customers,items:e.items,kitchens:e.kitchens,bills:e.token_bills}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:e.delivery_tomorrow.length,expression:"delivery_tomorrow.length"}]},[s("div",{staticClass:"text-h6 q-px-xs text-subtitle1"},[e._v("Tomorrow Deliverable Orders")]),s("RemoteTokensList",{attrs:{name:"tdo",tokens:e.delivery_tomorrow,customers:e.customers,items:e.items,kitchens:e.kitchens,bills:e.token_bills}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:e.delivery_upcoming.length,expression:"delivery_upcoming.length"}]},[s("div",{staticClass:"text-h6 q-px-xs text-subtitle1"},[e._v("Upcoming Orders")]),s("RemoteTokensList",{attrs:{name:"dup",tokens:e.delivery_upcoming,customers:e.customers,items:e.items,kitchens:e.kitchens,bills:e.token_bills}})],1),s("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[s("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:e.fab||!e.orders.length,expression:"fab || !orders.length"}],attrs:{position:"bottom-right",offset:e.offset}},[s("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:e.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add",color:"primary",glossy:"",to:{name:"orders_remote_new"}}})],1)],1)],1)},r=[],a=s("ded3"),n=s.n(a),o=s("2f62"),l=s("b1c1"),c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-list",{staticClass:"rounded-borders"},e._l(e.tokens,(function(t){return s("q-expansion-item",{key:e.hKey(e.name,t),attrs:{group:e.name,"switch-toggle-side":"",popup:""},scopedSlots:e._u([{key:"header",fn:function(){return[s("q-item-section",[t.customer?s("q-item-label",[e._v(e._s(e.customers[parseInt(t.customer)].name))]):e._e(),s("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.date_human))])],1),s("q-item-section",{attrs:{side:""}},[s("q-badge",{staticClass:"q-px-sm q-py-sm",attrs:{color:e.tpc[e.progress(t)],label:e.progress(t)}})],1)]},proxy:!0}],null,!0)},[s("q-card",{staticClass:"bg-grey-1"},[s("q-card-section",{staticClass:"q-py-xs"},[s("RemoteTokenItemsList",{attrs:{token:t,items:t.items,item_master:e.items,kitchen_master:e.kitchens,customer_master:e.customers,offline_facility:e.offline_facility}})],1)],1),s("RemoteTokenPayment",{attrs:{bill:e.bills[t.id]}})],1)})),1)},d=[],m=s("232e"),p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-list",{attrs:{separator:""}},[e._l(e.items,(function(t){return s("q-item",{key:e.hKey("roti",t)},[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{attrs:{square:""}},[s("img",{attrs:{src:e.image(e.item_master[t.item].image)}})])],1),s("q-item-section",[s("q-item-label",[e._v(e._s(t.quantity)+" x "+e._s(e.item_master[t.item].name))]),s("q-item-label",{attrs:{caption:""}},[e._v("Delivery On: "+e._s(t.deliver_human))]),t.kitchen?s("q-item-label",{attrs:{caption:""}},[e._v("Kitchen: "+e._s(e.kitchen_master[t.kitchen].name))]):e._e(),e.offline_facility?s("RemoteOrderOfflineViewItemLabel",{attrs:{token_item:t}}):e._e()],1),s("q-item-section",{attrs:{side:""}},[s("q-badge",{staticClass:"q-px-sm q-py-xs",attrs:{color:e.tipc[t.progress],label:t.progress}})],1),e.cancelable.includes(t.progress)?s("q-item-section",{attrs:{side:""}},[s("q-btn",{attrs:{icon:"close",color:"red",dense:"",round:"",size:"sm"},on:{click:function(s){return e.cancel(t,!1)}}})],1):e._e(),e.serve_able.includes(t.progress)?s("q-item-section",{attrs:{side:""}},[s("q-btn",{attrs:{icon:"how_to_reg",color:"positive",dense:"",round:"",size:"sm"},on:{click:function(s){return e.serve(t,!1)}}})],1):e._e()],1)})),s("q-dialog",{attrs:{value:!!e.confirm,persistent:""},on:{"before-hide":function(t){e.confirm=!1}}},[e.confirm?s("q-card",[s("q-card-section",{staticClass:"text-white",class:"bg-"+e.property[e.prop][0]},[s("div",{staticClass:"text-h6"},[e._v("Are you sure???")]),s("div",[e._v(e._s(e.property[e.prop][1]))])]),s("q-card-section",[s("q-list",{attrs:{dense:"",separator:""}},[s("q-item",{attrs:{clickable:""}},[s("q-item-section",[e._v("Customer")]),s("q-item-section",{staticClass:"text-bold text-red",attrs:{side:""}},[e._v(e._s(e.customer_master[e.confirm.customer].name))])],1),s("q-item",{attrs:{clickable:""}},[s("q-item-section",[e._v("Token ID")]),s("q-item-section",{staticClass:"text-bold text-red",attrs:{side:""}},[e._v(e._s(e.confirm.token))])],1),s("q-item",{attrs:{clickable:""}},[s("q-item-section",[e._v("Order Date")]),s("q-item-section",{staticClass:"text-bold text-red",attrs:{side:""}},[e._v(e._s(e.confirm.date_human))])],1),s("q-item",{attrs:{clickable:""}},[s("q-item-section",[e._v("Deliver Date")]),s("q-item-section",{staticClass:"text-bold text-red",attrs:{side:""}},[e._v(e._s(e.confirm.deliver))])],1),s("q-item",{attrs:{clickable:""}},[s("q-item-section",[e._v("Item Name")]),s("q-item-section",{staticClass:"text-bold text-red",attrs:{side:""}},[e._v(e._s(e.item_master[e.confirm.item].name))])],1),s("q-item",{attrs:{clickable:""}},[s("q-item-section",[e._v("Item Quantity")]),s("q-item-section",{staticClass:"text-bold text-red",attrs:{side:""}},[e._v(e._s(e.confirm.quantity)+" ")])],1)],1)],1),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Cancel",color:"primary"}}),s("q-btn",{staticClass:"q-px-md",attrs:{loading:e.loading,color:e.property[e.prop][0],label:"Yes, Proceed"},on:{click:function(t){"cancel"===e.prop?e.cancel(e.confirm,!0):e.serve(e.confirm,!0)}}})],1)],1):e._e()],1)],2)},u=[],f=(s("4d90"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-card",[s("q-bar",{staticClass:"text-grey-1",class:"bg-"+e.color+"-7"},[s("span",{staticClass:"text-caption"},[e._v("Offline Reference")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",dense:""}})],1),e.reference?[s("q-card-section",{staticClass:"q-pb-none row items-center q-col-gutter-xs"},[s("div",{staticClass:"col-12 text-h6 text-bold text-center q-mb-md",class:"text-"+e.color},[e._v(e._s(e.offline_reference))]),s("q-input",{staticClass:"col-12",attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Token Code",value:e.reference.token_date_code}}),s("q-input",{staticClass:"col-6",attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Location",value:e.reference.token_source_location}}),s("q-input",{staticClass:"col-6",attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"ID",value:e.reference.token_item_source_id}})],1),s("q-card-section",{staticClass:"q-gutter-y-xs q-py-xs"},[s("div",{staticClass:"row q-col-gutter-x-xs"},[s("q-input",{staticClass:"col-9",attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Item",value:e.item_details.name}}),s("q-input",{staticClass:"col-3",attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Quantity",value:e.token_item.quantity}})],1),s("q-input",{attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Delivery",value:e.token_item.deliver}}),s("q-input",{staticStyle:{height:"6rem"},attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Narration",value:e.token_item.narration,type:"textarea"}})],1),s("q-card-actions",{staticClass:"q-px-md q-pt-none",attrs:{align:"right"}},[s("q-btn",{attrs:{label:"download",color:e.color,glossy:"",padding:"sm xl"},on:{click:e.download}})],1)]:s("q-card-section",{staticClass:"text-h6 text-center "},[e._v("No Offline Reference")])],2)}),h=[],v=s("a357"),b={name:"OfflineReferenceCard",props:["id"],data(){return{color:"light-blue"}},computed:{token_item(){return this.$store.getters["tokens/item"](this.id)},item_details(){return _.get(this.$store.state.items.data,_.get(this.token_item,"item"))},remote_record(){return _.find(this.$store.state.remote.data,{item:"token_items",local_id:parseInt(this.id)})},offline_reference(){return _.get(this.remote_record,["extra","offline_reference"])},reference(){return this.id?this.$store.getters["remote/offline_reference"](this.id,{name:this.offline_reference}):null}},methods:{download(){Object(v["a"])(this.offline_reference+".JSON",JSON.stringify(this.reference),"application/json")}}},g=b,y=s("2877"),q=s("f09f"),k=s("d847"),x=s("2c91"),C=s("9c40"),w=s("a370"),O=s("27f9"),Q=s("4b7e"),R=s("7f67"),I=s("eebe"),j=s.n(I),T=Object(y["a"])(g,f,h,!1,null,null,null),P=T.exports;j()(T,"components",{QCard:q["a"],QBar:k["a"],QSpace:x["a"],QBtn:C["a"],QCardSection:w["a"],QInput:O["a"],QCardActions:Q["a"]}),j()(T,"directives",{ClosePopup:R["a"]});var S=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-item-label",{attrs:{caption:""}},[e.offline_ref?s("q-btn",{attrs:{label:e.offline_ref,size:"sm",padding:"none",color:"light-blue",flat:"",dense:""},on:{click:function(t){return e.readRef()}}}):s("q-btn",{attrs:{label:"Add Offline Reference",size:"sm",padding:"none",color:"light-blue",flat:"",dense:""},on:{click:function(t){return e.prepareRef()}}}),s("q-dialog",{attrs:{persistent:"",value:!!e.generated_offline_ref},on:{"before-hide":function(t){e.generated_offline_ref=null}}},[s("q-card",{staticStyle:{width:"22rem"}},[s("q-bar",{staticClass:"bg-teal text-white"},[s("span",{staticClass:"text-caption"},[e._v("Add Offline Reference")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1),s("q-card-section",{staticClass:"q-gutter-y-sm"},[s("q-input",{attrs:{outlined:"",label:"Reference"},model:{value:e.generated_offline_ref,callback:function(t){e.generated_offline_ref=t},expression:"generated_offline_ref"}})],1),s("q-card-actions",{staticClass:"q-px-md q-pt-none",attrs:{align:"right"}},[s("q-btn",{staticClass:"q-px-md",attrs:{color:"teal",push:"",label:"Add",loading:e.loading},on:{click:e.addRef}})],1)],1)],1),s("q-dialog",{attrs:{persistent:""},model:{value:e.view_ref,callback:function(t){e.view_ref=t},expression:"view_ref"}},[e.offline_ref?s("OfflineReferenceCard",{staticStyle:{width:"22rem"},attrs:{id:e.token_item.id}}):e._e()],1)],1)},L=[],N=s("adfa"),A={name:"RemoteOrderOfflineViewItemLabel",components:{OfflineReferenceCard:P},props:["token_item"],data(){return{loading:!1,view_ref:!1,generated_offline_ref:!1,preparing_kitchen:null}},computed:n()(n()({},Object(o["d"])("remote",{remote_data:"data"})),{},{store_remote_record(){return _.find(this.remote_data,{item:"token_items",local_id:this.token_item.id})},offline_ref(){return _.get(this.store_remote_record,["extra","offline_reference"])}}),methods:{prepareRef(){if(this.generated_offline_ref=N["BRANCH_CODE"]+"TI"+_.padStart(this.token_item.id,6,"0"),!this.preparing_kitchen){let e=this.$store.getters["remote/token_item_kitchen_item_reference_location"][this.token_item.id];this.preparing_kitchen=e?_.get(this.$store.getters["kitchens/map"],[_.get(_.find(this.remote_data,e),"local_id"),0],null):null}},readRef(){this.view_ref=!_.isEmpty(this.offline_ref)},addRef(){let e=_.get(this.store_remote_record,"id"),t=this.generated_offline_ref,s=this.preparing_kitchen;if(this.loading=!0,!e||!t||!s)return this.loading=!1;post("remote","offlineReference",{id:e,reference:t,kitchen:s}).then((()=>this.readRef(this.loading=this.generated_offline_ref=null)))}}},B=A,D=s("0170"),$=s("24e8"),E=Object(y["a"])(B,S,L,!1,null,null,null),K=E.exports;j()(E,"components",{QItemLabel:D["a"],QBtn:C["a"],QDialog:$["a"],QCard:q["a"],QBar:k["a"],QSpace:x["a"],QCardSection:w["a"],QInput:O["a"],QCardActions:Q["a"]}),j()(E,"directives",{ClosePopup:R["a"]});var Y={name:"RemoteTokenItemsList",components:{RemoteOrderOfflineViewItemLabel:K,ReadReferenceCard:P},props:["token","items","item_master","kitchen_master","customer_master","offline_facility"],data(){return{tipc:m["TokenItemProgressColor"],cancelable:["New","Accepted"],serve_able:["Completed"],confirm:!1,prop:"",loading:!1,property:{cancel:["red","You are about to cancel an item of remote order"],serve:["positive","You are about to serve an item of remote order"]},add_ref:!1,r_ref:"",r_ref_id:null,view_read_ref:!1}},computed:{ti_ids(){return _.map(this.items,(({id:e})=>parseInt(e)))},ti_kitchens(){return _(this.items).mapKeys((({id:e})=>parseInt(e))).mapValues((({item:e})=>_.findKey(this.$store.state.kitchens.items,(t=>_.find(t,["item",e]))))).mapValues(_.toInteger).value()}},methods:{hKey(e,{id:t}){return Object(l["e"])(e,t)},image(e){return Object(l["h"])(e)},cancel(e,t){if(this.prop="cancel",!t)return this.confirm=Object.assign({},this.token,e,{token:this.token.id});this.loading=!0;let s=this;post("token","cancel",{id:e.id}).then((()=>s.$store.commit("tokens/cancel_item",e.id))).then((()=>s.confirm=s.loading=!1)).catch()},serve(e,t){if(this.prop="serve",!t)return this.confirm=Object.assign({},this.token,e,{token:this.token.id});this.loading=!0;let s=this;post("token","served",{id:e.id}).then((()=>s.confirm=!1)).catch().then((()=>this.loading=!1))},remote(e){return _.find(this.$store.state.remote.data,{item:"token_items",local_id:parseInt(e)})},rRef({id:e}){this.r_ref=N["BRANCH_CODE"]+"TI"+_.padStart(e,6,"0"),this.r_ref_id=parseInt(e),this.add_ref=!0},addRef(){let e=_.get(this.remote(this.r_ref_id),"id"),t=this.r_ref,s=this.ti_kitchens[this.r_ref_id],i=this;if(this.loading=!0,!e||!t||!s)return this.loading=!1;post("remote","readReference",{id:e,reference:t,kitchen:s}).then((()=>i.add_ref=i.loading=!1))},readRef({id:e}){this.r_ref_id=parseInt(e),this.view_read_ref=!0}}},z=Y,F=s("1c1c"),V=s("66e5"),H=s("4074"),J=s("cb32"),M=s("58a8"),U=Object(y["a"])(z,p,u,!1,null,null,null),W=U.exports;j()(U,"components",{QList:F["a"],QItem:V["a"],QItemSection:H["a"],QAvatar:J["a"],QItemLabel:D["a"],QBadge:M["a"],QBtn:C["a"],QDialog:$["a"],QCard:q["a"],QCardSection:w["a"],QCardActions:Q["a"]}),j()(U,"directives",{ClosePopup:R["a"]});var G=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-card",[s("q-card-section",{attrs:{horizontal:""}},[s("q-card-section",{staticClass:"col"},[s("div",{staticClass:"flex justify-between items-center text-caption"},[s("div",[e._v("Bill Amount")]),s("div",[e._v(e._s(e.precision(e.amount)))])]),s("div",{staticClass:"flex justify-between items-center text-caption"},[s("div",[e._v("Discount")]),s("div",[e._v(e._s(e.precision(e.discount)))])]),s("div",{staticClass:"flex justify-between items-center text-caption text-bold text-primary"},[s("div",[e._v("Payable")]),s("div",[e._v(e._s(e.precision(e.payable)))])])]),s("q-card-section",{staticClass:"col"},[s("div",{staticClass:"flex justify-between items-center text-caption text-positive text-bold"},[s("div",[e._v("Total Paid")]),s("div",[e._v(e._s(e.precision(e.paid)))])]),s("div",{staticClass:"flex justify-between items-center text-warning text-bold"},[s("div",[e._v("Balance")]),s("div",[e._v(e._s(e.precision(e.balance)))])]),s("div",{staticClass:"flex justify-between items-center text-caption text-secondary"},[s("div",[e._v("Status")]),s("div",[e._v(e._s(e.bill.progress))])])])],1),s("q-list",{directives:[{name:"show",rawName:"v-show",value:"Paid"!==e.bill.progress,expression:"bill.progress !== 'Paid'"}],staticClass:"bg-grey-1",attrs:{bordered:""}},[s("q-item",[s("q-item-section",[s("q-select",{attrs:{outlined:"",options:e.options,label:"Type",dense:""},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}})],1),s("q-item-section",[s("q-input",{attrs:{outlined:"",type:"number",label:"Amount",dense:""},on:{keyup:e.amount_percent},model:{value:e.pay_amount,callback:function(t){e.pay_amount=e._n(t)},expression:"pay_amount"}})],1),s("q-item-section",[s("q-btn",{staticClass:"q-px-md",attrs:{label:"Add Payment",color:"positive",disabled:e.pay_amount<=0},on:{click:e.pay}})],1)],1)],1),s("q-inner-loading",{attrs:{showing:e.loading}},[s("q-spinner-facebook",{attrs:{color:"positive",size:"2em"}})],1)],1)},X=[],Z={name:"RemoteTokenPayment",props:["bill"],data(){return{options:m["PaymentsTypes"],type:m["PaymentsTypes"][0],loading:!1,pay_amount:0}},computed:n()(n()({},Object(o["d"])("payments",{payments:e=>_(e.data).filter({status:"Active"}).groupBy("bill").value()})),{},{amount(){return _.get(this.bill,"amount")},discount(){return _.get(this.bill,"discount")},payable(){return _.subtract(this.amount,this.discount)},paid(){return _.sumBy(_.get(this.payments,this.bill.id),(({amount:e})=>_.toNumber(e)))},balance(){return _.subtract(this.payable,this.paid)}}),methods:{precision:l["y"],amount_percent(e){Object(l["m"])(e.keyCode)&&(this.prv_per||_.includes(_.toString(this.amount),"."))&&setTimeout((()=>{this.$nextTick((()=>{this.amount=this.bill.payable*this.amount*.01,e.target.blur(),e.target.focus()}))}),250),this.prv_per=Object(l["m"])(e.keyCode)},pay(){if(this.loading=!0,0===this.amount)return alert("Enter paying amount.."+((this.loading=!1)||""));let e={bill:this.bill.id,amount:this.pay_amount,type:this.type};post("payment","create",e).then((()=>this.pay_amount=0)).catch().then((()=>this.loading=!1))}}},ee=Z,te=s("ddd8"),se=s("74f7"),ie=s("e669"),re=Object(y["a"])(ee,G,X,!1,null,null,null),ae=re.exports;j()(re,"components",{QCard:q["a"],QCardSection:w["a"],QList:F["a"],QItem:V["a"],QItemSection:H["a"],QSelect:te["a"],QInput:O["a"],QBtn:C["a"],QInnerLoading:se["a"],QSpinnerFacebook:ie["a"]});const{SK85W:ne}=s("adfa").FEATURES;var oe={name:"RemoteTokensList",components:{RemoteTokenPayment:ae,RemoteTokenItemsList:W},props:["name","tokens","customers","items","kitchens","bills"],data(){return{tpc:m["TokenProgressColor"],offline_facility:"Yes"===ne}},methods:{hKey(e,{id:t}){return Object(l["e"])(e,t)},progress({progress:e,items:t}){return"Processing"!==e?e:_.every(t,{progress:"Completed"})?"Completed":e}}},le=oe,ce=s("3b73"),de=Object(y["a"])(le,c,d,!1,null,null,null),me=de.exports;j()(de,"components",{QList:F["a"],QExpansionItem:ce["a"],QItemSection:H["a"],QItemLabel:D["a"],QBadge:M["a"],QCard:q["a"],QCardSection:w["a"]});var pe=s("5ab9"),_e={name:"PageRemoteOrders",components:{FilterInputText:pe["a"],RemoteTokensList:me},data(){return{fab:!0,offset:[24,24],filter:""}},computed:n()(n()(n()(n()({},Object(o["d"])({customers:e=>e.customers.data,items:e=>e.items.data,kitchens:e=>e.kitchens.data})),Object(o["d"])({token_bills:e=>_(e.bills.data).filter((({progress:e})=>"Cancelled"!==e)).keyBy((({token:e})=>_.toInteger(e))).value()})),Object(o["b"])({remote_orders:"tokens/remote",progresses:"bills/token_progresses"})),{},{orders(){return this.filter?_.filter(this.remote_orders,this.do_filter):this.remote_orders},delivery_today_pending(){return _.filter(this.orders,(({items:e,id:t})=>_.some(e,(({deliver:e})=>Object(l["n"])(e)))&&(!this.is_paid(t)||he(e))))},delivery_past_pending(){return _.filter(this.orders,(({items:e,id:t})=>_.some(e,(({deliver:e,progress:t})=>Object(l["l"])(e,8)))&&(!this.is_paid(t)||he(e))))},delivery_tomorrow(){return _.filter(this.orders,(({items:e,id:t})=>_.some(e,(({deliver:e,progress:t})=>Object(l["o"])(e)))&&(!this.is_paid(t)||he(e))))},delivery_upcoming(){return _(this.orders).filter((({items:e,id:t})=>_.some(e,(({deliver:e})=>Object(l["k"])(e,365)&&!Object(l["o"])(e)))&&(!this.is_paid(t)||he(e)))).sortBy(fe).value()}}),methods:{move(e){this.offset=[this.offset[0]-e.delta.x,this.offset[1]-e.delta.y]},is_paid(e){return"Paid"===_.get(this.progresses,e)},do_filter({customer:e,items:t}){return Object(l["q"])(_.get(this.customers,e),["name"],this.filter)||_.some(t,(({item:e})=>Object(l["q"])(_.get(this.items,e),["name"],this.filter)))}}};function ue({progress:e}){return["New","Processing","Accepted","Completed"].includes(e)}function fe({items:e}){return _(e).map((({deliver:e})=>Object(l["d"])(e,"YYYY-MM-DD HH:mm:ss").getTime())).min()}function he(e){return _.some(e,ue)}var ve=_e,be=s("9989"),ge=s("de5e"),ye=s("c294"),qe=s("75c3"),ke=Object(y["a"])(ve,i,r,!1,null,null,null);t["default"]=ke.exports;j()(ke,"components",{QPage:be["a"],QPageSticky:ge["a"],QFab:ye["a"]}),j()(ke,"directives",{TouchPan:qe["a"]})}}]);