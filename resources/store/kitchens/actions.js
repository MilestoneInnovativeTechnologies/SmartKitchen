export function init ({ commit }) {
  if(typeof _ASSET_Kitchen !== "undefined") commit('add',_ASSET_Kitchen)
  if(typeof _ASSET_KitchenItem !== "undefined") commit('items',_ASSET_KitchenItem)
}

export function chef(ctx,{ kitchen }){ return new Promise(resolve => post('kitchen','toggle',{ kitchen }).then(resolve)) }

export function auto(ctx,data){ return new Promise(resolve => post('kitchen','auto',data).then(resolve)) }
export function printer(ctx,data){ return new Promise(resolve => post('kitchen','manage',data).then(resolve)) }
