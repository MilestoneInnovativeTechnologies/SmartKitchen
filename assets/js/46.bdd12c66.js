(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{f744:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",[s("q-bar",{staticClass:"q-py-lg text-white",class:"bg-"+t.color},[s("q-btn",{attrs:{dense:"",flat:"",icon:"kitchen"}}),s("div",[s("q-select",{attrs:{options:Object.values(t.kitchens),"option-label":"name","option-value":"id","emit-value":"","map-options":"",borderless:"",dark:""},model:{value:t.selected_kitchen,callback:function(e){t.selected_kitchen=e},expression:"selected_kitchen"}})],1),s("q-space"),s("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.time_now))]),s("q-space"),s("q-btn",{attrs:{dense:"",flat:"",icon:"Yes"===t.skd.auto_accept?"published_with_changes":"sync_problem",title:"Auto Accept - "+t.skd.auto_accept}}),s("q-btn",{attrs:{dense:"",flat:"",icon:"Yes"===t.skd.cloud?"cloud":"cloud_off",title:"Cloud - "+t.skd.cloud}}),s("q-btn",{attrs:{dense:"",flat:"",icon:"print"+(t.skd.printer?"":"_disabled"),title:t.skd.printer||"No Printer Assigned"}}),s("q-btn",{attrs:{dense:"",flat:"",icon:"notifications"+("Active"===t.skd.status?"":"_off"),title:"Status - "+t.skd.status}}),t.skd.full_timer?s("q-btn",{attrs:{dense:"",flat:"",icon:"person_pin",label:t.users[t.skd.full_timer].name,"no-caps":"",title:"Full Timer"}}):t._e(),t.skd.users&&t.skd.users.length?s("q-btn",{attrs:{dense:"",flat:"",icon:"groups",label:t.user_names(t.skd.users).join(", "),"no-caps":"",title:"Chefs"}}):t._e()],1),s("Masonry",{staticClass:"q-mt-xs",attrs:{items:t.Tokens,width:260,gutter:"xs"},scopedSlots:t._u([{key:"item",fn:function(e){return[s("transition",{attrs:{appear:"","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut",mode:"out-in"}},[s("q-card",{key:"token-"+e.id},[s("q-card-section",{staticClass:"text-white q-py-xs flex justify-between items-center text-caption text-weight-bold",class:"bg-"+t.color},[s("div",[t._v(t._s(e.type))]),s("transition",{attrs:{appear:"","enter-active-class":"animated zoomIn text-red","leave-active-class":"animated zoomOut",mode:"out-in"}},[s("div",{key:e.progress},[t._v(t._s(e.progress))])])],1),s("q-list",{attrs:{separator:""}},t._l(e.items,(function(e){return s("q-item",{key:"token_item-"+e.id,attrs:{clickable:""}},[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{attrs:{rounded:""}},[s("img",{attrs:{src:t.image(t.lg(e,["item","image"]))}})])],1),s("q-item-section",[s("q-item-label",[t._v(t._s(t.lg(e,"quantity"))+"x "+t._s(t.lg(e,["item","name"])))]),e.narration?s("q-item-label",{staticClass:"text-red",attrs:{caption:""}},[t._v(t._s(e.narration))]):t._e(),s("transition",{attrs:{appear:"","enter-active-class":"animated zoomIn text-"+t.color,"leave-active-class":"animated fadeOut",mode:"out-in"}},[s("q-item-label",{key:e.progress,staticClass:"text-weight-bold",attrs:{caption:""}},[t._v(t._s(e.progress))])],1),t.lg(e,["kitchen","id"])!==t.selected_kitchen?s("q-item-label",{attrs:{caption:""}},[t._v("Kitchen: "+t._s(t.lg(e,["kitchen","name"])))]):t._e()],1)],1)})),1),s("q-card-section",{staticClass:"text-white q-pa-none",class:"bg-"+t.color},[s("q-list",{attrs:{separator:"",dense:""}},[s("q-item",[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{staticClass:"text-weight-bold"},[t._v(t._s(e.id))])],1),s("q-item-section",[e.waiter?s("q-item-label",{staticStyle:{"font-size":"0.70rem"}},[t._v("User: "+t._s(e.waiter.name))]):t._e(),e.customer?s("q-item-label",{staticStyle:{"font-size":"0.70rem"}},[t._v("Customer: "+t._s(e.customer.name))]):t._e()],1)],1)],1)],1)],1)],1)]}}])})],1)},i=[],n=s("ded3"),c=s.n(n),r=s("3758"),o=s("2f62"),l=s("b1c1"),d=s("c624"),m={name:"DisplayKitchen",components:{Masonry:d["a"]},mixins:[r["a"]],props:["color"],data(){return{selected_kitchen:null,time_now:"00:00:00"}},computed:c()(c()({},Object(o["d"])({kitchens:t=>t.kitchens.data,users:t=>t.users.data})),{},{skd(){return this.selected_kitchen?_.assign({},_.get(this.kitchens,this.selected_kitchen),this.$store.state.kitchens.status[this.selected_kitchen]):{}},Tokens(){return _.filter(this.tokens_own,(t=>["New","Processing"].includes(t.progress)&&_.some(t.items,(t=>_.get(t,["kitchen","id"])===this.selected_kitchen))))}}),methods:{user_names(t){return _.map(t,(t=>_.truncate(_.get(this.users,[t,"name"]),{length:5,omission:".."})))},lg:_.get,image:l["h"]},created(){setInterval((t=>t.time_now=(new Date).toTimeString().split(" ")[0]),1e3,this)}},u=m,p=s("2877"),k=s("9989"),h=s("d847"),b=s("9c40"),g=s("ddd8"),q=s("2c91"),v=s("f09f"),f=s("a370"),w=s("1c1c"),x=s("66e5"),y=s("4074"),C=s("cb32"),Q=s("0170"),S=s("eebe"),z=s.n(S),I=Object(p["a"])(u,a,i,!1,null,null,null);e["default"]=I.exports;z()(I,"components",{QPage:k["a"],QBar:h["a"],QBtn:b["a"],QSelect:g["a"],QSpace:q["a"],QCard:v["a"],QCardSection:f["a"],QList:w["a"],QItem:x["a"],QItemSection:y["a"],QAvatar:C["a"],QItemLabel:Q["a"]})}}]);