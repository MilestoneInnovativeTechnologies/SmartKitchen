import {id_keyed} from "assets/helpers";

export function prop (state,records) {
  if(!_.isArray(records)) records = [records];
  state.prop = Object.assign({}, state.prop,id_keyed(records));
  state.propObj = Object.assign({},state.propObj,_(state.prop).mapKeys('name').mapValues(({ id }) => 'prop'+id).value());
  if(state.data && _.size(state.data)) state.rFun(_.values(state.data))
}

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  state.data = Object.assign({},state.data,_(records).mapKeys(({ id }) => _.toInteger(id)).mapValues(record => Object.assign({},record,pObj(state.propObj,record))).value())
}

export function rFun(state,rFun){ state.rFun = rFun }

function pObj(obj,record){ return _.mapValues(obj,prop => _.get(record,prop)) }
