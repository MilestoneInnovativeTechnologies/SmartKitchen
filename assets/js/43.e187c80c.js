(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[43],{ef34:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{attrs:{padding:""}},[s("WaiterMenuManage",{staticClass:"q-mx-auto",staticStyle:{"max-width":"360px",width:"90vw"}})],1)},a=[],i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-card",[s("q-list",e._l(e.menus,(function(t){return s("q-expansion-item",{key:e.hKey(t),attrs:{"switch-toggle-side":"","expand-icon-toggle":"","dense-toggle":""},on:{"before-show":function(s){return e.populate(t)}},scopedSlots:e._u([{key:"header",fn:function(){return[s("q-item-section",[s("q-item-label",[e._v(e._s(t.name))]),s("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.detail))])],1),s("q-item-section",{staticStyle:{cursor:"pointer"},attrs:{side:""},on:{click:function(s){return e.toggle(t)}}},[s("q-icon",{attrs:{size:"lg",name:"toggle_"+(e.is_selected(t)?"on":"off"),color:e.is_selected(t)?"positive":"grey"}})],1)]},proxy:!0}],null,!0)},[s("q-card",[s("q-card-section",[s("q-list",{attrs:{dense:"",separator:""}},e._l(e.m_groups,(function(n,a,i){return s("q-item",{key:"waiter-menu-manage-menu-"+t.id+"-group-"+n.id+"-view",attrs:{dense:""}},[s("q-item-section",{attrs:{avatar:""}},[e._v(e._s(i+1))]),s("q-item-section",[s("q-item-label",[e._v(e._s(n.name))]),s("q-item-label",{attrs:{caption:"",lines:"3"}},[e._v("Items: "+e._s(n.items.length)+" - "+e._s(e.m_items[n.id]))])],1)],1)})),1)],1)],1)],1)})),1)],1)},o=[],r=s("ded3"),c=s.n(r),m=s("2f62"),l=s("b1c1"),u=s("43fa"),d={name:"WaiterMenuManage",components:{CardImageTitle:u["a"]},data(){return{m_groups:{},m_items:{}}},computed:c()(c()(c()({},Object(m["d"])("menus",{menus:"data",selected:"s_items"})),Object(m["d"])("groups",{groups:"data"})),Object(m["d"])("items",{items:"data"})),methods:{is_selected({id:e}){return this.selected.includes(e)},hKey({id:e}){return Object(l["b"])("waiter","menu","manage",e)},toggle({id:e}){this.$store.dispatch("menus/toggle",e)},populate({id:e}){this.m_groups=_.pick(this.groups,this.menus[e].groups),this.m_items=_.mapValues(this.m_groups,(({items:e})=>_.map(e,(e=>_.truncate(this.items[e].name,{length:7,omission:"..."}))).join(", ")))}}},p=d,g=s("2877"),h=s("f09f"),f=s("1c1c"),b=s("3b73"),q=s("4074"),w=s("0170"),v=s("0016"),x=s("a370"),y=s("66e5"),Q=s("eebe"),j=s.n(Q),k=Object(g["a"])(p,i,o,!1,null,null,null),I=k.exports;j()(k,"components",{QCard:h["a"],QList:f["a"],QExpansionItem:b["a"],QItemSection:q["a"],QItemLabel:w["a"],QIcon:v["a"],QCardSection:x["a"],QItem:y["a"]});var M={name:"PageWaiterMenu",components:{WaiterMenuManage:I}},O=M,S=s("9989"),C=Object(g["a"])(O,n,a,!1,null,null,null);t["default"]=C.exports,j()(C,"components",{QPage:S["a"]})}}]);