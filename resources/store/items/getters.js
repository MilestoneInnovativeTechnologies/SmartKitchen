export function prices (state,getters, { prices:{ data } }) {
  return _(data).groupBy(({ item }) => _.toInteger(item)).mapValues(data2 => _(data2).mapKeys(({ price_list }) => _.toInteger(price_list)).mapValues(({ price }) => _.toNumber(price)).value()).value()
}
export function groups (state,getters, { groups:{ data:groups } }) {
  let i_groups = _(state.data).mapKeys('id').mapValues(() => []).value()
  _.forEach(groups,({ items,id }) => _.forEach(items,item => {
    if(!_.has(i_groups,item)) i_groups[item] = []
    i_groups[item].push(id)
  }))
  return i_groups;
}
export function kitchen_details(state,getters, { kitchens:{ data:kitchens,items:kis } }){
  let i_kitchens = {};//_(state.data).mapKeys('id').mapValues(() => _(kitchens).mapKeys('id').mapValues(() => new Object({  })).value()).value()//stock:0,duration:0,auto_process:'No',auto_complete:'No'
  _.forEach(kis,(items,kitchen) => _.forEach(items,ki => {
    if(!_.has(i_kitchens,ki.item)) i_kitchens[ki.item] = {}
    if(!_.has(i_kitchens[ki.item],kitchen)) i_kitchens[ki.item][kitchen] = {}
    i_kitchens[ki.item][kitchen] = _.pick(ki,['stock','duration','auto_process','auto_complete'])
  }))
  return i_kitchens;
}
