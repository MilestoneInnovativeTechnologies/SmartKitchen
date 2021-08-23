(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[56],{"16e6":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[i("ReceptionistBillSummary"),i("ReceptionistServableItems"),i("ReceptionistHomeDeliveryStatuses"),i("ReceptionistNonDiningTokens"),i("ReceptionistRemoteTokens")],1)},s=[],r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"row q-col-gutter-xs"},[i("div",{staticClass:"col-xs-6 col-md-3"},[i("DigitMetric",{attrs:{value:e.pending.length,bg:"cyan",text:"white",title:"Pending Bills",icon:"receipt"}})],1),i("div",{staticClass:"col-xs-6 col-md-3"},[i("DigitMetric",{attrs:{value:e.pending_amount,bg:"orange",text:"white",title:"Pending Amount",icon:"request_quote"}})],1),i("div",{staticClass:"col-xs-6 col-md-3"},[i("DigitMetric",{attrs:{value:e.paid.length,bg:"lime",text:"white",title:"Paid Bills",icon:"file_copy"}})],1),i("div",{staticClass:"col-xs-6 col-md-3"},[i("DigitMetric",{attrs:{value:e.paid_amount,bg:"green",text:"white",title:"Total Payments",icon:"payments"}})],1)])},a=[],o=i("84ba"),l=i("58d1"),c=i("b1c1"),d={name:"ReceptionistBillSummary",components:{DigitMetric:o["a"]},mixins:[l["a"]],computed:{today(){return _(this.bills).filter((({date:e})=>Object(c["l"])(e))).value()},pending(){return _(this.today).filter(["progress","Pending"]).value()},pending_amount(){return _.sumBy(this.pending,(({payable:e})=>_.toNumber(e)))},paid(){return _(this.today).filter((({progress:e})=>["Paid","Partial"].includes(e))).value()},paid_amount(){return _.sumBy(this.paid,(({paid:e})=>_.toNumber(e)))}}},m=d,u=i("2877"),p=Object(u["a"])(m,r,a,!1,null,null,null),g=p.exports,v=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-card",[i("q-card-section",{staticClass:"bg-grey-2 row justify-between text-bold"},[i("div",[e._v("Non Dining Orders")]),e.oTokens.length?i("div",[e._v(e._s(e.oTokens.length))]):e._e()]),i("q-card-section",{staticClass:"q-pa-xs"},[i("Masonry",{attrs:{items:e.oTokens,width:"260"},scopedSlots:e._u([{key:"item",fn:function(e){return[i("OrderSummaryReceptionistOrder",{attrs:{id:e.id}})]}}])})],1)],1)},h=[],b=i("3758"),y=i("3b1b"),k=i("c624"),f={name:"ReceptionistNonDiningTokens",components:{Masonry:k["a"],OrderSummaryReceptionistOrder:y["a"]},mixins:[b["a"]],data(){return{activeProgress:["New","Processing","Completed","Billed","Pending"],displayTypes:["Take Away","Home Delivery","Sale","Other"]}},computed:{oTokens(){return _(this.tokens).filter((({type:e,progress:t})=>this.displayTypes.includes(e)&&this.activeProgress.includes(t))).value()}},methods:{hKey({id:e}){return Object(c["d"])("receptionist","non","dining","token",e)}}},q=f,w=i("f09f"),x=i("a370"),S=i("eebe"),T=i.n(S),C=Object(u["a"])(q,v,h,!1,null,null,null),O=C.exports;T()(C,"components",{QCard:w["a"],QCardSection:x["a"]});var R=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-card",[i("q-card-section",{staticClass:"row justify-between text-bold bg-green text-white"},[i("div",[e._v("Servable Items")]),e.items.length>0?i("div",[e._v(e._s(e.items.length))]):e._e()]),e.items.length?i("q-list",{attrs:{separator:"",bordered:""}},e._l(e.items,(function(t){return i("q-item",{key:"order-receptionist-servable-item-"+t.id},[i("q-item-section",[i("q-item-label",[e._v(e._s(t.quantity)+" X "+e._s(t.item?t.item.name:""))]),i("q-item-label",{attrs:{caption:""}},[i("q-icon",{attrs:{name:"outdoor_grill"}}),e._v(" "+e._s(t.kitchen?t.kitchen.name:""))],1),i("q-item-label",{attrs:{caption:""}},[i("q-icon",{attrs:{name:"event_seat"}}),e._v(" "+e._s(e.SeatingName(t.token)))],1),i("q-item-label",{staticClass:"text-bold",attrs:{caption:""}},[i("q-icon",{attrs:{name:"account_box"}}),e._v(" "+e._s(t.user?t.user.name:""))],1)],1),i("q-item-section",{attrs:{side:""}},[i("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.itemTiming(t.progress_timing))+" ago")])],1),i("q-item-section",{attrs:{side:""}},[i("q-btn",{attrs:{icon:"how_to_reg",color:"positive",round:"",dense:""},on:{click:function(i){return e.served(t.id)}}})],1),e.serving.includes(t.id)?i("q-inner-loading",{attrs:{showing:!0}},[i("q-spinner-facebook",{attrs:{color:"primary",size:"2em"}})],1):e._e()],1)})),1):i("q-card-section",{staticClass:"text-center"},[e._v("NO ITEMS")])],1)},Q=[],D=(i("5db7"),i("73d9"),{name:"ReceptionistServableItems",mixins:[b["a"]],data(){return{now:0,serving:[]}},computed:{items(){return _.flatMap(this.tokens_own,(e=>"Dining"!==e.type?[]:_.filter(e.items,["progress","Completed"])))}},methods:{SeatingName(e){return _.get(_.find(this.tokens,["id",e]),["seating","name"])},itemTiming(e){let t=this.now-_.get(_.last(e),"time");return t<60?t+" seconds":t<3600?_.toInteger(t/60)+" minutes":_.toInteger(t/3600)+" hours"},served(e){this.serving.push(e),post("token","served",{id:e}).then((()=>this.serving=_.difference(this.serving,[e])))}},created(){setInterval((e=>e.now=_.toInteger((new Date).getTime()/1e3)),1e3,this)},watch:{items(e,t){(!t||t.length<e.length)&&Object(c["a"])()}}}),I=D,j=i("1c1c"),P=i("66e5"),B=i("4074"),M=i("0170"),N=i("0016"),E=i("9c40"),H=i("74f7"),$=i("e669"),L=Object(u["a"])(I,R,Q,!1,null,null,null),A=L.exports;T()(L,"components",{QCard:w["a"],QCardSection:x["a"],QList:j["a"],QItem:P["a"],QItemSection:B["a"],QItemLabel:M["a"],QIcon:N["a"],QBtn:E["a"],QInnerLoading:H["a"],QSpinnerFacebook:$["a"]});var J=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.rTokens.length?i("q-card",[i("q-card-section",{staticClass:"bg-grey-2 row justify-between text-bold"},[i("div",[e._v("Remote Orders")]),i("div",[e._v(e._s(e.rTokens.length))])]),i("q-card-section",{staticClass:"q-pa-xs"},[i("Masonry",{attrs:{items:e.rTokens,width:"260"},scopedSlots:e._u([{key:"item",fn:function(e){return[i("OrderSummaryReceptionistOrder",{attrs:{id:e.id}})]}}],null,!1,3087263980)})],1)],1):e._e()},K=[],z={name:"ReceptionistRemoteTokens",components:{Masonry:k["a"],OrderSummaryReceptionistOrder:y["a"]},mixins:[b["a"]],data(){return{}},computed:{rTokens(){return _(this.tokens_remote).filter((({items:e})=>_.some(e,(({progress:e})=>"Completed"===e)))).value()}},methods:{hKey({id:e}){return Object(c["d"])("receptionist","remote","token",e)}}},F=z,X=Object(u["a"])(F,J,K,!1,null,null,null),G=X.exports;T()(X,"components",{QCard:w["a"],QCardSection:x["a"]});var U=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-card",[i("q-card-section",{staticClass:"bg-deep-purple text-white row justify-between text-bold"},[i("div",[e._v("Home Delivery Statuses")]),e.Tokens.length?i("div",[e._v(e._s(e.Tokens.length))]):e._e()]),i("OrderSummaryDeliveryBoy",{attrs:{tokens:e.Tokens,kitchen:"",user:""}})],1)},V=[],W=i("db7a"),Y={name:"ReceptionistHomeDeliveryStatuses",mixins:[l["a"]],components:{OrderSummaryDeliveryBoy:W["a"]},computed:{Tokens(){return _(this.tokens).filter(["type","Home Delivery"]).filter((({progress:e})=>!["Paid","Cancelled"].includes(e))).value()},token_ids(){return _.map(this.Tokens,"id")},Bills(){return _(this.bills).filter((e=>_.includes(this.token_ids,e.token.id))).keyBy("token.id").value()}},methods:{image:c["g"]}},Z=Y,ee=i("cb32"),te=i("068f"),ie=Object(u["a"])(Z,U,V,!1,null,null,null),ne=ie.exports;T()(ie,"components",{QCard:w["a"],QCardSection:x["a"],QList:j["a"],QItem:P["a"],QItemSection:B["a"],QAvatar:ee["a"],QImg:te["a"],QItemLabel:M["a"]});var se={name:"PageReceptionistIndex",components:{ReceptionistRemoteTokens:G,ReceptionistServableItems:A,ReceptionistNonDiningTokens:O,ReceptionistBillSummary:g,ReceptionistHomeDeliveryStatuses:ne}},re=se,ae=i("9989"),oe=Object(u["a"])(re,n,s,!1,null,null,null);t["default"]=oe.exports;T()(oe,"components",{QPage:ae["a"]})}}]);