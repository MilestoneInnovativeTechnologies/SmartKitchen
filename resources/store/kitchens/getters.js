export function kitchen_items ({ assign,items }) {
  return _(items).pick(assign).flatMap().map('item').value()
}
export function kitchen_item_stocks ({ assign,items }) {
  return _(items).pick(assign).flatMap().mapKeys('item').mapValues('stock').value()
}
export function my_kitchen_items ({ items }) {
  return (id) => _(items[_.toSafeInteger(id)]).flatMap().map(({item}) => _.toSafeInteger(item)).value()
}
export function my_kitchen_item_stocks ({ items }) {
  return (id) => _(items[_.toSafeInteger(id)]).flatMap().mapKeys('item').mapValues('stock').value()
}
