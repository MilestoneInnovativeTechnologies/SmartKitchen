(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[55],{bc77:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[a("MenuGroupScroll",{model:{value:t.group,callback:function(e){t.group=e},expression:"group"}}),a("div",{staticClass:"row q-col-gutter-x-xs"},[a("div",{staticClass:"col-xs-4 col-sm-6 col-md-7"},[a("FilterInputText",{on:{text:function(e){t.filter=e}}})],1),a("div",{staticClass:"col-xs-4 col-sm-4 col-md-4"},[a("PriceListSelectDropDown",{staticClass:"bg-grey-4",attrs:{outlined:"",dense:"","input-debounce":"0",label:"Select Price List",get:"id"},model:{value:t.params.price_list,callback:function(e){t.$set(t.params,"price_list",e)},expression:"params.price_list"}})],1),a("div",{staticClass:"col-xs-4 col-sm-2 col-md-1"},[a("q-input",{attrs:{outlined:"",dense:"",label:"Total",disable:"",value:parseFloat(t.total).toFixed(2)}})],1)]),a("Masonry",{staticStyle:{overflow:"hidden"},attrs:{items:t.items,width:100},scopedSlots:t._u([{key:"item",fn:function(e){return[a("ItemSelectCard",{attrs:{id:e.item,price_list:1},on:{selected:t.addItem}})]}}])}),a("q-page-sticky",{directives:[{name:"show",rawName:"v-show",value:!t.payment_mode,expression:"!payment_mode"}],attrs:{position:"bottom-right",offset:t.fabPos}},[a("q-fab",{directives:[{name:"touch-pan",rawName:"v-touch-pan.prevent.mouse",value:t.moveFab,expression:"moveFab",modifiers:{prevent:!0,mouse:!0}}],attrs:{icon:"keyboard_arrow_right","active-icon":"keyboard_arrow_right",square:"",glossy:"","label-position":"left",push:"",label:"Proceed",color:"secondary",disable:t.draggingFab},on:{click:function(e){t.payment_mode=!t.payment_mode}}})],1),a("q-dialog",{attrs:{persistent:""},on:{show:t.calculateTotal},model:{value:t.payment_mode,callback:function(e){t.payment_mode=e},expression:"payment_mode"}},[a("q-card",[a("q-bar",{staticClass:"bg-secondary text-white q-py-lg"},[a("q-icon",{attrs:{name:"account_balance"}}),a("div",[t._v("Customer & Payments Details")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"}},[a("q-tooltip",[t._v("Close")])],1)],1),a("q-card-section",{staticClass:"q-pa-none"},[a("q-list",{staticStyle:{"font-size":"0.75rem"},attrs:{dense:"",separator:"",bordered:""}},[a("q-item",[a("q-item-section",{attrs:{avatar:""}},[t._v("No")]),a("q-item-section",[t._v("Item")]),a("q-item-section",{attrs:{side:""}},[t._v("Total")]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"clear",color:"white",size:"xs"}})],1)],1),t._l(t.params.items,(function(e,s){return a("q-item",{key:t.hKey(e)},[a("q-item-section",{attrs:{avatar:""}},[t._v(t._s(s+1))]),a("q-item-section",[a("q-item-label",{staticStyle:{"font-size":"0.65rem"},attrs:{caption:""}},[t._v(t._s(parseFloat(t.price[e.item]).toFixed(2)))]),a("q-item-label",[t._v("\n                "+t._s(e.quantity)+" x "+t._s(t.items_data[e.item].name)+"\n                "),a("q-popup-edit",{attrs:{title:t.items_data[e.item].name,"auto-save":""},model:{value:t.params.items[s].quantity,callback:function(e){t.$set(t.params.items[s],"quantity",e)},expression:"params.items[idx].quantity"}},[a("q-input",{attrs:{type:"number",dense:"",outlined:"",autofocus:"",label:"Quantity"},model:{value:t.params.items[s].quantity,callback:function(e){t.$set(t.params.items[s],"quantity",t._n(e))},expression:"params.items[idx].quantity"}})],1)],1)],1),a("q-item-section",{attrs:{side:""}},[t._v(t._s(parseFloat(t.price[e.item]*e.quantity).toFixed(2)))]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"clear",color:"negative",size:"xs"},on:{click:function(e){return t.removeItem(s)}}})],1)],1)})),a("q-item",{staticClass:"text-white",attrs:{dense:""}},[a("q-item-section",{attrs:{avatar:""}},[t._v("0")]),a("q-item-section",[a("q-item-label",{staticClass:"text-white"},[t._v("Total")])],1),a("q-item-section",{staticClass:"text-secondary text-bold",attrs:{side:""}},[t._v(t._s(parseFloat(t.total).toFixed(2)))]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"attach_money",color:"secondary",size:"xs"}})],1)],1),a("q-item",{directives:[{name:"show",rawName:"v-show",value:t.params.discount,expression:"params.discount"}],staticClass:"text-white no-border",attrs:{dense:""}},[a("q-item-section",{attrs:{avatar:""}},[t._v("0")]),a("q-item-section",[a("q-item-label",{staticClass:"text-secondary"},[t._v("Discount")])],1),a("q-item-section",{staticClass:"text-secondary",attrs:{side:""}},[t._v(t._s(parseFloat(t.params.discount).toFixed(2)))]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"local_offer",color:"secondary",size:"xs"}})],1)],1),a("q-item",{staticClass:"text-white",attrs:{dense:""}},[a("q-item-section",{attrs:{avatar:""}},[t._v("0")]),a("q-item-section",[a("q-item-label",{staticClass:"text-secondary text-bold"},[t._v("Payable")])],1),a("q-item-section",{staticClass:"text-secondary text-bold",staticStyle:{"font-size":"1rem"},attrs:{side:""}},[t._v(t._s(parseFloat(t.total-t.params.discount).toFixed(2)))]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{size:"xs"}})],1)],1)],2)],1),a("q-card-section",{staticClass:"row q-col-gutter-xs"},[a("div",{staticClass:"col-7"},[a("OrderCustomer",{attrs:{get:"id",outlined:"",dense:""},model:{value:t.params.customer,callback:function(e){t.$set(t.params,"customer",e)},expression:"params.customer"}})],1),a("div",{staticClass:"col-5"},[a("TaxNatureSelectDropDown",{attrs:{label:"Tax Nature",outlined:"",dense:""},model:{value:t.params.nature,callback:function(e){t.$set(t.params,"nature",e)},expression:"params.nature"}})],1),a("div",{staticClass:"col-3"},[a("PaymentTypeSelectDropDown",{attrs:{outlined:"",dense:""},model:{value:t.params.advance_type,callback:function(e){t.$set(t.params,"advance_type",e)},expression:"params.advance_type"}})],1),a("div",{staticClass:"col-4"},[a("q-input",{attrs:{type:"number",outlined:"",dense:"",label:"Discount"},model:{value:t.params.discount,callback:function(e){t.$set(t.params,"discount",t._n(e))},expression:"params.discount"}})],1),a("div",{staticClass:"col-5"},[a("q-input",{attrs:{type:"number",outlined:"",dense:"",label:"Amount"},model:{value:t.params.advance_amount,callback:function(e){t.$set(t.params,"advance_amount",t._n(e))},expression:"params.advance_amount"}})],1)]),a("q-card-actions",{staticClass:"q-px-md q-pt-none",attrs:{align:"right"}},[a("q-btn",{staticClass:"full-width",attrs:{glossy:"",push:"",label:"Complete",disable:t.params.items.length<1,loading:t.processing,color:"secondary",padding:"sm lg"},on:{click:t.complete}})],1)],1)],1)],1)},i=[],o=(a("5db7"),a("a434"),a("73d9"),a("ded3")),r=a.n(o),n=a("2b38"),l=a("5ab9"),c=a("2f62"),m=a("b1c1"),p=a("c624"),d=a("7a7c"),u=a("9061"),h=a("9708"),v=a("2943"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-select",t._b({attrs:{options:t.options,value:t.optValue,label:"Payment Type"},on:{input:t.doEmit}},"q-select",t.$attrs,!1))},q=[],y=a("2071"),g=a("232e"),f={name:"PaymentTypeSelectDropDown",mixins:[y["a"]],computed:{options(){return g["PaymentsTypes"]}}},x=f,C=a("2877"),k=a("ddd8"),w=a("eebe"),P=a.n(w),S=Object(C["a"])(x,b,q,!1,null,null,null),F=S.exports;P()(S,"components",{QSelect:k["a"]});var I={name:"PageSale",components:{PaymentTypeSelectDropDown:F,TaxNatureSelectDropDown:v["a"],OrderCustomer:h["a"],PriceListSelectDropDown:u["a"],ItemSelectCard:d["a"],Masonry:p["a"],FilterInputText:l["a"],MenuGroupScroll:n["a"]},data(){return{group:null,filter:"",fabPos:[18,18],draggingFab:!1,payment_mode:!1,processing:!1,params:{type:"Sale",price_list:null,items:[],customer:null,nature:null,discount:0,advance_type:g["PaymentsTypes"][0],advance_amount:0}}},computed:r()(r()(r()(r()({},Object(c["b"])({kis_map:"kitchens/map",prices:"prices/items",sales_price_list:"prices/sales"})),Object(c["d"])({items_data:({items:t})=>t.data,kis:({kitchens:t})=>t.items,tokens:({tokens:t})=>_(t.items).flatMap().filter(["progress","Completed"]).groupBy((({token:t})=>_.toInteger(t))).value()})),Object(c["d"])({remote_kis:({remote:t})=>_(t.data).filter(["item","kitchen_items"]).map((({local_id:t})=>_.toInteger(t))).value()})),{},{remote_items(){return _(this.remote_kis).map((t=>_.get(this.kis,_.get(this.kis_map,t),{}).item)).value()},items(){return _(_.get(this.group,"items")).difference(this.remote_items).filter((t=>Object(m["o"])(_.get(this.items_data,t),["id","name","detail"],this.filter))).value()},price(){return _.get(this.prices,_.toInteger(this.params.price_list))},total(){return _(this.params.items).map((({item:t,quantity:e})=>e*this.price[t])).sum()}}),methods:{hKey({item:t}){return Object(m["d"])(t)},addItem({id:t}){let e=_.findIndex(this.params.items,["item",parseInt(t)]);-1===e&&(e=this.params.items.push({item:t,quantity:0})-1),this.params.items[e].quantity++,this.$q.notify(`${this.params.items.length} x Items <br>${_.sumBy(this.params.items,"quantity")} x Quantities`)},setPriceList(){this.params.price_list?this.$store.commit("public",{sales_price_list:this.params.price_list}):this.params.price_list=this.$store.state.public.sales_price_list||_.get(this.sales_price_list,"id",null)||_.get(_.find(this.$store.state.prices.list,["status","Active"]),"id")},moveFab(t){this.draggingFab=!0!==t.isFirst&&!0!==t.isFinal,this.fabPos=[this.fabPos[0]-t.delta.x,this.fabPos[1]-t.delta.y]},calculateTotal(){this.params.advance_amount=this.total-this.params.discount,this.params.items.length||(this.params.discount=0)},removeItem(t){this.params.items.splice(t,1)},complete(){if(!this.params.customer)return alert("Choose Customer");this.processing=!0,post("token","create",this.params).then(this.serve)},serve({id:t}){setTimeout((function(e){let a=_.map(e.tokens[parseInt(t)],"id");a.length?post("token","served",{id:a}).then(e.completed):e.completed()}),750,this)},completed(){this.payment_mode=!1,this.params.items.splice(0,this.params.items.length),this.processing=!1}},watch:{"params.price_list":{immediate:!0,handler:"setPriceList"},"params.items":{deep:!0,handler:"calculateTotal"},"params.discount":{handler:"calculateTotal"}},created(){this.$q.notify.setDefaults({position:"top-right",timeout:1e3,color:"positive",group:!1,html:!0,caption:"Items Updated !!"})}},Q=I,T=a("9989"),D=a("27f9"),$=a("de5e"),O=a("c294"),z=a("24e8"),N=a("f09f"),j=a("d847"),L=a("0016"),M=a("2c91"),B=a("9c40"),E=a("05c0"),A=a("a370"),G=a("1c1c"),J=a("66e5"),K=a("4074"),U=a("0170"),V=a("42a1"),H=a("4b7e"),R=a("75c3"),W=a("7f67"),X=Object(C["a"])(Q,s,i,!1,null,null,null);e["default"]=X.exports;P()(X,"components",{QPage:T["a"],QInput:D["a"],QPageSticky:$["a"],QFab:O["a"],QDialog:z["a"],QCard:N["a"],QBar:j["a"],QIcon:L["a"],QSpace:M["a"],QBtn:B["a"],QTooltip:E["a"],QCardSection:A["a"],QList:G["a"],QItem:J["a"],QItemSection:K["a"],QItemLabel:U["a"],QPopupEdit:V["a"],QCardActions:H["a"]}),P()(X,"directives",{TouchPan:R["a"],ClosePopup:W["a"]})}}]);