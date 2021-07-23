import {remote} from "boot/remote";
const cache = {},deleted = [];

export function init ({ commit,dispatch }) {
  commit('uploadFn',_.bind(dispatch,this,'upload'))
  commit('monitorFn',_.bind(dispatch,this,'monitor'))
  if(typeof _ASSET_Remote !== "undefined") commit('add',_ASSET_Remote);
  setTimeout(dispatch,5000,'fetch');
}
export function upload({ state,commit,dispatch,getters },{ item,data }){
  if(!state.processing) { commit('process');
    let rData = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
    if(rData && (rData.reference || rData.location !== _BRANCH)) return commit('process',false);
    let record = getters[item](data.local_id); if(!record) return commit('process',false);
    record._location = _BRANCH; record._monitor = true; dispatch('uploadRemoteRecord',{ item,record,id:data.id });
  } else setTimeout(dispatch,state.pending * 1000,'upload',{ item,data });
}

export function uploadRemoteRecord({ commit,dispatch },{ item,record,id }){
  remote(item).then(ref => ref.add(record).then(function(ref){
    dispatch('addReference', { id,reference:ref.id }).then(function(res){
      commit('process',false); cache[ref.id] = record;
    })
  }))
}

export function updateRemoteRecord({ commit,dispatch },{ id,item,record,reference }){
  remote(item,reference).then(ref => ref.update(record).then(() => cache[reference] = record))
}

export function deleteRemoteEntry({ state,commit,dispatch },payload){
  if(!state.processing) { commit('process');
    let id = _.has(payload, 'id') ? parseInt(payload.id) : _.findKey(state.data, ['reference', payload.reference]), rEntry = state.data[id];
    if (!rEntry || !_.has(state.monitoring, rEntry.reference) || deleted.includes(rEntry.id)) return commit('process',false);
    deleted.push(id);
    post('remote', 'remove',{ id }).then(function ({ id }) {
      commit('remove', id); let update = { _monitor:false }; if(rEntry.item === 'tokens') update['progress'] = 'Completed'
      remote(rEntry.item, rEntry.reference).then(ref => ref.update(update).then(() => commit('process',false)))
    })
  } else setTimeout(dispatch,state.pending * 1000,'deleteRemoteEntry',payload);
}

export function addReference({},{ id,reference }){
  return new Promise(function(resolve){
    post('remote','addReference',{ id,reference }).then(resolve)
  })
}

export function monitor({ state:{ monitoring,syncRemoteEdits,syncLocalEdits,data },getters,commit,dispatch }, { id,item,reference,entry }){
  if(!data[parseInt(entry)]) return;
  // if(_.has(monitoring,reference) && monitoring[reference][0]) monitoring[reference][0]();
  let rData = data[parseInt(entry)], rSource = rData['location'], rMonitor = rData['monitor'];
  if(rMonitor === 'Yes' && (!_.has(monitoring,reference) || !monitoring[reference][0])) {
    if(rSource !== _BRANCH || (rSource === _BRANCH && syncRemoteEdits.includes(item))){
      remote(item,reference).then(ref => commit('monitor',{ reference,unsub:ref.onSnapshot(function(snap){
          let rData = snap.data(), lData = getters[item](id); cache[reference] = rData; if(lData === false) return dispatch('deleteRemoteEntry',{ id:entry });
          _.forEach(lData,function(val,key){
            if(key.substr(0,1) === "_" || (_.has(rData,key) && _.isEqual(val,rData[key]))) return true;
            dispatch({ type:'remoteUpdate_'+item,data:rData,id });
            return false;
          })
          if(rData._monitor === false && ['tokens','token_items'].includes(item)) dispatch({ type:'remoteUpdate_'+item,data:rData,id });
        }) }))
    }
  }
  let record = getters[item](id); if(!record) return dispatch('deleteRemoteEntry', { id:entry });
  if(rSource === _BRANCH || (rSource !== _BRANCH && syncLocalEdits.includes(item))){
    let listener = _.bind(remoteUpdater,this,dispatch,item,id,reference,entry);
    if(_.has(monitoring,reference) && monitoring[reference][1]) monitoring[reference][1]();
    if(rMonitor === 'Yes') dispatch({ type:'subscribeWatch_' + item,id,item,reference,entry,listener })
  }
}

export function remoteUpdate_kitchens({ state,commit,getters,rootState,dispatch },{ id,data }){
  let lData = getters['kitchens'](id)
  _.forEach(['name','auto_accept','cloud'],function(key){
    if(_.has(data,key) && _.has(lData,key) && _.isEqual(lData[key],data[key])) return true;
    post('kitchen','manage',Object.assign({},_.pick(data,state.picks.kitchens),{ id }))
    return false;
  })
  _.forEach(['status','users'],function(key){
    if(_.has(data,key) && _.has(lData,key) && _.isEqual(lData[key],data[key])) return true;
    let statusCommit = { status:data.online ? 'Active' : 'Inactive', users:data.users, kitchen:id }
    setTimeout(commit,2000,'kitchens/status',statusCommit,{ root:true });
    return false;
  })
}
export function subscribeWatch_kitchens({ getters,commit },{ id,item,reference,listener }){
  let watchFn = rootState => Object.assign({},rootState.kitchens.data[id],rootState.kitchens.status[id])
  commit('monitor',{ reference,unwatch:this.watch(watchFn,() => listener(getters[item](id),cache),{ deep:true }) })
}

export function remoteUpdate_kitchen_items({ state,rootState,rootGetters },{ id,data }){
  let map = rootGetters["kitchens/map"][id], kitchen = map[0], kitchen_item = rootState.kitchens.items[kitchen][map[1]], item_id = parseInt(kitchen_item.item);
  let itemUpdate = _.pick(data,state.picks.items); itemUpdate.name = itemUpdate.item; delete itemUpdate.item;
  let itemLocal = rootState.items.data[item_id];
  post('kitchen','item',Object.assign({},_.pick(data,state.picks.kitchen_items),{ id }))
    .then(() => _.forEach(itemUpdate,function(val,key){
      if(_.isEqual(val,itemLocal[key])) return true;
      setTimeout(post,2000,'item','manage',Object.assign({},itemUpdate,{ id:item_id }))
      return false;
    }))
}
export function subscribeWatch_kitchen_items({ getters,rootGetters,rootState,state,commit,dispatch },{ item,id,reference,listener }){
  let map = rootGetters["kitchens/map"][id], kitchen = map[0], idx = map[1], item_id = _.get(rootState.kitchens.items,[kitchen,idx,'item']);
  let watchFn = rootState => Object.assign({},rootState.kitchens.items[kitchen][idx],rootState.items.data[item_id])
  commit('monitor',{ reference,unwatch:this.watch(watchFn,() => listener(getters[item](id),cache),{ deep:true }) })
}

export function remoteUpdate_tokens({ state,rootState,rootGetters },{ id,data }){

}
export function subscribeWatch_tokens({ getters,rootGetters,rootState,state,commit,dispatch },{ item,id,reference,listener }){
  let watchFn = rootState => rootState.tokens.data[id]
  commit('monitor',{ reference,unwatch:this.watch(watchFn,() => listener(getters[item](id),cache),{ deep:true }) })
}

export function remoteUpdate_token_items({ state,rootState,rootGetters,dispatch },{ id,data }){
  let map = rootGetters["tokens/map"][id], token = map[0], token_item = rootState.tokens.items[token][map[1]], local_progress = _.get(token_item,'progress'), remote_progress = data.progress;
  let kitchen = data.kitchen ? _.get(_.find(state.data,['reference',data.kitchen]),'local_id') : '', next_progress = state.token_item_next_progress[local_progress];
  let self = _.get(data,'_location') === _BRANCH;
  if(self){
    if(state.token_item_progress.indexOf(local_progress) < state.token_item_progress.indexOf('Served')){
      if(state.token_item_progress.indexOf(remote_progress) > state.token_item_progress.indexOf(local_progress))
        post('token',next_progress,{ id:token_item.id,kitchen })
      else
        post('token',state.token_item_progress_action[remote_progress],{ id:token_item.id,kitchen })
    } else {
      dispatch('deleteRemoteEntry', { id:_.findKey(state.data,({ item,local_id }) => item === 'token_items' && parseInt(local_id) === parseInt(id)) })
    }
  } else {
    if(remote_progress === 'Cancelled') post('token','cancel',{ id:token_item.id,kitchen })
    if(state.token_item_progress.indexOf(remote_progress) >= state.token_item_progress.indexOf('Completed') && data._monitor === false) post('token','served',{ id:token_item.id,kitchen })
  }
}
export function subscribeWatch_token_items({ getters,rootGetters,rootState,state,commit,dispatch },{ item,id,reference,listener }){
  let map = rootGetters["tokens/map"][id], token = map[0], idx = map[1];
  let watchFn = rootState => rootState.tokens.items[token][idx];
  commit('monitor',{ reference,unwatch:this.watch(watchFn,() => listener(getters[item](id),cache),{ deep:true }) })
}

export function fetch({ state,dispatch }){
  if(typeof _COMPANY === 'undefined') return;
  ['kitchens','kitchen_items'].forEach(item => remote(item).then(ref => fetch_ref_where(ref,item).onSnapshot(snaps => snaps.docChanges().forEach(function(change){
    if(change.type !== 'added') return true; let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
    if(!_.find(state.data,({ item:dItem,reference:dRef }) => dItem === item && dRef === reference)) dispatch('uploadFetch',{ item,data:{ ...data,reference } })
  }))));
  let fetchTokens = {};
  remote('token_items').then(ref => fetch_ref_where(ref,'token_items').onSnapshot(function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type !== 'added') return true;
      let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
      if(!_.has(fetchTokens,data.token)) fetchTokens[data.token] = [];
      fetchTokens[data.token].push(reference);
    });
    if(!_.size(fetchTokens)) return;
    _.forEach(fetchTokens,(items,token) => dispatch('uploadFetchToken',{ token,items }))
  }))
  remote('tokens').then(ref => fetch_ref_where(ref,'tokens').get().then(function(snaps){
    let monitor_tokens = _.map(snaps.docs,'id');
    _(state.data).filter(({ item,monitor,location }) => item === 'tokens' && monitor === 'Yes' && location !== _BRANCH).forEach(function({ id,reference,local_id }){
      if(!_.includes(monitor_tokens,reference)) dispatch('completeToken',{ token_id:local_id,remote_id:id })
    });
  }))
}

export function uploadFetch({ state,commit,dispatch },{ item,data }){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadFetch',{ item,data })
  commit('process'); post('remote',item,data).then(() => commit('process',false))
}
export function uploadFetchToken({ state,commit,dispatch },{ items,token }){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadFetchToken',{ items,token });
  commit('process');
  remote('tokens',token).then(ref => ref.get().then(function(snap){
    let data = snap.data(), token_ref = snap.id; cache[token_ref] = data;
    let stored_items = _(state.data).filter(({ item,reference }) => item === 'token_items' && items.includes(reference)).value();
    let stored_token = _.find(state.data,({ item,reference }) => item === 'tokens' && reference === token_ref);
    if(!stored_token && stored_items.length === 0){
      post('remote','tokens',Object.assign({},data, { reference:token_ref },{ items:_.map(items,ref => Object.assign({},cache[ref],{ reference:ref })) }))
        .then(() => commit('process',false))
    } else {
      if(stored_token){
        let stored_item_refs = _.map(stored_items,'reference');
        _.forEach(items,function(rItemRef){ if(stored_item_refs.includes(rItemRef)) return true;
          post('remote','token_items',Object.assign({},cache[rItemRef],{ reference:rItemRef },{ token:stored_token.local_id,token_reference:token_ref }))
          //Server side not done.. Have to do
        })
      } else {
        console.error('Fetched newly added token and found no tokens inserted here but have its items inserted.. Critical!!');
        console.error('Token Reference: ',token_ref,'Items: ',stored_items);
      }
      commit('process',false)
    }
  }))
}

export function completeToken({ state,rootState,dispatch }, { token_id,remote_id } ){
  let token_items = _.get(rootState.tokens.items,_.toInteger(token_id));
  let un_served_token_items = _(token_items).filter(({ progress }) => state.token_item_progress.indexOf(progress) < state.token_item_progress.indexOf('Served')).map('id').value();
  post('token','served',{ id:un_served_token_items }).then(() => dispatch('deleteRemoteEntry', { id:remote_id }))
}

const remoteUpdater = function(dispatch,item,id,reference,entry,record,cache){
  if(record === false) return dispatch('deleteRemoteEntry', { id:entry }); if(!record) return;
  let rData = cache[reference]; if(!rData) return dispatch({ type:'updateRemoteRecord',item,id,reference,record });
  _.forEach(rData,function(val,key){
    if(_.isEqual(val,record[key])) return true;
    dispatch({ type:'updateRemoteRecord',item,id,reference,record })
    return false;
  })
}

function fetch_ref_where(ref,item){
  ref = ref.where('_location','!=',_BRANCH);
  return (item === 'token_items') ? ref.where('kitchen_item_location','==',_BRANCH).where('progress','==','New') : ref.where('_monitor','==',true)
}
