import {settings_boolean} from "assets/helpers";
import Bills from "assets/mixins/Bills";

const BPPath = [location.protocol+'/',location.host,'browser_print'].join('/');

export default {
  mixins: [Bills],
  computed: {
    browser_print(){ return settings_boolean(settings('browser_print')) === true },
  },
  methods: {
    tokenToToken(tkn){
      if(_.isObject(tkn)) return tkn;
      return _.find(this.tokens,['id',_.toNumber(tkn)])
    },
    billToToken(bill){
      if(_.isObject(bill)) return this.tokenToToken(bill.token);
      return _.get(_.find(this.bills,['id',_.toNumber(bill)]),'token',null)
    },
    billToBill(bill){
      if(_.isObject(bill)) return bill;
      return _.find(this.bills,['id',_.toNumber(bill)])
    },
    tokenToBill(tkn){
      if(_.isObject(tkn)) return _.get(this.token_bill,_.toNumber(tkn.id))
      return _.get(this.token_bill,_.toNumber(tkn),null)
    },

    url(args){ return BPPath + '?' + _.map(args,(v,k) => `${k}=${v}`).join('&') },
    BrowserPrint(page,id,token,delay){
      ((win) => {
        win.addEventListener("load", () => setTimeout(win => win.close(),(delay || 1500),win), false);
        if(win.attachEvent) win.attachEvent("onload", () => setTimeout(win => win.close(),(delay || 1500),win), false);
      })(window.open(this.url({ page,id,token }), "BrowserPrint"));
    }
  }
}
