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
export function tokens(state,getters,rootState,rootGetters){
  let sItems = rootState.items.data, sUsers = rootState.users.data, sKitchens = rootState.kitchens.data,
    sPItems = rootGetters['prices/items'], sSeating = rootState.seating.data, sPList = rootState.prices.list, sCustomers = rootState.customers.data,
    sBills = _(rootState.bills.data).filter(bill => bill.progress !== 'Cancelled').keyBy(bill => _.toInteger(bill.token)).value();
  return _(state.data).map(token => Object.assign({},token,{
    items: _.map(_.get(state.items,token.id),item => Object.assign({},item,{ item: _.get(sItems,item.item), user: _.get(sUsers,item.user), kitchen: _.get(sKitchens,item.kitchen), price: _.get(sPItems,[token.price_list,parseInt(item.item)]) })),
    seating: _.get(sSeating,token.seating),
    price_list: _.get(sPList,token.price_list),
    waiter: _.get(sUsers,token.user),
    customer: _.get(sCustomers,token.customer),
    progress: token.progress !== 'Billed' ? token.progress : _.get(sBills,[token.id,'progress'],token.progress)
  })).value()
}

