(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{4349:function(e,t,s){"use strict";var i=s("ae7d"),a=s.n(i);a.a},"797e":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",[s("div",{staticClass:"q-pa-md"},[s("FilterInputText",{attrs:{label:"Filter Orders"},on:{text:function(t){e.filter=t}}})],1),s("Masonry",{attrs:{items:e.Tokens,width:e.min_width},scopedSlots:e._u([{key:"item",fn:function(t){return[s("q-list",e._l(t.item,(function(i,a){return s("q-expansion-item",{key:"token-"+i.id,attrs:{group:"token",popup:"","header-class":e.header_class(i)},on:{show:function(s){return e.show(t.identity,a)}},scopedSlots:e._u([{key:"header",fn:function(){return[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{attrs:{size:"md","font-size":"0.85rem",color:i.balance?"primary":"positive","text-color":"white",rounded:""}},[e._v(e._s(i.id))])],1),s("q-item-section",[s("q-item-label",{staticStyle:{"font-size":"0.75rem"}},[e._v(e._s(e.lget(i,["customer","name"],"No Customer")))]),i.bill?s("q-item-label",{staticClass:"text-primary text-weight-bold",staticStyle:{"font-size":"0.70rem"},attrs:{caption:""}},[e._v("Items: "+e._s(i.items.length)+", Total: "+e._s(i.bill.payable))]):e._e(),s("q-item-label",{staticStyle:{"font-size":"0.70rem"},attrs:{caption:""}},[e._v(e._s(e.items_name(i)))]),i.narration?s("q-item-label",{staticClass:"text-red",staticStyle:{"font-size":"0.70rem"},attrs:{caption:""}},[e._v(e._s(i.narration))]):e._e()],1),s("q-item-section",{staticClass:"text-center",attrs:{side:""}},[s("span",{staticStyle:{"font-size":"0.65rem"}},[e._v(e._s(e.token_progress(i))+" "),s("q-spinner-dots",{directives:[{name:"show",rawName:"v-show",value:"Processing"===e.token_progress(i),expression:"token_progress(token) === 'Processing'"}],attrs:{color:"red",size:"xs"}})],1),s("q-rating",{attrs:{value:e.progress_rating[e.token_progress(i)],max:3,size:"xs",color:"green-5",icon:"star",readonly:""}})],1)]},proxy:!0}],null,!0)},[s("q-card",[s("q-list",{attrs:{separator:""}},[s("q-item",{staticStyle:{"font-size":"0.65rem"}},[s("q-item-section",{staticClass:"text-primary"},[s("q-item-label",[e._v("Time: "+e._s(e.time(i.date)))]),s("q-item-label",[e._v("User: "+e._s(e.lget(i,["waiter","name"])))])],1),s("q-item-section",{staticClass:"text-positive"},[s("q-item-label",[e._v("Payable: "+e._s(i.payable))]),s("q-item-label",[e._v("Balance: "+e._s(i.balance))])],1)],1),e._l(i.items,(function(t){return s("q-item",{key:"token-"+i.id+"-item-"+t.id,attrs:{clickable:"Completed"===t.progress},on:{click:function(s){return e.select(i,t)}}},[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{attrs:{size:"md",color:e.include(i,t)?"positive":""}},[s("q-icon",{attrs:{name:"Served"===t.progress?"done_all":"done",color:"Served"===t.progress?"green-4":"grey-4"}})],1)],1),s("q-item-section",{staticStyle:{"font-size":"0.65rem"}},[s("q-item-label",[e._v(e._s(e.lget(t,["item","name"])))]),s("q-item-label",{staticStyle:{"font-size":"0.65rem"}},[e._v(e._s(e.lget(t,"quantity"))+"x "+e._s(e.lget(t,["price"])))])],1),s("q-item-section",{staticClass:"text-primary text-weight-bold",attrs:{side:""}},[e._v(e._s(e.lget(t,"quantity")*e.lget(t,["price"])))]),s("q-item-section",{attrs:{side:""}},[s("q-badge",{staticStyle:{"font-size":"0.55rem"},attrs:{color:"primary",label:e.lget(t,"progress"),outline:""}})],1)],1)}))],2),i.balance?s("q-card-section",{staticClass:"bg-light-blue-1"},[s("q-card-section",{staticClass:"q-pa-none row items-center justify-end q-col-gutter-xs"},[i.bill&&i.customer?[s("PaymentTypeSelectDropDown",{staticClass:"col",attrs:{outlined:"",dense:""},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}}),s("q-input",{staticClass:"col",attrs:{outlined:"",type:"number",label:"Amount",dense:""},model:{value:e.amount,callback:function(t){e.amount=e._n(t)},expression:"amount"}})]:[s("div",{staticClass:"col-7"},[s("OrderCustomer",{attrs:{get:"id",outlined:"",dense:""},model:{value:e.customer,callback:function(t){e.customer=t},expression:"customer"}})],1),s("div",{staticClass:"col-5"},[s("TaxNatureSelectDropDown",{attrs:{label:"Tax",outlined:"",dense:""},model:{value:e.tax,callback:function(t){e.tax=t},expression:"tax"}})],1),s("div",{staticClass:"col-3"},[s("PaymentTypeSelectDropDown",{attrs:{outlined:"",dense:""},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}})],1),s("div",{staticClass:"col-4"},[s("q-input",{attrs:{type:"number",outlined:"",dense:"",label:"Discount"},on:{keyup:e.discount_percent},model:{value:e.discount,callback:function(t){e.discount=e._n(t)},expression:"discount"}})],1),s("div",{staticClass:"col-5"},[s("q-input",{attrs:{type:"number",outlined:"",dense:"",label:"Amount"},model:{value:e.amount,callback:function(t){e.amount=e._n(t)},expression:"amount"}})],1)]],2)],1):e._e(),s("q-card-actions",{staticClass:"q-px-lg"},[e.progress_rating[e.token_progress(i)]<3?s("q-btn",{staticClass:"q-px-md",attrs:{label:"Serve Selected","no-caps":"",color:"primary",disabled:!(e.selected[i.id]&&e.selected[i.id].length)},on:{click:function(t){return e.serve(i)}}}):e._e(),s("q-space"),s("q-btn",{directives:[{name:"show",rawName:"v-show",value:i.balance,expression:"token.balance"}],staticClass:"q-px-md",attrs:{label:"Add Payment",color:"positive",disabled:0===e.amount},on:{click:function(t){return e.pay(i)}}})],1),s("q-inner-loading",{attrs:{showing:e.loading}},[s("q-spinner-facebook",{attrs:{color:"positive",size:"2em"}})],1)],1)],1)})),1)]}}])}),s("div",{staticClass:"q-my-xl"},[e._v("   ")]),s("q-page-sticky",{attrs:{position:"bottom-right",offset:e.offset}},[s("transition",{attrs:{appear:"","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut"}},[e.pl_mode?e._e():s("q-fab",{attrs:{icon:"add","active-icon":"add",color:"primary",glossy:""},on:{click:e.add_order}})],1)],1),e.params.price_list?e._e():s("q-dialog",{attrs:{persistent:""},model:{value:e.pl_mode,callback:function(t){e.pl_mode=t},expression:"pl_mode"}},[s("q-card",{style:e.popup_width()},[s("q-bar",{staticClass:"text-white bg-info q-py-lg items-center"},[s("q-icon",{attrs:{name:"receipt",color:"white",left:""}}),s("span",[e._v("Select Price List")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"clear",flat:"",round:"",color:"white"}})],1),s("q-card-section",[s("PriceListSelectDropDown",{attrs:{outlined:"",dense:"","input-debounce":"0",value:e.params.price_list,label:"Select Price List",get:"id",clearable:""},on:{input:e.add_order_new}})],1)],1)],1)],1)},a=[],n=(s("e6cf"),s("a79d"),s("ddb0"),s("b1c1")),r=s("9061"),o=s("c624"),l=s("58d1"),c=s("232e"),d=s("2943"),p=s("9afe"),m=s("9708"),u=s("5ab9"),h={name:"PageTakeAway",components:{FilterInputText:u["a"],OrderCustomer:m["a"],PaymentTypeSelectDropDown:p["a"],TaxNatureSelectDropDown:d["a"],Masonry:o["a"],PriceListSelectDropDown:r["a"]},mixins:[l["a"]],data(){return{pl_mode:!1,min_width:390,fab:!0,offset:[12,12],filter:"",params:{type:"Take Away",price_list:null,seat:!1,user:null,after:"take_away",payment:!0},progress_rating:{New:0,Processing:1,Completed:2,Served:3,Paid:4},active:[],selected:{},customer:null,tax:null,options:c["PaymentsTypes"],type:c["PaymentsTypes"][0],discount:0,amount:0,loading:!1}},computed:{waiter_filter(){let e=_.get(this.$route,["meta","me"]),t=Object(n["A"])(settings("take_away_waiter_own_order"));return!0===t&&"Waiter"===e.role&&e.id},Tokens(){let e=_(this.tokens).filter((e=>"Take Away"===e.type&&!_.includes(["Cancelled","Paid"],e.progress))).filter((e=>!this.waiter_filter||e.user===this.waiter_filter)).map((e=>Object.assign({},e,{bill:_.find(this.bills,(t=>t.token&&t.token.id===e.id))},{payable:this.payable(e),balance:this.balance(e)},{slug:g(e)}))).filter((({slug:e})=>!this.filter||_.includes(e,_.toLower(this.filter)))).value(),t=_.size(e);return _.chunk(e,_.ceil(t/(_.floor(this.$q.screen.width/this.min_width)||1)))},Token(){return this.active.length?_.get(this.Tokens,[this.active[0],this.active[1]]):null}},methods:{popup_width:n["x"],lget:_.get,time:n["C"],hKey({item:e}){return Object(n["e"])(e)},header_class(e){return"Completed"===this.token_progress(e)?"animate":_.get(this.Token,"id")===e.id?"bg-grey-4":""},getPriceList(){if(!_.has(this.$store.state.public,"take_away_price_list")){let e=_.get(this.$store.getters["prices/take_away"],"id");e&&this.$store.commit("public",{take_away_price_list:e})}return _.get(this.$store.state.public,"take_away_price_list",void 0)},add_order(){this.params.price_list?this.add_order_new():this.pl_mode=!0},add_order_new(e){e&&(this.params.price_list=e,this.$store.commit("public",{take_away_price_list:e})),this.pl_mode=!1,this.params.price_list&&this.$router.push({name:"order_new",params:this.params})},items_name(e){return _.truncate(_.map(e.items,(({item:e})=>_.truncate(e.name,{length:15,omission:".."}))).join(", "),{length:105})},token_progress({progress:e,items:t}){return"Processing"===e&&b(t)?"Completed":["Completed","Billed","Pending","Partial"].includes(e)?"Served":e},show(e,t){let s=this.Tokens[e][t];this.active=[e,t],_.has(this.selected,s.id)||this.$set(this.selected,s.id,[]),this.selected[s.id]=_(s.items).map((({id:e,progress:t})=>"Completed"===t?e:null)).filter().value(),this.discount=0,this.amount=this.balance(s),this.tax=null,this.type=c["PaymentsTypes"][0],this.customer=_.get(s,["customer","id"])},select({id:e},t){"Completed"===t.progress&&(_.includes(this.selected[e],t.id)?this.selected[e]=_.difference(this.selected[e],[t.id]):this.selected[e].push(t.id))},discount_percent(e){Object(n["m"])(e.keyCode)&&(this.prv_per||_.includes(_.toString(this.discount),"."))&&setTimeout((()=>{this.$nextTick((()=>{this.discount=this.discount*this.balance(this.Token)*.01,e.target.blur(),e.target.focus()}))}),250),this.prv_per=Object(n["m"])(e.keyCode)},include({id:e},t){return _.has(this.selected,e)&&_.includes(this.selected[e],t.id)},payable(e){return e.payable?e.payable:_.find(this.bills,(t=>t.token.id===e.id))?_.get(_.find(this.bills,(t=>t.token.id===e.id)),"payable"):_.sumBy(e.items,(({quantity:e,price:t})=>e*t))},balance(e){return e.balance?e.balance:this.payable(e)-(_.find(this.bills,(t=>t.token.id===e.id))?_.get(_.find(this.bills,(t=>t.token.id===e.id)),"paid"):0)},serve(e){this.loading=!0;let t=this.selected[e.id];if(!t.length)return this.loading=!1;setTimeout((function(s){post("token","served",{id:t}).then((()=>{s.loading=!1,s.selected[e.id]=[]}))}),750,this)},pay(e){if(this.loading=!0,0===this.amount)return alert("Enter paying amount.."+((this.loading=!1)||""));let t="payment",s={};e.bill?s={bill:e.bill.id,amount:this.amount,type:this.type}:(t="bill",s={token:e.id,customer:this.customer,discount:this.discount,nature:this.tax,advance_type:this.type,advance_amount:this.amount}),post(t,"create",s).then((()=>this.$store.dispatch("server/ping",null,{root:!0}))).catch().finally((()=>this.loading=!1))}},created(){this.params.user=this.$route.meta.me.id,this.params.price_list=this.getPriceList()},watch:{discount(e){this.amount=this.balance(this.Token)-e}}};function b(e){return _.every(e,(({progress:e})=>["Completed","Served","Cancelled"].includes(e)))}function g(e){let t=_.pick(_.get(e,"customer"),["name","phone"]),s=_.map(_.get(e,"items"),"item.name"),i=_.get(e,["waiter","name"]);return _.toLower(_.join(_.concat(s,_.values(t),i)," "))}var y=h,f=(s("4349"),s("2877")),v=s("9989"),k=s("1c1c"),q=s("3b73"),w=s("4074"),x=s("cb32"),C=s("0170"),S=s("8380"),T=s("daf4"),P=s("f09f"),Q=s("66e5"),z=s("0016"),D=s("58a8"),$=s("a370"),I=s("27f9"),L=s("4b7e"),O=s("9c40"),j=s("2c91"),A=s("74f7"),N=s("e669"),B=s("de5e"),F=s("c294"),E=s("24e8"),J=s("d847"),M=s("7f67"),K=s("eebe"),R=s.n(K),U=Object(f["a"])(y,i,a,!1,null,null,null);t["default"]=U.exports;R()(U,"components",{QPage:v["a"],QList:k["a"],QExpansionItem:q["a"],QItemSection:w["a"],QAvatar:x["a"],QItemLabel:C["a"],QSpinnerDots:S["a"],QRating:T["a"],QCard:P["a"],QItem:Q["a"],QIcon:z["a"],QBadge:D["a"],QCardSection:$["a"],QInput:I["a"],QCardActions:L["a"],QBtn:O["a"],QSpace:j["a"],QInnerLoading:A["a"],QSpinnerFacebook:N["a"],QPageSticky:B["a"],QFab:F["a"],QDialog:E["a"],QBar:J["a"]}),R()(U,"directives",{ClosePopup:M["a"]})},ae7d:function(e,t,s){}}]);