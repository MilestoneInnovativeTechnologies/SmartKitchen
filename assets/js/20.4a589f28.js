(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{ef33:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{attrs:{padding:""}},[n("AdministratorMasterCommon",{attrs:{content:"kitchen",fields:e.fields,label:"name",filter:e.filter,validate:e.validate,items:e.kitchens,create:"manage",update:"manage"}})],1)},i=[],r=n("ded3"),s=n.n(r),l=n("c22d"),c=n("2f62"),o={name:"PageAdministratorMasterKitchen",components:{AdministratorMasterCommon:l["a"]},data(){return{fields:{name:"text",detail:"textarea",auto_accept:"noyes",cloud:"noyes",full_timer:"chef",printer:"text",status:"status"},filter:["name","detail"],validate:["name"]}},computed:s()(s()({},Object(c["b"])("kitchens",["kitchen_full_timer","non_remote","kitchen_printer"])),{},{kitchens(){return _.map(this.non_remote,(e=>Object.assign({},e,{full_timer:this.kitchen_full_timer[e.id],printer:this.kitchen_printer[e.id]})))}})},m=o,d=n("2877"),u=n("9989"),p=n("eebe"),f=n.n(p),h=Object(d["a"])(m,a,i,!1,null,null,null);t["default"]=h.exports;f()(h,"components",{QPage:u["a"]})}}]);