(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[44],{"1c7d":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("q-page",[t("q-card",{staticClass:"q-mt-smq",attrs:{square:""}},[t("q-card-section",{staticClass:"text-center q-py-xs text-white",class:"bg-"+e.clr,staticStyle:{"font-size":"0.75rem"}},[e._v("Total "),t("span",{staticClass:"text-bold"},[e._v(e._s(e.idx))]),e._v(" Payments")]),t("q-card-section",{staticClass:"text-center text-bold text-h2 cursor-pointer",class:"text-"+e.clr,nativeOn:{click:function(t){return e.next.apply(null,arguments)}}},[e._v(e._s(e.precision(e.Totals[e.idx]||0)))]),t("q-separator",{directives:[{name:"show",rawName:"v-show",value:e.Showing.length,expression:"Showing.length"}],staticClass:"q-mb-sm"}),t("q-list",{attrs:{separator:""}},e._l(e.Showing,(function(s){return t("q-item",{key:"dbp-"+s.id},[t("q-item-section",{attrs:{avatar:""}},[t("q-avatar",{attrs:{rounded:""}},[t("q-img",{attrs:{src:e.image(s.customer.image)}})],1)],1),t("q-item-section",[t("q-item-label",{staticClass:"text-bold"},[e._v(e._s(s.token)+", "+e._s(s.customer.name))]),t("q-item-label",{attrs:{caption:"",lines:"1"}},[e._v(e._s(s.bill)+" - "+e._s(s.items))]),t("q-item-label",{class:"text-"+e.clr,attrs:{caption:""}},[e._v(e._s(s.type)+" Payment")])],1),t("q-item-section",{attrs:{side:""}},[t("q-item-label",{staticClass:"text-bold",class:"text-"+e.clr},[e._v(e._s(e.precision(s.amount)))])],1)],1)})),1),t("q-separator",{directives:[{name:"show",rawName:"v-show",value:e.more,expression:"more"}]}),t("q-card-actions",{directives:[{name:"show",rawName:"v-show",value:e.more,expression:"more"}],staticClass:"q-px-none"},[t("q-btn",{staticClass:"full-width",attrs:{label:"Load More",flat:"",dense:"",color:"amber"},on:{click:function(t){e.page++}}})],1),t("q-card-section",{directives:[{name:"show",rawName:"v-show",value:!e.more,expression:"!more"}],staticClass:"q-py-xs",class:"bg-"+e.clr})],1)],1)},i=[],r=(s("caad"),s("58d1")),n=s("b1c1"),o=s("232e"),l={name:"DeliveryBoyPayments",mixins:[r["a"]],data(){return{me:parseInt(this.$route.meta.me.id),mode:0,page:1}},computed:{Bills(){return _(this.bills).filter((({date:e,progress:t,token:{type:s}})=>"Home Delivery"===s&&["Partial","Paid"].includes(t)&&Object(n["o"])(e))).filter(["user.id",this.me]).value()},Payments(){return _(this.Bills).flatMap((e=>_.map(e.payments,(t=>"Active"===t.status?Object.assign({},t,{token:e.token.id,customer:e.customer,items:c(e.token.items)}):null)))).sortBy("id").reverse().groupBy("type").value()},Totals(){return _.mapValues(this.Payments,(e=>_.sumBy(e,(e=>_.toNumber(e.amount)))))},idx(){return o["PaymentsTypes"][this.mode%o["PaymentsTypes"].length]},Showing(){return _.take(this.Payments[this.idx],10*this.page)},more(){return _.size(_.get(this.Payments,this.idx,[]))>this.Showing.length},clr(){return o["PaymentsTypeColors"][this.idx]}},methods:{image:n["i"],precision:n["z"],next(){this.page=1,this.mode++}}};function c(e){return _.map(e,(e=>_.get(e,["item","name"]))).join(", ")}var m=l,u=s("2877"),d=s("9989"),p=s("f09f"),h=s("a370"),v=s("eb85"),b=s("1c1c"),x=s("66e5"),y=s("4074"),g=s("cb32"),q=s("068f"),w=s("0170"),f=s("4b7e"),C=s("9c40"),P=s("eebe"),Q=s.n(P),k=Object(u["a"])(m,a,i,!1,null,null,null);t["default"]=k.exports;Q()(k,"components",{QPage:d["a"],QCard:p["a"],QCardSection:h["a"],QSeparator:v["a"],QList:b["a"],QItem:x["a"],QItemSection:y["a"],QAvatar:g["a"],QImg:q["a"],QItemLabel:w["a"],QCardActions:f["a"],QBtn:C["a"]})}}]);