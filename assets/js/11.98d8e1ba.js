(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{b56d:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hhh LpR fFf"}},[a("q-header",{staticClass:"bg-primary text-white",attrs:{reveal:"",elevated:"","height-hint":"98"}},[a("q-toolbar",[a("q-toolbar-title",[t.$store.state.back?a("q-btn",{attrs:{to:t.$store.state.back,flat:"",round:"",dense:"",icon:"arrow_back_ios"}}):t._e(),t._v("\n          "+t._s(t.$store.state.title||t.chef)+"\n        ")],1),a("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"power_settings_new",type:"a",href:t.logout}})],1)],1),a("q-page-container",[a("router-view")],1),a("q-footer",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.footer,expression:"$store.state.footer"}],staticClass:"bg-primary text-white",attrs:{elevated:""}},[a("q-tabs",{attrs:{align:"left"}},[a("q-route-tab",{attrs:{to:{name:"chef_index"},label:"Home",icon:"home"}}),a("q-route-tab",{attrs:{to:{name:"chef_kitchens"},label:"Kitchens",icon:"kitchen"}}),a("q-route-tab",{attrs:{to:{name:"tokens"},label:"Tokens",icon:"receipt"}})],1)],1)],1)},r=[],s={name:"ChefLayout",data(){return{chef:_USER.name,logout:LOGOUT}},created(){let t=_SECTION["kitchen"];this.$store.commit("kitchens/assign",t,{root:!0})}},n=s,i=a("2877"),c=a("4d5a"),l=a("e359"),b=a("65c6"),h=a("6ac5"),u=a("9c40"),f=a("09e3"),d=a("7ff0"),w=a("429b"),m=a("7867"),p=a("eebe"),_=a.n(p),q=Object(i["a"])(n,o,r,!1,null,null,null);e["default"]=q.exports,_()(q,"components",{QLayout:c["a"],QHeader:l["a"],QToolbar:b["a"],QToolbarTitle:h["a"],QBtn:u["a"],QPageContainer:f["a"],QFooter:d["a"],QTabs:w["a"],QRouteTab:m["a"]})}}]);