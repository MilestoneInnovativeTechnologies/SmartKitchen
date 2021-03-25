(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{"22b3":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{attrs:{padding:""}},[s("Masonry",{attrs:{width:"300",items:t.pBills},scopedSlots:t._u([{key:"item",fn:function(e){return[s("BillDetailCard",t._b({},"BillDetailCard",e,!1))]}}])})],1)},a=[],n=s("b1c1"),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"q-pa-xs",class:t.bgCls}),s("q-list",{attrs:{dense:""}},[t._l(t.header,(function(e,i){return s("q-item",{key:t.hKey("header",e),attrs:{dense:""}},[s("q-item-section",[t._v(t._s(i))]),s("q-item-section",{attrs:{side:""}},[t._v(t._s(t.attrs(e)))])],1)})),s("q-item",[s("q-item-section",[t._v("Customer")]),s("q-item-section",{attrs:{side:""}},[t._v(t._s(t.customer))])],1)],2),s("q-list",{attrs:{bordered:""}},t._l(t.contents,(function(e){return s("q-item",{key:t.hKey("content",e.id)},[s("q-item-section",[s("q-item-label",[t._v(t._s(e.name))]),s("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.quantity)+" x "+t._s(t.precision(e.price)))]),e.tax?s("q-item-section",[s("q-item-label",{attrs:{caption:""}},[t._v("\n            "+t._s(e.tax.name)+" "+t._s(t.precision(e.tax.amount))+" @"+t._s(e.tax.percent)+"%\n          ")]),t._l(e.tax.contents,(function(e){return s("q-item-label",{key:t.hKey("tax",Math.random()),attrs:{caption:""}},[t._v("\n            - "+t._s(e.name)+" "+t._s(t.precision(e.amount))+" @"+t._s(e.percent)+"%\n          ")])}))],2):t._e()],1),s("q-item-section",{attrs:{side:""}},[s("q-item-label",[t._v(t._s(t.precision(t.getTotal(e))))])],1)],1)})),1),s("q-list",{attrs:{dense:"",bordered:""}},[s("q-item",{attrs:{dense:""}},[s("q-item-section",[t._v("Sub Total")]),s("q-item-section",{staticClass:"text-bold",attrs:{side:""}},[t._v(t._s(t.precision(t.total)))])],1),s("q-item",{attrs:{dense:""}},[s("q-item-section",[t._v("Discount")]),s("q-item-section",{staticClass:"text-bold",attrs:{side:""}},[t._v(t._s(t.precision(t.discount)))])],1),s("q-item",{staticStyle:{"font-size":"1rem"},attrs:{dense:""}},[s("q-item-section",[t._v("Net Payable")]),s("q-item-section",{staticClass:"text-bold",attrs:{side:""}},[t._v(t._s(t.precision(t.attrs("payable"))))])],1),t.paid>0?s("q-item",{staticStyle:{"font-size":"1rem"},attrs:{dense:""}},[s("q-item-section",[t._v("Total Paid")]),s("q-item-section",{staticClass:"text-bold",attrs:{side:""}},[t._v(t._s(t.precision(t.paid)))])],1):t._e()],1),s("q-card-actions",{staticClass:"q-gutter-y-xs",attrs:{vertical:"",align:"center"}},[s("q-input",{staticClass:"full-width",attrs:{dense:"",outlined:"",type:"number",label:"Amount"},model:{value:t.amount,callback:function(e){t.amount=t._n(e)},expression:"amount"}}),s("q-btn",{staticClass:"full-width",attrs:{label:"Make Payment",color:"primary",loading:t.loading},on:{click:t.pay}})],1),s("q-inner-loading",{attrs:{showing:t.loading}},[s("q-spinner-facebook",{attrs:{color:"primary",size:"2em"}})],1)],1)},o=[],l=s("232e"),c={name:"BillDetailCard",data(){return{header:{"Bill ID":"id",Token:"token.id",Type:"token.type",Date:"date"},amount:0,loading:!1}},computed:{type(){return _.get(this.$attrs,["token","type"],"")},customer(){return _.get(this.$attrs,["customer","name"],"")},bgCls(){return"bg-"+l["a"][this.type]},contents(){return _.get(this.$attrs,"contents",[])},total(){return _.sum(_.map(this.contents,this.getTotal))},discount(){return _.sum(_.map(this.contents,(({discount:t})=>_.toNumber(t))))},paid(){return _.toNumber(_.get(this.$attrs,"paid"))},balance(){return this.total-this.discount-this.paid}},methods:{hKey(t,e){return Object(n["b"])("bill",this.attrs("id"),"details",t,e)},attrs(t){return _.get(this.$attrs,t)},precision(t){return Object(n["j"])(t)},getTotal({price:t,quantity:e}){return _.toNumber(t)*_.toNumber(e)},pay(){if(this.loading=!0,!this.attrs("id")||!this.amount)return this.loading=!1;let t={bill:this.attrs("id"),amount:this.amount};post("payment","create",t).then().catch().then((()=>this.loading=!1))}},created(){this.amount=_.toNumber(this.balance)}},d=c,m=s("2877"),u=s("f09f"),p=s("a370"),b=s("1c1c"),h=s("66e5"),q=s("4074"),g=s("0170"),y=s("4b7e"),f=s("27f9"),v=s("9c40"),C=s("74f7"),x=s("e669"),k=s("eebe"),Q=s.n(k),w=Object(m["a"])(d,r,o,!1,null,null,null),B=w.exports;Q()(w,"components",{QCard:u["a"],QCardSection:p["a"],QList:b["a"],QItem:h["a"],QItemSection:q["a"],QItemLabel:g["a"],QCardActions:y["a"],QInput:f["a"],QBtn:v["a"],QInnerLoading:C["a"],QSpinnerFacebook:x["a"]});var P=s("58d1"),D=s("c624"),S={name:"PageBillPending",mixins:[P["a"]],components:{Masonry:D["a"],BillDetailCard:B},computed:{pBills(){return _.filter(this.bills,(({progress:t})=>["Pending","Partial"].includes(t)))}},methods:{hKey({id:t}){return Object(n["b"])("bill","details","bill",t)}}},T=S,$=s("9989"),j=Object(m["a"])(T,i,a,!1,null,null,null);e["default"]=j.exports,Q()(j,"components",{QPage:$["a"]})}}]);