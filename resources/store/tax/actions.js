export function init ({ commit }) {
  if(typeof _ASSET_Tax !== "undefined") setTimeout(commit,1200,'add',_ASSET_Tax)
}
