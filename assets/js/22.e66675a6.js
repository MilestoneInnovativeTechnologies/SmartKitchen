(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[22],{"19c0":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t._self._c;return a("q-page",{attrs:{padding:""}},[a("AdministratorPriceListDuplicate"),a("AdministratorMasterCommon",{attrs:{content:"priceList",fields:t.fields,label:"name",filter:t.filter,validate:t.validate,items:t.list,create:"manage",update:"manage",extra:{items:t.items}},on:{current:function(a){t.current=a},response:function(a){t.current=null}}},[a("AdministratorMasterPriceListPriceSet",{attrs:{list:t.current?t.current.id:null},model:{value:t.items,callback:function(a){t.items=a},expression:"items"}})],1)],1)},s=[],r=e("c22d"),l=e("2f62"),n=e("97b7"),c=function(){var t=this,a=t._self._c;return a("q-card",[a("q-card-section",{staticClass:"text-weight-bold bg-grey-1"},[t._v("Duplicate Price List")]),a("q-card-section",{staticClass:"q-gutter-y-xs"},[a("PriceListSelectDropDown",{attrs:{outlined:"",label:"Select Price list to duplicate"},model:{value:t.pl,callback:function(a){t.pl=a},expression:"pl"}}),a("q-input",{attrs:{outlined:"",label:"New Price list name"},model:{value:t.params.name,callback:function(a){t.$set(t.params,"name",a)},expression:"params.name"}}),a("q-input",{attrs:{type:"textarea",outlined:"",label:"New Price list detail"},model:{value:t.params.detail,callback:function(a){t.$set(t.params,"detail",a)},expression:"params.detail"}}),a("q-btn",{staticClass:"full-width",attrs:{label:"Do Duplicate",color:"primary",loading:t.loading},on:{click:t.duplicate}})],1)],1)},o=[],d=e("9061"),p={name:"AdministratorPriceListDuplicate",components:{PriceListSelectDropDown:d["a"]},data(){return{pl:null,params:{name:"",detail:"",duplicate:null},loading:!1}},methods:{duplicate(){if(this.loading=!0,!this.params.name||!this.params.duplicate)return this.loading=!1;post("priceList","manage",this.params).then((t=>this.loading=!!(this.pl=null)))}},watch:{pl(t){if(!t)return this.params.name=this.params.detail=this.params.duplicate="";this.params.name=t.name,this.params.detail=t.detail,this.params.duplicate=t.id}}},m=p,u=e("2877"),f=e("f09f"),h=e("a370"),b=e("27f9"),g=e("9c40"),P=e("eebe"),w=e.n(P),v=Object(u["a"])(m,c,o,!1,null,null,null),x=v.exports;w()(v,"components",{QCard:f["a"],QCardSection:h["a"],QInput:b["a"],QBtn:g["a"]});var L={name:"PageAdministratorMasterPriceList",components:{AdministratorPriceListDuplicate:x,AdministratorMasterPriceListPriceSet:n["a"],AdministratorMasterCommon:r["a"]},data(){return{fields:{name:"text",detail:"textarea",status:"status"},filter:["name","detail"],validate:["name"],current:null,items:[]}},computed:Object(l["d"])("prices",["list"])},D=L,q=e("9989"),A=Object(u["a"])(D,i,s,!1,null,null,null);a["default"]=A.exports;w()(A,"components",{QPage:q["a"]})}}]);