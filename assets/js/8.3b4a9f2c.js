(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{7711:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hhh LpR fFf"}},[a("q-header",{staticClass:"bg-primary text-white",attrs:{reveal:"",elevated:"","height-hint":"98"}},[a("q-toolbar",[a("q-toolbar-title",[t.$store.state.back?a("q-btn",{attrs:{to:t.$store.state.back,flat:"",round:"",dense:"",icon:"arrow_back_ios"}}):t._e(),t._v("\n        "+t._s(t.$store.state.title||t.receptionist)+"\n      ")],1),a("q-btn",{staticClass:"lt-md",attrs:{flat:"",round:"",dense:"",icon:"archive",to:{name:"archives"}}}),a("q-btn",{staticClass:"lt-md",attrs:{flat:"",round:"",dense:"",icon:"batch_prediction",to:{name:"seat_status"}}}),t.customer_manage?a("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"switch_account",to:{name:"customers"}}}):t._e(),a("q-btn",{staticClass:"lt-sm",attrs:{flat:"",round:"",dense:"",icon:"receipt",to:{name:"receptionist_tokens"}}},[a("q-badge",{directives:[{name:"show",rawName:"v-show",value:t.completed.length>0,expression:"completed.length>0"}],attrs:{color:"red",label:t.completed.length,transparent:"",floating:""}})],1),a("q-btn",{staticClass:"lt-sm",attrs:{flat:"",round:"",dense:"",icon:"receipt_long",to:{name:"bills"}}}),a("q-btn",{attrs:{flat:"",round:"",dense:"",label:"---",disable:!0,color:"primary"}}),a("ManualSync"),a("Logout")],1)],1),a("q-page-container",[a("router-view")],1),a("q-footer",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.footer,expression:"$store.state.footer"}],staticClass:"bg-primary text-white",attrs:{elevated:""}},[a("q-tabs",{attrs:{align:"left"}},[a("q-route-tab",{attrs:{exact:"",to:{name:"receptionist_index"},label:"Home",icon:"home"}}),a("q-route-tab",{staticClass:"gt-sm",attrs:{to:{name:"seat_status"},label:"Seating",icon:"batch_prediction"}}),a("q-route-tab",{staticClass:"gt-sm",attrs:{to:{name:"archives"},label:"Archive",icon:"archive"}}),a("q-route-tab",{staticClass:"gt-xs",attrs:{to:{name:"receptionist_tokens"},label:"Tokens",icon:"receipt",alert:t.alert||t.completed.length>0,"alert-icon":"new_releases"}}),a("q-route-tab",{staticClass:"gt-xs",attrs:{to:{name:"bills"},label:"Bills",icon:"receipt_long"}}),a("q-route-tab",{attrs:{to:{name:"sale"},label:"Sale",icon:"shopping_cart"}}),a("q-route-tab",{attrs:{to:{name:"orders"},label:"Orders",icon:"add_task"}}),a("q-route-tab",{attrs:{to:{name:"orders_remote"},label:"Remote",icon:"online_prediction"}}),t.online?a("q-route-tab",{attrs:{to:{name:"orders_online"},label:"Online",icon:"settings_input_antenna"}}):t._e()],1)],1)],1)},o=[],s=a("ded3"),r=a.n(s),l=a("ed79"),i=a("2f62"),c=a("b1c1"),d=a("9527");const{GH75F:b,GH56E:m}=a("adfa").FEATURES;var u={name:"ReceptionistLayout",components:{Logout:d["a"],ManualSync:l["a"]},data(){return{receptionist:_USER.name,logout:LOGOUT,alert:!1,online_enabled:"Yes"===b&&"Yes"===m}},computed:r()(r()({},Object(i["d"])("tokens",{completed({data:t}){return _.filter(t,["progress","Completed"])}})),{},{online(){return this.online_enabled&&!(void 0!==settings("online_order_receptionist_handle")&&_.includes([0,"0","No","no",!1,"false","False",null],settings("online_order_receptionist_handle")))},customer_manage(){return settings("manage_customer",_USER.role)}}),watch:{completed(t,e){(!e||t.length>e.length)&&(Object(c["b"])(),this.alert="amber",setTimeout((t=>t.alert=!1),15e3,this))}}},p=u,h=a("2877"),g=a("4d5a"),f=a("e359"),q=a("65c6"),v=a("6ac5"),w=a("9c40"),C=a("58a8"),k=a("09e3"),Q=a("7ff0"),x=a("429b"),T=a("7867"),y=a("eebe"),O=a.n(y),R=Object(h["a"])(p,n,o,!1,null,null,null);e["default"]=R.exports;O()(R,"components",{QLayout:g["a"],QHeader:f["a"],QToolbar:q["a"],QToolbarTitle:v["a"],QBtn:w["a"],QBadge:C["a"],QPageContainer:k["a"],QFooter:Q["a"],QTabs:x["a"],QRouteTab:T["a"]})}}]);