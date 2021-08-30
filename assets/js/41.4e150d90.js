(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[41],{ef79:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("q-list",[a("q-item-label",{staticClass:"text-h6",attrs:{header:""}},[t._v("Own")]),t.own.length?t._e():a("q-item-label",{staticClass:"q-pl-lg",attrs:{caption:""}},[t._v("No Own Tokens")]),t._l(t.own,(function(e){return a("TokenDetailDeliveryBoyExpansion",{key:"dbc-own-"+e.id,attrs:{token:e,group:"own",color:"positive",popup:"",label:e.customer.name,caption:t.time(e.date)},on:{deliver:function(a){return t.deliver(e)},bill:function(a){return t.bill(e)}}})})),a("q-item-label",{staticClass:"text-h6",attrs:{header:""}},[t._v("Orphan")]),t.orphan.length?t._e():a("q-item-label",{staticClass:"q-pl-lg",attrs:{caption:""}},[t._v("No Orphan Tokens")]),t._l(t.orphan,(function(e){return a("TokenDetailDeliveryBoyExpansion",{key:"dbc-own-"+e.id,attrs:{token:e,group:"orphan",color:"accent",popup:"",label:e.customer.name,caption:t.pa(e)},on:{deliver:function(a){return t.deliver(e)},bill:function(a){return t.bill(e)}}})})),a("q-item-label",{staticClass:"text-h6",attrs:{header:""}},[t._v("Other")]),t.other.length?t._e():a("q-item-label",{staticClass:"q-pl-lg",attrs:{caption:""}},[t._v("No Others Tokens")]),t._l(t.other,(function(e){return a("TokenDetailDeliveryBoyExpansion",{key:"dbc-own-"+e.id,attrs:{token:e,group:"other",color:"secondary",popup:"",label:t.np(e),caption:t.wa(e)},on:{deliver:function(a){return t.deliver(e)},bill:function(a){return t.bill(e)}}})}))],2),a("q-dialog",{attrs:{persistent:""},on:{"before-hide":function(e){t.bill_mode=!1}},model:{value:t.bill_mode,callback:function(e){t.bill_mode=e},expression:"bill_mode"}},[t.selected?a("BillGenerateCard",{staticStyle:{width:"360px","max-width":"90vw"},attrs:{token:t.selected},on:{generated:function(e){t.bill_mode=!1}}}):t._e()],1),a("q-dialog",{attrs:{persistent:""},on:{"before-hide":function(e){t.deliver_mode=!1}},model:{value:t.deliver_mode,callback:function(e){t.deliver_mode=e},expression:"deliver_mode"}},[t.selected?a("DeliveryBoyPaymentCard",{staticStyle:{width:"360px","max-width":"90vw"},attrs:{token:t.selected},on:{paid:function(e){t.deliver_mode=!1}}}):t._e()],1),a("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[a("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:t.fab||!t.Tokens.length,expression:"fab || !Tokens.length"}],attrs:{position:"bottom-right",offset:t.offset}},[a("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:t.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"add",color:"primary",glossy:"",to:{name:"delivery_boy_order_new"}}})],1)],1)],1)},s=[],n=a("3758"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-expansion-item",t._b({scopedSlots:t._u([{key:"header",fn:function(){return[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:""}},[a("q-img",{attrs:{src:t.image(t.token.customer.image)}})],1)],1),a("q-item-section",[a("q-item-label",{class:"text-"+t.clr},[t._v(t._s(t.label))]),a("q-item-label",{attrs:{caption:""},domProps:{innerHTML:t._s(t.caption)}}),t.Bill?a("q-item-label",{staticClass:"text-red",attrs:{caption:""}},[a("q-icon",{attrs:{name:"done_all",size:"sm"}}),t._v(" Billed")],1):t._e()],1),a("q-item-section",{attrs:{side:""}},[a("q-badge",{staticClass:"q-py-xs q-px-sm",attrs:{outline:"",color:t.clr,label:t.precision(t.total)}})],1)]},proxy:!0}])},"q-expansion-item",t.$attrs,!1),[a("q-card",[a("q-card-section",[a("q-card-section",{staticClass:"q-pa-none row items-center justify-between q-col-gutter-xs"},[a("q-badge",{staticClass:"q-pa-sm",attrs:{label:t.token.date_human,outline:"","text-color":t.clr}}),a("q-badge",{staticClass:"q-pa-sm",attrs:{label:t.items.length+" Items",outline:"","text-color":t.clr}}),a("q-badge",{staticClass:"q-pa-sm",attrs:{label:t.quantities+" Quantities",outline:"","text-color":t.clr}})],1),t.token.narration?a("div",{staticClass:"q-py-sm",class:"text-"+t.clr,domProps:{textContent:t._s(t.token.narration)}}):t._e()],1),a("q-list",{attrs:{bordered:"",separator:""}},t._l(t.items,(function(e){return a("q-item",{key:"dbe-t"+t.token.id+"-ti-"+e.id+"-i-"+e.item.id},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:""}},[a("q-img",{attrs:{src:t.image(e.item.image)}})],1)],1),a("q-item-section",[a("q-item-label",{staticClass:"text-bold",class:"text-"+t.clr},[t._v(t._s(e.quantity)+"x "+t._s(e.item.name))]),e.narration?a("q-item-label",{staticClass:"text-red",attrs:{caption:""}},[t._v(t._s(e.narration))]):t._e(),a("q-item-label",{attrs:{caption:""}},[t._v("Rate: "+t._s(t.precision(e.price)))]),e.kitchen?a("q-item-label",{attrs:{caption:""}},[t._v("Kitchen: "+t._s(e.kitchen.name))]):t._e()],1),a("q-item-section",{staticClass:"text-bold",class:"text-"+t.clr,attrs:{side:""}},[t._v(t._s(t.precision(e.price*e.quantity)))])],1)})),1),t.token.customer.id?a("q-card-section",{staticClass:"q-gutter-y-xs bg-grey-1"},[a("q-input",{attrs:{label:"Customer Phone",value:t.token.customer.phone,outlined:"",dense:"",color:t.clr}}),a("q-input",{attrs:{label:"Customer Address",type:"textarea",value:t.token.customer.address,readonly:"",outlined:"",dense:"",autogrow:""}})],1):t._e(),a("q-card-actions",{staticClass:"row items-center justify-between q-px-md"},[t.Bill?a("div",[a("q-btn",{attrs:{flat:"",padding:"none",color:"positive",icon:"done_all",label:"Billed: "+t.Bill.payable}}),a("div",{staticClass:"q-pl-sm q-ml-lg",staticStyle:{"line-height":"0.75rem"}},[t._v(t._s(t.Bill.user.name))])],1):a("q-btn",{attrs:{label:"Generate Bill",color:"red",padding:"xs md"},on:{click:function(e){return t.$emit("bill")}}}),t.Bill?a("q-btn",{attrs:{label:"Delivered",color:"positive",padding:"xs md"},on:{click:function(e){return t.$emit("deliver")}}}):t._e()],1)],1)],1)},o=[],r=a("b1c1"),c=a("58d1"),d={name:"TokenDetailDeliveryBoyExpansion",props:["label","caption","token","color"],mixins:[c["a"]],computed:{clr(){return this.color||"primary"},items(){return _.get(this.token,"items")},quantities(){return _.sumBy(this.items,(({quantity:t})=>_.toNumber(t)))},total(){return _.sumBy(this.items,(({quantity:t,price:e})=>_.toNumber(t)*_.toNumber(e)))},Bill(){return _.find(this.bills,(t=>parseInt(_.get(t,["token","id"]))===parseInt(this.token.id)))}},methods:{precision:r["u"],image:r["g"]}},m=d,u=a("2877"),p=a("3b73"),b=a("4074"),v=a("cb32"),h=a("068f"),q=a("0170"),g=a("0016"),k=a("58a8"),x=a("f09f"),y=a("a370"),f=a("1c1c"),C=a("66e5"),w=a("27f9"),Q=a("4b7e"),B=a("9c40"),I=a("eebe"),T=a.n(I),D=Object(u["a"])(m,l,o,!1,null,null,null),N=D.exports;T()(D,"components",{QExpansionItem:p["a"],QItemSection:b["a"],QAvatar:v["a"],QImg:h["a"],QItemLabel:q["a"],QIcon:g["a"],QBadge:k["a"],QCard:x["a"],QCardSection:y["a"],QList:f["a"],QItem:C["a"],QInput:w["a"],QCardActions:Q["a"],QBtn:B["a"]});var S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",[a("q-bar",{staticClass:"bg-accent text-white"},[a("q-icon",{staticClass:"q-mr-md",attrs:{name:"receipt_long"}}),t._v("Generate Bill"),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",rounded:"",flat:"",dense:""}})],1),a("q-card-section",{staticClass:"row q-col-gutter-sm"},[a("q-input",{staticClass:"col-4",attrs:{readonly:"",outlined:"",dense:"",value:t.Token.id,label:"Token ID"}}),a("q-input",{staticClass:"col-8",attrs:{readonly:"",outlined:"",dense:"",value:t.Token.date_human,label:"Date"}})],1),a("q-list",{attrs:{dense:"",separator:""}},[t._l(t.Token.items,(function(e){return a("q-item",{key:"db-gk-t-"+t.token+"-ti-"+e.id+"-i-"+e.id},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:""}},[a("q-img",{attrs:{src:t.image(e.item.image)}})],1)],1),a("q-item-section",[a("q-item-label",[t._v(t._s(e.quantity)+"x "+t._s(e.item.name))]),a("q-item-label",{attrs:{caption:""}},[t._v("Rate: "+t._s(e.price))])],1),a("q-item-section",{attrs:{side:""}},[t._v(t._s(t.precision(e.price*e.quantity)))])],1)})),a("q-item",{staticClass:"text-bold text-subtitle1"},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:"",icon:"functions"}})],1),a("q-item-section",[a("q-item-label",[t._v("Total")])],1),a("q-item-section",{attrs:{side:""}},[t._v(t._s(t.precision(t.total)))])],1)],2),a("q-card-section",{staticClass:"row q-col-gutter-xs"},[a("div",{staticClass:"col-12"},[a("OrderCustomer",{attrs:{get:"id"},model:{value:t.customer,callback:function(e){t.customer=e},expression:"customer"}})],1),a("div",{staticClass:"col-7"},[a("q-select",{attrs:{label:"Tax",dense:"",options:t.tax_natures,outlined:""},model:{value:t.tax,callback:function(e){t.tax=e},expression:"tax"}})],1),a("div",{staticClass:"col-5"},[a("q-input",{staticClass:"col-5",attrs:{outlined:"",dense:"",type:"number",label:"Discount"},model:{value:t.discount,callback:function(e){t.discount=t._n(e)},expression:"discount"}})],1)]),a("q-card-section",{staticClass:"row items-center justify-around q-px-md"},[a("div",{staticClass:"text-center"},[a("q-item-label",{staticClass:"text-weight-bolder",staticStyle:{"font-size":"1.5rem","line-height":"1rem !important"}},[t._v(t._s(t.precision(t.total-t.discount)))]),a("q-item-label",{staticClass:"text-capitalize",attrs:{caption:""}},[t._v("Payable")])],1),a("div",[a("q-btn",{attrs:{label:"Generate Bill",color:"accent",padding:"xs md",dense:"",loading:t.loading},on:{click:t.generate}})],1)])],1)},P=[],O=(a("e6cf"),a("a79d"),a("9708")),$={name:"BillGenerateCard",components:{OrderCustomer:O["a"]},props:["token"],mixins:[n["a"],c["a"]],data(){return{tax:null,discount:0,customer:null,loading:!1}},computed:{Token(){return _.find(this.tokens,["id",parseInt(this.token)])},Bill(){return _.find(this.bills,(t=>parseInt(_.get(t,["token","id"]))===parseInt(this.token)))},total(){return _.sumBy(this.Token.items,(({price:t,quantity:e})=>_.toNumber(t)*_.toNumber(e)))},tax_natures(){return this.$store.getters["tax/natures"]}},methods:{image:r["g"],precision:r["u"],generate(){if(this.loading=!0,!this.token||!this.customer)return this.loading=!1;let t={token:this.token,customer:this.customer,discount:this.discount,nature:this.tax};post("bill","create",t).then((()=>this.$store.dispatch("server/ping",null,{root:!0}))).catch().finally(this.generated)},generated(){this.loading=!1,this.$emit("generated")}},watch:{"Token.customer":{immediate:!0,handler(t){this.customer=_.get(t,"id")}}}},j=$,E=a("d847"),L=a("2c91"),A=a("ddd8"),G=a("7f67"),z=Object(u["a"])(j,S,P,!1,null,null,null),R=z.exports;T()(z,"components",{QCard:x["a"],QBar:E["a"],QIcon:g["a"],QSpace:L["a"],QBtn:B["a"],QCardSection:y["a"],QInput:w["a"],QList:f["a"],QItem:C["a"],QItemSection:b["a"],QAvatar:v["a"],QImg:h["a"],QItemLabel:q["a"],QSelect:A["a"]}),T()(z,"directives",{ClosePopup:G["a"]});var H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",[a("q-bar",{staticClass:"bg-accent text-white"},[a("q-icon",{staticClass:"q-mr-md",attrs:{name:"receipt_long"}}),t._v("Delivery Payment"),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",rounded:"",flat:"",dense:""}})],1),a("q-card-section",{staticClass:"row q-col-gutter-sm"},[a("q-input",{staticClass:"col-4",attrs:{readonly:"",outlined:"",dense:"",value:t.Token.id,label:"Token ID"}}),a("q-input",{staticClass:"col-8",attrs:{readonly:"",outlined:"",dense:"",value:t.Token.date_human,label:"Token Date"}}),a("q-input",{staticClass:"col-4",attrs:{readonly:"",outlined:"",dense:"",value:t.Bill.id,label:"Bill ID"}}),a("q-input",{staticClass:"col-8",attrs:{readonly:"",outlined:"",dense:"",value:t.human_date2(t.Bill.date)+" "+t.time(t.Bill.date),label:"Bill Date"}})],1),a("q-list",{attrs:{dense:"",separator:""}},t._l(t.Token.items,(function(e){return a("q-item",{key:"db-gk-t-"+t.token+"-ti-"+e.id+"-i-"+e.id},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:""}},[a("q-img",{attrs:{src:t.image(e.item.image)}})],1)],1),a("q-item-section",[a("q-item-label",[t._v(t._s(e.quantity)+"x "+t._s(e.item.name))]),a("q-item-label",{attrs:{caption:""}},[t._v("Rate: "+t._s(e.price))])],1),a("q-item-section",{attrs:{side:""}},[t._v(t._s(t.precision(e.price*e.quantity)))])],1)})),1),a("q-card-section",{staticClass:"q-py-none bg-grey-2"},[a("q-card-section",{staticClass:"row"},[a("div",{staticClass:"col-2"},[t._v(" ")]),a("div",{staticClass:"col-6 text-bold text-subtitle2"},[t._v("Sub Total")]),a("div",{staticClass:"col-4 text-bold text-subtitle2 text-right"},[t._v(t._s(t.precision(t.Bill.amount)))]),a("div",{staticClass:"col-2"},[t._v(" ")]),a("div",{staticClass:"col-6 text-bold text-subtitle2"},[t._v("Discount")]),a("div",{staticClass:"col-4 text-bold text-subtitle2 text-right"},[t._v(t._s(t.precision(t.Bill.discount)))]),a("div",{staticClass:"col-2"},[t._v(" ")]),a("div",{staticClass:"col-6 text-bold text-subtitle1"},[t._v("Payable")]),a("div",{staticClass:"col-4 text-bold text-subtitle1 text-right"},[t._v(t._s(t.precision(t.Bill.payable)))])])],1),a("q-card-actions",{staticClass:"row items-center q-col-gutter-x-sm q-px-md"},[a("q-input",{staticClass:"col-grow",attrs:{type:"number",dense:"",outlined:"",label:"Amount"},model:{value:t.amount,callback:function(e){t.amount=t._n(e)},expression:"amount"}}),a("div",[a("q-btn",{attrs:{color:"positive",label:"Pay",loading:t.loading},on:{click:t.deliver}})],1)],1)],1)},J=[],F={name:"DeliveryBoyPaymentCard",props:["token"],mixins:[n["a"],c["a"]],data(){return{loading:!1,amount:0}},computed:{Token(){return _.find(this.tokens,["id",parseInt(this.token)])},Bill(){return _.find(this.bills,(t=>parseInt(_.get(t,["token","id"]))===parseInt(this.token)))},total(){return _.sumBy(this.Token.items,(({price:t,quantity:e})=>_.toNumber(t)*_.toNumber(e)))},token_item_ids(){return _.map(this.Token.items,"id")}},methods:{human_date2:r["f"],time:r["w"],image:r["g"],precision:r["u"],deliver(){if(this.loading=!0,!this.token||!this.amount||_.isEmpty(this.token_item_ids))return this.loading=!1;post("token","served",{id:this.token_item_ids}).then().catch().then(this.pay)},pay(){let t={bill:_.get(this.Bill,"id"),amount:this.amount,type:"Cash"};post("payment","create",t).then().catch().then(this.paid)},paid(){this.loading=!1,this.$emit("paid")}},watch:{Bill:{immediate:!0,deep:!0,handler({payable:t}){this.amount=t}}}},K=F,M=Object(u["a"])(K,H,J,!1,null,null,null),U=M.exports;T()(M,"components",{QCard:x["a"],QBar:E["a"],QIcon:g["a"],QSpace:L["a"],QBtn:B["a"],QCardSection:y["a"],QInput:w["a"],QList:f["a"],QItem:C["a"],QItemSection:b["a"],QAvatar:v["a"],QImg:h["a"],QItemLabel:q["a"],QCardActions:Q["a"]}),T()(M,"directives",{ClosePopup:G["a"]});var V=a("232e"),W={name:"DeliveryBoyCompleted",components:{DeliveryBoyPaymentCard:U,BillGenerateCard:R,TokenDetailDeliveryBoyExpansion:N},mixins:[n["a"]],data(){return{me:parseInt(this.$route.meta.me.id),bill_mode:!1,deliver_mode:!1,selected:null,fab:!0,offset:[24,24]}},computed:{Tokens(){return _(this.tokens).filter(["type","Home Delivery"]).filter(X).map((t=>t.customer?t:Object.assign({},t,{customer:V["NoCustomer"]}))).value()},own(){return _.filter(this.Tokens,["user",this.me])},orphan(){return _.filter(this.Tokens,(({user:t})=>_.isNull(t)))},other(){return _.filter(this.Tokens,(({user:t})=>!_.isNull(t)&&t!==this.me))}},methods:{time:r["w"],np({customer:t}){return[t.name,t.phone].join(", ")},pa({customer:t}){return[t.phone,t.address].join("<br />")},wa({waiter:t,customer:e}){return[e.address,"(User: "+t.name+")"].join("<br />")},move(t){this.offset=[this.offset[0]-t.delta.x,this.offset[1]-t.delta.y]},bill({id:t}){this.selected=t,this.bill_mode=!0},deliver({id:t}){this.selected=t,this.deliver_mode=!0}}};function X({items:t}){return t.length&&_.every(t,(({progress:t})=>_.includes(["Cancelled","Completed"],t)))}var Y=W,Z=a("9989"),tt=a("24e8"),et=a("de5e"),at=a("c294"),it=a("75c3"),st=Object(u["a"])(Y,i,s,!1,null,null,null);e["default"]=st.exports;T()(st,"components",{QPage:Z["a"],QList:f["a"],QItemLabel:q["a"],QDialog:tt["a"],QPageSticky:et["a"],QFab:at["a"]}),T()(st,"directives",{TouchPan:it["a"]})}}]);