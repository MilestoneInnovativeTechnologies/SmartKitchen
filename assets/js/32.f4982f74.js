(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[32],{"07c1":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",[s("FilterInputText",{staticClass:"q-ma-md",on:{text:function(e){t.filter=e}}}),s("q-list",{attrs:{separator:""}},t._l(t.showing,(function(e,o){return s("q-item",{key:t.h_key("ar-r-",e.id),attrs:{clickable:""},on:{click:function(e){t.show=(t.selected=o,!0)}}},[s("q-item-section",{attrs:{avatar:""}},[s("q-badge",{staticClass:"q-pa-sm",staticStyle:{"font-size":"0.65rem"},attrs:{color:t.color,label:e.id}})],1),s("ItemDetailStackLeft",{staticClass:"col-grow q-mt-sm",attrs:{color:t.color,label:e.date_human}},[t._v(t._s(e.customer?e.customer.name:""))]),s("ItemDetailStackLeft",{staticClass:"q-mt-sm",attrs:{color:t.color,label:"Items"}},[t._v(t._s(t.items(e)))]),s("q-item-section",{attrs:{side:""}},[s("q-badge",{staticClass:"q-py-xs q-px-sm",attrs:{label:e.progress,color:t.color,outline:""}})],1)],1)})),1),s("q-dialog",{attrs:{persistent:""},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[t.Token?s("ArchiveTokenDetail",{staticStyle:{"min-width":"80vw"},attrs:{token:t.Token,color:t.color},on:{print:function(e){return t.print(t.Token)}}}):t._e()],1),s("Pagination",{attrs:{records:t.Tokens,color:t.color},model:{value:t.showing,callback:function(e){t.showing=e},expression:"showing"}})],1)},n=[],a=(s("26e9"),s("3758")),i=s("b1c1"),l=s("18cd"),r=s("5843"),c=s("5ab9"),m=s("1799"),u={name:"PageArchiveRemote",components:{Pagination:m["a"],FilterInputText:c["a"],ItemDetailStackLeft:r["a"],ArchiveTokenDetail:l["a"]},mixins:[a["a"]],data(){return{color:"indigo",selected:null,show:!1,filter:"",showing:null}},computed:{AllTokens(){return _(this.tokens_own).filter(["type","Remote"]).map((t=>Object.assign({},t,{slug:d(t)}))).sortBy((({date:t})=>Object(i["d"])(t).getTime())).reverse().value()},Tokens(){return this.filter?_.filter(this.AllTokens,(({slug:t})=>_.includes(t,this.filter.toLowerCase()))):this.AllTokens},Token(){return null===this.selected?null:this.showing[this.selected]}},methods:{h_key:i["e"],items({items:t}){return _.truncate(_.map(t,(({item:{name:t}})=>_.truncate(t,{length:14,omission:".."}))).join(","),{length:64,omission:" etc"})},print({id:t}){post("token","print",{id:t})}}};function d({id:t,customer:e,type:s}){return[t,_.get(e,"name"),s].join(" ").toLowerCase()}var h=u,p=s("2877"),g=s("9989"),k=s("1c1c"),w=s("66e5"),f=s("4074"),b=s("58a8"),q=s("24e8"),v=s("eebe"),T=s.n(v),x=Object(p["a"])(h,o,n,!1,null,null,null);e["default"]=x.exports;T()(x,"components",{QPage:g["a"],QList:k["a"],QItem:w["a"],QItemSection:f["a"],QBadge:b["a"],QDialog:q["a"]})}}]);