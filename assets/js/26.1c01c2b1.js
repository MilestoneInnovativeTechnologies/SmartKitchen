(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{ee24:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("AdministratorMasterCommon",{attrs:{content:"settings",fields:e.fields,label:"name",filter:e.filter,validate:e.validate,items:e.settings,create:"manage",update:"manage",destroy:"delete"},on:{destroyed:e.destroyed}})],1)},s=[],r=a("c22d"),i=a("2f62"),o={name:"PageAdministratorMasterSettings",components:{AdministratorMasterCommon:r["a"]},data(){return{fields:{name:"text",value:"textarea"},filter:["name","value"],validate:["name"]}},computed:Object(i["d"])("settings",{settings:"data"}),methods:{destroyed(e){this.$store.commit("settings/remove",e,{root:!0})}}},d=o,l=a("2877"),m=a("9989"),c=a("eebe"),u=a.n(c),g=Object(l["a"])(d,n,s,!1,null,null,null);t["default"]=g.exports;u()(g,"components",{QPage:m["a"]})}}]);