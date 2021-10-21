(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{1984:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{attrs:{padding:""}},[s("div",{staticClass:"q-mx-auto",staticStyle:{width:"90vw"}},[s("KitchenItemsDisplay",{staticClass:"q-mb-sm",attrs:{kitchen:t.id}})],1)])},i=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{key:"kid-update-"+t.update_key},[s("q-card-section",{staticClass:"bg-grey-2"},[s("div",{staticClass:"text-h6"},[t._v(t._s(t.name))])]),s("q-card-actions",{staticClass:"q-px-md"},[t._v("\n    Users: "+t._s(t.users.length)+" "),s("q-space"),s("q-btn",{attrs:{icon:"add_box",color:"primary",flat:""},on:{click:function(e){t.add_mode=!0}}})],1),s("q-separator"),s("q-list",{attrs:{separator:""}},[s("q-item",{staticClass:"text-bold"},[s("q-item-section",[s("q-item-label",[t._v("Item")])],1),s("q-item-section",[s("q-item-label",[t._v("Stock")])],1),s("q-item-section",[s("q-item-label",[t._v("Duration")])],1),s("q-item-section",[s("q-item-label",[t._v("Auto Process")])],1),s("q-item-section",[s("q-item-label",[t._v("Auto Complete")])],1),s("q-item-section",{attrs:{side:""}},[t._v(" ")])],1),s("q-item",{staticClass:"text-bold"},[s("q-item-section",[s("FilterInputText",{attrs:{label:"Filter Items"},on:{text:function(e){t.filter=e}}})],1)],1),t._l(t.filtered,(function(e){return s("KitchenItemsDisplayItemRow",t._b({key:t.hKey(e),attrs:{name:t.item(e).name,temp:t.filtered}},"KitchenItemsDisplayItemRow",e,!1))}))],2),s("q-card-section",{staticClass:"bg-grey-2"},[s("div",{staticClass:"row q-col-gutter-y-xs items-center"},[s("q-select",{staticClass:"col-6",attrs:{label:"Auto Process",outlined:"",dense:"",options:["Yes","No"]},model:{value:t.auto_process,callback:function(e){t.auto_process=e},expression:"auto_process"}}),s("q-btn",{staticClass:"col-5 offset-1",attrs:{label:"Set for all",color:"indigo",dense:"",padding:"xs sm",loading:t.loading},on:{click:function(e){return t.items_all("auto_process")}}}),s("q-select",{staticClass:"col-6",attrs:{label:"Auto Complete",outlined:"",dense:"",options:["Yes","No"]},model:{value:t.auto_complete,callback:function(e){t.auto_complete=e},expression:"auto_complete"}}),s("q-btn",{staticClass:"col-5 offset-1",attrs:{label:"Set for all",color:"indigo",dense:"",padding:"xs sm",loading:t.loading},on:{click:function(e){return t.items_all("auto_complete")}}}),s("q-input",{staticClass:"col-6",attrs:{label:"Stock",outlined:"",dense:"",type:"number"},model:{value:t.stock,callback:function(e){t.stock=t._n(e)},expression:"stock"}}),s("q-btn",{staticClass:"col-5 offset-1",attrs:{label:"Set for all",color:"indigo",dense:"",padding:"xs sm",loading:t.loading},on:{click:function(e){return t.items_all("stock")}}}),s("q-input",{staticClass:"col-6",attrs:{label:"Duration",type:"number",outlined:"",dense:""},model:{value:t.duration,callback:function(e){t.duration=t._n(e)},expression:"duration"}}),s("q-btn",{staticClass:"col-5 offset-1",attrs:{label:"Set for all",color:"indigo",dense:"",padding:"xs sm",loading:t.loading},on:{click:function(e){return t.items_all("duration")}}})],1)]),s("q-dialog",{attrs:{persistent:""},model:{value:t.add_mode,callback:function(e){t.add_mode=e},expression:"add_mode"}},[s("KitchenItemAdd",{staticStyle:{width:"700px","max-width":"60vw"},attrs:{kitchen:t.kitchen},on:{close:function(e){t.add_mode=!1}}})],1)],1)},o=[],l=s("ded3"),c=s.n(l),r=s("2f62"),m=s("43fa"),d=s("b1c1"),u=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-item",[s("q-item-section",[s("q-item-label",{attrs:{caption:"",lines:"3"}},[t._v(t._s(t.name))])],1),s("q-item-section",[s("q-item-label",{attrs:{caption:""}},[s("q-input",{attrs:{dense:"",type:"number"},model:{value:t.params.stock,callback:function(e){t.$set(t.params,"stock",e)},expression:"params.stock"}})],1)],1),s("q-item-section",[s("q-item-label",{attrs:{caption:""}},[s("q-input",{attrs:{dense:"",type:"number"},model:{value:t.params.duration,callback:function(e){t.$set(t.params,"duration",e)},expression:"params.duration"}})],1)],1),s("q-item-section",[s("q-item-label",{attrs:{caption:""}},[s("q-select",{attrs:{dense:"",options:["Yes","No"]},model:{value:t.params.auto_process,callback:function(e){t.$set(t.params,"auto_process",e)},expression:"params.auto_process"}})],1)],1),s("q-item-section",[s("q-item-label",{attrs:{caption:""}},[s("q-select",{attrs:{dense:"",options:["Yes","No"]},model:{value:t.params.auto_complete,callback:function(e){t.$set(t.params,"auto_complete",e)},expression:"params.auto_complete"}})],1)],1),s("q-item-section",{attrs:{side:""}},[t.loading?s("q-spinner-hourglass",{attrs:{size:"xs",color:"primary"}}):s("q-btn",{attrs:{size:"md",color:"red",dense:"",flat:"",icon:"clear",round:""},on:{click:t.del}})],1)],1)},p=[],h={name:"KitchenItemsDisplayItemRow",props:["id","name"],data(){return{params:{stock:0,duration:0,auto_process:"No",auto_complete:"No",id:null},ready:!1,loading:!1}},methods:c()(c()({},Object(r["c"])("kitchens",["item_remove"])),{},{del(){this.loading=!0,post("kitchen","item",{delete:this.id}).then((()=>this.loading=this.item_remove({kitchen:this.$attrs["kitchen"],id:this.id})&&!1))}}),created(){_.forEach(["stock","duration","auto_process","auto_complete"],(t=>this.params[t]=this.$attrs[t])),this.params.id=this.id,this.$nextTick((()=>this.ready=!0))},watch:{params:{deep:!0,handler(t){if(this.loading=!0,!this.ready||!t.id)return this.loading=!1;post("kitchen","item",t).then((()=>this.loading=!1))}}}},b=h,k=s("2877"),f=s("66e5"),q=s("4074"),g=s("0170"),v=s("27f9"),x=s("ddd8"),I=s("9149"),y=s("9c40"),C=s("eebe"),Q=s.n(C),S=Object(k["a"])(b,u,p,!1,null,null,null),w=S.exports;Q()(S,"components",{QItem:f["a"],QItemSection:q["a"],QItemLabel:g["a"],QInput:v["a"],QSelect:x["a"],QSpinnerHourglass:I["a"],QBtn:y["a"]});var j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"row items-center q-pb-none"},[s("div",{staticClass:"text-h6"},[t._v("Add Item to Kitchen")]),s("q-space"),s("q-btn",{attrs:{icon:"close",flat:"",round:"",dense:""},on:{click:function(e){return t.$emit("close",null)}}})],1),s("q-card-section",{staticClass:"q-gutter-xs q-pb-none"},[s("q-select",{attrs:{outlined:"",dense:"","use-input":"","hide-selected":"","fill-input":"","input-debounce":"0",options:t.item_options_unique,label:"Select Item",clearable:""},on:{filter:t.filter},model:{value:t.item_obj,callback:function(e){t.item_obj=e},expression:"item_obj"}}),s("q-input",{attrs:{dense:"",outlined:"",type:"number",label:"Stock"},model:{value:t.params.stock,callback:function(e){t.$set(t.params,"stock",t._n(e))},expression:"params.stock"}}),s("q-input",{attrs:{dense:"",outlined:"",type:"number",label:"Prepare Duration in Minutes"},model:{value:t.params.duration,callback:function(e){t.$set(t.params,"duration",t._n(e))},expression:"params.duration"}}),s("q-select",{attrs:{dense:"",outlined:"",options:["Yes","No"],label:"Auto Process on Accept"},model:{value:t.params.auto_process,callback:function(e){t.$set(t.params,"auto_process",e)},expression:"params.auto_process"}}),s("q-select",{attrs:{dense:"",outlined:"",options:["Yes","No"],label:"Auto Complete on Processing"},model:{value:t.params.auto_complete,callback:function(e){t.$set(t.params,"auto_complete",e)},expression:"params.auto_complete"}})],1),s("q-card-actions",{staticClass:"q-px-md q-pt-xs",attrs:{align:"right"}},[s("q-btn",{attrs:{color:"primary",label:"Add Item",type:"submit",loading:t.loading},on:{click:function(e){return e.preventDefault(),t.add(e)}}})],1)],1)},$=[],A=(s("c975"),s("ddb0"),{name:"KitchenItemAdd",props:["kitchen"],data(){return{item_obj:null,item_options:[],loading:!1,params:{item:null,stock:1,duration:0,auto_process:"No",auto_complete:"No",kitchen:null}}},computed:c()(c()({},Object(r["d"])({items:({items:{data:t}})=>t,kitchen_items:({kitchens:{items:t}})=>t})),{},{my_kitchen_items(){return _.map(this.kitchen_items[_.toSafeInteger(this.kitchen)],"item")},item_options_unique(){return _.filter(this.item_options,(({id:t})=>!_.includes(this.my_kitchen_items,_.toSafeInteger(t))))}}),methods:{filter(t,e){e((()=>{const e=(t||"").toLowerCase();this.item_options=e?Object(d["u"])(this.items,["name"]).filter((t=>_.values(t).join(" ").toLowerCase().indexOf(e)>-1)):Object(d["u"])(this.items,["name"])}))},add(){if(this.loading=!0,this.params.item=_.get(this.item_obj,"id",null),this.params.kitchen=this.kitchen,!this.params.kitchen||!this.params.item)return this.loading=!1;post("kitchen","item",this.params).then((()=>this.$emit("close"))).catch().then((()=>this.loading=!1))}},created(){this.item_options=Object(d["u"])(this.items,["name"],"")}}),K=A,O=s("f09f"),D=s("a370"),N=s("2c91"),Y=s("4b7e"),P=Object(k["a"])(K,j,$,!1,null,null,null),E=P.exports;Q()(P,"components",{QCard:O["a"],QCardSection:D["a"],QSpace:N["a"],QBtn:y["a"],QSelect:x["a"],QInput:v["a"],QCardActions:Y["a"]});var L=s("5ab9"),R={name:"KitchenItemsDisplay",props:["kitchen"],data(){return{add_mode:!1,filter:"",auto_process:"Yes",auto_complete:"Yes",stock:100,duration:180,update_key:0,loading:!1}},components:{FilterInputText:L["a"],KitchenItemAdd:E,KitchenItemsDisplayItemRow:w,CardImageTitle:m["a"]},computed:c()(c()(c()({kid(){return _.toInteger(this.kitchen)}},Object(r["d"])("kitchens",{name:function({data:t}){return _.get(t,[this.kid,"name"])},k_items:function({items:t}){return _.get(t,this.kid)},users:function({status:t}){return _.get(t,[this.kid,"users"],[])}})),Object(r["d"])("items",{items:"data"})),{},{filtered(){return this.filter?_.filter(this.k_items,this.match):this.k_items}}),methods:{item({item:t}){return _.get(this.items,_.toSafeInteger(t),{})},hKey({id:t,item:e}){return Object(d["d"])("kitchen",this.kitchen,"items",t,"item",e)},match({item:t}){return Object(d["p"])(this.items[t],["id","name","detail"],this.filter)},items_all(t){this.loading=!0,post("kitchen","items_all",{kitchen:this.kid,item:t,process:this[t]}).then((t=>this.loading=!++this.update_key))}}},T=R,B=s("eb85"),F=s("1c1c"),z=s("24e8"),J=Object(k["a"])(T,n,o,!1,null,null,null),H=J.exports;Q()(J,"components",{QCard:O["a"],QCardSection:D["a"],QCardActions:Y["a"],QSpace:N["a"],QBtn:y["a"],QSeparator:B["a"],QList:F["a"],QItem:f["a"],QItemSection:q["a"],QItemLabel:g["a"],QSelect:x["a"],QInput:v["a"],QDialog:z["a"]});var M={name:"PageKitchenItems",props:["id"],components:{KitchenItemsDisplay:H},computed:{},methods:{}},U=M,G=s("9989"),V=Object(k["a"])(U,a,i,!1,null,null,null);e["default"]=V.exports;Q()(V,"components",{QPage:G["a"]})}}]);