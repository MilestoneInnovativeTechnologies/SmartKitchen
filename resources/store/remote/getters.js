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
    if(!token) return false;
    return Object.assign({},_.pick(token,picks),/*{ ['_id_' + _BRANCH]:token.id }*/);
  }
}

export function token_items(state,getters,rootState,rootGetters) {
  return function(id){ if(!id) return; id = parseInt(id);
    let ti = rootGetters['tokens/item'](id), offline_reference = _.get(_.find(state.data,{ item:'token_items',local_id:id }),['extra','offline_reference'],null);
    if(!ti) return false; let picks = state.picks.token_items, token_item = _.pick(ti,picks);//, progress_timing = _.get(ti,'progress_timing');
    let kitchen = _.get(_.find(state.data,({ item,local_id }) => item === 'kitchens' && parseInt(local_id) === parseInt(ti.kitchen)),'reference','');
    let { reference,location } = _.get(getters["token_item_kitchen_item_reference_location"],id);
    let item = _.pick(_.get(rootState,['items','data',parseInt(ti.item)]),state.picks.items);
    item.item = item.name; delete item.name;
    let token_id = parseInt(ti.token), remote_token_data = _.find(state.data,({ item,local_id }) => item === 'tokens' && local_id === token_id);
    return Object.assign({},token_item,{ token:_.get(remote_token_data,'reference'),kitchen },item,{ kitchen_item_reference:reference,kitchen_item_location:location,offline_reference })
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

export function offline_reference(state,getters,rootState,rootGetters){
  return function(id,extra){ id = parseInt(id); extra = extra || {};
    let ti = rootGetters['tokens/item'](id), tk = _.find(state.data,{ item:'tokens',local_id:parseInt(ti.token) });
    let ki_refs = _.mapKeys(getters['token_item_kitchen_item_reference_location'][id],(v,key) => 'kitchen_item_' + key);
    let s_token = getters['tokens'](ti.token), s_item = getters['token_items'](id);
    let token_date = _.get(s_token,'date',''), token_date_code = (token_date || '').replace(/\D/g,'')
    return new Object({
      local: [tk,ti],
      server: [s_token,s_item],
      token_date,token_date_code,
      ...ki_refs,
      token_reference: _.get(tk,'reference'), token_item_reference: _.get(ti,'reference'),
      token_source_location: _BRANCH, token_source_id: ti.token, token_item_source_id: id,
      ...extra
    })
  }
}

export function token_item_token(state,getters,rootState,rootGetters){
  return function(token_item){
    return _.find(state.data,{ item:'tokens',local_id:rootGetters['tokens/map'][parseInt(token_item)][0] })
  }
}

export function remote_record_from_token_date(state,getters,rootState){
  let local_id_to_record = _(state.data).filter(['item','tokens']).keyBy(({ local_id }) => _.toInteger(local_id)).value()
  return function(date,loc){
    let token = _.find(rootState.tokens.data,tkn => tkn.date === date && _.has(local_id_to_record,tkn.id) && _.get(local_id_to_record,[tkn.id,'location']) === loc)
    return token ? _.get(local_id_to_record,token.id,null) : null
  }
}

export function item_id_of_kitchen_item(state,getters,rootState){
  const ki_item = _(rootState.kitchens.items).flatMap().keyBy(({ id }) => _.toInteger(id)).mapValues(({ item }) => _.toInteger(item)).value()
  return (local_id) => _.get(ki_item,local_id,null)
}

function ti_item(items,map){ return parseInt(_.get(items,[...map,'item'])) }
function item_kis(items){ return _(items).flatMap().keyBy(({ item }) => _.toInteger(item)).mapValues(({ id }) => _.toInteger(id)).value() }
function ki_ref_loc(data){ return _(data).filter(({ item,monitor }) => item === 'kitchen_items').keyBy(({ local_id }) => _.toInteger(local_id)).mapValues(({ reference,location }) => new Object({ reference,location })).value() }
