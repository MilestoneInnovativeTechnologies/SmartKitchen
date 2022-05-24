import {mapGetters} from "vuex";
import Tokens from "assets/mixins/Tokens";

export default {
  mixins: [Tokens],
  computed: {
    ...mapGetters('bills',['bills']),
    token_bill(){ return _(this.bills).filter(bill => bill.progress !== 'Cancelled').keyBy(bill => _.get(bill,['token','id'])).value() }
  }
}
