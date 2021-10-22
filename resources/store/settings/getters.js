import { ItemsPerPageDefault, ItemsPerPageSettingName, ItemsSearchFieldsDefault, ItemsSearchFieldsSettingName } from "assets/constants";

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
