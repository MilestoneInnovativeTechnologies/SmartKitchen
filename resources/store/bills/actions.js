export function cancel({ commit },bill){
  let id = _.toInteger(_.isObject(bill) ? bill.id : bill)
  return new Promise(resolve => post('bill','do_cancel',{ id }).then(function(bill){
    if(bill.payments && bill.payments.length) _.forEach(bill.payments,payment => commit('payments/cancel',payment,{ root:true }))
    commit('cancel',bill); resolve(bill);
  }))

}
