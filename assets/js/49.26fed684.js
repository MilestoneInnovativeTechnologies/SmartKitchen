(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[49],{"572d":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{attrs:{padding:""}},[s("OrderNewGlobal",t._b({attrs:{seat:t.seat}},"OrderNewGlobal",t.$attrs,!1)),s("q-dialog",{attrs:{persistent:""},model:{value:t.m_show,callback:function(e){t.m_show=e},expression:"m_show"}},[s("MenuSelect",{staticStyle:{width:"75vw","max-width":"330px"},on:{selected:function(e){t.r_menu=!1}}})],1)],1)},i=[],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"bg-grey-2 row items-center q-py-xs"},[s("div",{staticClass:"text-bold"},[t._v("Select Menu")]),s("q-space"),s("q-btn",{directives:[{name:"show",rawName:"v-show",value:t.selected.length||!t.menus_count,expression:"selected.length || !menus_count"},{name:"close-popup",rawName:"v-close-popup"}],staticClass:"text-weight-bold",attrs:{round:"",icon:"clear",flat:"",color:"red-12"}})],1),t.menus_count?s("q-list",{attrs:{separator:"",bordered:""}},t._l(t.menus,(function(e){return s("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:t.hKey(e),attrs:{clickable:""},on:{click:function(s){t.selected=e}}},[s("q-item-section",[s("q-item-label",[t._v(t._s(e.name))])],1),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{size:"lg",name:"toggle_"+(t.is_selected(e)?"on":"off"),color:t.is_selected(e)?"positive":"grey"}})],1)],1)})),1):s("q-card-section",{staticClass:"text-red"},[t._v("It seems there is no any menu created. Ask administrator to create a menu")])],1)},n=[],o=(s("ddb0"),s("ded3")),c=s.n(o),l=s("2f62"),m=s("b1c1"),u={name:"MenuSelect",data(){return{}},computed:c()(c()({},Object(l["d"])("menus",{menus:"data",assigned:"s_items"})),{},{menus_count(){return _.size(this.menus)},selected:{get(){return this.assigned},set({id:t}){this.$store.dispatch("menus/toggle",t)}}}),methods:{is_selected({id:t}){return this.selected.includes(t)},hKey({id:t}){return Object(m["d"])("waiter","menu","select",t)}},created(){this.selected.length||1!==this.menus_count||(this.selected=_.first(_.values(this.menus)),this.$emit("selected"))}},d=u,p=s("2877"),h=s("f09f"),b=s("a370"),g=s("2c91"),q=s("9c40"),v=s("1c1c"),f=s("66e5"),y=s("4074"),w=s("0170"),x=s("0016"),S=s("7f67"),C=s("714f"),Q=s("eebe"),I=s.n(Q),O=Object(p["a"])(d,r,n,!1,null,null,null),$=O.exports;I()(O,"components",{QCard:h["a"],QCardSection:b["a"],QSpace:g["a"],QBtn:q["a"],QList:v["a"],QItem:f["a"],QItemSection:y["a"],QItemLabel:w["a"],QIcon:x["a"]}),I()(O,"directives",{ClosePopup:S["a"],Ripple:C["a"]});var k=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{attrs:{flat:"",square:""}},[!t.seat||t.tab&&"seating"!==t.tab?s("q-card-section",{staticClass:"q-px-none"},[s("FilterInputText",{staticClass:"q-mb-xs",on:{text:function(e){t.item_filter=e}}}),s("GroupItemsSelect",{attrs:{selected:t.active_group,filter:t.item_filter,price_list:t.params.price_list},on:{item:t.item}})],1):s("q-card-section",{staticClass:"q-px-none"},[s("SeatSelect",{on:{selected:t.seating}})],1),s("q-tabs",{staticClass:"fixed-bottom bg-primary",attrs:{align:"justify",dense:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[t.seat?s("q-tab",{staticClass:"text-white",attrs:{name:"seating",icon:"event_seat",label:"Seat"}}):t._e(),s("q-tab",{staticClass:"text-white",attrs:{name:"items",icon:"widgets",label:"Items"}}),s("q-tab",{staticClass:"text-white",attrs:{name:"proceed",icon:"where_to_vote",label:"Proceed"}})],1),s("GroupStickyButton",{style:{visibility:t.tab&&"seating"!==t.tab?"visible":"hidden"},model:{value:t.active_group,callback:function(e){t.active_group=e},expression:"active_group"}}),s("q-dialog",{attrs:{persistent:"",value:"proceed"===t.tab},on:{"before-hide":function(e){t.tab="items"}}},[s("OrderNewSummary",t._b({style:t.popup_width(),attrs:{loading:t.loading},on:{process:t.process}},"OrderNewSummary",t.params,!1))],1)],1)},N=[],j=(s("a434"),s("5ab9")),T=s("47ac"),F=s("40f6"),E=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("FilterInputText",{staticClass:"q-mb-xs",attrs:{label:"Filter Seats"},on:{text:function(e){t.filter=e}}}),s("Masonry",{attrs:{items:t.seats,width:"180"},scopedSlots:t._u([{key:"item",fn:function(e){return[s("SeatSelectItem",{staticClass:"cursor-pointer",attrs:{id:e.id},on:{selected:function(s){return t.$emit("selected",e)}}})]}}])})],1)},G=[],z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{on:{click:function(e){return t.$emit("selected",t.seat)}}},[s("q-card-section",{staticClass:"q-py-xs bg-grey"}),s("CardImageTitle",{attrs:{title:t.seat.name,image:t.src}})],1)},M=[],P=s("43fa"),B={name:"SeatSelectItem",components:{CardImageTitle:P["a"]},props:["id"],computed:{seat(){return _.get(this.$store.state.seating.data,_.toSafeInteger(this.id))},src(){return Object(m["g"])(this.seat.image)}}},D=B,L=Object(p["a"])(D,z,M,!1,null,null,null),A=L.exports;I()(L,"components",{QCard:h["a"],QCardSection:b["a"]});var K=s("c624"),J={name:"SeatSelect",components:{Masonry:K["a"],FilterInputText:j["a"],SeatSelectItem:A},data(){return{filter:""}},computed:{s_seats(){return _(this.$store.state.seating.data).filter(["status","Active"]).value()},seats(){return this.filter?_.filter(this.s_seats,(t=>Object(m["o"])(t,["id","name","detail"],this.filter))):this.s_seats}},methods:{hKey({id:t}){return Object(m["d"])("seat","select","item",t)}}},R=J,U=Object(p["a"])(R,E,G,!1,null,null,null),H=U.exports,V=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-bar",{staticClass:"text-white q-py-lg items-center",class:"bg-"+t.clr},[s("q-icon",{attrs:{name:"receipt",color:"white",left:""}}),s("span",[t._v("Order Summary")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"clear",flat:"",round:"",color:"white"}})],1),s("q-card-section",{staticClass:"q-pa-none"},[s("q-list",{staticStyle:{"font-size":"0.75rem"},attrs:{dense:"",separator:"",bordered:""}},[s("q-item",[s("q-item-section",{attrs:{avatar:""}},[t._v("No")]),s("q-item-section",[t._v("Item")]),s("q-item-section",{attrs:{side:""}},[t._v("Total")]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{name:"clear",color:"white",size:"xs"}})],1)],1),t._l(t.items,(function(e,a){return s("q-item",{key:t.h_key("ons-oi",a,"i",e.item)},[s("q-item-section",{attrs:{avatar:""}},[t._v(t._s(a+1))]),s("q-item-section",[s("q-item-label",[t._v(t._s(t.iData(e,"name")))]),s("q-item-label",{staticStyle:{"font-size":"0.65rem"},attrs:{caption:""}},[t._v(t._s(e.quantity)+" x "+t._s(parseFloat(t.price[e.item]).toFixed(2)))])],1),s("q-popup-edit",{attrs:{value:t.items.quantity,title:t.iData(e,"name"),"auto-save":""},on:{input:function(e){return t.$emit("process",["quantity",a,e])}}},[s("q-input",{attrs:{type:"number",value:e.quantity,dense:"",outlined:"",autofocus:"",label:"Quantity"},on:{input:function(e){return t.$emit("process",["quantity",a,e])}}})],1),s("q-item-section",{attrs:{side:""}},[t._v(t._s(parseFloat(t.price[e.item]*e.quantity).toFixed(2)))]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{name:"clear",color:"negative",size:"xs"},on:{click:function(e){return t.$emit("process",["remove",a])}}})],1)],1)})),s("q-item",{staticClass:"text-white",attrs:{dense:""}},[s("q-item-section",{attrs:{avatar:""}},[t._v("0")]),s("q-item-section",[s("q-item-label",{staticClass:"text-white"},[t._v("Total")])],1),s("q-item-section",{staticClass:"text-bold",class:"text-"+t.clr,attrs:{side:""}},[t._v(t._s(parseFloat(t.total).toFixed(2)))]),s("q-item-section",{attrs:{side:""}},[s("q-icon",{attrs:{name:"attach_money",color:t.clr,size:"xs"}})],1)],1)],2)],1),s("q-card-section",[s("OrderCustomer",{attrs:{get:"id"},model:{value:t.v_customer,callback:function(e){t.v_customer=e},expression:"v_customer"}})],1),s("q-card-actions",{staticClass:"bg-grey-2",attrs:{align:"right"}},[s("q-btn",{attrs:{label:"Submit",color:t.clr,padding:"xs md",loading:t.loading},on:{click:function(e){return t.$emit("process",["submit"])}}})],1)],1)},W=[],X=(s("13d5"),s("9708")),Y={name:"OrderNewSummary",components:{OrderCustomer:X["a"]},props:["items","price_list","customer","color","loading"],computed:c()(c()({},Object(l["d"])("items",{item_master:"data"})),{},{clr(){return this.color||"accent"},price(){return _.get(this.$store.getters["prices/items"],_.toInteger(this.price_list))},total(){return _.reduce(this.items,((t,{item:e,quantity:s})=>t+this.price[e]*s),0)},v_customer:{get(){return this.customer},set(t){this.$emit("process",["customer",t])}}}),methods:{h_key:m["d"],iData({item:t},e){return _.get(this.item_master,[_.toInteger(t),e])}}},Z=Y,tt=s("d847"),et=s("42a1"),st=s("27f9"),at=s("4b7e"),it=Object(p["a"])(Z,V,W,!1,null,null,null),rt=it.exports;I()(it,"components",{QCard:h["a"],QBar:tt["a"],QIcon:x["a"],QSpace:g["a"],QBtn:q["a"],QCardSection:b["a"],QList:v["a"],QItem:f["a"],QItemSection:y["a"],QItemLabel:w["a"],QPopupEdit:et["a"],QInput:st["a"],QCardActions:at["a"]}),I()(it,"directives",{ClosePopup:S["a"]});var nt={name:"OrderNewGlobal",components:{OrderNewSummary:rt,SeatSelect:H,GroupStickyButton:F["a"],GroupItemsSelect:T["a"],FilterInputText:j["a"]},data(){return{tab:"",active_group:0,item_filter:"",params:{type:null,seating:null,price_list:null,customer:null,items:[],user:null,narration:null},loading:!1}},props:["seat"],computed:{attrs(){return _.pick(this.$attrs,_.keys(this.params))}},methods:{popup_width:m["t"],item({id:t}){let e=_.find(this.params.items,["item",t]);e?e.quantity++:this.params.items.push({item:t,quantity:1,delay:0,narration:null}),this.$q.notify({type:"positive",message:"Item Updated",caption:`Total ${this.params.items.length} Items`,group:"items",position:"top-right"})},seating({id:t,price_list:e}){this.params.seating=t,this.params.price_list=e,this.tab="items"},init(t){let e=this;_.forEach(t,(function(t,s){e.params[s]=t}))},process(t){this[_.head(t)]["apply"](this,_.tail(t))},quantity(t,e){this.params.items[t]["quantity"]=e},remove(t){this.params.items.splice(t,1)},customer(t){this.params.customer=t},submit(){_.isEmpty(this.params.items)||(this.loading=!0,post("token","create",this.params).then((()=>{this.params.items.splice(0,this.params.items.length),this.item_filter="",this.active_group=0,this.init(this.attrs),this.tab="items",this.loading=!1,this.seat&&setTimeout((t=>t.tab="seating"),600,this)})))}},watch:{attrs:{immediate:!0,deep:!0,handler:"init"}}},ot=nt,ct=s("429b"),lt=s("7460"),mt=s("24e8"),ut=Object(p["a"])(ot,k,N,!1,null,null,null),dt=ut.exports;I()(ut,"components",{QCard:h["a"],QCardSection:b["a"],QTabs:ct["a"],QTab:lt["a"],QDialog:mt["a"]});var pt={name:"PageOrderNew",components:{OrderNewGlobal:dt,MenuSelect:$},props:["seat"],data(){return{r_menu:!1}},computed:{m_show:{get(){return!this.$store.state.menus.s_items.length||this.r_menu},set(t){this.r_menu=!!t}}},created(){this.r_menu=this.m_show}},ht=pt,_t=s("9989"),bt=Object(p["a"])(ht,a,i,!1,null,null,null);e["default"]=bt.exports;I()(bt,"components",{QPage:_t["a"],QDialog:mt["a"]})}}]);