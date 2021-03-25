export function settings ({ data }) {
  return _(data).keyBy('name').mapValues('value').value()
}
