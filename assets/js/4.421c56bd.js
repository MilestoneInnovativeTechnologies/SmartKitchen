(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"46b0":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-layout",{attrs:{view:"hhh LpR fFf"}},[o("q-header",{staticClass:"bg-primary text-white print-hide",attrs:{reveal:"",elevated:"","height-hint":"98"}},[o("q-toolbar",[o("q-toolbar-title",[o("q-btn",{directives:[{name:"show",rawName:"v-show",value:!t.$route.name.includes("index"),expression:"!$route.name.includes('index')"}],attrs:{to:{name:t.name},flat:"",round:"",dense:"",icon:"arrow_back_ios"}}),t._v("\n        "+t._s(t.$store.state.title||t.admin)+"\n      ")],1),t.$route.meta.controls?o("div",{staticClass:"row"},[t._l(t.$route.meta.controls,(function(e){return o("ReportControlElement",{key:t.hKey(e),staticClass:"q-mr-xs",attrs:{name:e}})})),o("q-btn",{attrs:{label:"Print",color:"teal"},on:{click:t.print_page}})],2):t._e(),o("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"report"===t.$store.state.public.mode?"admin_panel_settings":"analytics",to:{name:t.ops[t.$store.state.public.mode]}}}),o("Logout")],1)],1),o("q-page-container",[o("router-view")],1)],1)},n=[],r=(o("5319"),o("ed79")),l=o("b1c1"),s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o(t.component,t._b({tag:"component"},"component",t.$attrs,!1))},i=[],c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-btn",{attrs:{icon:"event",round:"",color:"primary",flat:"","text-color":"white",dense:""}},[o("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"},on:{"before-show":function(e){t.date=null}}},[o("q-date",{attrs:{"today-btn":"",mask:t.format},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[o("div",{staticClass:"row items-center justify-end q-gutter-sm"},[o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Cancel",color:"primary",flat:""}}),o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"OK",color:"primary",flat:""},on:{click:t.save}})],1)])],1)],1)},u=[],p=o("bd4c");const{formatDate:m}=p["b"];var d={name:"ReportControlDate",data(){return{format:"YYYY-MM-DD",v_date:null}},computed:{date:{get(){return this.v_date||this.$store.state.public.date},set(t){this.v_date=t}}},methods:{save(){this.$store.commit("public",{date:this.date})},show(){this.$refs["qDateProxy"].show()}},created(){this.date||(this.date=m(Date.now(),this.format),this.save())}},h=d,b=o("2877"),f=o("27f9"),v=o("0016"),x=o("7cbe"),w=o("52ee"),y=o("9c40"),$=o("7f67"),D=o("eebe"),C=o.n(D),k=Object(b["a"])(h,c,u,!1,null,null,null),g=k.exports;C()(k,"components",{QInput:f["a"],QIcon:v["a"],QPopupProxy:x["a"],QDate:w["a"],QBtn:y["a"]}),C()(k,"directives",{ClosePopup:$["a"]});var q=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-btn",{attrs:{icon:"event",round:"",color:"primary",flat:"","text-color":"white",dense:""}},[o("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"},on:{"before-show":function(e){t.date=null}}},[o("q-date",{attrs:{"today-btn":"",mask:t.format,range:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[o("div",{staticClass:"row items-center justify-end q-gutter-sm"},[o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Cancel",color:"primary",flat:""}}),o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"OK",color:"primary",flat:""},on:{click:t.save}})],1)])],1)],1)},R=[];const{formatDate:S}=p["b"];var T={name:"ReportControlRange",data(){return{format:"YYYY-MM-DD",now:S(Date.now(),this.format),v_date:{from:null,to:null}}},computed:{date:{get(){return this.v_date||this.$store.state.public.range||{from:this.now,to:this.now}},set(t){this.v_date=t}}},methods:{save(){this.$store.commit("public",{range:this.date})}}},E=T,O=Object(b["a"])(E,q,R,!1,null,null,null),Q=O.exports;C()(O,"components",{QBtn:y["a"],QPopupProxy:x["a"],QDate:w["a"]}),C()(O,"directives",{ClosePopup:$["a"]});var j=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-select",{staticClass:"q-mr-xs",attrs:{options:t.types,outlined:"",label:"Order Type",dense:"",dark:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})},N=[],K=o("232e"),P={name:"ReportControlSaleType",data(){return{types:K["OrderTypes"]}},computed:{type:{get(){return this.$store.state.public.sale_type},set(t){this.$store.commit("public",{sale_type:t})}}},created(){this.type||(this.type=this.types[0])}},Y=P,I=o("ddd8"),U=Object(b["a"])(Y,j,N,!1,null,null,null),L=U.exports;C()(U,"components",{QSelect:I["a"]});var M=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ItemSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",dark:"",outlined:"",dense:"",label:"Item"},model:{value:t.item,callback:function(e){t.item=e},expression:"item"}})},B=[],J=o("5cc1"),A={name:"ReportControlItem",components:{ItemSelectDropDown:J["a"]},computed:{item:{get(){return this.$store.state.public.item||null},set(t){this.$store.commit("public",{item:t})}}}},F=A,H=Object(b["a"])(F,M,B,!1,null,null,null),V=H.exports,W=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("KitchenSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",dark:"",outlined:"",dense:"",label:"Kitchen"},model:{value:t.kitchen,callback:function(e){t.kitchen=e},expression:"kitchen"}})},z=[],G=o("bf8e"),X={name:"ReportControlKitchen",components:{KitchenSelectDropDown:G["a"]},computed:{kitchen:{get(){return this.$store.state.public.kitchen||null},set(t){this.$store.commit("public",{kitchen:t})}}}},Z=X,tt=Object(b["a"])(Z,W,z,!1,null,null,null),et=tt.exports,ot=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("TaxNatureSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{dark:"",outlined:"",dense:"",label:"Tax Nature"},model:{value:t.nature,callback:function(e){t.nature=e},expression:"nature"}})},at=[],nt=o("2943"),rt={name:"ReportControlTaxNature",components:{TaxNatureSelectDropDown:nt["a"]},computed:{nature:{get(){return this.$store.state.public.nature||null},set(t){this.$store.commit("public",{nature:t})}}}},lt=rt,st=Object(b["a"])(lt,ot,at,!1,null,null,null),it=st.exports,ct=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("TaxNameSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{dark:"",outlined:"",dense:"",label:"Tax","option-label":"name"},model:{value:t.tax,callback:function(e){t.tax=e},expression:"tax"}})},ut=[],pt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-select",t._b({attrs:{options:t.options,value:t.optValue},on:{input:t.doEmit}},"q-select",t.$attrs,!1))},mt=[],dt=o("2071"),ht={name:"TaxNameSelectDropDown",mixins:[dt["a"]],computed:{options(){return _.map(this.$store.state.tax.data)}}},bt=ht,ft=Object(b["a"])(bt,pt,mt,!1,null,null,null),vt=ft.exports;C()(ft,"components",{QSelect:I["a"]});var xt={name:"ReportControlTax",components:{TaxNameSelectDropDown:vt},computed:{tax:{get(){return this.$store.state.public.tax||null},set(t){this.$store.commit("public",{tax:t})}}}},wt=xt,_t=Object(b["a"])(wt,ct,ut,!1,null,null,null),yt=_t.exports,$t=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("UserSelectDropDown",{staticStyle:{"min-width":"6rem"},attrs:{"option-label":"name",role:["Waiter","Receptionist","Chef","Delivery Boy"],dark:"",outlined:"",dense:"",label:"User"},model:{value:t.user,callback:function(e){t.user=e},expression:"user"}})},Dt=[],Ct=o("7fe1"),kt={name:"ReportControlUser",components:{UserSelectDropDown:Ct["a"]},computed:{user:{get(){return this.$store.state.public.user||null},set(t){this.$store.commit("public",{user:t})}}}},gt=kt,qt=Object(b["a"])(gt,$t,Dt,!1,null,null,null),Rt=qt.exports,St={name:"ReportControlElement",props:["name"],components:{ReportControlUser:Rt,ReportControlTax:yt,ReportControlTaxNature:it,ReportControlKitchen:et,ReportControlItem:V,ReportControlSaleType:L,ReportControlRange:Q,ReportControlDate:g},computed:{component(){return"ReportControl"+_.startCase(this.name).replace(/\s/g,"")}}},Tt=St,Et=Object(b["a"])(Tt,s,i,!1,null,null,null),Ot=Et.exports,Qt=o("9527"),jt={name:"AdministratorLayout",components:{Logout:Qt["a"],ReportControlElement:Ot,ManualSync:r["a"]},data(){return{admin:_USER.name,ops:{report:"administration_index",administration:"report_index"}}},computed:{name(){return(this.$store.state.public.mode||"report")+"_index"}},methods:{hKey(t){return Object(l["d"])("alr","control",t)},comp(t){return"ReportControl"+_.startCase(t).replace(/\s/,"")},print_page(){print()}}},Nt=jt,Kt=o("4d5a"),Pt=o("e359"),Yt=o("65c6"),It=o("6ac5"),Ut=o("09e3"),Lt=Object(b["a"])(Nt,a,n,!1,null,null,null);e["default"]=Lt.exports;C()(Lt,"components",{QLayout:Kt["a"],QHeader:Pt["a"],QToolbar:Yt["a"],QToolbarTitle:It["a"],QBtn:y["a"],QPageContainer:Ut["a"]})}}]);