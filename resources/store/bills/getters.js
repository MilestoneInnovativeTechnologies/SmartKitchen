export function pending ({ data }) {
  return _(data).filter(({ progress }) => ['Pending','Partial'].includes(progress)).mapKeys(({ id }) => _.toInteger(id)).value()
}
