(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"2d1b":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-page",{attrs:{padding:""}},[o("AdministratorDashboardMetricsMain"),o("div",{staticClass:"col-12 text-bold q-mt-md"},[t._v("Masters")]),o("div",{staticClass:"row q-col-gutter-xs q-mt-xs"},[o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_customer"},icon:"groups",text:"Customers"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_prop"},icon:"speaker_notes",text:"Item Props"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_item"},icon:"category",text:"Items"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_group"},icon:"attractions",text:"Item Groups"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_kitchen"},icon:"countertops",text:"Kitchens"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_kitchen_items"},icon:"lunch_dining",text:"Kitchen Items"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_menu"},icon:"menu_book",text:"Menu"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_price_list"},icon:"money",text:"Price Lists"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_seating"},icon:"event_seat",text:"Seating"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_tax"},icon:"legend_toggle",text:"Tax"}}),o("AdministratorMenuItem",{attrs:{color:t.color[0],route:{name:"master_settings"},icon:"settings_applications",text:"Settings"}})],1),o("div",{staticClass:"col-12 text-bold q-mt-md"},[t._v("Images")]),o("div",{staticClass:"row q-col-gutter-xs q-mt-xs"},[o("AdministratorMenuItem",{attrs:{color:t.color[1],route:{name:"image_customer"},icon:"groups",text:"Customers"}}),o("AdministratorMenuItem",{attrs:{color:t.color[1],route:{name:"image_item"},icon:"category",text:"Items"}}),o("AdministratorMenuItem",{attrs:{color:t.color[1],route:{name:"image_kitchen"},icon:"countertops",text:"Kitchens"}}),o("AdministratorMenuItem",{attrs:{color:t.color[1],route:{name:"image_seating"},icon:"event_seat",text:"Seating"}}),o("AdministratorMenuItem",{attrs:{color:t.color[1],route:{name:"image_user"},icon:"supervised_user_circle",text:"Users"}})],1),o("div",{staticClass:"col-12 text-bold q-mt-md"},[t._v("Users")]),o("div",{staticClass:"row q-col-gutter-xs q-mt-xs"},[o("AdministratorMenuItem",{attrs:{color:t.color[2],route:{name:"master_user",params:{role:"Administrator"}},icon:"psychology",text:"Administrators"}}),o("AdministratorMenuItem",{attrs:{color:t.color[2],route:{name:"master_user",params:{role:"Receptionist"}},icon:"support_agent",text:"Receptionist"}}),o("AdministratorMenuItem",{attrs:{color:t.color[2],route:{name:"master_user",params:{role:"Waiter"}},icon:"supervised_user_circle",text:"Waiters"}}),o("AdministratorMenuItem",{attrs:{color:t.color[2],route:{name:"master_user",params:{role:"Chef"}},icon:"engineering",text:"Chefs"}}),o("AdministratorMenuItem",{attrs:{color:t.color[2],route:{name:"master_user",params:{role:"Delivery Boy"}},icon:"delivery_dining",text:"Delivery Boy"}})],1),o("div",{staticClass:"col-12 text-bold q-mt-md"},[t._v("Data")]),o("div",{staticClass:"row q-col-gutter-xs q-mt-xs"},[o("AdministratorMenuItem",{attrs:{color:t.color[3],route:{name:"data_import"},icon:"source",text:"Import"}})],1),"Yes"===t.GH56E?[o("div",{staticClass:"col-12 text-bold q-mt-md"},[t._v("Online Menu")]),o("div",{staticClass:"row q-col-gutter-xs q-mt-xs"},[o("AdministratorMenuItem",{attrs:{color:t.color[4],route:{name:"menu_qr_codes"},icon:"qr_code",text:"Label"}}),t.JI36A?o("AdministratorMenuItem",{attrs:{color:t.color[4],route:{name:"menu_sync_data"},icon:"sync",text:"Sync Data"}}):t._e()],1)]:t._e(),"Yes"===t.CC71V?[o("div",{staticClass:"col-12 text-bold q-mt-md"},[t._v("Remote Kitchen")]),o("div",{staticClass:"row q-col-gutter-xs q-mt-xs"},[o("AdministratorMenuItem",{attrs:{color:t.color[5],route:{name:"remote_kitchen_manage"},icon:"account_tree",text:"Kitchen & Items"}})],1)]:t._e()],2)},s=[],a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row q-col-gutter-xs"},[o("div",{staticClass:"col-xs-6 col-sm-3"},[o("DigitMetric",{attrs:{value:t.customers,bg:"teal",text:"white",title:"Total Customers",icon:"supervised_user_circle"}})],1),o("div",{staticClass:"col-xs-6 col-sm-3"},[o("DigitMetric",{attrs:{value:t.items,bg:"blue",text:"white",title:"Total Items",icon:"category"}})],1),o("div",{staticClass:"col-xs-6 col-sm-3"},[o("DigitMetric",{attrs:{value:t.seats,bg:"lime",text:"white",title:"Today Seats",icon:"event_seat"}})],1),o("div",{staticClass:"col-xs-6 col-sm-3"},[o("DigitMetric",{attrs:{value:t.least.length,bg:"orange",text:"white",title:"Least Stock",icon:"trending_down"}})],1)])},i=[],n=(o("5db7"),o("73d9"),o("84ba")),c=(o("b1c1"),{name:"AdministratorDashboardMetricsMain",components:{DigitMetric:n["a"]},computed:{customers(){return _.size(Object.values(this.$store.state.customers.data))},items(){return _.size(Object.values(this.$store.state.items.data))},seats(){return _.size(Object.values(this.$store.state.seating.data))},least(){return _(this.$store.state.kitchens.items).flatMap().filter((({stock:t})=>t<5)).value()}}}),m=c,l=o("2877"),u=Object(l["a"])(m,a,i,!1,null,null,null),d=u.exports,x=o("ec70"),g=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1 cursor-pointer"},[o("Jumbotron",{staticStyle:{"text-align":"center"},attrs:{dark:!0,color:t.color,icon:t.icon,text:t.text},nativeOn:{click:function(e){return t.$router.push(t.route)}}})],1)},p=[],v={name:"AdministratorMenuItem",components:{Jumbotron:x["a"]},props:["color","route","icon","text"]},M=v,I=Object(l["a"])(M,g,p,!1,null,null,null),A=I.exports;const{GH56E:b,JI36A:h,CC71V:C,DP71V:q}=o("adfa").FEATURES;var w={name:"PageAdministratorIndex",components:{AdministratorMenuItem:A,Jumbotron:x["a"],AdministratorDashboardMetricsMain:d},data(){return{color:["accent","info","secondary","brown","deep-orange","teal-14"],GH56E:b,JI36A:h,CC71V:C,DP71V:q}},created(){this.$store.commit("public",{mode:"administration"})}},y=w,f=o("9989"),D=o("eebe"),k=o.n(D),$=Object(l["a"])(y,r,s,!1,null,null,null);e["default"]=$.exports;k()($,"components",{QPage:f["a"]})}}]);