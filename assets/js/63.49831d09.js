(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[63],{"588f":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[e.user?a("ReportCard",{attrs:{title:"Bill By User",head:e.head,index:"",table:e.table,foot:e.foot,center:["Token/Bill","Items"],right:["Amount","Discount","Payable","Paid","Balance"]}}):a("div",{staticClass:"text-center"},[e._v("Select User")])],1)},i=[],l=a("460a"),r=a("b1c1"),n=a("58d1"),u={name:"ReportBillUser",components:{ReportCard:l["a"]},mixins:[n["a"]],computed:{date(){return this.$store.state.public.date+" 00:00:00"},user(){return this.$store.state.public.user},head(){return _.zipObject(["Report","Date"],["Bills By "+this.user.name,Object(r["x"])("ddd - Do MMM",this.date)])},date_bills(){return _(this.bills).filter((({date:e,progress:t})=>"Cancelled"!==t&&Object(r["i"])(e,this.date,"day"))).value()},user_bills(){return _(this.date_bills).filter((({user:e})=>e.id===this.user.id)).sortBy((({date:e})=>Object(r["c"])(e).getTime())).value()},table(){return _(this.user_bills).map((({id:e,date:t,token:a,amount:s,discount:i,payable:l,paid:n})=>_.zipObject(["Time","Token/Bill","Type","Items","Amount","Discount","Payable","Paid","Balance"],[Object(r["w"])(t),`${a.id}/${e}`,a.type,_.size(a.items),s,i,l,n,l-n]))).value()},foot(){return _.zipObject(["Bills","Items","Total Payable","Total Paid","Total Balance"],[_.size(this.user_bills),_.sumBy(this.table,"Items"),_.sumBy(this.table,"Payable"),_.sumBy(this.table,"Paid"),_.sumBy(this.table,"Balance")])}}};var o=u,d=a("2877"),c=a("9989"),b=a("eebe"),p=a.n(b),m=Object(d["a"])(o,s,i,!1,null,null,null);t["default"]=m.exports;p()(m,"components",{QPage:c["a"]})}}]);