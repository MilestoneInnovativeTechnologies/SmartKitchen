(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{7711:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return t("q-layout",{attrs:{view:"hhh LpR fFf"}},[t("q-header",{staticClass:"bg-primary text-white",attrs:{reveal:"",elevated:"","height-hint":"98"}},[t("q-toolbar",[t("q-toolbar-title",[e.$store.state.back?t("q-btn",{attrs:{to:e.$store.state.back,flat:"",round:"",dense:"",icon:"arrow_back_ios"}}):e._e(),e._v("\n          "+e._s(e.$store.state.title||e.receptionist)+"\n        ")],1),e.quick_enabled?t("QuickToggle"):e._e(),t("q-btn",{staticClass:"lt-md",attrs:{flat:"",round:"",dense:"",icon:"archive",to:{name:"archives"}}}),t("q-btn",{staticClass:"lt-md",attrs:{flat:"",round:"",dense:"",icon:"batch_prediction",to:{name:"seat_status"}}}),e.item_create?t("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"auto_awesome"},on:{click:function(t){e.create_item=!0}}}):e._e(),e.customer_manage?t("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"switch_account",to:{name:"customers"}}}):e._e(),t("q-btn",{staticClass:"lt-sm",attrs:{flat:"",round:"",dense:"",icon:"receipt_long",to:{name:"bills"}}},[t("q-badge",{directives:[{name:"show",rawName:"v-show",value:e.completed.length>0,expression:"completed.length>0"}],attrs:{color:"red",label:e.completed.length,transparent:"",floating:""}})],1),t("q-btn",{attrs:{flat:"",round:"",dense:"",label:"---",disable:!0,color:"primary"}}),t("ManualSync"),e.installable?t("InstallPrompt"):e._e(),t("Logout")],1)],1),t("q-page-container",[t("router-view"),t("q-dialog",{attrs:{persistent:""},model:{value:e.create_item,callback:function(t){e.create_item=t},expression:"create_item"}},[t("InstantItemCreateCard",{style:e.popup_width()})],1)],1),t("q-footer",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.footer,expression:"$store.state.footer"}],staticClass:"bg-primary text-white",attrs:{elevated:""}},[t("q-tabs",{attrs:{align:"left"}},[t("q-route-tab",{attrs:{exact:"",to:{name:"receptionist_index"},label:"Home",icon:"home"}}),t("q-route-tab",{staticClass:"gt-sm",attrs:{to:{name:"seat_status"},label:"Seating",icon:"batch_prediction"}}),t("q-route-tab",{staticClass:"gt-sm",attrs:{to:{name:"archives"},label:"Archive",icon:"archive"}}),t("q-route-tab",{staticClass:"gt-xs",attrs:{to:{name:"bills"},label:"Bills",icon:"receipt_long",alert:e.alert||e.completed.length>0,"alert-icon":"new_releases"}}),e.sale_enabled?t("q-route-tab",{attrs:{to:{name:"sale"},label:"Sale",icon:"shopping_cart"}}):e._e(),e.take_away_manage?t("q-route-tab",{attrs:{to:{name:"take_away"},label:"Take Away",icon:"emoji_people"}}):e._e(),t("q-route-tab",{attrs:{to:{name:"orders"},label:"Orders",icon:"add_task"}}),e.remote_manage?t("q-route-tab",{attrs:{to:{name:"orders_remote"},label:"Remote",icon:"online_prediction"}}):e._e(),e.online?t("q-route-tab",{attrs:{to:{name:"orders_online"},label:"Online",icon:"settings_input_antenna"}}):e._e()],1)],1)],1)},n=[],r=(a("caad"),a("ed79")),i=a("67ed"),o=a("2f62"),l=a("b1c1"),c=a("9527"),d=a("7e10"),u=function(){var e=this,t=e._self._c;return t("q-card",[t("q-card-section",{staticClass:"row items-center justify-between bg-light-blue text-white q-py-sm"},[t("div",{staticClass:"text-bold"},[e._v("Add New Item")]),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",color:"white",flat:"",rounded:"",dense:""}})],1),t("q-card-section",{staticClass:"q-gutter-y-xs"},[t("q-input",{attrs:{outlined:"",dense:"",label:"Item Name"},model:{value:e.params.name,callback:function(t){e.$set(e.params,"name",t)},expression:"params.name"}}),t("q-select",{attrs:{options:e.groups,outlined:"",dense:"",label:"Select Group"},model:{value:e.group,callback:function(t){e.group=t},expression:"group"}}),t("q-select",{attrs:{options:e.kitchens,outlined:"",dense:"",label:"Select Kitchen"},model:{value:e.kitchen,callback:function(t){e.kitchen=t},expression:"kitchen"}}),t("div",{staticClass:"row q-col-gutter-xs q-mt-xs"},e._l(e.plists,(function(a){return t("div",{key:"iicc-pl-"+a.id,staticClass:"col-6"},[t("q-input",{attrs:{type:"number",outlined:"",dense:"",label:a.name},model:{value:e.params.prices[a.id],callback:function(t){e.$set(e.params.prices,a.id,e._n(t))},expression:"params.prices[pl.id]"}})],1)})),0)],1),t("q-card-actions",{staticClass:"bg-grey-1",attrs:{align:"right"}},[t("q-btn",{attrs:{loading:e.loading,label:"Save",color:"primary"},on:{click:e.save}})],1)],1)},m=[],p={name:"InstantItemCreateCard",data(){return{params:{name:"",group:null,prices:{},kitchen:null},group:null,kitchen:null,loading:!1}},computed:{groups(){return Object(l["x"])(this.$store.state.groups.data,["name"],",")},kitchens(){return Object(l["x"])(this.$store.state.kitchens.data,["name"],",")},plists(){return this.$store.state.prices.list}},methods:{save(){if(this.loading=!0,!this.params.name||!this.params.group||!this.params.kitchen)return this.loading=!1;post("item","instant",this.params).then((()=>{this.loading=!1,this.$store.commit("public",{item_create:!1})}))}},watch:{group(e){this.params.group=e?e.id:null},kitchen(e){this.params.kitchen=e?e.id:null}},created(){this.params.prices=Object.assign({},this.params.prices,_(this.plists).mapKeys((e=>_.toInteger(e.id))).mapValues((()=>0)).value()),this.group=_.first(this.groups),this.kitchen=_.first(this.kitchens)}},b=p,h=a("2877"),g=a("f09f"),f=a("a370"),q=a("9c40"),w=a("27f9"),k=a("ddd8"),v=a("4b7e"),C=a("7f67"),y=a("eebe"),x=a.n(y),Q=Object(h["a"])(b,u,m,!1,null,null,null),O=Q.exports;x()(Q,"components",{QCard:g["a"],QCardSection:f["a"],QBtn:q["a"],QInput:w["a"],QSelect:k["a"],QCardActions:v["a"]}),x()(Q,"directives",{ClosePopup:C["a"]});const{GH75F:$,GH56E:j,CC71V:S,DP71V:I,KK99V:T,CZ03Y:B,RS44Z:R,NA57A:Y}=a("adfa").FEATURES;var A={name:"ReceptionistLayout",components:{InstantItemCreateCard:O,QuickToggle:d["a"],Logout:c["a"],ManualSync:r["a"],InstallPrompt:i["a"]},data(){return{receptionist:_USER.name,logout:LOGOUT,alert:!1,online_enabled:"Yes"===$&&"Yes"===j,remote_enabled:"Yes"===S&&""!==_.trim(I),sale_enabled:"Yes"===B,take_away_enabled:"Yes"===Y}},computed:{...Object(o["d"])("tokens",{completed({data:e}){return _.filter(e,(({progress:e})=>["Completed"].includes(e)))}}),online(){return this.online_enabled&&!1!==Object(l["B"])(settings("online_order_waiter_handle"))},customer_manage(){return settings("manage_customer",_USER.role)},item_create(){return!0===Object(l["B"])(settings("instant_item_create"))},remote_manage(){return this.remote_enabled&&"Yes"===T&&!1!==Object(l["B"])(settings("receptionist_remote_orders"))},installable(){return![void 0,"0"].includes(settings("installable"))},quick_enabled(){return"Yes"===R&&["order_new","sale"].includes(this.$route.name)},take_away_manage(){return this.take_away_enabled&&!1!==Object(l["B"])(settings("take_away_receptionist_handle"))},create_item:{get(){return _.get(this.$store.state,["public","item_create"],!1)},set(e){this.$store.commit("public",{item_create:e})}}},methods:{popup_width:l["y"]},watch:{completed(e,t){(!t||e.length>t.length)&&(Object(l["b"])(),this.alert="amber",setTimeout((e=>e.alert=!1),15e3,this))}}},L=A,N=a("4d5a"),E=a("e359"),P=a("65c6"),F=a("6ac5"),G=a("58a8"),H=a("09e3"),K=a("24e8"),U=a("7ff0"),V=a("429b"),D=a("7867"),J=Object(h["a"])(L,s,n,!1,null,null,null);t["default"]=J.exports;x()(J,"components",{QLayout:N["a"],QHeader:E["a"],QToolbar:P["a"],QToolbarTitle:F["a"],QBtn:q["a"],QBadge:G["a"],QPageContainer:H["a"],QDialog:K["a"],QFooter:U["a"],QTabs:V["a"],QRouteTab:D["a"]})}}]);