(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{4632:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hhh LpR fFf"}},[a("q-header",{staticClass:"bg-primary text-white",attrs:{reveal:"",elevated:"","height-hint":"98"}},[a("q-toolbar",[a("q-toolbar-title",[t._v("Login")]),a("q-btn",{attrs:{type:"a",href:"subscription",label:t.MSG[t.count%3],flat:"",dense:""}})],1)],1),t.CODE_VALID&&t.KEY_VALID?a("q-page-container",[a("router-view")],1):a("q-page-container",[a("q-page",{staticClass:"flex flex-center"},[a("div",{staticClass:"bg-black q-pa-xl text-green text-center text-uppercase",staticStyle:{width:"360px","max-width":"90vw"}},[a("div",[t._v(t._s(t.CODE_VALID?t.KEY_VALID?"":"subscription key is invalid":"subscription code is invalid"))]),a("div",{staticClass:"text-bold"},[t._v("--- "+t._s(t.CODE_INVALID_REASON)+" ---")]),a("div",[t._v("Please contact vendor")]),a("div",[t._v("ERROR CODE: "+t._s(t.CODE_INVALID_ERROR_CODE))])])])],1),a("q-footer",{staticClass:"bg-primary text-white",attrs:{elevated:""}},[a("q-tabs",{attrs:{align:"center"}},[a("q-tab",{attrs:{label:"PIN",icon:"money"},on:{click:function(e){return t.$store.commit("public",{login:"pin"})}}}),a("q-tab",{attrs:{label:"Password",icon:"vpn_key"},on:{click:function(e){return t.$store.commit("public",{login:"password"})}}}),t.$q.screen.gt.sm?a("q-tab",{attrs:{label:"Display",icon:"tv"},on:{click:function(e){return t.$store.commit("public",{login:"display"})}}}):t._e()],1)],1)],1)},n=[],s=a("adfa"),o={name:"LoginLayout",data(){return{CLIENT:s["CLIENT"],BRANCH:s["BRANCH"],SUBSCRIPTION_NAME:s["SUBSCRIPTION_NAME"],VALID_UPTO:s["VALID_UPTO"],count:0,KEY_VALID:s["KEY_VALID"],CODE_VALID:s["CODE_VALID"],CODE_INVALID_ERROR_CODE:s["CODE_INVALID_ERROR_CODE"],CODE_INVALID_REASON:s["CODE_INVALID_REASON"],MSG:[`${s["CLIENT"]} (${s["BRANCH"]})`,"Edition: "+s["SUBSCRIPTION_NAME"],"Valid Till: "+s["VALID_UPTO"].split(" ")[0]]}},created(){setInterval((t=>t.count++),1e4,this)}},r=o,l=a("2877"),c=a("4d5a"),_=a("e359"),I=a("65c6"),E=a("6ac5"),D=a("9c40"),b=a("09e3"),p=a("9989"),u=a("7ff0"),d=a("429b"),C=a("7460"),O=a("eebe"),A=a.n(O),L=Object(l["a"])(r,i,n,!1,null,null,null);e["default"]=L.exports;A()(L,"components",{QLayout:c["a"],QHeader:_["a"],QToolbar:I["a"],QToolbarTitle:E["a"],QBtn:D["a"],QPageContainer:b["a"],QPage:p["a"],QFooter:u["a"],QTabs:d["a"],QTab:C["a"]})}}]);