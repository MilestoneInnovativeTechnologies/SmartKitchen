(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{dfef:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("q-layout",{attrs:{view:"hhh LpR fFf"}},[t("q-header",{staticClass:"bg-primary text-white",attrs:{reveal:"",elevated:"","height-hint":"98"}},[t("q-toolbar",[t("q-toolbar-title",[e.$store.state.back?t("q-btn",{attrs:{to:e.$store.state.back,flat:"",round:"",dense:"",icon:"arrow_back_ios"}}):e._e(),e._v("\n          "+e._s(e.$store.state.title||e.name)+"\n        ")],1),e.quick_enabled?t("QuickToggle"):e._e(),e.customer_manage?t("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"switch_account",to:{name:"customers"}}}):e._e(),t("ManualSync"),e.installable?t("InstallPrompt"):e._e(),t("Logout")],1)],1),t("q-page-container",[t("router-view")],1),t("q-footer",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.footer,expression:"$store.state.footer"}],staticClass:"bg-primary text-white",attrs:{elevated:""}},[t("q-tabs",{attrs:{align:"left"}},[t("q-route-tab",{attrs:{to:{name:"delivery_boy_index"},label:"Home",icon:"home"}}),e.ordering?t("q-route-tab",{attrs:{to:{name:"orders"},label:"Orders",icon:"add_task"}}):e._e(),t("q-route-tab",{attrs:{to:{name:"delivery_boy_completed"},label:"Billable",icon:"receipt",alert:e.billable.length>0&&"red","alert-icon":"new_releases"}}),t("q-route-tab",{attrs:{to:{name:"delivery_boy_billed"},label:"Deliverable",icon:"local_shipping",alert:e.deliverable.length>0&&"red","alert-icon":"new_releases"}}),t("q-route-tab",{attrs:{to:{name:"delivery_boy_payments"},label:"Payments",icon:"account_balance"}})],1)],1)],1)},l=[],o=(a("caad"),a("ed79")),n=a("67ed"),s=a("9527"),i=a("b1c1"),c=a("7e10"),d=a("58d1");const{RS44Z:b}=a("adfa").FEATURES;var u={name:"DeliveryBoyLayout",components:{QuickToggle:c["a"],Logout:s["a"],ManualSync:o["a"],InstallPrompt:n["a"]},mixins:[d["a"]],data(){return{name:_USER.name,logout:LOGOUT}},computed:{hide_others(){return!0===Object(i["B"])(settings("delivery_boy_hide_others_billed"))},installable(){return![void 0,"0"].includes(settings("installable"))},billable(){return _(this.tokens).filter((e=>"Home Delivery"===e.type&&m(e.items))).filter((e=>!_.includes(this.$store.getters["tokens/billed"],e.id))).value()},deliverable(){return _(this.bills).filter((e=>["Pending","Partial"].includes(e.progress)&&"Home Delivery"===e.token.type)).filter((e=>!this.hide_others||h(e,this.$route.meta.me.id))).value()},customer_manage(){return settings("manage_customer",_USER.role)},quick_enabled(){return"Yes"===b&&["order_new"].includes(this.$route.name)},ordering(){return!1!==Object(i["B"])(settings("delivery_boy_take_orders"))}},watch:{billable(e,t){(!t||e.length>t.length)&&Object(i["b"])()}}};function m(e){return e.length&&_.every(e,(({progress:e})=>_.includes(["Cancelled","Completed","Served"],e)))}function h({user:e},t){return e&&e.id===t}var g=u,v=a("2877"),y=a("4d5a"),p=a("e359"),f=a("65c6"),w=a("6ac5"),q=a("9c40"),k=a("09e3"),Q=a("7ff0"),T=a("429b"),$=a("7867"),O=a("eebe"),S=a.n(O),x=Object(v["a"])(g,r,l,!1,null,null,null);t["default"]=x.exports;S()(x,"components",{QLayout:y["a"],QHeader:p["a"],QToolbar:f["a"],QToolbarTitle:w["a"],QBtn:q["a"],QPageContainer:k["a"],QFooter:Q["a"],QTabs:T["a"],QRouteTab:$["a"]})}}]);