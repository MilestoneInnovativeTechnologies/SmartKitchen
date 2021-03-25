(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{8443:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[s("KitchenItemDayProcess"),s("KitchenItemAcceptable"),s("div",{staticClass:"row q-col-gutter-sm q-mt-xs"},[s("div",{staticClass:"col-xs-12 col-sm-6"},[s("KitchenItemLeastStock")],1),s("div",{staticClass:"col-xs-12 col-sm-6"},[s("KitchenItemDayMostProcessing")],1)])],1)},a=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{staticClass:"q-pa-none"},[s("q-card-section",{staticClass:"bg-grey-1"},[s("div",{staticClass:"text-bold"},[t._v("Kitchens")])]),s("q-card-section",[s("q-list",t._l(t.kitchens,(function(e){return s("q-item",{key:"ka-kitchen-"+e.id},[s("q-item-section",[s("q-item-label",[t._v(t._s(e.name))]),s("q-item-label",{attrs:{caption:""}},[t._v("Auto Accept: "+t._s(e.auto_accept))]),e.detail?s("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.detail))]):t._e()],1)],1)})),1)],1)],1)},c=[],r=s("2f62"),o={name:"KitchenAssigned",computed:Object(r["d"])("kitchens",{kitchens:({data:t,assign:e})=>_.map(e,(e=>_.get(t,_.toInteger(e))))})},l=o,m=s("2877"),d=s("f09f"),u=s("a370"),p=s("1c1c"),h=s("66e5"),g=s("4074"),k=s("0170"),b=s("eebe"),q=s.n(b),v=Object(m["a"])(l,n,c,!1,null,null,null),f=v.exports;q()(v,"components",{QCard:d["a"],QCardSection:u["a"],QList:p["a"],QItem:h["a"],QItemSection:g["a"],QItemLabel:k["a"]});var y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row q-col-gutter-xs"},[s("div",{staticClass:"col-xs-6 col-sm-3"},[s("DigitMetric",{attrs:{value:t.tokens.length,title:"Tokens",bg:"cyan",text:"white"}})],1),s("div",{staticClass:"col-xs-6 col-sm-3"},[s("DigitMetric",{attrs:{value:t.items.length+"("+t.quantities+")",title:"Items & Quantities",bg:"blue",text:"white"}})],1),s("div",{staticClass:"col-xs-6 col-sm-3"},[s("DigitMetric",{attrs:{value:t.pending,title:"In Processing",bg:"orange",text:"white"}})],1),s("div",{staticClass:"col-xs-6 col-sm-3"},[s("DigitMetric",{attrs:{value:t.completed,title:"Completed",bg:"green",text:"white"}})],1)])},C=[],I=(s("5db7"),s("73d9"),s("ded3")),x=s.n(I),Q=s("84ba"),w={name:"KitchenItemDayProcess",components:{DigitMetric:Q["a"]},data(){return{process_progress:["Accepted","Processing","Completed","Served"]}},computed:x()(x()(x()({},Object(r["b"])("tokens",["today"])),Object(r["d"])({tokens:function({tokens:{items:t}}){return _.map(this.today,(e=>Object.assign({},e,{items:t[e.id]})))},kitchens:function({kitchens:{assign:t,data:e}}){return _.map(t,(t=>e[t]))}})),{},{kids(){return _.map(this.kitchens,"id")},items(){return _.flatMap(this.tokens,(({items:t})=>_.filter(t,(({kitchen:t,progress:e})=>this.kids.includes(t)&&this.process_progress.includes(e)))))},quantities(){return _.sumBy(this.items,(({quantity:t})=>_.toNumber(t)))},pending(){return _.sumBy(this.items,(({quantity:t,progress:e})=>"Processing"===e?_.toNumber(t):0))},completed(){return _.sumBy(this.items,(({quantity:t,progress:e})=>["Completed","Served"].includes(e)?_.toNumber(t):0))}})},K=w,j=Object(m["a"])(K,y,C,!1,null,null,null),O=j.exports,S=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{staticClass:"q-pa-none"},[s("q-card-section",{staticClass:"bg-grey-2"},[s("div",{staticClass:"text-bold"},[t._v("Most Processing Items")])]),t.items.length?s("q-table",{attrs:{data:t.items,columns:t.columns,dense:"",pagination:{rowsPerPage:40},"rows-per-page-label":"Items per page"}}):s("q-card-actions",{attrs:{align:"center"}},[t._v("No items processed yet")])],1)},M=[],P=s("3758"),A={name:"KitchenItemDayMostProcessing",mixins:[P["a"]],data(){return{columns:[{name:"item",label:"Item",field:"item",align:"left",sortable:!0},{name:"quantity",label:"Quantity",field:"quantity",align:"left",sortable:!0},{name:"time",label:"Total Time",field:"time",align:"left",sortable:!0,format:t=>t<60?t+" secs":_.floor(t/60)+" mins"},{name:"average",label:"Average",field:"time",align:"left",sortable:!0,format(t,{quantity:e}){let s=_.round(t/e);return s<60?s+" secs":_.floor(s/60)+" mins"}}]}},computed:x()(x()(x()({},Object(r["b"])("tokens",["today"])),Object(r["d"])({kitchens:({kitchens:{assign:t}})=>t})),{},{items(){let t=_.map(this.today,"id");return _.map(_.groupBy(_.flatMap(this.tokens,(({items:e,id:s})=>t.includes(s)?_.filter(e,(({kitchen:t,progress:e})=>t&&this.kitchens.includes(t.id)&&"Cancelled"!==e)):[])),"item.id"),((t,e)=>_.zipObject(["item","quantity","time"],[_.get(t,[0,"item","name"]),_.sumBy(t,"quantity"),this.pTime(t)])))}}),methods:{pTime(t){return _.sumBy(t,(({progress_timing:t})=>{let e=_.find(t,["status","Processing"]),s=_.find(t,["status","Completed"]);return e&&s?_.toInteger(_.get(s,"time"))-_.toInteger(_.get(e,"time")):0}))}}},D=A,L=s("eaac"),N=s("4b7e"),B=Object(m["a"])(D,S,M,!1,null,null,null),T=B.exports;q()(B,"components",{QCard:d["a"],QCardSection:u["a"],QTable:L["a"],QCardActions:N["a"]});var E=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{staticClass:"q-pa-none"},[s("q-card-section",{staticClass:"bg-grey-2"},[s("div",{staticClass:"text-bold"},[t._v("Least Stock Items")])]),t.sorted.length?s("q-list",{attrs:{dense:"",separator:""}},t._l(t.sorted,(function(e,i){return s("q-item",{key:"kils-"+i},[s("q-item-section",{attrs:{avatar:""}},[t._v(t._s(i+1))]),s("q-item-section",[s("q-item-label",[t._v(t._s(e.item))]),s("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.kitchen))])],1),s("q-item-section",{staticClass:"text-bold",class:{"text-warning":e.stock>0,"text-negative":e.stock<1},attrs:{side:""}},[t._v(t._s(e.stock))])],1)})),1):s("q-card-actions",{attrs:{align:"center"}},[t._v("No items with less stock")])],1)},$=[],z={name:"KitchenItemLeastStock",computed:x()(x()({},Object(r["d"])({kitchens:({kitchens:{data:t,assign:e}})=>_(e).mapKeys((t=>t)).mapValues((e=>t[e])).value(),items:function({kitchens:{items:t,assign:e},items:{data:s}}){return _(_.pick(t,e)).flatMap().filter((({stock:t})=>t<8)).map((t=>_.zipObject(["item","kitchen","stock"],[s[t.item].name,this.kitchens[t.kitchen].name,t.stock]))).value()}})),{},{sorted(){return _.sortBy(this.items,"stock")}})},V=z,G=Object(m["a"])(V,E,$,!1,null,null,null),J=G.exports;q()(G,"components",{QCard:d["a"],QCardSection:u["a"],QList:p["a"],QItem:h["a"],QItemSection:g["a"],QItemLabel:k["a"],QCardActions:N["a"]});var F=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",{staticClass:"q-pa-none"},[s("q-card-section",{staticClass:"bg-grey-2 row justify-between text-bold"},[s("div",[t._v("Acceptable Token Items")]),t.items.length?s("div",[t._v(t._s(t.items.length))]):t._e()]),t.items.length?s("q-list",{attrs:{separator:""}},t._l(t.items,(function(e,i){return s("q-item",{key:t.hKey(e,i)},[s("q-item-section",{attrs:{avatar:""}},[s("q-badge",{staticClass:"q-py-xs shadow-2",attrs:{label:e.token,color:"grey"}})],1),s("q-item-section",[s("q-item-label",[s("span",{staticClass:"text-weight-bolder"},[t._v(t._s(e.quantity))]),t._v(" x "+t._s(e.iName))]),s("q-item-label",{class:t.kColor(e),attrs:{caption:""}},[t._v(t._s(e.kName))]),s("q-item-label",{attrs:{caption:""}},[t._v("Stock: "+t._s(e.stock))])],1),s("q-item-section",{attrs:{side:""}},[s("q-btn",{staticStyle:{transform:"rotateY(180deg)"},attrs:{icon:"reply_all",round:"",color:"positive"},on:{click:function(s){return t.accept(e)}}})],1)],1)})),1):s("q-card-actions",{attrs:{align:"center"}},[t._v("No Items")]),t.loading?s("q-inner-loading",{attrs:{showing:!0}},[s("q-spinner-facebook",{attrs:{color:"primary",size:"2em"}})],1):t._e()],1)},Y=[],H=(s("c975"),s("b1c1")),R={name:"KitchenItemAcceptable",data(){return{Colors:["accent","info","deep-purple-10","red-10","indigo-10","cyan-5","green-6","teal-5"],kitchens:[],loading:!1}},computed:x()(x()({},Object(r["d"])({kItems:function({kitchens:{assign:t,items:e}}){return _(_.pick(e,t)).flatMap().groupBy("item").mapValues(this.iGroup).value()},tItems:function({tokens:{items:t}}){return _(t).flatMap().filter(["progress","New"]).value()},IK:function(t){return _.mapValues({kitchen:"kitchens",item:"items"},(e=>_.mapValues(t[e].data,"name")))}})),{},{items(){return _.flatMap(this.tItems,(({id:t,item:e,quantity:s,token:i})=>_.has(this.kItems,e)?_.map(this.kItems[e],(e=>Object.assign({},e,{id:t,token:i,quantity:s}))):[]))}}),methods:{iGroup(t){return _(t).map((({item:t,kitchen:e,stock:s})=>_.zipObject(["item","kitchen","stock","iName","kName"],[t,e,s,_.get(this.IK,["item",t]),_.get(this.IK,["kitchen",e])]))).value()},hKey({item:t,kitchen:e},s){return Object(H["b"])("kitchen","item","acceptable",s,"kitchen",e,"item",t)},kColor({kitchen:t}){return this.kitchens.includes(t)?"text-"+this.Colors[this.kitchens.indexOf(t)]:this.kColor({kitchen:t,add:this.kitchens.push(t)})},accept({id:t,kitchen:e}){this.loading=!0,post("token","accept",{id:t,kitchen:e}).then((()=>this.loading=!1))}}},U=R,W=s("58a8"),X=s("9c40"),Z=s("74f7"),tt=s("e669"),et=Object(m["a"])(U,F,Y,!1,null,null,null),st=et.exports;q()(et,"components",{QCard:d["a"],QCardSection:u["a"],QList:p["a"],QItem:h["a"],QItemSection:g["a"],QBadge:W["a"],QItemLabel:k["a"],QBtn:X["a"],QCardActions:N["a"],QInnerLoading:Z["a"],QSpinnerFacebook:tt["a"]});var it={name:"PageChefIndex",components:{KitchenItemAcceptable:st,KitchenItemLeastStock:J,KitchenItemDayMostProcessing:T,KitchenItemDayProcess:O,KitchenAssigned:f}},at=it,nt=s("9989"),ct=Object(m["a"])(at,i,a,!1,null,null,null);e["default"]=ct.exports,q()(ct,"components",{QPage:nt["a"]})}}]);