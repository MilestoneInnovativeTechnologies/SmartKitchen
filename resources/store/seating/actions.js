export function init ({ commit }) {
  if(typeof _ASSET_Seating !== "undefined") setTimeout(commit,1100,'add',_ASSET_Seating)
}
