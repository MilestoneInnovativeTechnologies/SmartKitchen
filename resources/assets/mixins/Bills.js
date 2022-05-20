import {mapGetters} from "vuex";
import Tokens from "assets/mixins/Tokens";

export default {
  mixins: [Tokens],
  computed: {
    ...mapGetters('bills',['bills']),
    bill_token(){ return _(this.bills).filter(bill => bill.progress !== 'Cancelled').keyBy(bill => bill.token.id).value() }
  }
}
