import {remote_is_remote} from "assets/module_helpers";

export function kitchens(state,getters,rootState) {
  return function(id){ if(!id) return;
    let picks = state.picks.kitchens, kitchen = _.get(rootState,['kitchens','data',parseInt(id)]);
    if(!kitchen) return false;
    let local_id = parseInt(kitchen.id), ks = rootState.kitchens.status[local_id];
    let users = ks ? ks.users : [], online = ks && ks.status === 'Active';
    return Object.assign({},_.pick(kitchen,picks),{ online,users },/*{ ['_id_' + _BRANCH]:local_id }*/);
  }
}

export function kitchen_items(state,getters,rootState,rootGetters) {
  return function(id){ if(!id) return; id = parseInt(id);
    let map = rootGetters["kitchens/map"][id]; if(!map) return;
    let ki = rootState.kitchens.items[map[0]][map[1]];
    if(!ki) return false; let picks = state.picks.kitchen_items, kitchen_item = _.pick(ki,picks);
    let item = _.cloneDeep(_.pick(_.get(rootState,['items','data',parseInt(ki.item)]),state.picks.items));
    item.item = item.name; delete item.name;
    let kitchen_id = parseInt(ki.kitchen), kitchen = _.get(_.find(state.data,({ item,local_id }) => item === 'kitchens' && local_id === kitchen_id),'reference'); if(!kitchen) return;
    return Object.assign({},kitchen_item,{ kitchen },item,/*{ ['_id_' + _BRANCH]:ki.id,['_id_kitchen_' + _BRANCH]:kitchen_id,['_id_item_' + _BRANCH]:parseInt(ki.item) }*/)
  }
}

export function tokens(state,getters,rootState) {
  return function(id){ if(!id) return;
    let picks = state.picks.tokens, token = _.get(rootState,['tokens','data',parseInt(id)]);
    if(!token || ['Billed','Cancelled'].includes(_.get(token,'progress'))) return false;
    return Object.assign({},_.pick(token,picks),/*{ ['_id_' + _BRANCH]:token.id }*/);
  }
}

export function token_items(state,getters,rootState,rootGetters) {
  return function(id){ if(!id) return; id = parseInt(id);
    let map = rootGetters["tokens/map"][id]; if(!map) return;
    let ti = rootState.tokens.items[map[0]][map[1]];
    if(!ti) return false; let picks = state.picks.token_items, token_item = _.pick(ti,picks), progress_timing = _.get(ti,'progress_timing');
    if(state.token_item_progress.indexOf(ti.progress) > state.token_item_progress.indexOf('Completed')) return false;
    let kitchen = _.get(_.find(state.data,({ item,local_id }) => item === 'kitchens' && parseInt(local_id) === parseInt(ti.kitchen)),'reference','');
    // let kitchen_item_reference = getters["token_item_kitchen_item_reference"][id];
    let { reference,location } = _.get(getters["token_item_kitchen_item_reference_location"],id);
    let item = _.pick(_.get(rootState,['items','data',parseInt(ti.item)]),state.picks.items);
    item.item = item.name; delete item.name;
    let token_id = parseInt(ti.token), token = _.get(_.find(state.data,({ item,local_id }) => item === 'tokens' && local_id === token_id),'reference');
    if(!token) return;
    return Object.assign({},token_item,{ token,kitchen },item,{ kitchen_item_reference:reference,kitchen_item_location:location },{ /*[`progress_timing_${_BRANCH}`]:progress_timing,['_id_' + _BRANCH]:ti.id,['_id_token_' + _BRANCH]:token_id,['_id_item_' + _BRANCH]:parseInt(ti.item) }*/ })
  }
}

export function token_item_kitchen_item_reference_location(state,getters,rootState,rootGetters){
  let token_items = _(state.data).filter(({ item }) => item === 'token_items').map('local_id').value();
  let ti_map = rootGetters["tokens/map"], item_ki = item_kis(rootState.kitchens.items), ki_reference = ki_ref_loc(state.data);
  return _(token_items).mapKeys(_.toInteger).mapValues(ti => ti_item(rootState.tokens.items,_.get(ti_map,ti,[]))).mapValues(item => item_ki[parseInt(item)]).mapValues(ki => ki_reference[ki]).value()
}

export function is(state){
  let items = ['kitchens','tokens','kitchen_items','token_items'];
  return function(item,id){ if(!items.includes(item)) return false;
    return remote_is_remote(state.data,item,id)
  }
}

export function token_branch({ data }){ return _(data).filter(['item','tokens']).mapKeys(({ local_id }) => _.toInteger(local_id)).mapValues('location').value() }

function ti_item(items,map){ return parseInt(_.get(items,[...map,'item'])) }
function item_kis(items){ return _(items).flatMap().keyBy(({ item }) => _.toInteger(item)).mapValues(({ id }) => _.toInteger(id)).value() }
function ki_ref_loc(data){ return _(data).filter(({ item,monitor }) => item === 'kitchen_items').keyBy(({ local_id }) => _.toInteger(local_id)).mapValues(({ reference,location }) => new Object({ reference,location })).value() }