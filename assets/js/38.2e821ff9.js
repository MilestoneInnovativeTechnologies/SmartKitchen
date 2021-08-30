(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[38],{e59f:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{attrs:{padding:""}},[i("Masonry",{attrs:{width:"400",items:e.kitchens},scopedSlots:e._u([{key:"item",fn:function(t){return[i("KitchenActionsView",{attrs:{id:t.id,me:e.me}})]}}])})],1)},n=[],a=i("ded3"),r=i.n(a),l=i("2f62"),o=i("b1c1"),c=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-card",[i("q-card-section",{staticClass:"row justify-between q-pb-none"},[i("div",{staticClass:"text-h6"},[e._v(e._s(e.kitchen.name))]),i("q-icon",{staticClass:"cursor-pointer",attrs:{size:"lg",name:"toggle_"+(e.is_in?"on":"off"),color:e.is_in?"positive":"grey"},on:{click:function(t){return e.toggle(e.kitchen)}}})],1),i("q-card-section",{attrs:{horizontal:""}},[i("CardImageTitle",{staticClass:"col",attrs:{image:e.image}}),i("q-card-actions",{staticClass:"flex-center q-gutter-y-sm",attrs:{vertical:""}},[i("q-btn",{attrs:{align:"left",dense:"",color:"red",icon:"insights",label:"Add/Remove Manage Items",size:"sm",padding:"sm md",to:{name:"kitchen_items",params:{id:e.id}}}}),i("q-btn",{attrs:{align:"left",dense:"",color:"accent",icon:"device_hub",label:"View Manage Stock",size:"sm",padding:"sm md",to:{name:"kitchen_stocks",params:{id:e.id}}}}),i("q-select",{attrs:{label:"Auto Accept",options:["Yes","No"],outlined:"",dense:"",value:e.kitchen.auto_accept,color:"green-8"},on:{input:e.auto}}),i("q-input",{attrs:{label:"Printer",outlined:"",dense:"",debounce:"1500"},model:{value:e.printer,callback:function(t){e.printer=t},expression:"printer"}}),i("q-badge",{staticClass:"q-py-sm",attrs:{label:"Online Chefs: "+e.chefs.length,color:"positive",outline:""}}),e.full_timer?[e.full_timer.id===e.me?i("q-btn",{attrs:{align:"left",dense:"",color:"secondary",icon:"work_off",size:"sm",padding:"sm md",label:"Remove me as Full Timer"},on:{click:function(t){return e.full_time(!1)}}}):i("q-badge",{staticClass:"q-py-sm",attrs:{label:"Full Timer: "+e.full_timer.name,color:"secondary",outline:""}})]:i("q-btn",{attrs:{align:"left",dense:"",color:"secondary",icon:"view_in_ar",size:"sm",padding:"sm md",label:"Set me as Full Timer"},on:{click:function(t){return e.full_time(!0)}}}),"Yes"===e.kitchen.cloud&&e.is_in?i("q-btn",{attrs:{align:"left",dense:"",color:"light-blue",icon:"cloud",size:"sm",padding:"sm md",label:"Add Remote Order"},on:{click:function(t){e.remote_order=!0}}}):e._e()],2)],1),e.kitchen.detail?i("q-card-section",{staticStyle:{"font-size":"0.75rem"}},[e._v(e._s(e.kitchen.detail))]):e._e(),i("q-inner-loading",{attrs:{showing:e.loading}},[i("q-spinner-dots",{attrs:{size:"50px",color:"primary"}})],1),i("q-dialog",{attrs:{persistent:"",value:e.remote_order},on:{"before-hide":function(t){e.remote_order=!1}}},[i("AddRemoteOrder",{staticStyle:{width:"22rem"},attrs:{kitchen:e.id},on:{imported:function(t){e.remote_order=!1}}})],1)],1)},d=[],m=i("43fa"),u=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-card",[i("q-bar",{staticClass:"text-grey-1",class:"bg-"+e.color+"-7"},[i("span",{staticClass:"text-caption"},[e._v("Add Remote Order")]),i("q-space"),i("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",dense:""}})],1),e.reference?[i("q-card-section",{staticClass:"q-py-md bg-grey-1 text-center",class:"text-"+e.color},[i("div",{staticClass:"text-h5 text-bold"},[e._v(e._s(e.r_ref))])]),i("q-card-section",{staticClass:"q-gutter-y-xs q-pt-none q-pb-xs"},[i("div",{staticClass:"row q-col-gutter-x-xs"},[i("q-input",{staticClass:"col",attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Item",value:e.reference.server[1].item}}),i("q-input",{staticClass:"col",attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Quantity",value:e.reference.server[1].quantity}})],1),i("q-input",{attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Delivery",value:e.reference.server[1].deliver}}),i("q-input",{staticStyle:{height:"6rem"},attrs:{outlined:"",readonly:"","input-class":"text-"+e.color,label:"Narration",value:e.reference.server[1].narration,type:"textarea"}})],1)]:i("q-card-section",{staticClass:"q-gutter-y-xs q-pb-xs"},[i("q-file",{attrs:{clearable:"",outlined:"",dense:"","input-class":"text"+e.color,label:"Import File","bottom-slots":"","hide-bottom-space":""},scopedSlots:e._u([{key:"prepend",fn:function(){return[i("q-icon",{attrs:{name:"cloud",color:e.color}})]},proxy:!0}]),model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),i("div",{staticClass:"row q-gutter-x-xs"},[i("q-input",{staticClass:"col",attrs:{outlined:"",dense:"","input-class":"text-"+e.color,label:"Location"},model:{value:e.ti_location,callback:function(t){e.ti_location=t},expression:"ti_location"}}),i("q-input",{staticClass:"col",attrs:{outlined:"",dense:"","input-class":"text-"+e.color,label:"ID",type:"number"},model:{value:e.ti_id,callback:function(t){e.ti_id=e._n(t)},expression:"ti_id"}})],1),i("q-input",{key:e.ref_make,attrs:{outlined:"",dense:"","input-class":"text-"+e.color,label:"Reference ID",value:e.params.name}}),i("div",{staticClass:"row q-gutter-x-xs"},[i("q-select",{staticClass:"col",attrs:{outlined:"",dense:"","input-class":"text-"+e.color,label:"Select Item",options:e.kitchen_items,"option-label":"name"},model:{value:e.params.item,callback:function(t){e.$set(e.params,"item",t)},expression:"params.item"}}),i("q-input",{staticClass:"col",attrs:{outlined:"",dense:"","input-class":"text-"+e.color,label:"Quantity",type:"number"},model:{value:e.params.quantity,callback:function(t){e.$set(e.params,"quantity",e._n(t))},expression:"params.quantity"}})],1),i("DateTime",{attrs:{outlined:"",dense:"","input-class":"text-"+e.color,label:"Delivery"},model:{value:e.params.deliver,callback:function(t){e.$set(e.params,"deliver",t)},expression:"params.deliver"}}),i("q-input",{staticStyle:{height:"6rem"},attrs:{outlined:"","input-class":"text-"+e.color,label:"Narration",type:"textarea"},model:{value:e.params.narration,callback:function(t){e.$set(e.params,"narration",t)},expression:"params.narration"}})],1),i("q-card-actions",{staticClass:"q-px-md q-pt-none"},[e.reference?i("q-btn",{attrs:{label:"Clear Upload",color:"red",dense:"",flat:"",size:"sm"},on:{click:function(t){e.file=null}}}):e._e(),i("q-space"),i("q-btn",{attrs:{label:e.reference?"Import Data":"Add Order",color:e.color,glossy:"",padding:"sm xl",loading:e.loading},on:{click:e.addOrder}})],1),i("q-dialog",{attrs:{persistent:"",value:!e.verified},on:{"before-hide":function(t){e.file=null}}},[i("q-card",{staticClass:"bg-red text-white",staticStyle:{"min-width":"65vw"}},[i("q-card-section",{staticClass:"bg-red-7"},[i("div",{staticClass:"text-h6"},[e._v("Error")])]),i("q-card-section",{staticClass:"text-caption"},[e._v("\n        The uploaded file is not valid because of any of the following reason.\n        "),i("li",[e._v("The uploaded data is not valid for this kitchen")]),i("li",[e._v("The items are not processing in this kitchen")]),i("li",[e._v("The reference name is not provided")]),i("li",[e._v("The item is already present in this kitchen")])]),i("q-card-actions",{staticClass:"bg-white text-teal",attrs:{align:"right"}},[i("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Clear File",color:"red-6"}})],1)],1)],1)],2)},h=[],p=(i("4d90"),i("5dee")),f={name:"AddRemoteOrder",components:{DateTime:p["a"]},props:["kitchen"],data(){return{color:"light-blue",ti_location:"",ti_id:"",loading:!1,params:{name:null,item:null,quantity:null,deliver:null,narration:null},file:null,reference:null,verified:!0}},computed:r()(r()({},Object(l["d"])({kitchen_items({kitchens:e,items:t,remote:i}){return _(e.items[this.kitchen]).map((({item:e})=>_.get(t.data,e))).map((e=>Object.assign({},e,{reference:_.get(_.find(i.data,{item:"kitchen_items",local_id:parseInt(e.id)}),"reference")}))).value()},read_ref_remotes({remote:e}){return _(e.data).filter((({extra:e})=>_.has(e,"r_ref"))).keyBy("extra.r_ref").value()}})),{},{remote_items(){return _.map(this.kitchen_items,"reference")},r_ref(){return _.get(this.reference,"name")},ref_make(){return this.ti_location+"TI"+_.padStart(this.ti_id,6,0)},reference_exists(){return this.reference?_.has(this.read_ref_remotes,this.reference.name)&&this.read_ref_remotes[this.reference.name].reference===this.reference.token_item_reference:null},kitchen_remote(){return _.find(this.$store.state.remote.data,{item:"kitchens",local_id:parseInt(this.kitchen)})}}),methods:{setReference(e){this.reference=e?JSON.parse(_.get(e,["target","result"])):null,this.verifyReference()},verifyReference(){return null===this.reference?this.verified=!0:this.reference.kitchen_item_location===_BRANCH&&this.remote_items.includes(this.reference.kitchen_item_reference)&&this.reference.name?this.reference_exists?this.verified=!1:void 0:this.verified=!1},addOrder(){if(this.reference)this.loading=!0,this.$store.dispatch("remote/processReference",{r_ref:this.reference.name,reference:this.reference},{root:!0});else{if(!_.every(_.pick(this.params,["name","item","quantity","deliver"])))return this.$q.notify({textColor:"white",message:"All except narration is mandatory, please fill them all..",type:"negative",position:"center",closeBtn:"Try Again"});{let e=[{date:Object(o["x"])("YYYY-MM-DD HH:mm:ss",new Date),narration:this.params.narration,progress:"New"},{quantity:1,narration:this.params.narration,deliver:this.params.deliver,photo:null,kitchen:this.kitchen_remote.reference,progress:"Accepted",item:this.params.item.name,kitchen_item_reference:this.params.item.reference,kitchen_item_location:_BRANCH}],t={token_source_location:this.ti_location,token_reference:null,token_item_reference:null,token_item_source_id:this.ti_id,name:this.params.name,server:e};this.$store.dispatch("remote/referenceToken",{r_ref:this.params.name,reference:t},{root:!0})}}setTimeout((function(e){e.loading=!1,e.$emit("imported")}),1e3,this)}},watch:{file(e){if(!e)return this.setReference(e);let t=new FileReader;t.onload=this.setReference,t.readAsText(e)},ref_make(e){this.params.name=e},ti_location(e){_.toUpper(e)!==e&&(this.ti_location=_.toUpper(e))}}},g=f,b=i("2877"),v=i("f09f"),k=i("d847"),q=i("2c91"),x=i("9c40"),y=i("a370"),C=i("27f9"),w=i("7d53"),I=i("0016"),Q=i("ddd8"),D=i("4b7e"),O=i("24e8"),A=i("7f67"),S=i("eebe"),R=i.n(S),T=Object(b["a"])(g,u,h,!1,null,null,null),$=T.exports;R()(T,"components",{QCard:v["a"],QBar:k["a"],QSpace:q["a"],QBtn:x["a"],QCardSection:y["a"],QInput:C["a"],QFile:w["a"],QIcon:I["a"],QSelect:Q["a"],QCardActions:D["a"],QDialog:O["a"]}),R()(T,"directives",{ClosePopup:A["a"]});var j={name:"KitchenActionsView",components:{AddRemoteOrder:$,CardImageTitle:m["a"]},data(){return{loading:!1,remote_order:!1,ref_content:""}},props:["id","me"],computed:r()(r()(r()(r()({},Object(l["d"])("kitchens",{kitchens:"data",status:"status"})),Object(l["d"])("users",{users:"data"})),Object(l["b"])("kitchens",["assign"])),{},{intID(){return _.toInteger(this.id)},is_in(){return this.assign&&_.has(this.assign,this.me)&&_.includes(this.assign[this.me],this.intID)},kitchen(){return this.kitchens[this.intID]},image(){return Object(o["g"])(this.kitchen.image)},chefs(){return _.get(this.status,[this.intID,"users"],[])},full_timer(){return _.get(this.users,_.get(this.status,[this.intID,"full_timer"],null),null)},printer:{get(){return _.get(this.status,[this.intID,"printer"],"")},set(e){this.loading=!0,this.$store.dispatch("kitchens/printer",{id:this.intID,printer:e}).then((()=>this.loading=!1))}}}),methods:{toggle({id:e}){this.loading=!0,this.$store.dispatch("kitchens/chef",{kitchen:e}).then((()=>this.loading=!1))},auto(e){this.loading=!0,this.$store.dispatch("kitchens/auto",{id:this.intID,auto_accept:e}).then((()=>this.loading=!1))},full_time(e){this.loading=!0,post("kitchen","full_timer",{kitchen:this.intID,user:this.me,status:e}).then((()=>this.loading=!1))}}},z=j,N=i("58a8"),B=i("74f7"),F=i("8380"),M=Object(b["a"])(z,c,d,!1,null,null,null),Y=M.exports;R()(M,"components",{QCard:v["a"],QCardSection:y["a"],QIcon:I["a"],QCardActions:D["a"],QBtn:x["a"],QSelect:Q["a"],QInput:C["a"],QBadge:N["a"],QInnerLoading:B["a"],QSpinnerDots:F["a"],QDialog:O["a"]});var E=i("c624"),K={name:"PageChefKitchens",components:{Masonry:E["a"],KitchenActionsView:Y},data(){return{split:70,height:75,me:_USER.id}},computed:r()({},Object(l["b"])("kitchens",{kitchens:"non_remote"})),methods:{hKey({id:e},t){return Object(o["d"])("ckv","kitchen",t,e)},assign({id:e}){this.$store.dispatch("kitchens/chef",{kitchen:e})}}},H=K,P=i("9989"),U=Object(b["a"])(H,s,n,!1,null,null,null);t["default"]=U.exports;R()(U,"components",{QPage:P["a"]})}}]);