(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[30],{"2af5":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("q-list",{attrs:{separator:""}},e._l(e.Tokens,(function(t,s){return a("q-item",{key:e.h_key("ao-o-",t.id),attrs:{clickable:""},on:{click:function(t){e.show=(e.selected=s,!0)}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{rounded:"",size:"md","text-color":"white",color:"green"}},[e._v(e._s(t.id))])],1),a("ItemDetailStackLeft",{staticClass:"col-grow q-mt-sm",attrs:{color:e.color,label:t.date_human}},[e._v(e._s(t.customer?t.customer.name:""))]),a("ItemDetailStackLeft",{staticClass:"q-mt-sm",attrs:{color:e.color,label:t.type}},[e._v(e._s(e.items(t)))]),a("q-item-section",{attrs:{side:""}},[a("q-badge",{staticClass:"q-py-xs q-px-sm",attrs:{label:t.progress,color:e.color,outline:""}})],1)],1)})),1),a("q-dialog",{attrs:{persistent:""},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[e.Token?a("ArchiveTokenDetail",{staticStyle:{"min-width":"80vw"},attrs:{token:e.Token,color:e.color}}):e._e()],1)],1)},o=[],n=(a("26e9"),a("3758")),i=a("b1c1"),r=a("18cd"),l=a("5843"),c={name:"PageArchiveOrders",components:{ItemDetailStackLeft:l["a"],ArchiveTokenDetail:r["a"]},mixins:[n["a"]],data(){return{color:"green",selected:null,show:!1,display:["Dining","Take Away","Home Delivery","Other"]}},computed:{Tokens(){return _(this.tokens_own).filter((({type:e})=>this.display.includes(e))).sortBy((({date:e})=>Object(i["c"])(e).getTime())).reverse().value()},Token(){return null===this.selected?null:this.Tokens[this.selected]}},methods:{h_key:i["d"],items({items:e}){return _.truncate(_.map(e,(({item:{name:e}})=>_.truncate(e,{length:13,omission:".."}))).join(", "),{length:64,omission:" etc"})}}},m=c,d=a("2877"),u=a("9989"),h=a("1c1c"),k=a("66e5"),p=a("4074"),w=a("cb32"),g=a("58a8"),v=a("24e8"),b=a("eebe"),f=a.n(b),q=Object(d["a"])(m,s,o,!1,null,null,null);t["default"]=q.exports;f()(q,"components",{QPage:u["a"],QList:h["a"],QItem:k["a"],QItemSection:p["a"],QAvatar:w["a"],QBadge:g["a"],QDialog:v["a"]})}}]);