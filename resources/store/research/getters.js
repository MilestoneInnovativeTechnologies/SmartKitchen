export function odd (state) {
  return _(state.numbers).filter(number => number % 2).value()
}

export function even ({ numbers }) {
  return _(numbers).filter(number => !(number % 2)).filter().value()
}

