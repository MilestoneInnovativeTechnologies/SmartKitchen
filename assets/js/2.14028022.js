(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{a432:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[i("MenuGroupScroll",{model:{value:t.group,callback:function(e){t.group=e},expression:"group"}}),i("FilterInputText",{on:{text:function(e){t.filter=e}}}),i("Masonry",{attrs:{items:t.filterKeys},scopedSlots:t._u([{key:"item",fn:function(e){return[i("ItemSelectCard",{attrs:{id:e.item,price_list:t.params.price_list},on:{selected:t.addItem}})]}}])}),t.hide?t._e():i("div",{staticClass:"bg-white q-py-sm shadow-2 q-gutter-y-sm q-px-md",class:t.horizontal?"fixed-bottom":"fixed-right",staticStyle:{overflow:"scroll"},style:t.horizontal?{"max-height":"60vh"}:{width:"400px",top:"2.5rem"}},[i("OrderSeatingInfo",{attrs:{seating:t.params.seating}}),i("OrderCustomer",{attrs:{get:"id"},model:{value:t.params.customer,callback:function(e){t.$set(t.params,"customer",e)},expression:"params.customer"}}),i("OrderItemsSummary",{attrs:{items:t.params.items,price_list:t.params.price_list},on:{quantity:t.quantity,update:t.update,delete:t.remove}}),i("div",[i("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"Submit",disable:!t.params.items.length,loading:t.loading},on:{click:t.create}})],1)],1),i("q-page-sticky",{attrs:{position:"bottom-right",offset:[24,24]}},[t.horizontal?i("q-btn",{attrs:{fab:"",glossy:"",color:"accent",icon:"vertical_align_"+(t.hide?"top":"bottom")},on:{click:function(e){t.hide=!t.hide}}}):i("q-btn",{style:{transform:t.hide?"rotateY(180deg)":null},attrs:{fab:"",glossy:"",color:"accent",icon:"keyboard_tab"},on:{click:function(e){t.hide=!t.hide}}})],1)],1)},s=[],r=(i("a434"),i("232e")),n=i("2b38"),o=i("5ab9"),l=i("7a7c"),m=i("b1c1"),u=i("85b2"),p=i("9708"),c=i("440b"),d=i("c624"),h={name:"PageOrderCommonNew",components:{Masonry:d["a"],OrderItemsSummary:c["a"],OrderCustomer:p["a"],OrderSeatingInfo:u["a"],ItemSelectCard:l["a"],FilterInputText:o["a"],MenuGroupScroll:n["a"]},props:["type","customer","seating","price_list","user"],data(){return{params:{type:"Dining",customer:null,seating:null,price_list:null,user:null,items:[]},group:null,filter:null,loading:!1,hide:!0,pos:null}},computed:{items(){return this.group?this.group.items:[]},filterKeys(){return this.filter?_(this.$store.state.items.data).filter((({id:t})=>this.items.includes(t))).filter((t=>Object(m["m"])(t,["id","name","detail"],this.filter))).map("id").value():this.items},horizontal(){let{height:t,width:e}=this.$q.screen;return e<819&&t>=e}},methods:{addItem({id:t}){let e=_.find(this.params.items,["item",t]);e?e.quantity++:this.params.items.push({item:t,quantity:1,delay:0,narration:null}),this.$q.notify(`${this.params.items.length} x Items <br>${_.sumBy(this.params.items,"quantity")} x Quantities`)},quantity({item:t,quantity:e}){t=_.toSafeInteger(t),e=_.toNumber(e);let i=_.find(this.params.items,["item",t]);i?i.quantity=e:this.params.items.push({item:t,quantity:e})},remove({item:t}){let e=_.findIndex(this.params.items,["item",_.toSafeInteger(t)]);e>-1&&this.params.items.splice(e,1)},update(t){let e=_.find(this.params.items,["item",t.item]);if(!e)return null;_.forEach(_.omit(t,"item"),((t,i)=>e[i]=t))},create(){let t=this;t.loading=!0,post("token","create",t.params).then((e=>{t.loading=!1,t.$router.push({name:"orders"})}))},hKey(t){return Object(m["d"])("common","order","group",this.group.id,"item",t)}},created(){let t=this,e=r["OrderTypeRequiredFieldsDB"][t.type||"Dining"];_.forEach(e,(e=>t.params[e]=t[e])),this.$q.notify.setDefaults({position:"top-right",timeout:1e3,color:"positive",group:!1,html:!0,caption:"Items Updated !!"})}},g=h,f=i("2877"),y=i("9989"),b=i("9c40"),q=i("de5e"),I=i("eebe"),x=i.n(I),S=Object(f["a"])(g,a,s,!1,null,null,null);e["default"]=S.exports,x()(S,"components",{QPage:y["a"],QBtn:b["a"],QPageSticky:q["a"]})}}]);