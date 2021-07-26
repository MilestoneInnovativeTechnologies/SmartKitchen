export function cancel({ commit },payment){
  let id = _.toInteger(_.isObject(payment) ? payment.id : payment)
  return new Promise(resolve => post('payment','cancel',{ id }).then(payment => resolve(payment,commit('cancel',payment))))
}
