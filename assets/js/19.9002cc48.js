(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{ef33:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("AdministratorMasterCommon",{attrs:{content:"kitchen",fields:e.fields,label:"name",filter:e.filter,validate:e.validate,items:e.kitchens,extra:e.extra,create:"manage",update:"manage"}})],1)},r=[],i=(a("498a"),a("ded3")),s=a.n(i),o=a("c22d"),c=a("2f62"),l=a("adfa");const{CC71V:m,JX99V:d,DP71V:u}=a("adfa").FEATURES;var f={name:"PageAdministratorMasterKitchen",components:{AdministratorMasterCommon:o["a"]},data(){return{remote_server:"Yes"===m&&"Yes"===d&&""!==u.trim(),filter:["name","detail"],validate:["name"],extra:{_location:l["BRANCH_CODE"]}}},computed:s()(s()({},Object(c["b"])("kitchens",["kitchen_full_timer","non_remote","kitchen_printer"])),{},{fields(){return Object.assign({name:"text",detail:"textarea",auto_accept:"noyes"},this.remote_server?{cloud:"noyes"}:{},{full_timer:"chef",printer:"text",status:"status"})},kitchens(){return _.map(this.non_remote,(e=>Object.assign({},e,{full_timer:this.kitchen_full_timer[e.id],printer:this.kitchen_printer[e.id]})))}})},p=f,h=a("2877"),k=a("9989"),b=a("eebe"),g=a.n(b),v=Object(h["a"])(p,n,r,!1,null,null,null);t["default"]=v.exports;g()(v,"components",{QPage:k["a"]})}}]);