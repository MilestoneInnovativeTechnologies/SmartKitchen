export function add (state,number) {
  state.numbers.push(parseInt(number))
}
export function add2 ({ numbers },number) {
  numbers.push(parseInt(number))
}
