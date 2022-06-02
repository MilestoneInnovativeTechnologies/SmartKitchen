import Vue from "vue";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  state.data = Object.assign({},
    state.data,
    _(records)
      .mapKeys(record => _.toInteger(record.id))
      .mapValues(record => Object.assign({},record,{ contents:getBillContents(record)  }))
      .value()
  )
}

export function cancel(state, bill){
  let id = _.toInteger(_.isObject(bill) ? bill.id : bill)
  if(_.has(state.data,id)) Vue.delete(state.data,id);
}

function getBillContents({ contents }){
  if(!_.isString(contents)) return contents;
  let bill_contents = []
  try { bill_contents = JSON.parse(contents) } catch (e) { bill_contents = [] }
  return bill_contents;
}
