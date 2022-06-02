export function init ({ commit }) {
  if(typeof _ASSET_PriceList !== "undefined") setTimeout(commit,700,'list',_ASSET_PriceList)
  if(typeof _ASSET_Price !== "undefined") setTimeout(commit,800,'add',_ASSET_Price)
}
