(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"46b0":function(t,e,o){"use strict";o.r(e);o("caad");var n=function(){var t=this,e=t._self._c;return e("q-layout",{attrs:{view:"hhh LpR fFf"}},[e("q-header",{staticClass:"bg-primary text-white print-hide",attrs:{reveal:"",elevated:"","height-hint":"98"}},[e("q-toolbar",[e("q-toolbar-title",[e("q-btn",{directives:[{name:"show",rawName:"v-show",value:!t.$route.name.includes("index"),expression:"!$route.name.includes('index')"}],attrs:{to:{name:t.name},flat:"",round:"",dense:"",icon:"arrow_back_ios"}}),t._v("\n        "+t._s(t.$store.state.title||t.admin)+"\n      ")],1),t.$route.meta.controls?e("div",{staticClass:"row"},[t._l(t.$route.meta.controls,(function(o){return"noprint"!==o?e("ReportControlElement",{key:t.hKey(o),staticClass:"q-mr-xs",attrs:{name:o}}):t._e()})),t.$route.meta.controls.includes("noprint")?t._e():e("q-btn",{attrs:{label:"Print",color:"teal"},on:{click:t.print_page}})],2):t._e(),e("q-btn",{directives:[{name:"show",rawName:"v-show",value:"report"!==t.$store.state.public.mode||"/"===t.$route.path,expression:"$store.state.public.mode !== 'report' || $route.path === '/'"}],attrs:{flat:"",round:"",dense:"",icon:"report"===t.$store.state.public.mode?"admin_panel_settings":"analytics",to:{name:t.ops[t.$store.state.public.mode]}}}),e("Logout")],1)],1),e("q-page-container",[e("router-view")],1)],1)},r=[],a=o("ed79"),l=o("b1c1"),s=function(){var t=this,e=t._self._c;return e(t.component,t._b({tag:"component"},"component",t.$attrs,!1))},i=[],c=(o("5319"),function(){var t=this,e=t._self._c;return e("q-btn",{attrs:{icon:"event",round:"",color:"primary",flat:"","text-color":"white",dense:""}},[e("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"},on:{"before-show":function(e){t.date=null}}},[e("q-date",{attrs:{"today-btn":"",mask:t.format},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[e("div",{staticClass:"row items-center justify-end q-gutter-sm"},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Cancel",color:"primary",flat:""}}),e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"OK",color:"primary",flat:""},on:{click:t.save}})],1)])],1)],1)}),u=[],p=o("bd4c");const{formatDate:m}=p["b"];var d={name:"ReportControlDate",data(){return{format:"YYYY-MM-DD",v_date:null}},computed:{date:{get(){return this.v_date||this.$store.state.public.date},set(t){this.v_date=t}}},methods:{save(){this.$store.commit("public",{date:this.date})},show(){this.$refs["qDateProxy"].show()}},created(){this.date||(this.date=m(Date.now(),this.format),this.save())}},h=d,b=o("2877"),v=o("27f9"),f=o("0016"),y=o("7cbe"),x=o("52ee"),w=o("9c40"),D=o("7f67"),C=o("eebe"),$=o.n(C),k=Object(b["a"])(h,c,u,!1,null,null,null),g=k.exports;$()(k,"components",{QInput:v["a"],QIcon:f["a"],QPopupProxy:y["a"],QDate:x["a"],QBtn:w["a"]}),$()(k,"directives",{ClosePopup:D["a"]});var R=function(){var t=this,e=t._self._c;return e("q-btn",{attrs:{icon:"event",round:"",color:"primary",flat:"","text-color":"white",dense:""}},[e("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"},on:{"before-show":function(e){t.date=null}}},[e("q-date",{attrs:{"today-btn":"",mask:t.format,range:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[e("div",{staticClass:"row items-center justify-end q-gutter-sm"},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Cancel",color:"primary",flat:""}}),e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"OK",color:"primary",flat:""},on:{click:t.save}})],1)])],1)],1)},S=[];const{formatDate:q}=p["b"];var O={name:"ReportControlRange",data(){return{format:"YYYY-MM-DD",now:q(Date.now(),this.format),v_date:{from:null,to:null}}},computed:{date:{get(){return this.v_date||this.$store.state.public.range||{from:this.now,to:this.now}},set(t){this.v_date=t}}},methods:{save(){this.$store.commit("public",{range:this.date})}}},j=O,T=Object(b["a"])(j,R,S,!1,null,null,null),Q=T.exports;$()(T,"components",{QBtn:w["a"],QPopupProxy:y["a"],QDate:x["a"]}),$()(T,"directives",{ClosePopup:D["a"]});var N=function(){var t=this,e=t._self._c;return e("q-select",{staticClass:"q-mr-xs",attrs:{options:t.types,outlined:"",label:"Order Type",dense:"",dark:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})},I=[],P=o("232e"),U={name:"ReportControlSaleType",data(){return{types:P["OrderTypes"]}},computed:{type:{get(){return this.$store.state.public.sale_type},set(t){this.$store.commit("public",{sale_type:t})}}},created(){this.type||(this.type=this.types[0])}},B=U,K=o("ddd8"),Y=Object(b["a"])(B,N,I,!1,null,null,null),L=Y.exports;$()(Y,"components",{QSelect:K["a"]});var E=function(){var t=this,e=t._self._c;return e("ItemSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",dark:"",outlined:"",dense:"",label:"Item"},model:{value:t.item,callback:function(e){t.item=e},expression:"item"}})},G=[],M=o("5cc1"),J={name:"ReportControlItem",components:{ItemSelectDropDown:M["a"]},computed:{item:{get(){return this.$store.state.public.item||null},set(t){this.$store.commit("public",{item:t})}}}},V=J,z=Object(b["a"])(V,E,G,!1,null,null,null),A=z.exports,F=function(){var t=this,e=t._self._c;return e("q-select",{staticStyle:{"min-width":"6rem"},attrs:{dark:"",outlined:"",dense:"",label:"Item",options:t.items},model:{value:t.item,callback:function(e){t.item=e},expression:"item"}})},H=[],W={name:"ReportControlCloudItem",computed:{items(){return _(this.$store.state.remote.data).filter({item:"kitchen_items"}).map((({local_id:t})=>this.$store.getters["kitchens/map"][t])).map((t=>_.get(this.$store.state.kitchens.items,[t[0],t[1],"item"]))).map((t=>_.get(this.$store.state.items.data,t))).map((t=>Object.assign({},t,{label:t.name,value:t.id}))).value()},item:{get(){return this.$store.state.public.item||null},set(t){this.$store.commit("public",{item:t})}}}},X=W,Z=Object(b["a"])(X,F,H,!1,null,null,null),tt=Z.exports;$()(Z,"components",{QSelect:K["a"]});var et=function(){var t=this,e=t._self._c;return e("q-select",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",dark:"",outlined:"",dense:"",label:"Customer",options:t.customers},model:{value:t.customer,callback:function(e){t.customer=e},expression:"customer"}})},ot=[],nt={name:"ReportControlCustomer",computed:{customers(){return _.filter(this.$store.state.customers.data,(t=>_.zipObject(["value","label"],[t.id,t.name])))},customer:{get(){return this.$store.state.public.customer||null},set(t){this.$store.commit("public",{customer:t})}}}},rt=nt,at=Object(b["a"])(rt,et,ot,!1,null,null,null),lt=at.exports;$()(at,"components",{QSelect:K["a"]});var st=function(){var t=this,e=t._self._c;return e("KitchenSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",dark:"",outlined:"",dense:"",label:"Kitchen"},model:{value:t.kitchen,callback:function(e){t.kitchen=e},expression:"kitchen"}})},it=[],ct=o("bf8e"),ut={name:"ReportControlKitchen",components:{KitchenSelectDropDown:ct["a"]},computed:{kitchen:{get(){return this.$store.state.public.kitchen||null},set(t){this.$store.commit("public",{kitchen:t})}}}},pt=ut,mt=Object(b["a"])(pt,st,it,!1,null,null,null),dt=mt.exports,ht=function(){var t=this,e=t._self._c;return e("TaxNatureSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{dark:"",outlined:"",dense:"",label:"Tax Nature"},model:{value:t.nature,callback:function(e){t.nature=e},expression:"nature"}})},bt=[],vt=o("2943"),ft={name:"ReportControlTaxNature",components:{TaxNatureSelectDropDown:vt["a"]},computed:{nature:{get(){return this.$store.state.public.nature||null},set(t){this.$store.commit("public",{nature:t})}}}},yt=ft,_t=Object(b["a"])(yt,ht,bt,!1,null,null,null),xt=_t.exports,wt=function(){var t=this,e=t._self._c;return e("TaxNameSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{dark:"",outlined:"",dense:"",label:"Tax","option-label":"name"},model:{value:t.tax,callback:function(e){t.tax=e},expression:"tax"}})},Dt=[],Ct=function(){var t=this,e=t._self._c;return e("q-select",t._b({attrs:{options:t.options,value:t.optValue},on:{input:t.doEmit}},"q-select",t.$attrs,!1))},$t=[],kt=o("2071"),gt={name:"TaxNameSelectDropDown",mixins:[kt["a"]],computed:{options(){return _.map(this.$store.state.tax.data)}}},Rt=gt,St=Object(b["a"])(Rt,Ct,$t,!1,null,null,null),qt=St.exports;$()(St,"components",{QSelect:K["a"]});var Ot={name:"ReportControlTax",components:{TaxNameSelectDropDown:qt},computed:{tax:{get(){return this.$store.state.public.tax||null},set(t){this.$store.commit("public",{tax:t})}}}},jt=Ot,Tt=Object(b["a"])(jt,wt,Dt,!1,null,null,null),Qt=Tt.exports,Nt=function(){var t=this,e=t._self._c;return e("UserSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",role:["Waiter","Receptionist","Chef","Delivery Boy"],dark:"",outlined:"",dense:"",label:"User"},model:{value:t.user,callback:function(e){t.user=e},expression:"user"}})},It=[],Pt=o("7fe1"),Ut={name:"ReportControlUser",components:{UserSelectDropDown:Pt["a"]},computed:{user:{get(){return this.$store.state.public.user||null},set(t){this.$store.commit("public",{user:t})}}}},Bt=Ut,Kt=Object(b["a"])(Bt,Nt,It,!1,null,null,null),Yt=Kt.exports,Lt=function(){var t=this,e=t._self._c;return e("UserSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",role:["Delivery Boy"],dark:"",outlined:"",dense:"",label:"Delivery Boy"},model:{value:t.user,callback:function(e){t.user=e},expression:"user"}})},Et=[],Gt={name:"ReportControlDeliveryBoy",components:{UserSelectDropDown:Pt["a"]},computed:{user:{get(){return this.$store.state.public.delivery_boy||null},set(t){this.$store.commit("public",{delivery_boy:t})}}}},Mt=Gt,Jt=Object(b["a"])(Mt,Lt,Et,!1,null,null,null),Vt=Jt.exports,zt=function(){var t=this,e=t._self._c;return e("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"save_alt"},on:{click:function(e){return t.openURL("/data/download_import_template")}}})},At=[],Ft=o("b06b"),Ht={name:"ReportControlDown",methods:{openURL:Ft["a"]}},Wt=Ht,Xt=Object(b["a"])(Wt,zt,At,!1,null,null,null),Zt=Xt.exports;$()(Xt,"components",{QBtn:w["a"]});var te=function(){var t=this,e=t._self._c;return e("q-select",{staticClass:"q-mr-xs",attrs:{options:t.types,outlined:"",label:"Type",dense:"",dark:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})},ee=[],oe={name:"ReportControlSaleType",data(){return{types:P["PaymentsTypes"]}},computed:{type:{get(){return this.$store.state.public.payment_type},set(t){this.$store.commit("public",{payment_type:t})}}},created(){this.type||(this.type=this.types[0])}},ne=oe,re=Object(b["a"])(ne,te,ee,!1,null,null,null),ae=re.exports;$()(re,"components",{QSelect:K["a"]});var le=function(){var t=this,e=t._self._c;return e("GroupSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",dark:"",outlined:"",dense:"",label:"Item Group"},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}})},se=[],ie=function(){var t=this,e=t._self._c;return e("q-select",t._b({attrs:{options:t.options,value:t.optValue},on:{input:t.doEmit}},"q-select",t.$attrs,!1))},ce=[],ue={name:"GroupSelectDropDown",mixins:[kt["a"]],computed:{options(){return _.map(this.$store.state.groups.data)}}},pe=ue,me=Object(b["a"])(pe,ie,ce,!1,null,null,null),de=me.exports;$()(me,"components",{QSelect:K["a"]});var he={name:"ReportControlGroup",components:{GroupSelectDropDown:de},computed:{group:{get(){return this.$store.state.public.group||null},set(t){this.$store.commit("public",{group:t})}}}},be=he,ve=Object(b["a"])(be,le,se,!1,null,null,null),fe=ve.exports,ye={name:"ReportControlElement",props:["name"],components:{ReportControlUser:Yt,ReportControlTax:Qt,ReportControlTaxNature:xt,ReportControlKitchen:dt,ReportControlItem:A,ReportControlCustomer:lt,ReportControlSaleType:L,ReportControlRange:Q,ReportControlDate:g,ReportControlDownloadTemplate:Zt,ReportControlDeliveryBoy:Vt,ReportControlCloudItem:tt,ReportControlPaymentType:ae,ReportControlGroup:fe},computed:{component(){return"ReportControl"+_.startCase(this.name).replace(/\s/g,"")}}},_e=ye,xe=Object(b["a"])(_e,s,i,!1,null,null,null),we=xe.exports,De=o("9527"),Ce={name:"AdministratorLayout",components:{Logout:De["a"],ReportControlElement:we,ManualSync:a["a"]},data(){return{admin:_USER.name,ops:{report:"administration_index",administration:"report_index"}}},computed:{name(){return(this.$store.state.public.mode||"report")+"_index"}},methods:{hKey(t){return Object(l["e"])("alr","control",t)},print_page(){print()}}},$e=Ce,ke=o("4d5a"),ge=o("e359"),Re=o("65c6"),Se=o("6ac5"),qe=o("09e3"),Oe=Object(b["a"])($e,n,r,!1,null,null,null);e["default"]=Oe.exports;$()(Oe,"components",{QLayout:ke["a"],QHeader:ge["a"],QToolbar:Re["a"],QToolbarTitle:Se["a"],QBtn:w["a"],QPageContainer:qe["a"]})}}]);