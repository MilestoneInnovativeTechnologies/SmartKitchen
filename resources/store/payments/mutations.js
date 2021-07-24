import Vue from "vue";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data.id) return ; let key = _.toSafeInteger(data.id);
    if(_.has(state.data,key)) Vue.delete(state.data,key);
    Vue.set(state.data,key,data)
  })
}

export function cancel(state, payment){
  let id = _.toInteger(_.isObject(payment) ? payment.id : payment)
  if(_.has(state.data,id)) state.data[id].status = 'Inactive';
}
