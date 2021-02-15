export function stock({ items }){
  return _(items).flatMap().groupBy('item').mapValues(kis => _(kis).keyBy('kitchen').mapValues('stock').value()).value()
}
