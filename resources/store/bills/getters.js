export function pending ({ data }) {
  return _(data).filter(({ progress }) => ['Pending','Partial'].includes(progress)).mapKeys(({ id }) => _.toInteger(id)).value()
}

export function token_progresses({ data }){
  return _(data).filter(({ progress }) => progress !== 'Cancelled').keyBy(({ token }) => _.toInteger(token)).mapValues('progress').value()
}
