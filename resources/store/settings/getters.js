export function settings ({ data }) {
  return _(data).keyBy('name').mapValues('value').value()
}
export function items_per_page(state,getters){
  return _.toInteger(_.get(getters.settings,'items_per_page',_.get(getters.settings,'max_items_per_page',100)))
}
export function items_search_fields(state,{ settings }){
  return function(name){ name = _.snakeCase(name || 'order'); let key = name + '_items_search_fields'
    let fields = _.get(settings,key,_.get(settings,'items_search_fields','id,name,detail'))
    return _.split(fields,',')
  }
}
