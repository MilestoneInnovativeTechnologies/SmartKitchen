export function init ({ commit }) {
  let VARS = ['USERS']
  _.forEach(VARS,VAR => (_.has(DATA,VAR) && DATA[VAR]) ? commit('add',DATA[VAR]) : null)
}
