(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[30],{"2af5":function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",[s("FilterInputText",{staticClass:"q-ma-md",on:{text:function(t){e.filter=t}}}),s("q-list",{attrs:{separator:""}},e._l(e.showing,(function(t,o){return s("q-item",{key:e.h_key("ao-o-",t.id),attrs:{clickable:""},on:{click:function(t){e.show=(e.selected=o,!0)}}},[s("q-item-section",{attrs:{avatar:""}},[s("q-badge",{staticClass:"q-pa-sm",staticStyle:{"font-size":"0.65rem"},attrs:{color:e.color,label:t.id}})],1),s("ItemDetailStackLeft",{staticClass:"col-grow q-mt-sm",attrs:{color:e.color,label:t.date_human}},[e._v(e._s(t.customer?t.customer.name:""))]),s("ItemDetailStackLeft",{staticClass:"q-mt-sm",attrs:{color:e.color,label:t.type}},[e._v(e._s(e.items(t)))]),s("q-item-section",{attrs:{side:""}},[s("q-badge",{staticClass:"q-py-xs q-px-sm",attrs:{label:t.progress,color:e.color,outline:""}})],1)],1)})),1),s("q-dialog",{attrs:{persistent:""},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[e.Token?s("ArchiveTokenDetail",{staticStyle:{"min-width":"80vw"},attrs:{token:e.Token,color:e.color},on:{print:function(t){return e.print(e.Token)}}}):e._e()],1),s("Pagination",{attrs:{records:e.Tokens,color:e.color},model:{value:e.showing,callback:function(t){e.showing=t},expression:"showing"}})],1)},n=[],a=(s("26e9"),s("3758")),i=s("b1c1"),l=s("18cd"),r=s("5843"),c=s("5ab9"),u=s("1799"),m={name:"PageArchiveOrders",components:{Pagination:u["a"],FilterInputText:c["a"],ItemDetailStackLeft:r["a"],ArchiveTokenDetail:l["a"]},mixins:[a["a"]],data(){return{color:"green",selected:null,show:!1,display:["Dining","Take Away","Home Delivery","Other"],filter:"",showing:null}},computed:{AllTokens(){return _(this.tokens_own).filter((({type:e})=>this.display.includes(e))).map((e=>Object.assign({},e,{slug:d(e)}))).sortBy((({date:e})=>Object(i["d"])(e).getTime())).reverse().value()},Tokens(){return this.filter?_.filter(this.AllTokens,(({slug:e})=>_.includes(e,this.filter.toLowerCase()))):this.AllTokens},Token(){return null===this.selected?null:this.showing[this.selected]}},methods:{h_key:i["e"],items({items:e}){return _.truncate(_.map(e,(({item:{name:e}})=>_.truncate(e,{length:13,omission:".."}))).join(", "),{length:64,omission:" etc"})},print({id:e}){post("token","print",{id:e})}}};function d({id:e,customer:t,type:s}){return[e,_.get(t,"name"),s].join(" ").toLowerCase()}var h=m,p=s("2877"),g=s("9989"),k=s("1c1c"),w=s("66e5"),f=s("4074"),b=s("58a8"),v=s("24e8"),T=s("eebe"),q=s.n(T),y=Object(p["a"])(h,o,n,!1,null,null,null);t["default"]=y.exports;q()(y,"components",{QPage:g["a"],QList:k["a"],QItem:w["a"],QItemSection:f["a"],QBadge:b["a"],QDialog:v["a"]})}}]);