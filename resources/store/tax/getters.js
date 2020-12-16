export function natures ({ data }) {
  return _(data).filter(['status','Active']).flatMap(({ contents }) => _.map(contents,'nature')).uniq().value()
}
