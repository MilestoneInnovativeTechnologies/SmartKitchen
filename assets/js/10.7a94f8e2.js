(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{2246:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("q-page",{staticClass:"q-gutter-y-sm",attrs:{padding:""}},[e("AdministratorDataImportElement",{attrs:{label:"Items"},model:{value:t.params.items,callback:function(e){t.$set(t.params,"items",e)},expression:"params.items"}}),e("AdministratorDataImportElement",{attrs:{label:"Groups"},model:{value:t.params.groups,callback:function(e){t.$set(t.params,"groups",e)},expression:"params.groups"}}),e("AdministratorDataImportElement",{attrs:{label:"Seating"},model:{value:t.params.seating,callback:function(e){t.$set(t.params,"seating",e)},expression:"params.seating"}}),e("AdministratorDataImportElement",{attrs:{label:"Users"},model:{value:t.params.users,callback:function(e){t.$set(t.params,"users",e)},expression:"params.users"}}),e("AdministratorDataImportElement",{attrs:{label:"Taxes"},model:{value:t.params.taxes,callback:function(e){t.$set(t.params,"taxes",e)},expression:"params.taxes"}}),e("AdministratorDataImportElement",{attrs:{label:"Customers"},model:{value:t.params.customers,callback:function(e){t.$set(t.params,"customers",e)},expression:"params.customers"}}),e("q-card",[e("q-card-section",{staticClass:"bg-cyan text-white text-bold q-py-sm"},[t._v("Mode")]),e("q-list",[e("AdministratorDataImportModeElement",{attrs:{label:"Update Only",caption:"Existing records will get updated and no new insertion occurs",val:"Update"},model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}}),e("AdministratorDataImportModeElement",{attrs:{label:"Update or Insert",caption:"Existing records will updated, and new records will get inserted",val:"UpdateOrInsert"},model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}}),e("AdministratorDataImportModeElement",{attrs:{label:"Insert",caption:"Existing records will remains untouched, and new records will get inserted",val:"Insert"},model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}}),e("AdministratorDataImportModeElement",{attrs:{label:"Fresh",caption:"Existing records will cleared and all records get inserted. Needs re-login after importing",val:"Fresh"},model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}})],1),e("q-card-actions",{staticClass:"bg-grey-2",attrs:{align:"right"}},[e("q-btn",{attrs:{color:"primary",label:"Import",padding:"xs xl",loading:t.loading},on:{click:t.importData}})],1)],1)],1)},i=[],n=function(){var t=this,e=t._self._c;return e("q-card",[e("q-card-section",{staticClass:"bg-cyan text-white text-bold q-py-sm"},[t._v(t._s(t.label))]),e("q-card-section",[e("q-input",{attrs:{type:"textarea",value:t.value,outlined:""},on:{input:function(e){return t.$emit("input",e)}}})],1)],1)},o=[],r={name:"AdministratorDataImportElement",props:["label","value"]},l=r,m=a("2877"),p=a("f09f"),c=a("a370"),d=a("27f9"),u=a("eebe"),g=a.n(u),b=Object(m["a"])(l,n,o,!1,null,null,null),v=b.exports;g()(b,"components",{QCard:p["a"],QCardSection:c["a"],QInput:d["a"]});var f=function(){var t=this,e=t._self._c;return e("q-item",t._b({directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"}},"q-item",t.$attrs,!1),[e("q-item-section",{attrs:{avatar:""}},[e("q-radio",{attrs:{value:t.value,val:t.val},on:{input:function(e){return t.$emit("input",e)}}})],1),e("q-item-section",[e("q-item-label",[t._v(t._s(t.label))]),e("q-item-label",{attrs:{caption:""}},[t._v(t._s(t.caption))])],1)],1)},h=[],x={name:"AdministratorDataImportModeElement",props:["label","caption","value","val"]},I=x,q=a("66e5"),y=a("4074"),w=a("3786"),E=a("0170"),D=a("714f"),$=Object(m["a"])(I,f,h,!1,null,null,null),A=$.exports;g()($,"components",{QItem:q["a"],QItemSection:y["a"],QRadio:w["a"],QItemLabel:E["a"]}),g()($,"directives",{Ripple:D["a"]});var k={name:"PageAdministratorDataImport",components:{AdministratorDataImportModeElement:A,AdministratorDataImportElement:v},data(){return{params:{items:null,groups:null,seating:null,taxes:null,users:null,customers:null},mode:null,loading:!1}},methods:{importData(){if(!this.mode)return this.$q.notify({type:"negative",message:"Please select mode!!",position:"center",timeout:2e3});let t={mode:this.mode};if(_.forEach(this.params,((e,a)=>e?t[a]=e:null)),_.size(t)<2)return this.$q.notify({type:"negative",message:"Please enter any data!!",position:"center",timeout:2e3});this.loading=!0,import_data(t).then(this.imported).catch((function(){this.$q.notify({type:"negative",message:"Server Error",position:"center",timeout:2e3}),this.loading=!1})),setTimeout((function(t){t.loading&&(this.$q.notify({type:"warning",message:"Importing taking time more than usual..",caption:"Updating takes time.. If selected mode have updates, then please be patient.. Else re-login then try again",position:"center",actions:[{label:"Close",color:"white"}]}),t.loading=!1)}),8e3,this)},imported({status:t,data:e}){222===t?(this.$q.notify({type:"negative",message:e,position:"center",actions:[{label:"Close",color:"white"}]}),this.loading=!1):"Fresh"===this.mode?(this.$q.notify({type:"positive",message:"Data Imported Successfully!!",caption:"You will be logged out soon.. Needs re-login!!",position:"center",timeout:2e3}),setTimeout((()=>location.href=LOGOUT),2e3)):(this.$q.notify({type:"positive",message:"Data Imported Successfully!!",position:"center",timeout:2e3}),_.forEach(this.params,(function(t,e){this.$set(this.params,e,null)})),this.loading=!1)}}},Q=k,C=a("9989"),M=a("1c1c"),O=a("4b7e"),S=a("9c40"),U=Object(m["a"])(Q,s,i,!1,null,null,null);e["default"]=U.exports;g()(U,"components",{QPage:C["a"],QCard:p["a"],QCardSection:c["a"],QList:M["a"],QCardActions:O["a"],QBtn:S["a"]})}}]);