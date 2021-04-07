(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[29],{e59f:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-page",{attrs:{padding:""}},[i("Masonry",{attrs:{width:"400",items:t.kitchens},scopedSlots:t._u([{key:"item",fn:function(t){return[i("KitchenActionsView",{attrs:{id:t.id}})]}}])})],1)},s=[],a=i("ded3"),c=i.n(a),o=i("2f62"),r=i("b1c1"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-card",[i("q-card-section",{staticClass:"row justify-between q-pb-none"},[i("div",{staticClass:"text-h6"},[t._v(t._s(t.kitchen.name))]),i("q-icon",{staticClass:"cursor-pointer",attrs:{size:"lg",name:"toggle_"+(t.is_in(t.kitchen)?"on":"off"),color:t.is_in(t.kitchen)?"positive":"grey"},on:{click:function(e){return t.toggle(t.kitchen)}}})],1),i("q-card-section",{attrs:{horizontal:""}},[i("CardImageTitle",{staticClass:"col",attrs:{image:t.image}}),i("q-card-actions",{staticClass:"flex-center q-gutter-y-sm",attrs:{vertical:""}},[i("q-btn",{attrs:{align:"left",dense:"",color:"red",icon:"insights",label:"Manage Items",to:{name:"kitchen_items",params:{id:t.id}}}}),i("q-btn",{attrs:{align:"left",dense:"",color:"accent",icon:"device_hub",label:"View Stock",to:{name:"kitchen_stocks",params:{id:t.id}}}}),i("q-select",{attrs:{label:"Auto Accept",options:["Yes","No"],outlined:"",dense:"",value:t.kitchen.auto_accept,color:"green-8"},on:{input:t.auto}}),i("q-badge",{staticClass:"q-py-sm",attrs:{label:"Chefs: "+t.chefs.length,color:"purple",outline:""}})],1)],1),t.kitchen.detail?i("q-card-section",{staticStyle:{"font-size":"0.75rem"}},[t._v(t._s(t.kitchen.detail))]):t._e(),i("q-inner-loading",{attrs:{showing:t.loading}},[i("q-spinner-dots",{attrs:{size:"50px",color:"primary"}})],1)],1)},d=[],h=i("43fa"),u={name:"KitchenActionsView",components:{CardImageTitle:h["a"]},data(){return{loading:!1}},props:["id"],computed:c()(c()({},Object(o["d"])("kitchens",{kitchens:"data",status:"status",assign:"assign"})),{},{intID(){return _.toInteger(this.id)},kitchen(){return this.kitchens[this.intID]},image(){return Object(r["e"])(this.kitchen.image)},chefs(){return _.get(this.status,[this.intID,"users"],[])}}),methods:{is_in({id:t}){return this.assign.includes(_.toInteger(t))},toggle({id:t}){this.loading=!0,this.$store.dispatch("kitchens/chef",{kitchen:t}).then((()=>this.loading=!1))},auto(t){this.loading=!0,this.$store.dispatch("kitchens/auto",{id:this.intID,auto_accept:t}).then((()=>this.loading=!1))}}},g=u,p=i("2877"),m=i("f09f"),k=i("a370"),f=i("0016"),b=i("4b7e"),q=i("9c40"),w=i("ddd8"),C=i("58a8"),v=i("74f7"),I=i("8380"),y=i("eebe"),Q=i.n(y),j=Object(p["a"])(g,l,d,!1,null,null,null),A=j.exports;Q()(j,"components",{QCard:m["a"],QCardSection:k["a"],QIcon:f["a"],QCardActions:b["a"],QBtn:q["a"],QSelect:w["a"],QBadge:C["a"],QInnerLoading:v["a"],QSpinnerDots:I["a"]});var O=i("c624"),S={name:"PageChefKitchens",components:{Masonry:O["a"],KitchenActionsView:A},data(){return{split:70,height:75}},computed:c()({},Object(o["d"])("kitchens",{kitchens:"data",assigned:"assign"})),methods:{hKey({id:t},e){return Object(r["d"])("ckv","kitchen",e,t)},assign({id:t}){this.$store.dispatch("kitchens/chef",{kitchen:t})}}},x=S,D=i("9989"),K=Object(p["a"])(x,n,s,!1,null,null,null);e["default"]=K.exports;Q()(K,"components",{QPage:D["a"]})}}]);