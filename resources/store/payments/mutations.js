import {id_keyed} from "assets/helpers";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  state.data = Object.assign({},state.data,id_keyed(records))
}

export function cancel(state, payment){
  let id = _.toInteger(_.isObject(payment) ? payment.id : payment)
  if(_.has(state.data,id)) state.data[id].status = 'Inactive';
}
