import {mapState} from "vuex";
import Tokens from "assets/mixins/Tokens";
import {bill_payable} from "assets/module_helpers";

export default {
  mixins: [Tokens],
  computed: mapState({
    bills({ bills:{ data },customers,users,payments }){ return _(data).map(bill => Object.assign({},bill,
      { payable: bill_payable(bill) },
      { token:_.find(this.tokens,['id',bill.token]) },
      { customer:_.get(customers['data'],bill.customer) },
      { user:_.get(users['data'],bill.user) },
      { payments:_(payments['data']).filter(payment => payment.bill === bill.id && payment.status === 'Active').value() },
      { paid: _.sumBy(_.filter(payments['data'],['bill',bill.id]),({amount}) => _.toNumber(amount)) }
      )).value() }
  })
}
