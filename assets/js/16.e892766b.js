(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{e980:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return t("q-page",{attrs:{padding:""}},[t("AdministratorMasterCommon",{attrs:{content:"customer",items:e.customers,filter:e.filter,validate:e.validate,update:"update",create:"create",label:"name",fields:e.fields}})],1)},r=[],n=a("b1c1"),i=a("9b77"),o=a("5ab9"),m=a("c22d"),d=a("2f62"),u={name:"PageAdministratorMasterCustomer",components:{AdministratorMasterCommon:m["a"],FilterInputText:o["a"],MasterForm:i["a"]},data(){return{fields:{name:"text",address:"textarea",phone:"number",email:"email",status:"status"},filter:["name","phone","email","address"],validate:["name","phone"]}},computed:Object(d["d"])("customers",{customers:"data"}),methods:{hKey({id:e}){return Object(n["e"])("masters","customer","list","customer",e)},SaveCustomer(e){if(this.loading=!0,!e.name&&!e.phone)return this.loading=!1;this.current&&(e["id"]=this.current.id),post("customer",_.has(e,"id")?"update":"create",e).then((()=>{this.$refs["master_form"].reset(),this.current=null,this.loading=!1}))}}},l=u,c=a("2877"),p=a("9989"),h=a("eebe"),f=a.n(h),b=Object(c["a"])(l,s,r,!1,null,null,null);t["default"]=b.exports;f()(b,"components",{QPage:p["a"]})}}]);