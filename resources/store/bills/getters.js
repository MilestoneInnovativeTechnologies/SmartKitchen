import {bill_payable} from "assets/module_helpers";

export function pending ({ data }) { return _(data).filter(({ progress }) => ['Pending','Partial'].includes(progress)).mapKeys(({ id }) => _.toInteger(id)).value() }
export function token ({ data }) { return _(data).filter(({ progress }) => progress !== 'Cancelled').mapKeys(({ id }) => _.toInteger(id)).mapValues(({ token }) => _.toInteger(token)).value() }
export function token_progresses({ data }){ return _(data).filter(({ progress }) => progress !== 'Cancelled').keyBy(({ token }) => _.toInteger(token)).mapValues('progress').value() }
export function bills(state,getters,rootState,rootGetters){
  let gTokens = _.keyBy(rootGetters['tokens/tokens'],'id'), sCustomers = rootState.customers.data, sUsers = rootState.users.data,
    Payments = _(rootState.payments.data).filter(['status','Active']).groupBy('bill').value(),
    Paid = _(Payments).mapValues(payments => _.sumBy(payments,payment => _.toNumber(payment.amount))).value();
  return _(state.data).map(bill => Object.assign({},bill,{
    payable: bill_payable(bill), balance: bill_payable(bill) - _.get(Paid,bill.id,0),
    token: _.get(gTokens,bill.token),
    customer: _.get(sCustomers,bill.customer),
    user: _.get(sUsers,bill.user),
    payments: _.get(Payments,bill.id,[]),
    paid: _.get(Paid,bill.id,0)
  })).value()
}
