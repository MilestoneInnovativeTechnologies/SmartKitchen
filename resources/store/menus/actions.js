export function init ({ commit }) {
  if(typeof _ASSET_Menu !== "undefined") commit('add',_ASSET_Menu)
  if(typeof _SECTION !== "undefined") commit('section',_SECTION)
}

export function toggle({ state,commit },menu){
  post('menu','toggle',{ menu }).then(r => commit('section',{ menu:r }))
}
