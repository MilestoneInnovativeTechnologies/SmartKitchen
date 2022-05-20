import {mapGetters} from "vuex";
import Tokens from "assets/mixins/Tokens";

export default {
  mixins: [Tokens],
  computed: {
    ...mapGetters('bills',['bills']),
    token_bill(){ return _(this.bills).filter(bill => bill.progress !== 'Cancelled').keyBy(bill => bill.token.id).value() }
  }
}
