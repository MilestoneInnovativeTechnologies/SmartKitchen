import { onSnapshot,remote_add,remote_doc,remote_query,remote_ref,remote_update,setDoc } from "assets/modules/Remote";

const cache = {},deleted = [];

export function init ({ commit,dispatch }) {
  commit('uploadFn',_.bind(dispatch,this,'upload'))
  commit('monitorFn',_.bind(dispatch,this,'monitor'))
  if(typeof _ASSET_Remote !== "undefined") commit('add',_ASSET_Remote);
  if(typeof _COMPANY !== 'undefined') {
    setTimeout(dispatch,5000,'fetch');
    setTimeout(dispatch,10000,'fetchReference');
  }
}
export function upload({ state,commit,dispatch,getters },{ item,data }){
  if(!state.processing) { commit('process');
    let rData = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
    if(rData && (rData.reference || rData.location !== _BRANCH)) return commit('process',false);
    let record = getters[item](data.local_id); if(!record) return commit('process',false);
    record._location = _BRANCH; record._monitor = true; record.extra = _.get(data,'extra'); dispatch('uploadRemoteRecord',{ item,record,id:data.id });
  } else setTimeout(dispatch,state.pending * 1000,'upload',{ item,data });
}

export function uploadRemoteRecord({ commit,dispatch },{ item,record,id }){
  remote_add(item,record).then(function(ref){
    dispatch('addReference', { id,reference:ref.id }).then(function(res){
      commit('process',false); cache[ref.id] = record;
    })
  })
  /*remote(item).then(ref => ref.add(record).then(function(ref){
    dispatch('addReference', { id,reference:ref.id }).then(function(res){
      commit('process',false); cache[ref.id] = record;
    })
  }))*/
}

export function updateRemoteRecord({ commit,dispatch },{ id,item,record,reference }){
  remote_update(item,reference,record).then(() => cache[reference] = record)
  // remote(item,reference).then(ref => ref.update(record).then(() => cache[reference] = record))
}

export function deleteRemoteEntry({ state,commit,dispatch },payload){
  if(!state.processing) { commit('process');
    let id = _.has(payload, 'id') ? parseInt(payload.id) : _.findKey(state.data, ['reference', payload.reference]), rEntry = state.data[id];
    if (!rEntry || !_.has(state.monitoring, rEntry.reference) || deleted.includes(rEntry.id)) return commit('process',false);
    deleted.push(id);
    post('remote', 'remove',{ id }).then(function ({ id }) {
      commit('remove', id); let update = { _monitor:false }; if(rEntry.item === 'tokens') update['progress'] = 'Completed'
      remote_update(rEntry.item, rEntry.reference, update).then(() => commit('process',false))
      // remote(rEntry.item, rEntry.reference).then(ref => ref.update(update).then(() => commit('process',false)))
    })
  } else setTimeout(dispatch,state.pending * 1000,'deleteRemoteEntry',payload);
}

export function addReference({},{ id,reference }){
  return new Promise(function(resolve){
    post('remote','addReference',{ id,reference }).then(resolve)
  })
}

export function monitor({ state:{ monitoring,syncRemoteEdits,syncLocalEdits,data },getters,commit,dispatch }, { id,item,reference,entry }){
  if(!reference || !data[parseInt(entry)]) return;
  // if(_.has(monitoring,reference) && monitoring[reference][0]) monitoring[reference][0]();
  let rData = data[parseInt(entry)], rSource = rData['location'], rMonitor = rData['monitor'];
  if(rMonitor === 'Yes' && (!_.has(monitoring,reference) || !monitoring[reference][0])) {
    if(rSource !== _BRANCH || (rSource === _BRANCH && syncRemoteEdits.includes(item))){
      remote_ref(item,reference).then(ref => commit('monitor',{ reference,unsub:onSnapshot(ref,function(snap){
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
  if(_.has(rData['extra'],'r_ref')) {
    let r_ref = _.get(rData['extra'],'r_ref')
    remote_doc('reference',r_ref).then(function(snap){
      if(!snap.exists) setDoc(snap.ref,getters['read_reference'](id, { status:'init',name:r_ref })) //snap.ref.set(getters['read_reference'](id, { status:'init',name:r_ref }))
      else if(!snap.get('token_reference') || snap.get('token_item_reference')) {
        let { token_reference,token_item_reference } = getters['read_reference'](id);
        if(token_reference && token_item_reference) remote_update(snap.ref,{ token_item_reference,token_reference }).then(() => null);
      }
    })
  }
  let record = getters[item](id); if(!record) return dispatch('deleteRemoteEntry', { id:entry });
  if(rSource === _BRANCH || (rSource !== _BRANCH && syncLocalEdits.includes(item))){
    let listener = _.bind(remoteUpdater,this,dispatch,item,id,reference,entry);
    if(!_.has(monitoring,reference) || !monitoring[reference][1]) {
      if(rMonitor === 'Yes') dispatch({ type:'subscribeWatch_' + item,id,item,reference,entry,listener })
    } else {
      if(rMonitor === 'No') monitoring[reference][1]();
    }
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
    let statusCommit = { status:(data && data.online) ? 'Active' : 'Inactive', users:(data && data.users) ? data.users : [], kitchen:id }
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
  ['kitchens','kitchen_items'].forEach(item => remote_query(item,query_where(item)).then(snaps => snaps.docChanges().forEach(function(change){
    if(change.type !== 'added') return true; let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
    if(!_.find(state.data,({ item:dItem,reference:dRef }) => dItem === item && dRef === reference)) dispatch('uploadFetch',{ item,data:{ ...data,reference } })
  })))
  /*['kitchens','kitchen_items'].forEach(item => remote(item).then(ref => query_where(ref,item).onSnapshot(snaps => snaps.docChanges().forEach(function(change){
    if(change.type !== 'added') return true; let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
    if(!_.find(state.data,({ item:dItem,reference:dRef }) => dItem === item && dRef === reference)) dispatch('uploadFetch',{ item,data:{ ...data,reference } })
  }))));*/
  let fetchTokens = {};
  ['token_items'].forEach(item => remote_query(item,query_where(item)).then(function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type !== 'added') return true;
      let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
    if(!_.has(fetchTokens,data.token)) fetchTokens[data.token] = [];
    fetchTokens[data.token].push(reference);
  });
    if(!_.size(fetchTokens)) return;
    _.forEach(fetchTokens,(items,token) => dispatch('uploadFetchToken',{ token,items }))
  }));

  /*remote('token_items').then(ref => query_where(ref,'token_items').onSnapshot(function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type !== 'added') return true;
      let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
      if(!_.has(fetchTokens,data.token)) fetchTokens[data.token] = [];
      fetchTokens[data.token].push(reference);
    });
    if(!_.size(fetchTokens)) return;
    _.forEach(fetchTokens,(items,token) => dispatch('uploadFetchToken',{ token,items }))
  }))*/

  ['tokens'].forEach(item => remote_query(item,query_where(item)).then(function(snaps){
    let monitor_tokens = _.map(snaps.docs,'id');
    _(state.data).filter(({ item,monitor,location }) => item === 'tokens' && monitor === 'Yes' && location !== _BRANCH).forEach(function({ id,reference,local_id }){
      if(!_.includes(monitor_tokens,reference)) dispatch('completeToken',{ token_id:local_id,remote_id:id })
    });
  }))

  /*remote('tokens').then(ref => query_where(ref,'tokens').get().then(function(snaps){
    let monitor_tokens = _.map(snaps.docs,'id');
    _(state.data).filter(({ item,monitor,location }) => item === 'tokens' && monitor === 'Yes' && location !== _BRANCH).forEach(function({ id,reference,local_id }){
      if(!_.includes(monitor_tokens,reference)) dispatch('completeToken',{ token_id:local_id,remote_id:id })
    });
  }))*/
}

export function fetchReference({ dispatch }){
  remote_query('reference',{ status:'init',kitchen_item_location:_BRANCH }).then(function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type === 'removed') return;
      let doc = change.doc, r_ref = doc.id, data = doc.data(); cache[r_ref] = data;
      if(data.token_reference && data.token_item_reference){
        cache[data.token_item_reference] = _.get(data,['server',1]); cache[data.token_reference] = _.get(data,['server',0]);
        dispatch('processReference',{ r_ref,reference:data,doc_ref:doc.ref })
      }
    })
  })
  /*remote('reference').then(ref => ref.where('status','==','init').where('kitchen_item_location','==',_BRANCH).onSnapshot(function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type === 'removed') return;
      let doc = change.doc, r_ref = doc.id, data = doc.data(); cache[r_ref] = data;
      if(data.token_reference && data.token_item_reference){
        cache[data.token_item_reference] = _.get(data,['server',1]); cache[data.token_reference] = _.get(data,['server',0]);
        dispatch('processReference',{ r_ref,reference:data,doc_ref:doc.ref })
      }
    })
  }))*/
}

export function uploadFetch({ state,commit,dispatch },{ item,data }){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadFetch',{ item,data })
  commit('process'); post('remote',item,data).then(() => commit('process',false))
}
export function uploadFetchToken({ state,commit,dispatch },{ items,token }){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadFetchToken',{ items,token });
  commit('process');
  remote_doc('tokens',token).then(function(snap){
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
  })
}

export function completeToken({ state,rootState,dispatch }, { token_id,remote_id } ){
  let token_items = _.get(rootState.tokens.items,_.toInteger(token_id));
  let un_served_token_items = _(token_items).filter(({ progress }) => state.token_item_progress.indexOf(progress) < state.token_item_progress.indexOf('Served')).map('id').value();
  post('token','served',{ id:un_served_token_items }).then(() => dispatch('deleteRemoteEntry', { id:remote_id }))
}

export function processReference({ state,dispatch,getters },{ r_ref,reference,doc_ref }){
  let read_ref_remote = _.find(state.data,({ item,extra }) => item === 'token_items' && _.get(extra,'r_ref') === r_ref)
  if(read_ref_remote) {
    if(read_ref_remote && !_.get(read_ref_remote,'reference')){
      dispatch('addReference', { id:read_ref_remote.id,reference:reference.token_item_reference });
      let local_token = getters['token_item_token'](read_ref_remote.local_id)
      dispatch('addReference', { id:local_token.id,reference:reference.token_reference });
    }
    if(doc_ref) remote_update(doc_ref,{ status:'fetched' }).then(() => null)
  } else {
    let ref_remote = _.find(state.data,({ item,reference }) => item === 'token_items' && reference === reference.token_item_reference);
    if(ref_remote) post('remote','readReference',{ id:ref_remote.id,reference:r_ref })
    else dispatch('referenceToken',{ r_ref,reference,doc_ref })
  }
}
export function referenceToken({ state },{ r_ref,reference,doc_ref }){
  let cr_data = Object.assign({},reference.server[0], { reference:reference.token_reference },{ items:[{ ...(reference.server[1]),reference:reference.token_item_reference,extra:{ r_ref } }] },{ _location:reference.token_source_location,_monitor:true })
  post('remote','tokens',cr_data).then(function({ items }){
    let kitchen = _.get(_.find(state.data,{ item:'kitchens',reference:reference.server[1].kitchen }),'local_id');
    if(kitchen) _.forEach(items,({ id }) => post('token','accept',{ id,kitchen }))
    if(doc_ref) remote_update(doc_ref,{ status:'fetched' }).then(() => null)
  });
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

function query_where(item){
  let QRY = [{ _location:_BRANCH,operand:'!=' }]
  if(item === 'token_items') QRY.push({ kitchen_item_location:_BRANCH,progress:'New' }); else QRY.push({ _monitor:true })
  return QRY;
}
