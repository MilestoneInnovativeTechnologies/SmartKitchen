import { ItemsPerPageDefault, ItemsPerPageSettingName, ItemsSearchFieldsDefault, ItemsSearchFieldsSettingName } from "assets/constants";
const true_values = [1,'1','true','True','yes','Yes','YES','ON','on','On'];
const false_values = [0,'0','false','False','no','No','NO','Off','OFF','off'];

export function settings ({ data }) {
  return _(data).keyBy('name').mapValues('value').value()
}

export function items_per_page(state,getters){
  return _.toInteger(_.get(getters.settings,ItemsPerPageSettingName,_.get(getters.settings,'max_items_per_page',ItemsPerPageDefault)))
}

export function items_search_fields(state,{ settings }){
  return function(name){ name = _.snakeCase(name || 'order'); let key = name + '_' + ItemsSearchFieldsSettingName
    let fields = _.get(settings,key,_.get(settings,ItemsSearchFieldsSettingName,ItemsSearchFieldsDefault))
    return _.split(fields,',')
  }
}

export function price_list(state,{ settings },rState){
  return function(name){
    let pl_name = _.snakeCase((name || '') + 'Price List');
    if(_.has(settings,pl_name) && _.find(rState.prices.list,{ status:'Active',name:_.get(settings,pl_name) })) return _.find(rState.prices.list,{ status:'Active',name:_.get(settings,pl_name) })
    return _.find(rState.prices.list,{ status:'Active',name })
  }
}

export function menu(state,{ settings },rState){
  return function(name){
    let menu_name = _.snakeCase((name || '') + 'Menu');
    if(_.has(settings,menu_name) && _.find(rState.menus.data,{ status:'Active',name:_.get(settings,menu_name) })) return _.find(rState.menus.data,{ status:'Active',name:_.get(settings,menu_name) })
    return _.find(rState.menus.data,{ status:'Active',name })
  }
}

export function manage_customer(state,{ settings }){
  return function(name){ let def = !(name === 'Waiter' || name === 'waiter'); if(!name) return def;
    let s_name = _.snakeCase((name || '') + ' Manage Customer');
    if(!_.has(settings,s_name)) return def
    let val = _.get(settings,s_name);
    return _.includes(false_values,val) ? false : (_.includes(true_values,val) ? true : def)
  }
}

export function quick(state,{ settings }){
  return function(name){
    if(!name) return _.includes(true_values,_.get(settings,'quick_mode','No'));
    if(name === 'item_prop') return _.get(settings,'quick_mode_item_prop','id')
    let s_name = _.snakeCase('Quick Mode ' + name);
    return _.includes(true_values,_.get(settings,s_name))
  }
}
