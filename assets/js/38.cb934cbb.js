(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[38],{"416a":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[a("q-select",{attrs:{outlined:"",dense:"","input-debounce":"0",options:e.types,label:"Select Type"},model:{value:e.params.type,callback:function(t){e.$set(e.params,"type",t)},expression:"params.type"}}),e.required.includes("Seating")?a("SeatSelectDropDown",{attrs:{outlined:"",dense:"","input-debounce":"0",label:"Select Seat"},model:{value:e.seat,callback:function(t){e.seat=t},expression:"seat"}}):e._e(),e.required.includes("PriceList")?a("PriceListSelectDropDown",{attrs:{outlined:"",dense:"","input-debounce":"0",label:"Select Price List",get:"id"},model:{value:e.params.price_list,callback:function(t){e.$set(e.params,"price_list",t)},expression:"params.price_list"}}):e._e(),e.required.includes("Waiter")?a("WaiterSelectDropDown",{attrs:{outlined:"",dense:"","input-debounce":"0",label:"Select Waiter",get:"id"},model:{value:e.params.user,callback:function(t){e.$set(e.params,"user",t)},expression:"params.user"}}):e._e(),e.required.includes("Customer")?a("OrderCustomer",{attrs:{get:"id"},model:{value:e.params.customer,callback:function(t){e.$set(e.params,"customer",t)},expression:"params.customer"}}):e._e(),a("q-btn",{staticClass:"full-width",attrs:{label:"Proceed",glossy:"",color:"primary",to:{name:"receptionist_order_new_items",params:e.params}}})],1)},r=[],n=a("9708"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-select",e._b({attrs:{options:e.options,value:e.optValue},on:{input:e.doEmit}},"q-select",e.$attrs,!1))},i=[],o=a("9ee2"),c=a("2071"),u={name:"SeatSelectDropDown",mixins:[o["a"],c["a"]],computed:{options(){return _.map(this.seats,(e=>Object.assign({},e,{label:this.getName(e),value:e.id})))}},methods:{getName(e){return this.name?this.name(e):[e.name," (",e.status,")"].join("")}}},p=u,m=a("2877"),d=a("ddd8"),b=a("eebe"),g=a.n(b),D=Object(m["a"])(p,l,i,!1,null,null,null),S=D.exports;g()(D,"components",{QSelect:d["a"]});var w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-select",e._b({attrs:{options:e.options,value:e.optValue},on:{input:e.doEmit}},"q-select",e.$attrs,!1))},h=[],v={name:"WaiterSelectDropDown",mixins:[c["a"]],computed:{options(){return _(this.$store.state.users.data).filter(["role","Waiter"]).map((e=>Object.assign({},e,{label:this.getName(e),value:e.id}))).value()}}},f=v,q=Object(m["a"])(f,w,h,!1,null,null,null),y=q.exports;g()(q,"components",{QSelect:d["a"]});var x=a("232e"),$=a("9061"),O={name:"PageReceptionistOrderNew",components:{PriceListSelectDropDown:$["a"],WaiterSelectDropDown:y,SeatSelectDropDown:S,OrderCustomer:n["a"]},data(){return{params:{type:"Dining",seating:null,customer:null,price_list:null,user:null},seat:null,types:["Dining","Home Delivery","Take Away","Other"]}},computed:{required(){return x["c"][this.params.type||"Dining"]}},methods:{},watch:{seat({id:e,price_list:t}){this.params.seating=e,this.params.price_list=t}}},k=O,P=a("9989"),j=a("9c40"),W=Object(m["a"])(k,s,r,!1,null,null,null);t["default"]=W.exports,g()(W,"components",{QPage:P["a"],QSelect:d["a"],QBtn:j["a"]})}}]);