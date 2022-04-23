import {token_remote_filter, token_remote_map, token_remote_recent} from "assets/module_helpers";

const { isSameDate } = require('quasar').date

export function today ({ data }) {
  return _(data).filter(({ date }) => isSameDate(new Date(date),new Date,'day')).mapKeys(({id}) => _.toSafeInteger(id)).value()
}

export function map({ items }){
  let index = {}
  _(items).forEach((tis,token) => _.forEach(tis,({ id },idx) => index[id] = [parseInt(token),idx]));
  return index;
}

export function remote({ data,items },getters,rState,rGetters){
  let items_map = _.bind(token_remote_map,this,items), remote_filter = _.bind(token_remote_filter,this,rGetters['remote/token_branch']);
  return _(data).filter(remote_filter)/*.filter(token_remote_recent)*/.map(items_map).value()
}

export function progress({ data },getters,rState){
  const tbp = _(rState.bills.data).filter(({ progress }) => progress !== 'Cancelled').mapKeys(({ token }) => _.toInteger(token)).mapValues('progress').value();
  return _(data).mapValues(({ progress,id }) => progress === 'Billed' ? (_.get(tbp,id) === 'Pending' ? progress : _.get(tbp,id)) : progress).value()
}

export function item(state,getters){
  let ti_map = getters['map'];
  return (ti) => _.get(state.items,ti_map[parseInt(ti)])
}

export function billed(state,getters,rootState){ return _(_.get(rootState,['bills','data'])).filter(bill => bill.progress !== 'Cancelled').map(bill => _.toSafeInteger(bill.token)).value() }
