(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{7711:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hhh LpR fFf"}},[a("q-header",{staticClass:"bg-primary text-white",attrs:{reveal:"",elevated:"","height-hint":"98"}},[a("q-toolbar",[a("q-toolbar-title",[t.$store.state.back?a("q-btn",{attrs:{to:t.$store.state.back,flat:"",round:"",dense:"",icon:"arrow_back_ios"}}):t._e(),t._v("\n        "+t._s(t.$store.state.title||t.receptionist)+"\n      ")],1),a("q-btn",{staticClass:"lt-md",attrs:{flat:"",round:"",dense:"",icon:"archive",to:{name:"archives"}}}),a("q-btn",{staticClass:"lt-md",attrs:{flat:"",round:"",dense:"",icon:"batch_prediction",to:{name:"seat_status"}}}),a("q-btn",{staticClass:"lt-sm",attrs:{flat:"",round:"",dense:"",icon:"receipt",to:{name:"receptionist_tokens"}}},[a("q-badge",{directives:[{name:"show",rawName:"v-show",value:t.completed.length>0,expression:"completed.length>0"}],attrs:{color:"red",label:t.completed.length,transparent:"",floating:""}})],1),a("q-btn",{staticClass:"lt-sm",attrs:{flat:"",round:"",dense:"",icon:"pending_actions",to:{name:"bills"}}}),a("q-btn",{attrs:{flat:"",round:"",dense:"",label:"---",disable:!0,color:"primary"}}),a("ManualSync"),a("Logout")],1)],1),a("q-page-container",[a("router-view")],1),a("q-footer",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.footer,expression:"$store.state.footer"}],staticClass:"bg-primary text-white",attrs:{elevated:""}},[a("q-tabs",{attrs:{align:"left"}},[a("q-route-tab",{attrs:{exact:"",to:{name:"receptionist_index"},label:"Home",icon:"home"}}),a("q-route-tab",{staticClass:"gt-sm",attrs:{to:{name:"seat_status"},label:"Seating",icon:"batch_prediction"}}),a("q-route-tab",{staticClass:"gt-sm",attrs:{to:{name:"archives"},label:"Archive",icon:"archive"}}),a("q-route-tab",{staticClass:"gt-xs",attrs:{to:{name:"receptionist_tokens"},label:"Tokens",icon:"receipt",alert:t.alert||t.completed.length>0,"alert-icon":"new_releases"}}),a("q-route-tab",{staticClass:"gt-xs",attrs:{to:{name:"bills"},label:"Bills",icon:"pending_actions"}}),a("q-route-tab",{attrs:{to:{name:"sale"},label:"Sale",icon:"shopping_cart"}}),a("q-route-tab",{attrs:{to:{name:"orders"},label:"Orders",icon:"add_task"}}),a("q-route-tab",{attrs:{to:{name:"orders_remote"},label:"Remote",icon:"online_prediction"}})],1)],1)],1)},o=[],r=a("ed79"),n=a("2f62"),l=a("b1c1"),i=a("9527"),c={name:"ReceptionistLayout",components:{Logout:i["a"],ManualSync:r["a"]},data(){return{receptionist:_USER.name,logout:LOGOUT,alert:!1}},computed:Object(n["d"])("tokens",{completed({data:t}){return _.filter(t,["progress","Completed"])}}),watch:{completed(t,e){(!e||t.length>e.length)&&(Object(l["a"])(),this.alert="amber",setTimeout((t=>t.alert=!1),15e3,this))}}},b=c,d=a("2877"),m=a("4d5a"),u=a("e359"),p=a("65c6"),h=a("6ac5"),g=a("9c40"),q=a("58a8"),f=a("09e3"),v=a("7ff0"),w=a("429b"),C=a("7867"),k=a("eebe"),Q=a.n(k),x=Object(d["a"])(b,s,o,!1,null,null,null);e["default"]=x.exports;Q()(x,"components",{QLayout:m["a"],QHeader:u["a"],QToolbar:p["a"],QToolbarTitle:h["a"],QBtn:g["a"],QBadge:q["a"],QPageContainer:f["a"],QFooter:v["a"],QTabs:w["a"],QRouteTab:C["a"]})}}]);