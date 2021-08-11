export function items ({ data }) {
  return _(data).groupBy(({ price_list }) => _.toInteger(price_list)).mapValues(data2 => _(data2).mapKeys(({ item }) => _.toInteger(item)).mapValues(({ price }) => _.toNumber(price)).value()).value()
}

export function sales(state,getters,rootState,rootGetters){
  let name_pl = _.find(state.list,{ name:'Sales' }); if(name_pl) return name_pl;
  let settings = rootGetters['settings/settings'],
    name = _.get(settings,'sale_pricelist',_.get(settings,'sales_pricelist',_.get(settings,'sale_price_list',_.get(settings,'sales_price_list',null))));
  if(!name) return null;
  return _.find(state.list,{ name })
}

export function home_delivery(state,getters,rootState,rootGetters){
  let name_pl = _.find(state.list,{ name:'Home Delivery' }); if(name_pl) return name_pl;
  let settings = rootGetters['settings/settings'],
    name = _.get(settings,'home_delivery_pricelist',_.get(settings,'home_delivery_price_list',null));
  if(!name) return null;
  return _.find(state.list,{ name })
}

export function take_away(state,getters,rootState,rootGetters){
  let name_pl = _.find(state.list,{ name:'Take Away' }); if(name_pl) return name_pl;
  let settings = rootGetters['settings/settings'],
    name = _.get(settings,'take_away_pricelist',_.get(settings,'take_away_price_list',null));
  if(!name) return null;
  return _.find(state.list,{ name })
}

export function remote(state,getters,rootState,rootGetters){
  let name_pl = _.find(state.list,{ name:'Remote' }); if(name_pl) return name_pl;
  let settings = rootGetters['settings/settings'],
    name = _.get(settings,'remote_pricelist',_.get(settings,'remote_price_list',null));
  if(!name) return null;
  return _.find(state.list,{ name })
}


