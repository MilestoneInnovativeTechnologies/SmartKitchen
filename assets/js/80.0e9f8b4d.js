(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[80],{"90ad":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{staticClass:"q-gutter-y-md",attrs:{padding:""}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-6"},[s("FilterInputText",{on:{text:function(e){t.filter=e}}})],1),s("div",{staticClass:"col-6 q-gutter-xs q-px-sm"},[s("q-btn",{attrs:{rounded:"",glossy:"",push:"",size:"sm",color:""==t.filter?"positive":"grey",label:"All"},on:{click:function(e){t.filter=""}}}),s("q-btn",{attrs:{rounded:"",glossy:"",push:"",size:"sm",color:"Vacant"==t.filter?"positive":"grey",label:"Vacant"},on:{click:function(e){t.filter="Vacant"==t.filter?"":"Vacant"}}}),s("q-btn",{attrs:{rounded:"",glossy:"",push:"",size:"sm",color:"Busy"==t.filter?"positive":"grey",label:"Busy"},on:{click:function(e){t.filter="Busy"==t.filter?"":"Busy"}}}),s("q-btn",{attrs:{rounded:"",glossy:"",push:"",size:"sm",color:"New"==t.filter?"positive":"grey",label:"New/Just"},on:{click:function(e){t.filter="New"==t.filter?"":"New"}}}),s("q-btn",{attrs:{rounded:"",glossy:"",push:"",size:"sm",color:"Processing"==t.filter?"positive":"grey",label:"Processing"},on:{click:function(e){t.filter="Processing"==t.filter?"":"Processing"}}}),s("q-btn",{attrs:{rounded:"",glossy:"",push:"",size:"sm",color:"Completed"==t.filter?"positive":"grey",label:"Completed"},on:{click:function(e){t.filter="Completed"==t.filter?"":"Completed"}}}),s("q-btn",{attrs:{rounded:"",glossy:"",push:"",size:"sm",color:"Billed"==t.filter?"positive":"grey",label:"Billed"},on:{click:function(e){t.filter="Billed"==t.filter?"":"Billed"}}})],1)]),s("Masonry",{attrs:{items:t.filtered},scopedSlots:t._u([{key:"item",fn:function(e){return[s("SeatStatusPreview",t._b({},"SeatStatusPreview",e,!1))]}}])})],1)},i=[],r=s("2f62"),l=s("5ab9"),n=s("b1c1"),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"q-pa-xs",class:t.clrCls}),s("q-card-section",{attrs:{horizontal:""}},[s("CardImageTitle",{attrs:{image:t.img,title:t.p("status")}}),s("q-card-section",{staticClass:"col-7 q-pa-xs"},[s("div",{staticClass:"text-bold"},[t._v(t._s(t.p("name")))]),t.p("token")&&"Vacant"!==t.p("status")?t._e():s("div",[s("q-btn",{staticClass:"block no-border-radius",attrs:{color:"teal-7",size:"sm",label:"New Order",to:{name:"seat_status_order",params:{seating:t.p("id"),price_list:t.p("price_list")}}}})],1),t.p("token")&&"Vacant"!==t.p("status")?s("q-list",{attrs:{dense:""}},[t.p("token")?s("SeatStatusPreviewTokenDetailItem",{attrs:{icon:"description",label:t.p("token")}}):t._e(),t.p("waiter")?s("SeatStatusPreviewTokenDetailItem",{attrs:{icon:"person",label:t.p("customer")}}):t._e(),t.p("waiter")?s("SeatStatusPreviewTokenDetailItem",{attrs:{icon:"trending_up",label:t.p("progress")}}):t._e()],1):t._e()],1)],1)],1)},c=[],u=s("43fa"),p=s("232e"),d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-item",t._b({staticStyle:{"padding-left":"0px !important"}},"q-item",t.$attrs,!1),[s("q-item-section",{staticClass:"q-px-none",staticStyle:{"min-width":"1.5rem",height:"1.5rem"},attrs:{avatar:""}},[s("q-icon",{attrs:{name:t.icon,size:"xs"}})],1),s("q-item-section",[s("q-item-label",{staticClass:"q-mb-none text-caption",attrs:{lines:"2"}},[t._v(t._s(t.label))])],1)],1)},m=[],f={name:"SeatStatusPreviewTokenDetailItem",props:["icon","label"]},b=f,g=s("2877"),v=s("66e5"),h=s("4074"),q=s("0016"),y=s("0170"),S=s("eebe"),w=s.n(S),k=Object(g["a"])(b,d,m,!1,null,null,null),C=k.exports;w()(k,"components",{QItem:v["a"],QItemSection:h["a"],QIcon:q["a"],QItemLabel:y["a"]});var x={name:"SeatStatusPreview",components:{SeatStatusPreviewTokenDetailItem:C,CardImageTitle:u["a"]},data(){return{img:Object(n["g"])(this.$attrs.image)}},computed:{clrCls(){return"bg-"+p["SeatStatusCardColor"][this.p("status")]}},methods:{p(t){return _.get(this.$attrs,t)}}},P=x,I=s("f09f"),B=s("a370"),z=s("9c40"),Q=s("1c1c"),T=Object(g["a"])(P,o,c,!1,null,null,null),O=T.exports;w()(T,"components",{QCard:I["a"],QCardSection:B["a"],QBtn:z["a"],QList:Q["a"]});var j=s("9ee2"),V=s("c624"),$={name:"PageSeatingStatus",components:{Masonry:V["a"],SeatStatusPreview:O,FilterInputText:l["a"]},data(){return{filter:""}},mixins:[j["a"]],computed:Object(r["d"])({bills({bills:{data:t}}){return _(t).filter((({progress:t})=>"Cancelled"!==t)).keyBy("token").mapValues("progress").value()},filtered(){return this.filter?_.filter(this.seats,this.match):this.seats}}),methods:{hKey({id:t}){return Object(n["d"])("seat","status","seat",t)},match(t){return Object(n["o"])(t,["name","status","customer","phone","progress","waiter","price","token"],this.filter)}}},D=$,N=s("9989"),E=Object(g["a"])(D,a,i,!1,null,null,null);e["default"]=E.exports,w()(E,"components",{QPage:N["a"],QBtn:z["a"]})}}]);