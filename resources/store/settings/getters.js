export function settings ({ data }) {
  return _(data).keyBy('name').mapValues('value').value()
}
export function items_per_page(state,getters){
  return _.toInteger(_.get(getters.settings,'items_per_page',_.get(getters.settings,'max_items_per_page',100)))
}
