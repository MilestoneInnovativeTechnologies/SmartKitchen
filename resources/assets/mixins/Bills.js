import {mapState} from "vuex";
import Tokens from "assets/mixins/Tokens";

export default {
  mixins: [Tokens],
  computed: mapState({
    bills({ bills:{ data },customers,users,payments }){ return _(data).map(bill => Object.assign({},bill,
      { payable: _.toNumber(bill.amount) - _.toNumber(bill.discount) - _.toNumber(bill.round) },
      { token:_.find(this.tokens,['id',bill.token]) },
      { customer:_.get(customers['data'],bill.customer) },
      { user:_.get(users['data'],bill.user) },
      { payments:_(payments['data']).filter(payment => payment.bill === bill.id && payment.status === 'Active').value() },
      { paid: _.sumBy(_.filter(payments['data'],['bill',bill.id]),({amount}) => _.toNumber(amount)) }
      )).value() }
  })
}
