export function init ({ commit }) {
  if(typeof _ASSET_Customer !== "undefined") setTimeout(commit,100,'add',_ASSET_Customer)
}
