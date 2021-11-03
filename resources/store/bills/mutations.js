import Vue from "vue";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data.id) return ; let key = _.toSafeInteger(data.id);
    if(_.has(state.data,key)) Vue.delete(state.data,key);
    if(_.isString(data.contents)) { try { data.contents = JSON.parse(data.contents) } catch(e){ data.contents = [] } }
    Vue.set(state.data,key,data)
  })
}

export function cancel(state, bill){
  let id = _.toInteger(_.isObject(bill) ? bill.id : bill)
  if(_.has(state.data,id)) Vue.delete(state.data,id);
}
