(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[62],{bc77:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{attrs:{padding:""}},[t.quick?[s("QuickOrder",{ref:"quick_order",attrs:{items:t.params.items,price_list:t.params.price_list},on:{item:t.addItem,done:function(e){t.payment_mode=!0}}})]:[s("FilterInputText",{staticClass:"q-mb-xs",on:{text:function(e){t.item_filter=e}}}),s("GroupItemsSelect",{attrs:{selected:t.group,filter:t.item_filter,price_list:t.params.price_list,type:"Sale",item_quantities:t.item_quantities},on:{item:t.addItem,quantity:t.setQuantity}}),s("GroupStickyButton",{attrs:{type:t.params.type},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}}),s("q-page-sticky",{attrs:{position:"bottom-right",offset:t.offset}},[s("transition",{attrs:{appear:"","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut"}},[s("q-fab",{directives:[{name:"show",rawName:"v-show",value:!t.payment_mode,expression:"!payment_mode"},{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:t.move,expression:"move",modifiers:{prevent:!0,mouse:!0}}],staticClass:"flip-horizontal",attrs:{icon:"reply_all","active-icon":"reply_all",color:"indigo",glossy:""},on:{click:function(e){t.payment_mode=!0}}})],1)],1)],t.price_list?t._e():s("q-dialog",{attrs:{value:!t.price_list,persistent:""},on:{hide:function(e){return t.CFL()}}},[s("q-card",{style:t.popup_width()},[s("q-bar",{staticClass:"text-white bg-info q-py-lg items-center"},[s("q-icon",{attrs:{name:"receipt",color:"white",left:""}}),s("span",[t._v("Select Price List")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"clear",flat:"",round:"",color:"white"}})],1),s("q-card-section",[s("PriceListSelectDropDown",{attrs:{outlined:"",dense:"","input-debounce":"0",label:"Select Price List",get:"id",clearable:""},model:{value:t.price_list,callback:function(e){t.price_list=e},expression:"price_list"}})],1)],1)],1),s("q-dialog",{attrs:{persistent:""},on:{show:t.calculateTotal},model:{value:t.payment_mode,callback:function(e){t.payment_mode=e},expression:"payment_mode"}},[s("q-card",{style:t.popup_width()},[s("q-bar",{staticClass:"bg-secondary text-white q-py-lg"},[s("q-icon",{attrs:{name:"account_balance"}}),s("div",[t._v("Customer & Payments Details")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"}},[s("q-tooltip",[t._v("Close")])],1)],1),s("q-card-section",{staticClass:"q-pa-none"},[s("q-list",{staticStyle:{"font-size":"0.75rem"},attrs:{dense:"",separator:"",bordered:""}},[s("q-item",[s("q-item-section",{attrs:{avatar:""}},[t._v("No")]),s("q-item-section",[t._v("Item")]),s("q-item-section",{attrs:{side:""}},[t._v("Total")]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{name:"clear",color:"white",size:"xs"}})],1)],1),t._l(t.params.items,(function(e,a){return s("q-item",{key:t.hKey(e)},[s("q-item-section",{attrs:{avatar:""}},[t._v(t._s(a+1))]),s("q-item-section",[s("q-item-label",{staticStyle:{"font-size":"0.65rem"},attrs:{caption:""}},[t._v(t._s(parseFloat(t.price[e.item]).toFixed(2)))]),s("q-item-label",[t._v("\n                "+t._s(e.quantity)+" x "+t._s(t.items_data[e.item].name)+"\n                "),s("q-popup-edit",{attrs:{title:t.items_data[e.item].name,"auto-save":""},model:{value:t.params.items[a].quantity,callback:function(e){t.$set(t.params.items[a],"quantity",e)},expression:"params.items[idx].quantity"}},[s("q-input",{attrs:{type:"number",dense:"",outlined:"",autofocus:"",label:"Quantity"},model:{value:t.params.items[a].quantity,callback:function(e){t.$set(t.params.items[a],"quantity",t._n(e))},expression:"params.items[idx].quantity"}})],1)],1)],1),s("q-item-section",{attrs:{side:""}},[t._v(t._s(parseFloat(t.price[e.item]*e.quantity).toFixed(2)))]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{name:"clear",color:"negative",size:"xs"},on:{click:function(e){return t.removeItem(a)}}})],1)],1)})),s("q-item",{staticClass:"text-white",attrs:{dense:""}},[s("q-item-section",{attrs:{avatar:""}},[t._v("0")]),s("q-item-section",[s("q-item-label",{staticClass:"text-white"},[t._v("Total")])],1),s("q-item-section",{staticClass:"text-secondary text-bold",attrs:{side:""}},[t._v(t._s(parseFloat(t.total).toFixed(2)))]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{name:"attach_money",color:"secondary",size:"xs"}})],1)],1),s("q-item",{directives:[{name:"show",rawName:"v-show",value:t.params.discount,expression:"params.discount"}],staticClass:"text-white no-border",attrs:{dense:""}},[s("q-item-section",{attrs:{avatar:""}},[t._v("0")]),s("q-item-section",[s("q-item-label",{staticClass:"text-secondary"},[t._v("Discount")])],1),s("q-item-section",{staticClass:"text-secondary",attrs:{side:""}},[t._v(t._s(parseFloat(t.params.discount).toFixed(2)))]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{name:"local_offer",color:"secondary",size:"xs"}})],1)],1),s("q-item",{staticClass:"text-white",attrs:{dense:""}},[s("q-item-section",{attrs:{avatar:""}},[t._v("0")]),s("q-item-section",[s("q-item-label",{staticClass:"text-secondary text-bold"},[t._v("Payable")])],1),s("q-item-section",{staticClass:"text-secondary text-bold",staticStyle:{"font-size":"1rem"},attrs:{side:""}},[t._v(t._s(parseFloat(t.total-t.params.discount).toFixed(2)))]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{size:"xs"}})],1)],1)],2)],1),s("q-card-section",{staticClass:"row q-col-gutter-xs"},[s("div",{staticClass:"col-7"},[s("OrderCustomer",{attrs:{get:"id",outlined:"",dense:""},model:{value:t.params.customer,callback:function(e){t.$set(t.params,"customer",e)},expression:"params.customer"}})],1),s("div",{staticClass:"col-5"},[s("TaxNatureSelectDropDown",{attrs:{label:"Tax Nature",outlined:"",dense:""},model:{value:t.params.nature,callback:function(e){t.$set(t.params,"nature",e)},expression:"params.nature"}})],1),s("div",{staticClass:"col-3"},[s("PaymentTypeSelectDropDown",{attrs:{outlined:"",dense:""},model:{value:t.params.advance_type,callback:function(e){t.$set(t.params,"advance_type",e)},expression:"params.advance_type"}})],1),s("div",{staticClass:"col-4"},[s("q-input",{attrs:{type:"number",outlined:"",dense:"",label:"Discount"},on:{keyup:t.discount_percent},model:{value:t.params.discount,callback:function(e){t.$set(t.params,"discount",t._n(e))},expression:"params.discount"}})],1),s("div",{staticClass:"col-5"},[s("q-input",{attrs:{type:"number",outlined:"",dense:"",label:"Amount"},model:{value:t.params.advance_amount,callback:function(e){t.$set(t.params,"advance_amount",t._n(e))},expression:"params.advance_amount"}})],1)]),s("q-card-actions",{staticClass:"q-px-md bg-grey-2",attrs:{align:"right"}},[s("q-btn",{staticClass:"full-width",attrs:{glossy:"",push:"",label:"Complete",disable:t.params.items.length<1,loading:t.processing,color:"secondary",padding:"sm lg"},on:{click:t.complete}})],1)],1)],1),s("q-dialog",{attrs:{value:t.m_show,persistent:""}},[s("MenuSelect",{style:t.popup_width(),attrs:{type:t.params.type}})],1)],2)},i=[],r=(s("a434"),s("ded3")),o=s.n(r),n=s("5ab9"),c=s("2f62"),l=s("b1c1"),m=s("9061"),p=s("9708"),u=s("2943"),d=s("9afe"),h=s("232e"),q=s("40f6"),v=s("47ac"),y=s("4064"),f=s("514b"),b=s("fdfe"),g={name:"PageSale",components:{MenuSelect:b["a"],QuickOrder:y["a"],GroupItemsSelect:v["a"],GroupStickyButton:q["a"],PaymentTypeSelectDropDown:d["a"],TaxNatureSelectDropDown:u["a"],OrderCustomer:p["a"],PriceListSelectDropDown:m["a"],FilterInputText:n["a"]},mixins:[f["a"]],data(){return{group:0,item_filter:"",fab:!0,offset:[12,12],payment_mode:!1,processing:!1,default_customer:null,params:{type:"Sale",price_list:null,items:[],customer:null,nature:null,discount:0,advance_type:h["PaymentsTypes"][0],advance_amount:0}}},computed:o()(o()(o()({},Object(c["b"])({prices:"prices/items"})),Object(c["d"])({items_data:({items:t})=>t.data,m_show:t=>!_.get(t.public,"sale_menu",[]).length})),{},{price_list:{get(){if(!_.has(this.$store.state.public,"sale_price_list")){let t=_.get(this.$store.getters["prices/sale"],"id");t&&this.$store.commit("public",{sale_price_list:t})}return _.get(this.$store.state.public,"sale_price_list",void 0)},set(t){this.$store.commit("public",{sale_price_list:t})}},price(){return _.get(this.prices,_.toInteger(this.params.price_list))},item_quantities(){return _(this.params.items).mapKeys("item").mapValues((t=>_.toNumber(t.quantity))).value()},total(){return _(this.params.items).map((({item:t,quantity:e})=>e*this.price[t])).sum()}}),methods:{popup_width:l["x"],hKey({item:t}){return Object(l["e"])(t)},CFL(){this.price_list?this.params.price_list=this.price_list:this.$router.push("/")},move(t){this.offset=[this.offset[0]-t.delta.x,this.offset[1]-t.delta.y]},addItem({id:t}){let e=_.findIndex(this.params.items,["item",parseInt(t)]);-1===e&&(e=this.params.items.push({item:t,quantity:0})-1),this.params.items[e].quantity++,this.quick||this.$q.notify(`${this.params.items.length} x Items <br>${_.sumBy(this.params.items,"quantity")} x Quantities`)},setQuantity({item:t,quantity:e}){t=_.toSafeInteger(t),e=_.toNumber(e);let s=_.findIndex(this.params.items,["item",t]);if(s<0)return this.addItem({id:t});this.params.items[s].quantity=e,e<1&&setTimeout(((t,e)=>t.removeItem(e)),2e3,this,s)},calculateTotal(){this.params.advance_amount=this.total-this.params.discount,this.params.items.length||(this.params.discount=0)},removeItem(t){this.params.items.splice(t,1)},complete(){if(!this.params.customer)return alert("Choose Customer");this.processing=!0,post("token","create",this.params).then(this.serve)},serve({id:t}){setTimeout((function(e){let s=_.map(e.$store.state.tokens.items[parseInt(t)],"id");s.length?post("token","served",{id:s}).then(e.completed):e.completed()}),750,this)},completed(){this.payment_mode=!1,this.params.items.splice(0,this.params.items.length),this.processing=!1,this.params.customer=this.default_customer,_.has(this,["$refs","quick_order","$data","code"])&&(this.$refs["quick_order"].$data.code=0)},moveFab(t){this.draggingFab=!0!==t.isFirst&&!0!==t.isFinal,this.fabPos=[this.fabPos[0]-t.delta.x,this.fabPos[1]-t.delta.y]},discount_percent(t){Object(l["m"])(t.keyCode)&&(this.prv_per||_.includes(_.toString(this.params.discount),"."))&&setTimeout((()=>{this.$nextTick((()=>{this.params.discount=this.params.discount*this.total*.01,t.target.blur(),t.target.focus()}))}),250),this.prv_per=Object(l["m"])(t.keyCode)}},watch:{"params.items":{deep:!0,handler:"calculateTotal"},"params.discount":{handler:"calculateTotal"},price_list:{immediate:!0,handler(t){t&&(this.params.price_list=parseInt(t))}}},created(){this.$q.notify.setDefaults({position:"top-right",timeout:2e3,color:"positive",group:"items",html:!0,caption:"Items Updated !!"}),this.default_customer=this.params.customer=_.get(settings("default_customer",this.params.type),"id")}},x=g,w=s("2877"),C=s("9989"),k=s("de5e"),I=s("c294"),S=s("24e8"),Q=s("f09f"),$=s("d847"),T=s("0016"),F=s("2c91"),P=s("9c40"),D=s("a370"),z=s("05c0"),N=s("1c1c"),O=s("66e5"),L=s("4074"),j=s("0170"),B=s("42a1"),G=s("27f9"),K=s("4b7e"),A=s("75c3"),E=s("7f67"),J=s("eebe"),M=s.n(J),U=Object(w["a"])(x,a,i,!1,null,null,null);e["default"]=U.exports;M()(U,"components",{QPage:C["a"],QPageSticky:k["a"],QFab:I["a"],QDialog:S["a"],QCard:Q["a"],QBar:$["a"],QIcon:T["a"],QSpace:F["a"],QBtn:P["a"],QCardSection:D["a"],QTooltip:z["a"],QList:N["a"],QItem:O["a"],QItemSection:L["a"],QItemLabel:j["a"],QPopupEdit:B["a"],QInput:G["a"],QCardActions:K["a"]}),M()(U,"directives",{TouchPan:A["a"],ClosePopup:E["a"]})}}]);