export function items (state) {
  return _(state.data).groupBy(({ price_list }) => _.toInteger(price_list)).mapValues(data2 => _(data2).mapKeys(({ item }) => _.toInteger(item)).mapValues(({ price }) => _.toNumber(price)).value()).value()
}

export function prices_of_type(state,getters,rootState,rootGetters){
  return function(name){
    let status = 'Active', pl = rootGetters['settings/price_list'](name);
    if(!pl) pl = _.find(state.list,{ name,status })
    if(!pl && _.size(_.filter(state.list,{ status })) === 1) pl = _.find(state.list,{ status })
    return pl ? Object.assign({},pl,{ items: _.get(getters.items,_.toInteger(pl.id)) }) : null
  }
}

export function sale(state,getters){ return getters['prices_of_type']('Sale') }
export function home_delivery(state,getters){ return getters['prices_of_type']('Home Delivery') }
export function take_away(state,getters){ return getters['prices_of_type']('Take Away') }
export function remote(state,getters){ return getters['prices_of_type']('Remote') }


