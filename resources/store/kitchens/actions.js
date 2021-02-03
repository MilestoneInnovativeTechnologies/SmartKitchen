export function init ({ commit }) {
  if(typeof _ASSET_Kitchen !== "undefined") commit('add',_ASSET_Kitchen)
  if(typeof _ASSET_KitchenItem !== "undefined") commit('items',_ASSET_KitchenItem)
}

export function chef({ commit },{ kitchen }){
  return new Promise(resolve => post('kitchen','toggle',{ kitchen }).then(r => { commit('assign',r); resolve(r) }))
}

export function auto({ commit },data){
  return new Promise(resolve => post('kitchen','auto',data).then(resolve))
}
