(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{f190:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{attrs:{padding:""}},[s("AdministratorMasterCommon",{attrs:{content:"menu",fields:e.fields,label:"name",filter:e.filter,validate:e.validate,items:e.menus,create:"manage",update:"manage",extra:{groups:e.groups}},on:{current:function(t){return e.sGroups(t?t.groups:[])},response:function(t){return e.sGroups([])}}},[s("div",{staticClass:"text-bold q-mt-md q-ml-sm"},[e._v("Choose groups")]),s("AdministratorMasterMenuGroupChoose",{attrs:{groups:e.groups},on:{groups:e.sGroups}})],1)],1)},r=[],i=s("c22d"),o=s("2f62"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-6"},[s("q-list",e._l(e.items,(function(t,a){return a%2?e._e():s("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:t.id,attrs:{tag:"label",clickable:""}},[s("q-item-section",[s("q-item-label",[e._v(e._s(t.name))])],1),s("q-item-section",{attrs:{avatar:""}},[s("q-toggle",{attrs:{color:"blue",val:t.id},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)],1)})),1)],1),s("div",{staticClass:"col-6"},[s("q-list",e._l(e.items,(function(t,a){return a%2?s("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:t.id,attrs:{tag:"label",clickable:""}},[s("q-item-section",[s("q-item-label",[e._v(e._s(t.name))])],1),s("q-item-section",{attrs:{avatar:""}},[s("q-toggle",{attrs:{color:"blue",val:t.id},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)],1):e._e()})),1)],1)])},n=[],u=(s("ddb0"),{name:"AdministratorMasterMenuGroupChoose",props:["groups"],data(){return{selected:[]}},computed:Object(o["d"])("groups",{items:({data:e})=>_.values(e)}),watch:{selected(e){this.$emit("groups",e)},groups(){this.selected=this.groups}}}),c=u,m=s("2877"),d=s("1c1c"),p=s("66e5"),g=s("4074"),v=s("0170"),b=s("9564"),f=s("714f"),q=s("eebe"),h=s.n(q),w=Object(m["a"])(c,l,n,!1,null,null,null),C=w.exports;h()(w,"components",{QList:d["a"],QItem:p["a"],QItemSection:g["a"],QItemLabel:v["a"],QToggle:b["a"]}),h()(w,"directives",{Ripple:f["a"]});var M={name:"PageAdministratorMasterMenu",components:{AdministratorMasterMenuGroupChoose:C,AdministratorMasterCommon:i["a"]},data(){return{fields:{name:"text",detail:"textarea",status:"status"},filter:["name","detail"],validate:["name"],groups:[]}},computed:Object(o["d"])("menus",{menus:"data"}),methods:{sGroups(e){this.groups=e||[]}}},k=M,x=s("9989"),G=Object(m["a"])(k,a,r,!1,null,null,null);t["default"]=G.exports,h()(G,"components",{QPage:x["a"]})}}]);