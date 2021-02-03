import {mapState} from "vuex";
import Tokens from "assets/mixins/Tokens";

export default {
  mixins: [Tokens],
  computed: mapState({
    bills({ bills:{ data },customers,users }){ return _(data).map(bill => Object.assign({},bill,
      { token:_.find(this.tokens,['id',bill.token]) },
      { customer:_.get(customers['data'],bill.customer) },
      { user:_.get(users['data'],bill.user) },
      )).value() }
  })
}
