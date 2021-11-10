export function assign({ status },getters,rState,rGetters){
  let user_kitchens = {};
  _.forEach(status,({ users },kitchen) => _.forEach(users,user => {
    user = _.toInteger(user); kitchen = _.toInteger(kitchen);
    if(!_.has(user_kitchens,user)) user_kitchens[user] = [];
    if(!rGetters['remote/is']('kitchens',kitchen)) user_kitchens[user].push(kitchen);
  }))
  return user_kitchens;
}

export function stock({ items }){
  return _(items).flatMap().groupBy('item').mapValues(kis => _(kis).keyBy('kitchen').mapValues('stock').value()).value()
}

export function map({ items }){
  let index = {}
  _(items).forEach((kis,kitchen) => _.forEach(kis,({ id },idx) => index[id] = [parseInt(kitchen),idx]));
  return index;
}

export function live({ status }){ return _(status).filter(['status','Active']).map(({ kitchen }) => _.toInteger(kitchen)).value() }

export function cloud({ data },getters,rState,rGetters){ return _.filter(data,({ cloud }) => cloud === 'Yes') }
export function cloud_items({ items },{ cloud }){ return _(items).pick(_.map(cloud,'id')).flatMap().value() }
export function remote({ data },getters,rState,rGetters){ return _.filter(data,kitchen => kitchen.cloud === 'Yes' && rGetters["remote/is"]('kitchens',kitchen.id)) }
export function remote_items({ items },{ remote }){ return _(items).pick(_.map(remote,'id')).flatMap().value() }

export function kitchen_full_timer({ status }){ return _(status).keyBy(({ kitchen }) => _.toInteger(kitchen)).mapValues(({ full_timer }) => full_timer ? _.toInteger(full_timer) : null).value() }
export function kitchen_printer({ status }){ return _(status).keyBy(({ kitchen }) => _.toInteger(kitchen)).mapValues('printer').value() }
export function non_remote({ data },getters,rState,rGetters){ return _(data).filter(kitchen => !rGetters["remote/is"]('kitchens',kitchen.id)).value() }
