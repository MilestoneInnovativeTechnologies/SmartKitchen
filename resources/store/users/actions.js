export function init ({ commit }) {
  // let VARS = ['USERS']
  // _.forEach(VARS,VAR => (_.has(DATA,VAR) && DATA[VAR]) ? commit('add',DATA[VAR]) : null)
  if(typeof _ASSET_User !== "undefined") setTimeout(commit,1300,'add',_ASSET_User)
}
