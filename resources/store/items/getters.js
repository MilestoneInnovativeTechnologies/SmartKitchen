export function prices (state,getters, { prices:{ data } }) {
  return _(data).groupBy(({ item }) => _.toInteger(item)).mapValues(data2 => _(data2).mapKeys(({ price_list }) => _.toInteger(price_list)).mapValues(({ price }) => _.toNumber(price)).value()).value()
}
