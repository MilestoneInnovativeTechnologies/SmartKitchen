(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{7168:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("q-page",{attrs:{padding:""}},[t("AdministratorMasterCommon",{attrs:{label:"name",items:e.items,content:"item",create:"manage",update:"manage",validate:e.validate,filter:e.filter,fields:e.fields}})],1)},i=[],r=s("2f62"),n=s("c22d"),m={name:"PageAdministratorMasterItem",components:{AdministratorMasterCommon:n["a"]},data(){return{validate:["name"],filter:["name"]}},computed:{...Object(r["d"])("items",{item_master:"data",props:"prop"}),prop_fields(){return _(this.props).mapKeys("name").mapValues((()=>"text")).value()},fields(){return Object.assign({},{name:"text",detail:"textarea"},this.prop_fields,{groups:"item_groups_choose",prices:"item_prices_set",stocks:"item_kitchen_stocks"},{status:"status"})},items(){return _.map(this.item_master,(e=>Object.assign({},e,{groups:_.get(this.$store.getters["items/groups"],e.id,[]),prices:_.get(this.$store.getters["items/prices"],e.id,{}),stocks:_.get(this.$store.getters["items/kitchen_details"],e.id,{})})))}}},o=m,p=s("2877"),d=s("9989"),c=s("eebe"),l=s.n(c),u=Object(p["a"])(o,a,i,!1,null,null,null);t["default"]=u.exports;l()(u,"components",{QPage:d["a"]})}}]);