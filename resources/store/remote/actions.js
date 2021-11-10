const { CC71V,DP71V,JX99V,KK99V } = require('boot/subscription').FEATURES
import { onSnapshot, remote_add, remote_doc, remote_query, remote_ref, remote_update, setDoc } from "assets/modules/Remote";

const cache = {},deleted = [];

export function init ({ commit,dispatch }) {
  if(CC71V === 'Yes' && DP71V.trim() !== ''){
    commit('uploadFn',_.bind(dispatch,this,'upload'))
    commit('monitorFn',_.bind(dispatch,this,'monitor'))
    if(JX99V === 'Yes' && typeof _BRANCH !== "undefined") setTimeout(dispatch,3000,'monitorOrders')
  }
  // return;
  // if(typeof _COMPANY !== 'undefined') {
  //   setTimeout(dispatch,5000,'fetch');
  //   setTimeout(dispatch,10000,'fetchReference');
  // }
}

export function uploadFirebaseRecord({ commit,dispatch },{ item,record,id }){ remote_add(item,record).then(ref => dispatch('addReference',{ id,reference:ref.id }).then(() => { commit('process',false); cache[ref.id] = record })) }
export function updateFirebaseRecord({ commit,dispatch },{ item,record,reference }){ remote_update(item,reference,record).then(() => cache[reference] = record) }

const syncingKitchens = [];
export function uploadKitchen({ state,dispatch,commit,getters },data){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadKitchen',data);
  commit('process'); const item = 'kitchens';
  let store_data = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
  if(store_data && (store_data.reference || store_data.location !== _BRANCH)) return commit('process',false);
  let record = getters[item](data.local_id); if(!record) return commit('process',false);
  record._location = _BRANCH; record._monitor = true;
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id });
}
export function monitorKitchen({ state,commit,rootState,dispatch,getters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingKitchens.includes(remote_record.local_id)) return;
  let kitchen_id = _.toNumber(remote_record.local_id), reference = remote_record.reference, location = remote_record.location;
  if(location === _BRANCH){
    let watchFn = rootState => Object.assign({},rootState.kitchens.data[kitchen_id],rootState.kitchens.status[kitchen_id])
    let listener = function(kitchens){
      if(!kitchens) return dispatch('deleteRemoteEntry', { id });
      const kitchen = getters['kitchens'](kitchens.kitchen);
      if(cache[reference] && is_same(kitchen,cache[reference])) return;
      dispatch('updateFirebaseRecord',{ item:'kitchens',reference,record:kitchen });
    }
    let unwatch = this.watch(watchFn,listener,{ deep:true })
    commit('monitor',{ reference,unwatch }); syncingKitchens.push(kitchen_id);
    listener(watchFn(rootState))
  } else {
    remote_ref('kitchens',reference).then(function(ref){
      let unsub = onSnapshot(ref,function(snap){
        if(!snap.exists()) return dispatch('deleteRemoteEntry',{ id });
        let cache_data = cache[reference] = snap.data(), store_data = getters['kitchens'](kitchen_id)
        if(!store_data) return dispatch('deleteRemoteEntry',{ id });
        if(is_same(cache_data,store_data)) return;
        _.forEach(['name','auto_accept','cloud'],function(key){
          if(_.has(cache_data,key) && _.has(store_data,key) && _.isEqual(store_data[key],cache_data[key])) return true;
          post('kitchen','manage',Object.assign({},_.pick(cache_data,state.picks.kitchens),{ id:kitchen_id }))
          return false;
        })
        _.forEach(['users','status'],function(key){
          if(_.has(cache_data,key) && _.has(store_data,key) && _.isEqual(store_data[key],cache_data[key])) return true;
          let statusCommit = { status:(cache_data && cache_data.online) ? 'Active' : 'Inactive', users:(cache_data && cache_data.users) ? cache_data.users : [], kitchen:kitchen_id }
          setTimeout(commit,2000,'kitchens/status',statusCommit,{ root:true });
          return false;
        })
      })
      commit('monitor',{ reference,unsub }); syncingKitchens.push(kitchen_id)
    })
  }
}



const syncingKitchenItems = [];
export function uploadKitchenItem({ state,dispatch,commit,getters },data){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadKitchenItem',data);
  commit('process'); const item = 'kitchen_items';
  let store_data = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
  if(store_data && (store_data.reference || store_data.location !== _BRANCH)) return commit('process',false);
  let record = getters[item](data.local_id); if(!record) return commit('process',false);
  record._location = _BRANCH; record._monitor = true;
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id });
}
export function monitorKitchenItem({ state,commit,rootState,dispatch,getters,rootGetters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingKitchenItems.includes(remote_record.local_id)) return;
  let kitchen_item_id = _.toNumber(remote_record.local_id), reference = remote_record.reference, location = remote_record.location;
  if(location === _BRANCH){
    let map = rootGetters["kitchens/map"][kitchen_item_id], kitchen_id = map[0], idx = map[1], item_id = _.get(rootState.kitchens.items,[kitchen_id,idx,'item']);
    let watchFn = rootState => Object.assign({},rootState.kitchens.items[kitchen_id][idx],rootState.items.data[item_id])
    let listener = function(kitchen_item){
      if(!kitchen_item) return dispatch('deleteRemoteEntry', { id });
      const kitchen_item_data = getters['kitchen_items'](kitchen_item_id);
      if(cache[reference] && is_same(kitchen_item_data,cache[reference])) return;
      dispatch('updateFirebaseRecord',{ item:'kitchen_items',reference,record:kitchen_item_data });
    }
    let unwatch = this.watch(watchFn,listener,{ deep:true })
    commit('monitor',{ reference,unwatch }); syncingKitchenItems.push(kitchen_item_id);
    listener(watchFn(rootState))
  } else {
    remote_ref('kitchen_items',reference).then(function(ref){
      let unsub = onSnapshot(ref,function(snap){
        if(!snap.exists()) return dispatch('deleteRemoteEntry',{ id });
        let cache_data = cache[reference] = snap.data(), store_data = getters['kitchen_items'](kitchen_item_id)
        if(!store_data) return dispatch('deleteRemoteEntry',{ id });
        if(is_same(store_data,cache_data)) return;
        let item_master_updates = _.pick(cache_data,['status','detail']);
        if(!is_same(item_master_updates,store_data)){
          let map = rootGetters["kitchens/map"][kitchen_item_id], kitchen_id = map[0], idx = map[1], item_id = _.get(rootState.kitchens.items,[kitchen_id,idx,'item']);
          post('item','manage',Object.assign({},item_master_updates,{ id:item_id })).then()
        }
        let kitchen_item_updates = _.pick(cache_data,state.picks.kitchen_items);
        if(!is_same(kitchen_item_updates,store_data)){
          post('kitchen','item',Object.assign({},kitchen_item_updates,{ id:kitchen_item_id })).then()
        }
      })
      commit('monitor',{ reference,unsub }); syncingKitchenItems.push(kitchen_item_id)
    })
  }
}





const syncingTokens = [];
export function uploadToken({ state,dispatch,commit,getters },data){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadToken',data);
  commit('process'); const item = 'tokens';
  let store_data = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
  if(store_data && (store_data.reference || store_data.location !== _BRANCH)) return commit('process',false);
  let record = getters[item](data.local_id); if(!record) return commit('process',false);
  record._location = _BRANCH; record._monitor = true;
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id });
}
export function monitorToken({ state,commit,rootState,dispatch,getters,rootGetters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingTokens.includes(remote_record.local_id)) return;
  let token_id = _.toNumber(remote_record.local_id), reference = remote_record.reference, location = remote_record.location;
  if(location === _BRANCH){
    let watchFn = rootState => rootState.tokens.data[token_id]
    let listener = function(token_data){
      if(!token_data) return dispatch('deleteRemoteEntry', { id });
      const store_data = getters['tokens'](token_data.id);
      if(!store_data || ['Billed','Cancelled'].includes(store_data.progress)) {
        dispatch('deleteRemoteEntry', { id });
        dispatch('updateFirebaseRecord',{ item:'tokens',reference,record:Object.assign({},store_data,{ _monitor:false }) });
        return;
      }
      if(cache[reference] && is_same(store_data,cache[reference])) return;
      dispatch('updateFirebaseRecord',{ item:'tokens',reference,record:store_data });
    }
    let unwatch = this.watch(watchFn,listener,{ deep:true })
    commit('monitor',{ reference,unwatch }); syncingTokens.push(token_id);
    listener(watchFn(rootState))
  }
}





const syncingTokenItems = [];
export function uploadTokenItem({ state,dispatch,commit,getters },data){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadTokenItem',data);
  commit('process'); const item = 'token_items';
  let store_data = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
  if(store_data && (store_data.reference || store_data.location !== _BRANCH)) return commit('process',false);
  let record = getters[item](data.local_id); if(!record) return commit('process',false);
  record._location = _BRANCH; record._monitor = true;
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id });
}
export function monitorTokenItem({ state,commit,rootState,dispatch,getters,rootGetters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingTokenItems.includes(remote_record.local_id)) return;
  let reference = remote_record.reference;//, location = remote_record.location;
  let map = rootGetters["tokens/map"][remote_record.local_id], token_id = map[0], idx = map[1], token_item = rootState.tokens.items[token_id][idx], token_item_id = token_item.id;
  let progresses = state.token_item_progress;
  let kitchen_id = token_item.kitchen ? _.get(_.find(state.data,{ item:'tokens',local_id:token_id }),'local_id') : '';
  let watchFn = rootState => rootState.tokens.items[token_id][idx]
  let listener = function(token_item_data){
    if(!token_item_data) return dispatch('deleteRemoteEntry', { id });
    const store_data = getters['token_items'](token_item_data.id);
    if(!store_data || ['Served','Cancelled'].includes(store_data.progress)) {
      dispatch('deleteRemoteEntry', { id });
      dispatch('updateFirebaseRecord',{ item:'token_items',reference,record:Object.assign({},store_data,{ _monitor:false }) });
      return ;
    }
    if(cache[reference] && is_same(store_data,cache[reference])) return;
    if(cache[reference] && progresses.indexOf(cache[reference].progress) > progresses.indexOf(store_data.progress)) return;
    dispatch('updateFirebaseRecord',{ item:'token_items',reference,record:store_data });
  }
  let unwatch = this.watch(watchFn,listener,{ deep:true })
  commit('monitor',{ reference,unwatch }); syncingTokens.push(token_id);
  listener(watchFn(rootState))

  remote_ref('token_items',reference).then(function(ref){
    let unsub = onSnapshot(ref,function(snap){
      if(!snap.exists()) return dispatch('deleteRemoteEntry',{ id });
      let cache_data = cache[reference] = snap.data(), store_data = getters['token_items'](token_item_id)
      if(['Served','Cancelled'].includes(cache_data.progress) && cache_data._location !== _BRANCH){
        if(store_data) {
          if(!kitchen_id) kitchen_id = _.get(_.find(state.data,{ item:'kitchens',reference:cache_data.kitchen }),'local_id')
          increment_token_progress(state.token_item_next_progress,token_item_id,kitchen_id,cache_data.progress,store_data.progress)
        }
        dispatch('deleteRemoteEntry',{ id });
        return;
      }
      if(store_data){
        if(progresses.indexOf(cache_data.progress) > progresses.indexOf(store_data.progress)) {
          if(!kitchen_id) kitchen_id = _.get(_.find(state.data,{ item:'kitchens',reference:cache_data.kitchen }),'local_id')
          increment_token_progress(state.token_item_next_progress,token_item_id,kitchen_id,cache_data.progress,store_data.progress);
        }
      } else dispatch('deleteRemoteEntry',{ id });
    })
    commit('monitor',{ reference,unsub }); syncingTokenItems.push(token_item_id)
  })
}

function increment_token_progress(next_progress,token_item_id,kitchen,target,current){
  if(target === 'Cancelled') return post('token','cancel',{ id:token_item_id,kitchen }).then(null)
  if(current === target || !_.has(next_progress,current)) return; let nxt = _.bind(increment_token_progress,this,next_progress,token_item_id,kitchen,target)
  post('token',next_progress[current],{ id:token_item_id,kitchen }).then(token_item => token_item ? nxt(token_item.progress) : null)
}



export function monitorOrders({ state,dispatch }){
  remote_query('token_items',{ kitchen_item_location:_BRANCH,_monitor:true }).then(ref => onSnapshot(ref,qSnaps => qSnaps.docChanges().forEach(function(change){
    if(change.type !== 'added' || !!_.find(state.data,{ item:'token_items',reference:change.doc.id })) return;
    let doc = change.doc, reference = doc.id, data = cache[reference] = doc.data();
    if(_.has(cache,data.token)) dispatch('remoteAdd',{ token:_.get(cache,data.token),item:data,item_reference:reference })
    else remote_doc('tokens',data.token).then(snap => dispatch('remoteAdd',{ token:(cache[data.token] = snap.data()),item:data,item_reference:reference }))
  })))
}
let remoteAddAdding = false;
export function remoteAdd({ state,rootState,getters,dispatch },args){
  if(remoteAddAdding) return setTimeout(dispatch,2000,'remoteAdd',args);
  let location = args.token._location, token_reference = args.item.token, kitchen_item_reference = args.item.kitchen_item_reference;
  let remote_customer_name = settings(_.snakeCase('Remote '+location+' Customer')) || _.get(_.find(rootState.customers.data,{ name:location,status:'Active' }),'name');
  if(!remote_customer_name) return location ? post('customer','create',{ name:location,address:'Automatically created while creating token for remote order from branch - ' + location }).then(r => dispatch('remoteAdd',args)) : console.warn('NO LOCATION',args)
  let customer_id = _.get(_.find(rootState.customers.data,{ name:location,status:'Active' }),'id')
  let PL = settings('price_list','Remote ' + location) || settings('price_list',location) || _.find(rootState.prices.list,{ status:'Active' });
  let price_list = _.get(PL,'id',1)
  let item_id = getters['item_id_of_kitchen_item'](_.get(_.find(state.data,{ item:'kitchen_items',reference:kitchen_item_reference }),'local_id'))
  if(item_id && customer_id && price_list) {
    remoteAddAdding = true; let tmtOut = setTimeout(() => remoteAddAdding = false,10000)
    post('remote','tokens',Object.assign({},args,{ token_reference,price_list,item_id,customer_id,location }))
      .then(() => remoteAddAdding = clearTimeout(tmtOut) && false)
  }
}









export function upload({ state,commit,dispatch,getters },{ item,data }){
  if(CC71V !== 'Yes' || DP71V.trim() === '') return ;
  if(item === 'kitchens' && JX99V === 'Yes') return dispatch('uploadKitchen',data)
  if(item === 'kitchen_items' && JX99V === 'Yes') return dispatch('uploadKitchenItem',data)
  if(item === 'tokens' && KK99V === 'Yes') return dispatch('uploadToken',data)
  if(item === 'token_items' && KK99V === 'Yes') return dispatch('uploadTokenItem',data)

  // if(!state.processing) { commit('process');
  //   let store_data = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
  //   if(store_data && (store_data.reference || store_data.location !== _BRANCH)) return commit('process',false);
  //   let record = getters[item](data.local_id); if(!record) return commit('process',false);
  //   record._location = _BRANCH; record._monitor = true; record.extra = _.get(data,'extra'); dispatch('uploadRemoteRecord',{ item,record,id:data.id });
  // } else setTimeout(dispatch,state.pending * 1000,'upload',{ item,data });
}

export function uploadRemoteRecord({ commit,dispatch },{ item,record,id }){
  remote_add(item,record).then(function(ref){
    dispatch('addReference', { id,reference:ref.id }).then(function(res){
      commit('process',false); cache[ref.id] = record;
    })
  })
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

export function monitor({ state:{ monitoring,syncRemoteEdits,syncLocalEdits,data },getters,commit,dispatch }, { item_id,item,reference,id }){
  if(CC71V !== 'Yes' || DP71V.trim() === '' || !reference || !data[parseInt(id)]) return ;
  if(item === 'kitchens' && KK99V === 'Yes') return dispatch('monitorKitchen',id);
  if(item === 'kitchen_items' && KK99V === 'Yes') return dispatch('monitorKitchenItem',id);
  if(item === 'tokens' && KK99V === 'Yes') return dispatch('monitorToken',id);
  if(item === 'token_items' && (KK99V === 'Yes' || JX99V === 'Yes')) return dispatch('monitorTokenItem',id);
  return console.log(item,item_id,reference)
  // if(_.has(monitoring,reference) && monitoring[reference][0]) monitoring[reference][0]();
  let rData = data[parseInt(id)], rSource = rData['location'], rMonitor = rData['monitor'];
  if(rMonitor === 'Yes' && (!_.has(monitoring,reference) || !monitoring[reference][0])) {
    if(rSource !== _BRANCH || (rSource === _BRANCH && syncRemoteEdits.includes(item))){
      remote_ref(item,reference).then(ref => commit('monitor',{ reference,unsub:onSnapshot(ref,function(snap){
          let rData = snap.data(), lData = getters[item](item_id); cache[reference] = rData; if(lData === false) return dispatch('deleteRemoteEntry',{ id });
          _.forEach(lData,function(val,key){
            if(key.substr(0,1) === "_" || (_.has(rData,key) && _.isEqual(val,rData[key]))) return true;
            dispatch({ type:'remoteUpdate_'+item,data:rData,id:item_id });
            return false;
          })
          if(rData._monitor === false && ['tokens','token_items'].includes(item)) dispatch({ type:'remoteUpdate_'+item,data:rData,id:item_id });
        }) }))
    }
  }
  if(_.has(rData['extra'],'r_ref')) {
    let r_ref = _.get(rData['extra'],'r_ref')
    remote_doc('reference',r_ref).then(function(snap){
      if(!snap.exists) setDoc(snap.ref,getters['read_reference'](item_id, { status:'init',name:r_ref })) //snap.ref.set(getters['read_reference'](id, { status:'init',name:r_ref }))
      else if(!snap.get('token_reference') || snap.get('token_item_reference')) {
        let { token_reference,token_item_reference } = getters['read_reference'](item_id);
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
  ['kitchens','kitchen_items'].forEach(item => remote_query(item,query_where(item)).then(ref => onSnapshot(ref,function(snaps){
    snaps.docChanges().forEach(function(change){
      if(change.type !== 'added') return true; let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
      if(!_.find(state.data,({ item:dItem,reference:dRef }) => dItem === item && dRef === reference)) dispatch('uploadFetch',{ item,data:{ ...data,reference } })
    })
  })))
  let fetchTokens = {};
  ['token_items'].forEach(item => remote_query(item,query_where(item)).then(ref => onSnapshot(ref,function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type !== 'added') return true;
      let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
    if(!_.has(fetchTokens,data.token)) fetchTokens[data.token] = [];
    fetchTokens[data.token].push(reference);
  });
    if(!_.size(fetchTokens)) return;
    _.forEach(fetchTokens,(items,token) => dispatch('uploadFetchToken',{ token,items }))
  })));

  /*remote('token_items').then(ref => query_where(ref,'token_items').onSnapshot(function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type !== 'added') return true;
      let doc = change.doc, reference = doc.id, data = doc.data(); cache[reference] = data;
      if(!_.has(fetchTokens,data.token)) fetchTokens[data.token] = [];
      fetchTokens[data.token].push(reference);
    });
    if(!_.size(fetchTokens)) return;
    _.forEach(fetchTokens,(items,token) => dispatch('uploadFetchToken',{ token,items }))
  }))*/

  ['tokens'].forEach(item => remote_query(item,query_where(item)).then(ref => onSnapshot(ref,function(snaps){
    let monitor_tokens = _.map(snaps.docs,'id');
    _(state.data).filter(({ item,monitor,location }) => item === 'tokens' && monitor === 'Yes' && location !== _BRANCH).forEach(function({ id,reference,local_id }){
      if(!_.includes(monitor_tokens,reference)) dispatch('completeToken',{ token_id:local_id,remote_id:id })
    });
  })))

  /*remote('tokens').then(ref => query_where(ref,'tokens').get().then(function(snaps){
    let monitor_tokens = _.map(snaps.docs,'id');
    _(state.data).filter(({ item,monitor,location }) => item === 'tokens' && monitor === 'Yes' && location !== _BRANCH).forEach(function({ id,reference,local_id }){
      if(!_.includes(monitor_tokens,reference)) dispatch('completeToken',{ token_id:local_id,remote_id:id })
    });
  }))*/
}

export function fetchReference({ dispatch }){
  remote_query('reference',{ status:'init',kitchen_item_location:_BRANCH }).then(ref => onSnapshot(ref,function(snaps){
    snaps.docChanges().forEach(function(change){ if(change.type === 'removed') return;
      let doc = change.doc, r_ref = doc.id, data = doc.data(); cache[r_ref] = data;
      if(data.token_reference && data.token_item_reference){
        cache[data.token_item_reference] = _.get(data,['server',1]); cache[data.token_reference] = _.get(data,['server',0]);
        dispatch('processReference',{ r_ref,reference:data,doc_ref:doc.ref })
      }
    })
  }))
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

function is_same(d1,d2){
  if(_.isArray(d1) && _.isArray(d2)){
    if(d1.length !== d2.length) return false;
    for(let x in d1) if(!is_same(d1[x],d2[x])) return false;
    return true;
  } else {
    if(_.isObject(d1) && _.isObject(d2)){
      for(let x in d1) if(!is_same(d1[x],d2[x])) return false;
      return true;
    } else {
      return d1 === d2
    }
  }
}
