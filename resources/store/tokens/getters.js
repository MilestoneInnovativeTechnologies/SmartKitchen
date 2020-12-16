const { isSameDate } = require('quasar').date

export function today ({ data }) {
  return _(data).filter(({ date }) => isSameDate(new Date(date),new Date,'day')).mapKeys(({id}) => _.toSafeInteger(id)).value()
}
