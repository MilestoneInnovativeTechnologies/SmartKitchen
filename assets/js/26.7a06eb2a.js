(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{"0d65":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("AdministratorMasterCommon",{attrs:{content:"user",fields:e.fields,label:"name",filter:e.filter,validate:e.validate,items:e.items,extra:{role:e.role},create:"manage",update:"manage"}})],1)},r=[],i=a("ded3"),s=a.n(i),o=a("c22d"),l=a("2f62"),d={name:"PageAdministratorMasterUser",props:["role"],components:{AdministratorMasterCommon:o["a"]},data(){return{fields:{name:"text",pin:"login_pin",login:"login_user",password:"text"},filter:["name"],validate:["name","pin","login"]}},computed:s()({},Object(l["d"])("users",{items({data:e}){return _.filter(e,["role",this.role])}})),created(){this.$store.commit("title",this.role+"s")}},m=d,p=a("2877"),c=a("9989"),u=a("eebe"),f=a.n(u),g=Object(p["a"])(m,n,r,!1,null,null,null);t["default"]=g.exports,f()(g,"components",{QPage:c["a"]})}}]);