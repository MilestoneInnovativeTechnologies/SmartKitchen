export function items ({ data }) {
  return _(data).groupBy(({ price_list }) => _.toInteger(price_list)).mapValues(data2 => _(data2).mapKeys(({ item }) => _.toInteger(item)).mapValues(({ price }) => _.toNumber(price)).value()).value()
}
