(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[42],{8439:function(e,t,i){"use strict";i.r(t);var l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{attrs:{padding:""}},[i("div",{staticClass:"row q-col-gutter-xs"},[i("div",{staticClass:"col-xs-12 col-sm-6"},[i("DigitMetric",{attrs:{value:e.tokens_own.length,bg:"cyan",text:"white",title:"Own Orders",icon:"receipt"}})],1),i("div",{staticClass:"col-xs-6 lt-sm"},[i("DigitMetric",{attrs:{value:e.deliverable.length,bg:"orange",text:"white",title:"Deliverable",icon:"delivery_dining"}})],1),i("div",{staticClass:"col-xs-6"},[i("DigitMetric",{attrs:{value:e.delivered.length,bg:"green",text:"white",title:"Delivered",icon:"done_all"}})],1),i("div",{staticClass:"col-xs-6 col-sm-4"},[i("DigitMetric",{attrs:{value:e.processing.length,bg:"blue-grey",text:"white",title:"Processing",icon:"memory"}})],1),i("div",{staticClass:"col-xs-6 col-sm-4"},[i("DigitMetric",{attrs:{value:e.Billable.length,bg:"red",text:"white",title:"Billable",icon:"request_quote"}})],1),i("div",{staticClass:"col-xs-6 col-sm-4 gt-xs"},[i("DigitMetric",{attrs:{value:e.deliverable.length,bg:"orange",text:"white",title:"Deliverable",icon:"delivery_dining"}})],1),i("div",{staticClass:"col-xs-6"},[i("DigitMetric",{attrs:{value:e.Payments,bg:"light-green",text:"white",title:"Total Payments",icon:"account_balance_wallet"}})],1),i("div",{staticClass:"col-xs-6"},[i("DigitMetric",{attrs:{value:e.Tokens.length,bg:"deep-purple",text:"white",title:"Total Orders",icon:"format_list_numbered"}})],1)]),i("q-list",[e.processing.length?i("q-item-label",{attrs:{header:""}},[e._v("Processing Orders")]):e._e(),i("OrderSummaryDeliveryBoy",{attrs:{tokens:e.processing,kitchen:"",separator:""}}),e.Billable.length?i("q-item-label",{attrs:{header:""}},[e._v("Billable Orders")]):e._e(),i("OrderSummaryDeliveryBoy",{attrs:{tokens:e.Billable,separator:""}}),e.deliverable.length?i("q-item-label",{attrs:{header:""}},[e._v("Deliverable Orders")]):e._e(),i("OrderSummaryDeliveryBoy",{attrs:{tokens:e.deliverable,address:"",separator:""}})],1)],1)},s=[],r=i("3758"),a=i("58d1"),n=i("b1c1"),o=i("84ba"),d=i("db7a"),c=i("232e"),g={name:"PageDeliveryBoyIndex",components:{OrderSummaryDeliveryBoy:d["a"],DigitMetric:o["a"]},mixins:[r["a"],a["a"]],data(){return{me:parseInt(this.$route.meta.me.id)}},computed:{Tokens(){return _(this.tokens).filter(["type","Home Delivery"]).map((e=>e.customer?e:Object.assign({},e,{customer:c["NoCustomer"]}))).value()},bills_today(){return _(this.bills).filter((({date:e})=>Object(n["l"])(e))).value()},bills_own(){return _.filter(this.bills_today,["user.id",this.me])},token_bill(){return _(this.Tokens).mapKeys((({id:e})=>parseInt(e))).mapValues(((e,t)=>_.get(_.find(this.bills,["token.id",parseInt(t)]),"id",null))).value()},Billable(){return _.filter(this.Tokens,(({id:e,items:t})=>u(t)&&!_.get(this.token_bill,parseInt(e))))},Payments(){return _.sumBy(this.bills_own,(({paid:e})=>_.toNumber(e)))},tokens_own(){return _.filter(this.Tokens,(({user:e,id:t})=>_.get(this.token_bill,t)?_.find(this.bills_own,["id",_.get(this.token_bill,t)]):e===this.me))},deliverable(){return _(this.tokens_own).filter((({id:e})=>_.get(this.token_bill,parseInt(e))&&"Pending"===_.get(_.find(this.bills,["id",_.get(this.token_bill,parseInt(e))]),"progress"))).value()},processing(){return _.filter(this.tokens_own,(({items:e})=>!u(e)))},delivered(){return _(this.tokens_own).filter((({id:e})=>_.get(this.token_bill,parseInt(e)))).filter((({id:e})=>"Pending"!==_.get(_.find(this.bills,["id",_.get(this.token_bill,e)]),"progress"))).value()}}};function u(e){return e.length&&_.every(e,(({progress:e})=>_.includes(["Cancelled","Completed","Served"],e)))}var b=g,h=i("2877"),v=i("9989"),m=i("1c1c"),p=i("0170"),y=i("eebe"),k=i.n(y),w=Object(h["a"])(b,l,s,!1,null,null,null);t["default"]=w.exports;k()(w,"components",{QPage:v["a"],QList:m["a"],QItemLabel:p["a"]})}}]);