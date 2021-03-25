(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[39],{2836:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{attrs:{padding:""}},[s("KitchenTokens",{attrs:{id:t.kitchen,card:!1}})],1)},a=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{attrs:{flat:!t.card}},[t.card?s("q-card-section",{staticClass:"bg-grey-2"},[s("div",{staticClass:"text-bold"},[t._v(t._s(t.kitchen.name))])]):t._e(),s("q-card-section",{directives:[{name:"show",rawName:"v-show",value:0===t.Tokens.length,expression:"Tokens.length === 0"}],staticClass:"text-center"},[t._v("NO TOKENS")]),s("q-card-section",{directives:[{name:"show",rawName:"v-show",value:0!==t.Tokens.length,expression:"Tokens.length !== 0"}],staticClass:"q-pa-none q-ma-none"},[s("q-card-section",{directives:[{name:"show",rawName:"v-show",value:"Item"===t.mode,expression:"mode === 'Item'"}],staticClass:"row q-col-gutter-sm"},[s("Masonry",{attrs:{width:"250",items:t.items},scopedSlots:t._u([{key:"item",fn:function(e){return[s("KitchenTokenItem",{attrs:{kitchen:t.id,details:e.item,item:t.getItem(e.item),stock:t.getStock(e.item)}})]}}])})],1),s("q-card-section",{directives:[{name:"show",rawName:"v-show",value:"Progress"===t.mode,expression:"mode === 'Progress'"}],staticClass:"row q-col-gutter-sm"},[s("div",{staticClass:"col-xs-12 col-sm-4"},[s("KitchenTokenBundle",{attrs:{kitchen:t.id,type:"New",stock:"true",action:"true"}})],1),s("div",{staticClass:"col-xs-12 col-sm-4"},[s("KitchenTokenBundle",{attrs:{kitchen:t.id,type:"Accepted",action:"true"}})],1),s("div",{staticClass:"col-xs-12 col-sm-4"},[s("KitchenTokenBundle",{attrs:{kitchen:t.id,type:"Processing",action:"true"}})],1)]),s("q-card-section",{directives:[{name:"show",rawName:"v-show",value:"Token"===t.mode,expression:"mode === 'Token'"}],staticClass:"row q-col-gutter-sm"},[s("Masonry",{attrs:{width:"320",gutter:"xs",items:t.Tokens},scopedSlots:t._u([{key:"item",fn:function(e){return[s("TokenDetailCard",{attrs:{id:e.id,kitchen:t.kitchen.id,multiple:t.card}})]}}])})],1)],1),s("q-dialog",{attrs:{persistent:""},model:{value:t.reset,callback:function(e){t.reset=e},expression:"reset"}},[s("KitchenItemCancel",{staticStyle:{width:"80vw","max-width":"330px"},attrs:{kitchen:t.id,cancelling:t.cancelling},on:{cancel:t.doReset}})],1)],1)},r=[],o=(s("5db7"),s("73d9"),s("ded3")),c=s.n(o),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[t.multiple?t._e():s("q-card-section",{staticClass:"q-pa-xs",class:t.dtColor}),s("q-card-section",{staticClass:"bg-grey-2 row justify-between items-center q-py-sm"},[s("div",{staticClass:"text-bold q-py-xs q-px-sm text-white text-weight-bolder rounded-borders",class:t.dtColor},[t._v(t._s(t.id))]),s("div",{staticClass:"text-bold"},[t._v(t._s(t.token_time))])]),s("q-card-section",{staticClass:"row justify-between items-center q-py-xs"},[t.token.waiter?s("q-chip",{attrs:{square:"",color:"cyan-7","text-color":"white"}},[s("q-avatar",{attrs:{"text-color":"white"}},[s("q-icon",{attrs:{name:"local_dining"}})],1),t._v(t._s(t.token.waiter))],1):t._e(),t.token.seat?s("q-chip",{attrs:{square:"",color:"amber-9","text-color":"white"}},[s("q-avatar",{attrs:{"text-color":"white"}},[s("q-icon",{attrs:{name:"event_seat"}})],1),t._v(t._s(t.token.seat))],1):t._e(),"Dining"!==t.token.type&&t.token.customer?s("q-chip",{attrs:{square:"",color:"accent","text-color":"white"}},[s("q-avatar",{attrs:{"text-color":"white"}},[s("q-icon",{attrs:{name:"person_outline"}})],1),t._v(t._s(t.token.customer.name))],1):t._e(),s("q-chip",{attrs:{square:"",color:"teal-9","text-color":"white"}},[s("q-avatar",{attrs:{"text-color":"white"}},[s("q-icon",{attrs:{name:"rule"}})],1),t._v(t._s(t.token.type))],1)],1),s("q-list",{staticClass:"bg-grey-1",attrs:{bordered:"",separator:""}},t._l(t.token.items,(function(e){return s("TokenDetailCardItem",{key:t.hKey(e),attrs:{token:t.token,item:e,kitchen:t.kitchen}})})),1)],1)},d=[],m=s("2f62"),h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return"Cancelled"!==t.item.progress?s("q-item",{attrs:{disable:!t.eligible}},[s("q-item-section",[t.eligible&&t.wait?s("q-item-label",{staticClass:"text-weight-bolder text-red",staticStyle:{"font-size":"0.8rem"}},[t._v("Wait "+t._s(t.item.delay-t.now)+" seconds")]):t._e(),t.eligible&&t.item.narration&&!t.wait?s("q-item-label",{staticClass:"text-weight-bolder text-red",staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.item.narration))]):t._e(),s("q-item-label",[s("span",{staticClass:"text-weight-bolder"},[t._v(t._s(t.item.quantity))]),t._v(" x "+t._s(t.name))]),s("q-item-label",{attrs:{caption:"",temp:t.next}},[t._v(t._s(t.time)+" "+t._s(t.unit)+" ago")]),t.item.kitchen&&t.item.kitchen!==t.kitchen?s("q-item-label",{attrs:{caption:""}},[t._v("Kitchen: "+t._s(t.kName(t.item.kitchen)))]):t._e()],1),"Processing"!==t.item.progress||!t.eligible||t.loading||t.wait?t._e():s("q-item-section",{attrs:{side:""}},[s("q-spinner-dots",{attrs:{color:"primary",size:"2em"}})],1),s("q-item-section",{attrs:{side:""}},[s("q-badge",{staticClass:"q-py-xs",attrs:{color:t.color[t.item.progress],label:t.item.progress}})],1),t.eligible&&t.action.hasOwnProperty(t.item.progress)?s("q-item-section",{attrs:{side:""}},[s("q-btn",{staticClass:"flip-horizontal",attrs:{icon:"reply_all",color:"primary",round:"",size:"sm"},on:{click:t.progress}})],1):t._e(),t.eligible&&(t.wait||t.loading)?s("q-inner-loading",{attrs:{showing:!0}},[s("q-spinner-facebook",{attrs:{color:"primary",size:"2em"}})],1):t._e()],1):t._e()},u=[],p=s("232e"),k={name:"TokenDetailCardItem",props:["token","item","kitchen"],data(){return{color:p["f"],action:{New:"accept",Accepted:"process",Processing:"complete"},now:_.toInteger((new Date).getTime()/1e3),loading:!1}},computed:c()(c()({},Object(m["d"])({name({items:{data:t}}){return _.get(t,[this.item.item,"name"])},available({kitchens:{items:t}}){return!!_.filter(_.get(t,this.kitchen),["item",this.item.item]).length}})),{},{eligible(){return this.item.kitchen===this.kitchen||!this.item.kitchen&&this.available},since(){return _.toInteger(_.get(_.last(this.item.progress_timing),"time"))},time(){let t=this.now-this.since,e=t<60?t:t<3600?_.toInteger(t/60):_.toInteger(t/3600);return _.toInteger(e)},unit(){let t=this.now-this.since;return t<60?"seconds":t<3600?"minutes":"hours"},wait(){return this.item.delay>0&&this.now<this.item.delay},next(){return this.now,setTimeout((t=>t.now=_.toInteger((new Date).getTime()/1e3)),this.wait||"seconds"===this.unit?1e3:"minutes"===this.unit?6e4:36e5,this)}}),methods:{kName(t){return _.get(this.$store.state.kitchens.data,[t,"name"])},progress(){this.loading=!0,post("token",this.action[this.item.progress],{id:this.item.id,kitchen:this.kitchen}).then((()=>this.loading=!1))}}},g=k,b=s("2877"),v=s("66e5"),q=s("4074"),w=s("0170"),y=s("8380"),f=s("58a8"),x=s("9c40"),C=s("74f7"),I=s("e669"),T=s("eebe"),Q=s.n(T),O=Object(b["a"])(g,h,u,!1,null,null,null),$=O.exports;Q()(O,"components",{QItem:v["a"],QItemSection:q["a"],QItemLabel:w["a"],QSpinnerDots:y["a"],QBadge:f["a"],QBtn:x["a"],QInnerLoading:C["a"],QSpinnerFacebook:I["a"]});var K=s("b1c1"),j={name:"TokenDetailCard",components:{TokenDetailCardItem:$},props:["id","kitchen","multiple"],computed:c()(c()({},Object(m["d"])({token:function({tokens:{data:t,items:e},seating:s,users:i,customers:a}){let n=_.get(t,this.id);return Object.assign({},n,{waiter:_.get(i,["data",n.user,"name"]),seat:_.get(s,["data",n.seating,"name"]),items:e[n.id],customer:_.get(a,["data",n.customer])})}})),{},{token_time(){return Object(K["k"])(this.token.date)},dtColor(){return"bg-"+p["a"][this.token.type]}}),methods:{hKey({token:t,item:e,id:s}){return Object(K["b"])("token",t,"item","detail",e,"id",s)}}},S=j,A=s("f09f"),B=s("a370"),L=s("b047"),N=s("cb32"),P=s("0016"),W=s("1c1c"),E=Object(b["a"])(S,l,d,!1,null,null,null),z=E.exports;Q()(E,"components",{QCard:A["a"],QCardSection:B["a"],QChip:L["a"],QAvatar:N["a"],QIcon:P["a"],QList:W["a"]});var D=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"text-white text-bold",class:t.colClass},[t._v(t._s(t.type))]),s("q-list",{directives:[{name:"show",rawName:"v-show",value:Object.keys(t.dist).length>0,expression:"Object.keys(dist).length > 0"}],attrs:{bordered:"",separator:""}},[s("transition-group",{attrs:{appear:"","enter-active-class":"animated bounceIn","leave-active-class":"animated bounceOut",mode:"out-in"}},t._l(t.dist,(function(e,i){return s("KitchenTokenBundleItem",t._b({key:t.hKey(i),attrs:{identify:i,progress:t.type,"show-stock":t.stock,processing:t.processing.includes(i)},on:{proceed:function(e){t.item=e}}},"KitchenTokenBundleItem",e,!1))})),1)],1),s("q-card-section",{staticClass:"text-center text-bold"},[t._v(t._s(t.total?"Total: "+t.total:"No Items"))]),void 0!==t.action?s("q-dialog",{attrs:{persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("KitchenTokenBundleAction",t._b({staticStyle:{width:"50vw","max-width":"330px"},attrs:{progress:t.type},on:{progress:t.progress}},"KitchenTokenBundleAction",t.dist[t.item],!1))],1):t._e()],1)},M=[],V=s("3758"),F=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-item",{attrs:{disable:t.wait>0||t.$attrs.processing,clickable:""},on:{click:function(e){return t.$emit("proceed",t.$attrs.identify)}}},[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{attrs:{rounded:""}},[s("q-img",{attrs:{src:t.src}})],1)],1),s("q-item-section",[void 0!==t.$attrs["show-stock"]?s("q-item-label",{attrs:{caption:""}},[t._v("Stock: "+t._s(t.$attrs.stock))]):t._e(),s("q-item-label",{staticClass:"text-weight-bold"},[t._v(t._s(t.$attrs.name))]),t.wait?s("q-item-label",{staticClass:"text-bold",attrs:{caption:""}},[t._v("Wait: "+t._s(t.wait))]):t._e(),t.$attrs.narration?s("q-item-label",{staticClass:"text-red text-bold",attrs:{caption:""}},[t._v(t._s(t.$attrs.narration))]):t._e()],1),s("q-item-section",{attrs:{side:""}},[s("q-avatar",{staticClass:"text-weight-bold",attrs:{color:t.color,rounded:"","text-color":"white"}},[t._v(t._s(t.$attrs.total))])],1),s("q-inner-loading",{attrs:{showing:t.$attrs.processing,"transition-hide":"fadeOut","transition-show":"fadeIn"}},[s("q-spinner-facebook",{attrs:{color:"primary",size:"2em"}})],1)],1)},R=[],J={name:"KitchenTokenBundleItem",data(){return{wait:_.toInteger(this.$attrs.wait),interval:0,color:p["f"][this.$attrs.progress],src:Object(K["c"])(this.$attrs.image)}},created(){this.wait&&(this.interval=setInterval((t=>t.wait--),1e3,this),setTimeout((t=>clearInterval(t.interval)),1e3*this.wait,this))}},G=J,H=s("068f"),U=Object(b["a"])(G,F,R,!1,null,null,null),X=U.exports;Q()(U,"components",{QItem:v["a"],QItemSection:q["a"],QAvatar:N["a"],QImg:H["a"],QItemLabel:w["a"],QInnerLoading:C["a"],QSpinnerFacebook:I["a"]});var Y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("CardImageTitle",{attrs:{image:t.image,title:t.$attrs.name}}),t.$attrs.narration?s("q-card-section",{staticClass:"bg-teal text-white"},[s("div",{staticClass:"text-h6"},[t._v(t._s(t.$attrs.narration))])]):t._e(),s("q-card-actions",[s("q-btn",{attrs:{icon:"done_all",glossy:"",push:"",color:"positive",label:"All"},on:{click:t.all}}),s("q-space"),s("q-btn",{attrs:{icon:"done",glossy:"",push:"",color:"deep-orange-7",label:"Invert "},on:{click:t.invert}})],1),s("q-list",{staticClass:"bg-grey-2",attrs:{bordered:"",separator:""}},t._l(t.$attrs.token,(function(e){return s("q-item",{key:t.hKey(e),class:{"bg-grey-4":t.selected.includes(e.id)},attrs:{clickable:""},on:{click:function(s){return t.clicked(e)}}},[s("q-item-section",{attrs:{avatar:""}},[s("transition",{attrs:{mode:"out-in",appear:"","enter-active-class":"animated bounceIn","leave-active-class":"animated bounceOut"}},[t.selected.includes(e.id)?s("q-avatar",{attrs:{icon:"done_all",color:"green","text-color":"grey-2"}}):t._e()],1)],1),s("q-item-section",[s("q-item-label",[t._v("Token: "+t._s(e.token)+" - ("+t._s(t.time(t.Tokens[e.token].date))+")")]),s("q-item-label",{attrs:{caption:""}},[t._v("Type: "+t._s(t.Tokens[e.token].type))]),t.Tokens[e.token].waiter?s("q-item-label",{attrs:{caption:""}},[t._v("Waiter: "+t._s(t.Tokens[e.token].waiter.name))]):t._e(),t.Tokens[e.token].seating?s("q-item-label",{attrs:{caption:""}},[t._v("Seat: "+t._s(t.Tokens[e.token].seating.name))]):t._e()],1),s("q-item-section",{attrs:{side:""}},[s("q-avatar",{attrs:{rounded:"","text-color":"white",color:t.color}},[t._v(t._s(e.quantity))])],1)],1)})),1),s("q-card-actions",{staticClass:"bg-white text-teal",attrs:{align:"left"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"CLOSE"}}),s("q-space"),s("q-badge",{directives:[{name:"show",rawName:"v-show",value:t.selected.length,expression:"selected.length"}],staticClass:"q-py-sm q-px-md",attrs:{label:t.total}}),s("q-space"),s("q-btn",{staticClass:"flip-horizontal",attrs:{icon:"reply_all",disable:!t.selected.length,round:"",color:"positive"},on:{click:function(e){return t.$emit("progress",t.selected)}}})],1)],1)},Z=[],tt=(s("ddb0"),s("43fa")),et={name:"KitchenTokenBundleAction",components:{CardImageTitle:tt["a"]},data(){return{image:Object(K["c"])(this.$attrs.image),selected:[],color:p["f"][this.$attrs.progress]}},mixins:[V["a"]],computed:{tkn(){return _.map(this.$attrs.token,"token")},ids(){return _.map(this.$attrs.token,"id")},Tokens(){return _(this.tokens).filter((({id:t})=>this.tkn.includes(t))).keyBy("id").value()},total(){let t=this.selected;return"TOTAL: "+_.sumBy(_.values(this.$attrs.token),(({quantity:e,id:s})=>t.includes(s)?e:0))}},methods:{hKey({id:t,token:e}){return Object(K["b"])("kitchen","token",e,"bundle","action","id",t)},time(t){return Object(K["k"])(t)},clicked({id:t}){this.selected.includes(t)?this.selected=_.difference(this.selected,[t]):this.selected.push(t)},all(){this.selected=this.ids},invert(){_.forEach(this.ids,(t=>this.clicked({id:t})))}}},st=et,it=s("4b7e"),at=s("2c91"),nt=s("7f67"),rt=Object(b["a"])(st,Y,Z,!1,null,null,null),ot=rt.exports;Q()(rt,"components",{QCard:A["a"],QCardSection:B["a"],QCardActions:it["a"],QBtn:x["a"],QSpace:at["a"],QList:W["a"],QItem:v["a"],QItemSection:q["a"],QAvatar:N["a"],QItemLabel:w["a"],QBadge:f["a"]}),Q()(rt,"directives",{ClosePopup:nt["a"]});var ct={name:"KitchenTokenBundle",components:{KitchenTokenBundleAction:ot,KitchenTokenBundleItem:X},mixins:[V["a"]],props:["kitchen","type","stock","action"],data(){return{colClass:"bg-"+p["f"][this.type],waits:[],timeout:0,item:null,processing:[],status:{New:"accept",Accepted:"process",Processing:"complete"}}},computed:c()(c()({},Object(m["d"])({kItems({kitchens:{items:t}}){return _.map(t[this.kitchen],(({item:t,stock:e})=>Object.assign({},{item:t,stock:e})))},items(){return _(this.tokens).flatMap("items").filter(this.isAct).value()},dist(){return _(this.items).groupBy(this.crypt).mapValues(this.itmObj).value()},total(){return _.sumBy(Object.values(this.dist),"total")}})),{},{dialog:{get(){return!!this.item},set(t){this.item=t||null}}}),methods:{hKey(t){return Object(K["b"])("kitchen",this.id,"tokens","bundle",t)},isAct({item:t,progress:e,kitchen:s}){return!s&&"New"===e&&"New"===this.type&&_.some(this.kItems,["item",t.id])||s&&s.id===_.toInteger(this.kitchen)&&this.type===e},itmObj(t){let e=t[0];return Object.assign({},this.pure(e),{total:_.sumBy(t,"quantity"),token:_(t).keyBy("token").mapValues((({token:t,id:e,user:s,quantity:i})=>new Object({token:t,id:e,user:s,quantity:i}))).value()})},crypt({delay:t,item:{id:e},narration:s}){return Object(K["a"])([e,this.getWait(t),s].join("|"))+""},pure({item:{id:t,name:e,image:s},delay:i,narration:a}){return{wait:this.getWait(i),narration:a,name:e,image:s,item:t,stock:_.get(_.find(this.kItems,["item",t]),"stock")}},getWait(t){let e=_.toInteger(t)-Object(K["f"])();return e<0?0:(this.waits.includes(e)||this.waits.push(e),e)},progress(t){let e=this.item;t.length&&this.processing.push(e),this.dialog=!1,this.post(0,t,e,this.kitchen)},post(t,e,s,i){if(e.length<=t)return this.processing=_.difference(this.processing,[s]);post("token",this.status[this.type],{id:e[t],kitchen:i}).then((()=>setTimeout(this.post,300,t+1,e,s,i)))}},watch:{waits:{immediate:!0,handler(t){if(!t.length)return;let e=1e3*_.min(t);clearTimeout(this.timeout),this.timeout=setTimeout((t=>t.waits=[]),e,this)}}}},lt=ct,dt=s("24e8"),mt=Object(b["a"])(lt,D,M,!1,null,null,null),ht=mt.exports;Q()(mt,"components",{QCard:A["a"],QCardSection:B["a"],QList:W["a"],QDialog:dt["a"]});var ut=s("3610"),pt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"row bg-deep-orange items-center text-white"},[s("div",{staticClass:"text-h6"},[t._v("Reset Item")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",icon:"clear"}})],1),s("q-item-section",{staticClass:"q-pa-md"},[s("FilterInputText",{attrs:{lazy:"true"},on:{text:function(e){t.filter=e}}})],1),s("q-list",{attrs:{bordered:"",separator:""}},[t.accepted.length?[s("q-item-label",{attrs:{header:""}},[t._v("Accepted Items")]),t._l(t.accepted,(function(e,i){return s("KitchenItemCancelItem",{key:t.hKey("accepted",i,e),attrs:{item:e,token:t.Tokens[e.token],selected:t.selected},on:{select:t.select}})}))]:t._e(),t.processing.length?[s("q-item-label",{attrs:{header:""}},[t._v("Processing Items")]),t._l(t.processing,(function(e,i){return s("KitchenItemCancelItem",{key:t.hKey("processing",i,e),attrs:{item:e,token:t.Tokens[e.token],selected:t.selected},on:{select:t.select}})}))]:t._e(),t.completed.length?[s("q-item-label",{attrs:{header:""}},[t._v("Completed Items")]),t._l(t.completed,(function(e,i){return s("KitchenItemCancelItem",{key:t.hKey("completed",i,e),attrs:{item:e,token:t.Tokens[e.token],selected:t.selected},on:{select:t.select}})}))]:t._e()],2),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{attrs:{push:"",loading:t.$attrs.cancelling,color:"deep-orange",label:"Reset All Selected"},on:{click:function(e){return t.$emit("cancel",t.selected)}}})],1)],1)},kt=[],gt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-item",{class:{"bg-pink-1":t.yes},attrs:{clickable:""},on:{click:function(e){return t.$emit("select",t.item.id)}}},[s("q-item-section",{staticClass:"text-bold",attrs:{avatar:""}},[s("q-avatar",{attrs:{color:"pink-6","text-color":"white",rounded:"",size:"md"}},[t._v(t._s(t.i("quantity"))+"x")])],1),s("q-item-section",[s("q-item-label",{staticClass:"text-bold"},[t._v(t._s(t.i("item","name"))+" - ("+t._s(t.time)+")")]),s("q-item-label",{attrs:{caption:""}},[t._v("Token: "+t._s(t.t("id"))+", "+t._s(t.t("type")))]),t.item.narration?s("q-item-label",{staticClass:"text-bold"},[t._v(t._s(t.item.narration)+")")]):t._e(),t.t("seating")?s("q-item-label",{attrs:{caption:""}},[t._v("Seating: "+t._s(t.t("seating","name")))]):t._e(),t.t("waiter")?s("q-item-label",{attrs:{caption:""}},[t._v("Waiter: "+t._s(t.t("waiter","name")))]):t._e()],1),s("q-item-section",{attrs:{side:""}},[s("q-btn",{attrs:{icon:"done",round:"",push:"",flat:"",color:t.yes?"positive":"grey-3"}})],1)],1)},_t=[],bt={name:"KitchenItemCancelItem",props:["item","token","selected"],computed:{time(){return Object(K["k"])(this.token.date)},yes(){return this.selected.includes(this.item.id)}},methods:{i(...t){return _.get(this.item,t)},t(...t){return _.get(this.token,t)}}},vt=bt,qt=Object(b["a"])(vt,gt,_t,!1,null,null,null),wt=qt.exports;Q()(qt,"components",{QItem:v["a"],QItemSection:q["a"],QAvatar:N["a"],QItemLabel:w["a"],QBtn:x["a"]});var yt=s("5ab9"),ft={name:"KitchenItemCancel",components:{FilterInputText:yt["a"],KitchenItemCancelItem:wt},data(){return{selected:[],filter:""}},props:["kitchen"],mixins:[V["a"]],computed:{Tokens(){return _(this.tokens).filter((({progress:t})=>["New","Processing"].includes(t))).keyBy("id").value()},items(){return _(this.Tokens).flatMap("items").filter(this.isAct).value()},filtered(){return""===this.filter?this.items:_.filter(this.items,(({item:{name:t},token:e})=>_.includes(e+" "+_.toLower(t),_.toLower(this.filter))))},accepted(){return _.filter(this.filtered,["progress","Accepted"])},processing(){return _.filter(this.filtered,["progress","Processing"])},completed(){return _.filter(this.filtered,["progress","Completed"])}},methods:{hKey(t,e,{id:s}){return Object(K["b"])("kitchen","item","cancel",t,s,e)},isAct({kitchen:t,progress:e}){return t&&t.id===_.toInteger(this.kitchen)&&["Accepted","Processing","Completed"].includes(e)},select(t){if(this.selected.includes(t))return this.selected=_.difference(this.selected,[t]);this.selected.push(t)}}},xt=ft,Ct=Object(b["a"])(xt,pt,kt,!1,null,null,null),It=Ct.exports;Q()(Ct,"components",{QCard:A["a"],QCardSection:B["a"],QSpace:at["a"],QBtn:x["a"],QItemSection:q["a"],QList:W["a"],QItemLabel:w["a"],QCardActions:it["a"]}),Q()(Ct,"directives",{ClosePopup:nt["a"]});var Tt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"q-py-xs bg-teal"}),s("CardImageTitle",{attrs:{title:t.item.name,image:t.src}}),s("q-card-section",{staticClass:"row items-center q-py-sm"},[s("div",{staticClass:"text-primary text-bold"},[t._v("Stock")]),s("q-space"),s("q-avatar",{attrs:{size:"md","text-color":"white",rounded:"",color:"primary"}},[t._v(t._s(t.iStock))])],1),s("q-list",{attrs:{bordered:"",dense:""}},[t._l(t.data,(function(e,i){return[s("q-item",{class:t.bgClrCls(i),attrs:{dense:""}},[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",[s("q-icon",{attrs:{name:"file_download",color:"white"}})],1)],1),s("q-item-section",[s("q-item-label",{staticClass:"text-white text-bold",attrs:{header:""}},[t._v(t._s(i))])],1)],1),s("transition-group",{attrs:{appear:"","enter-active-class":"animated bounceIn","leave-active-class":"animated bounceOut",mode:"out-in"}},t._l(e,(function(e,a){return s("KitchenTokenItemLine",t._b({key:t.hKey(a),attrs:{progress:i},on:{action:function(s){t.selected=[i,e]}}},"KitchenTokenItemLine",e,!1))})),1)]}))],2),s("q-card-section",{staticClass:"text-center text-bold"},[t._v(t._s(t.total?"Total: "+t.total:"No Items"))]),s("q-dialog",{attrs:{persistent:"",value:!!t.selected.length}},[s("KitchenTokenItemAction",t._b({staticStyle:{width:"50vw","max-width":"330px"},on:{progress:t.progress}},"KitchenTokenItemAction",t.selected[1],!1))],1)],1)},Qt=[],Ot=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"bg-grey-1",attrs:{clickable:""},on:{click:function(e){return t.$emit("action")}}},[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{attrs:{size:"md",rounded:"","text-color":"white",color:t.color}},[t._v(t._s(t.prop("total")))])],1),s("q-item-section",[s("q-item-label",{directives:[{name:"show",rawName:"v-show",value:t.Wait,expression:"Wait"}],staticClass:"text-red text-bold",attrs:{caption:""}},[t._v("Wait: "+t._s(t.Wait))]),t.prop("narration")?s("q-item-label",{staticClass:"text-bold",attrs:{caption:""}},[t._v(t._s(t.prop("narration")))]):s("q-item-label",{staticClass:"text-bold",attrs:{caption:""}},[t._v("Tokens: "+t._s(t.tTokens.length))])],1),s("q-inner-loading",{attrs:{showing:t.showing,"transition-hide":"fadeOut","transition-show":"fadeIn"}},[s("q-spinner-facebook",{attrs:{color:"primary",size:"2em"}})],1)],1)},$t=[],Kt={name:"KitchenTokenItemLine",props:["progress","wait"],data(){return{since:0}},computed:{color(){return p["f"][this.progress]},Wait(){let t=_.toInteger(this.wait);return t<=this.since?0:t-this.since},tTokens(){return _.keys(this.prop("token"))},showing:{get(){return!!this.Wait},set(){this.since=parseInt(this.wait)}}},methods:{prop(t){return _.get(this.$attrs,t)}},watch:{since:{immediate:!0,handler(){return this.Wait?setTimeout((t=>t.since++),1e3,this):null}}}},jt=Kt,St=s("714f"),At=Object(b["a"])(jt,Ot,$t,!1,null,null,null),Bt=At.exports;Q()(At,"components",{QItem:v["a"],QItemSection:q["a"],QAvatar:N["a"],QItemLabel:w["a"],QInnerLoading:C["a"],QSpinnerFacebook:I["a"]}),Q()(At,"directives",{Ripple:St["a"]});var Lt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"bg-teal text-white"},[t.$attrs.narration?s("div",{staticClass:"text-h6"},[t._v(t._s(t.$attrs.narration))]):t._e()]),s("q-card-actions",[s("q-btn",{attrs:{icon:"done_all",glossy:"",push:"",color:"positive",label:"All"},on:{click:t.all}}),s("q-space"),s("q-btn",{attrs:{icon:"done",glossy:"",push:"",color:"deep-orange-7",label:"Invert "},on:{click:t.invert}})],1),s("q-list",{staticClass:"bg-grey-2",attrs:{bordered:"",separator:""}},t._l(t.$attrs.token,(function(e){return s("q-item",{key:t.hKey(e),class:{"bg-grey-4":t.selected.includes(e.id)},attrs:{clickable:""},on:{click:function(s){return t.clicked(e)}}},[s("q-item-section",{attrs:{avatar:""}},[s("transition",{attrs:{mode:"out-in",appear:"","enter-active-class":"animated bounceIn","leave-active-class":"animated bounceOut"}},[t.selected.includes(e.id)?s("q-avatar",{attrs:{icon:"done_all",color:"green","text-color":"grey-2"}}):t._e()],1)],1),s("q-item-section",[s("q-item-label",[t._v("Token: "+t._s(e.token)+" - ("+t._s(t.time(t.Tokens[e.token].date))+")")]),s("q-item-label",{attrs:{caption:""}},[t._v("Type: "+t._s(t.Tokens[e.token].type))]),t.Tokens[e.token].waiter?s("q-item-label",{attrs:{caption:""}},[t._v("Waiter: "+t._s(t.Tokens[e.token].waiter.name))]):t._e(),t.Tokens[e.token].seating?s("q-item-label",{attrs:{caption:""}},[t._v("Seat: "+t._s(t.Tokens[e.token].seating.name))]):t._e()],1),s("q-item-section",{attrs:{side:""}},[s("q-avatar",{attrs:{rounded:"","text-color":"white",color:"purple"}},[t._v(t._s(e.quantity))])],1)],1)})),1),s("q-card-actions",{staticClass:"bg-white text-teal",attrs:{align:"left"}},[s("q-btn",{attrs:{flat:"",label:"CLOSE"},on:{click:function(e){return t.$emit("progress")}}}),s("q-space"),s("q-badge",{directives:[{name:"show",rawName:"v-show",value:t.selected.length,expression:"selected.length"}],staticClass:"q-py-sm q-px-md",attrs:{label:t.total}}),s("q-space"),s("q-btn",{staticClass:"flip-horizontal",attrs:{icon:"reply_all",disable:!t.selected.length,round:"",color:"positive"},on:{click:function(e){return t.$emit("progress",t.selected)}}})],1)],1)},Nt=[],Pt={name:"KitchenTokenItemAction",components:{CardImageTitle:tt["a"]},data(){return{selected:[]}},mixins:[V["a"]],computed:{tkn(){return _.map(this.$attrs.token,"token")},ids(){return _.map(this.$attrs.token,"id")},Tokens(){return _(this.tokens).filter((({id:t})=>this.tkn.includes(t))).keyBy("id").value()},total(){let t=this.selected;return"TOTAL: "+_.sumBy(_.values(this.$attrs.token),(({quantity:e,id:s})=>t.includes(s)?e:0))}},methods:{hKey({id:t,token:e}){return Object(K["b"])("kitchen","token",e,"bundle","action","id",t)},time(t){return Object(K["k"])(t)},clicked({id:t}){this.selected.includes(t)?this.selected=_.difference(this.selected,[t]):this.selected.push(t)},all(){this.selected=this.ids},invert(){_.forEach(this.ids,(t=>this.clicked({id:t})))}}},Wt=Pt,Et=Object(b["a"])(Wt,Lt,Nt,!1,null,null,null),zt=Et.exports;Q()(Et,"components",{QCard:A["a"],QCardSection:B["a"],QCardActions:it["a"],QBtn:x["a"],QSpace:at["a"],QList:W["a"],QItem:v["a"],QItemSection:q["a"],QAvatar:N["a"],QItemLabel:w["a"],QBadge:f["a"]});let Dt=null;var Mt={name:"KitchenTokenItem",components:{KitchenTokenItemAction:zt,KitchenTokenItemLine:Bt,CardImageTitle:tt["a"]},data(){return{src:Object(K["c"])(this.item.image),selected:[],waits:[],showing:!0,status:{New:"accept",Accepted:"process",Processing:"complete"}}},props:["details","item","kitchen","stock"],computed:{data(){return this.waits.length,_.mapValues(_.groupBy(this.details,"progress"),this.dist)},iStock(){return _.get(this.stock,this.kitchen)},total(){return _.sumBy(this.details,"quantity")}},methods:{hKey(t){return Object(K["b"])("kitchen",this.kitchen,"token","item","line",t)},dist(t){return _(t).groupBy(this.crypt).mapValues(this.itmObj).value()},itmObj(t){let e=t[0];return Object.assign({},this.pure(e),{total:_.sumBy(t,"quantity"),token:_(t).keyBy("token").mapValues((({token:t,id:e,user:s,quantity:i})=>new Object({token:t,id:e,user:s,quantity:i}))).value()})},pure({item:{id:t,name:e},delay:s,narration:i}){return{wait:this.getWait(s),narration:i,name:e,item:t}},crypt({delay:t,item:{id:e},narration:s}){return Object(K["a"])([e,this.getWait(t),s].join("|"))+""},getWait(t){let e=_.toInteger(t)-Object(K["f"])();return e<0?0:(this.waits.includes(e)||this.waits.push(e),e)},bgClrCls(t){return"bg-"+p["f"][t]},progress(t){this.post(this.selected[0],0,t,this.kitchen)},post(t,e,s,i){if(!s||s.length<=e)return this.selected=[];post("token",this.status[t],{id:s[e],kitchen:i}).then((()=>setTimeout(this.post,300,t,e+1,s,i)))}},watch:{waits(t){return t.length?Dt=setTimeout((t=>t.waits=[]),1e3*_.min(this.waits),this,clearTimeout(Dt)):null}}},Vt=Mt,Ft=Object(b["a"])(Vt,Tt,Qt,!1,null,null,null),Rt=Ft.exports;Q()(Ft,"components",{QCard:A["a"],QCardSection:B["a"],QSpace:at["a"],QAvatar:N["a"],QList:W["a"],QItem:v["a"],QItemSection:q["a"],QIcon:P["a"],QItemLabel:w["a"],QDialog:dt["a"]});var Jt=s("c624"),Gt={name:"KitchenTokens",mixins:[V["a"]],components:{Masonry:Jt["a"],KitchenTokenItem:Rt,KitchenItemCancel:It,KitchenTokenDisplayMode:ut["a"],KitchenTokenBundle:ht,TokenDetailCard:z},props:["id","card"],data(){return{processing:["Accepted","Processing"],cancelling:!1}},computed:c()(c()(c()({},Object(m["d"])({kitchen({kitchens:{data:t}}){return _.get(t,_.toInteger(this.id))},kItems({kitchens:{items:t}}){return _.map(t[this.kitchen.id],"item")}})),{},{mode(){return _.get(this.$store.state,["public","mode"],"Token")},reset:{get(){return _.get(this.$store.state,["public","reset"],!1)},set(t){return this.$store.commit("public",{reset:!!t})}}},Object(m["b"])("kitchens",["stock"])),{},{pView(){return this.$q.screen.width>799},Tokens(){return _(this.tokens).filter((({progress:t,items:e})=>["New","Processing"].includes(t)&&_.some(e,this.isAct))).value()},items(){return _(this.Tokens).flatMap((({items:t})=>_(t).filter(this.isAct).value())).groupBy("item.id").value()}}),methods:{hKey({id:t},e){return Object(K["b"])("kitchen",this.id,e,"detail",t)},isAct({item:{id:t},progress:e,kitchen:s}){return"New"===e&&_.includes(this.kItems,t)||s&&s.id===this.kitchen.id&&this.processing.includes(e)},doReset(t){t.length&&(this.cancelling=!0),this.post(0,t,this.id)},getItem(t){return _.get(t,[0,"item"])},getStock(t){return _.get(this.stock,this.getItem(t)["id"])},post(t,e,s){if(!e||0===e.length||e.length<=t)return this.reset=this.cancelling=!1;post("token","reset",{id:e[t],kitchen:s}).then((()=>setTimeout(this.post,300,t+1,e,s)))}}},Ht=Gt,Ut=Object(b["a"])(Ht,n,r,!1,null,null,null),Xt=Ut.exports;Q()(Ut,"components",{QCard:A["a"],QCardSection:B["a"],QDialog:dt["a"]});var Yt={name:"PageTokens",components:{KitchenTokens:Xt},computed:{kitchen(){return _.toInteger(this.$store.state.public.kitchen)}}},Zt=Yt,te=s("9989"),ee=Object(b["a"])(Zt,i,a,!1,null,null,null);e["default"]=ee.exports,Q()(ee,"components",{QPage:te["a"]})}}]);