(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[114],{ef34:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("q-page",{attrs:{padding:""}},[t("WaiterMenuManage",{staticClass:"q-mx-auto",staticStyle:{width:"90vw"}})],1)},n=[],i=function(){var e=this,t=e._self._c;return t("q-card",[t("q-list",e._l(e.menus,(function(s){return t("q-expansion-item",{key:e.hKey(s),attrs:{"switch-toggle-side":"","expand-icon-toggle":"","dense-toggle":""},on:{"before-show":function(t){return e.populate(s)}},scopedSlots:e._u([{key:"header",fn:function(){return[t("q-item-section",[t("q-item-label",[e._v(e._s(s.name))]),t("q-item-label",{attrs:{caption:""}},[e._v(e._s(s.detail))])],1),t("q-item-section",{staticStyle:{cursor:"pointer"},attrs:{side:""},on:{click:function(t){return e.toggle(s)}}},[t("q-icon",{attrs:{size:"lg",name:"toggle_"+(e.is_selected(s)?"on":"off"),color:e.is_selected(s)?"positive":"grey"}})],1)]},proxy:!0}],null,!0)},[t("q-card",[t("q-card-section",[t("q-list",{attrs:{dense:"",separator:""}},e._l(e.m_groups,(function(a,n,i){return t("q-item",{key:"waiter-menu-manage-menu-"+s.id+"-group-"+a.id+"-view",attrs:{dense:""}},[t("q-item-section",{attrs:{avatar:""}},[e._v(e._s(i+1))]),t("q-item-section",[t("q-item-label",[e._v(e._s(a.name))]),t("q-item-label",{attrs:{caption:"",lines:"3"}},[e._v("Items: "+e._s(a.items.length)+" - "+e._s(e.m_items[a.id]))])],1)],1)})),1)],1)],1)],1)})),1)],1)},o=[],r=(s("caad"),s("2f62")),c=s("b1c1"),l=s("43fa"),m={name:"WaiterMenuManage",components:{CardImageTitle:l["a"]},data(){return{m_groups:{},m_items:{}}},computed:{...Object(r["d"])("menus",{menus:({data:e})=>Object(c["a"])(e),selected:e=>e.s_items}),...Object(r["d"])("groups",{groups:({data:e})=>Object(c["a"])(e)}),...Object(r["d"])("items",{items:({data:e})=>Object(c["a"])(e)})},methods:{is_selected({id:e}){return this.selected.includes(e)},hKey({id:e}){return Object(c["e"])("waiter","menu","manage",e)},toggle({id:e}){this.$store.dispatch("menus/toggle",e)},populate({id:e}){this.m_groups=_.pick(this.groups,this.menus[e].groups),this.m_items=_.mapValues(this.m_groups,(({items:e})=>_.map(e,(e=>_.truncate(this.items[e].name,{length:7,omission:"..."}))).join(", ")))}}},u=m,d=s("2877"),p=s("f09f"),g=s("1c1c"),h=s("3b73"),b=s("4074"),f=s("0170"),q=s("0016"),v=s("a370"),w=s("66e5"),j=s("eebe"),y=s.n(j),O=Object(d["a"])(u,i,o,!1,null,null,null),Q=O.exports;y()(O,"components",{QCard:p["a"],QList:g["a"],QExpansionItem:h["a"],QItemSection:b["a"],QItemLabel:f["a"],QIcon:q["a"],QCardSection:v["a"],QItem:w["a"]});var k={name:"PageWaiterMenu",components:{WaiterMenuManage:Q}},x=k,I=s("9989"),M=Object(d["a"])(x,a,n,!1,null,null,null);t["default"]=M.exports;y()(M,"components",{QPage:I["a"]})}}]);