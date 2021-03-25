export function init ({ commit }) {
  if(typeof _ASSET_Settings !== "undefined") commit('add',_ASSET_Settings)
}
