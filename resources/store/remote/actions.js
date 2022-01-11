import {token_item_token} from "src/store/remote/getters";

const { CC71V,DP71V,JX99V,KK99V,SK85W } = require('boot/subscription').FEATURES
import { onSnapshot, remote_add, remote_doc, remote_query, remote_ref, remote_update } from "assets/modules/Remote";
import {BRANCH_CODE} from "boot/subscription";

const cache = {},deleted = [];

export function init ({ commit,dispatch }) {
  if(CC71V === 'Yes' && DP71V.trim() !== ''){
    commit('uploadFn',_.bind(dispatch,this,'upload'))
    commit('monitorFn',_.bind(dispatch,this,'monitor'))
    if(JX99V === 'Yes' && typeof BRANCH_CODE !== "undefined") setTimeout(dispatch,3000,'monitorOrders')
  }
}

export function upload({ state,commit,dispatch,getters },{ item,data }){
  if(CC71V !== 'Yes' || DP71V.trim() === '') return ;
  if(item === 'kitchens' && JX99V === 'Yes') return dispatch('uploadKitchen',data)
  if(item === 'kitchen_items' && JX99V === 'Yes') return dispatch('uploadKitchenItem',data)
  if(item === 'tokens' && KK99V === 'Yes') return dispatch('uploadToken',data)
  if(item === 'token_items' && KK99V === 'Yes') return dispatch('uploadTokenItem',data)
}
export function monitor({ state:{ monitoring,syncRemoteEdits,syncLocalEdits,data },getters,commit,dispatch }, { item,reference,id }){
  if(CC71V !== 'Yes' || DP71V.trim() === '' || !reference || !data[parseInt(id)]) return ;
  if(item === 'kitchens' && KK99V === 'Yes') return dispatch('monitorKitchen',id);
  if(item === 'kitchen_items' && KK99V === 'Yes') return dispatch('monitorKitchenItem',id);
  if(item === 'tokens' && KK99V === 'Yes') return dispatch('monitorToken',id);
  if(item === 'token_items' && (KK99V === 'Yes' || JX99V === 'Yes')) return dispatch('monitorTokenItem',id);
}

export function uploadFirebaseRecord({ commit,dispatch },{ item,record,id }){ return new Promise(resolve => remote_add(item,record).then(ref => dispatch('addReference',{ id,reference:ref.id }).then(() => resolve(cache[ref.id] = record)))) }
export function updateFirebaseRecord({ commit,dispatch },{ item,record,reference }){ return new Promise(resolve => remote_update(item,reference,record).then(() => resolve(cache[reference] = record))) }
export function addReference(ctx,{ id,reference }){ return new Promise(function(resolve){ post('remote','addReference',{ id,reference }).then(resolve) }) }

export function deleteRemoteEntry({ state,commit,dispatch },payload){
  if(!state.processing) { commit('process');
    let id = _.has(payload, 'id') ? parseInt(payload.id) : _.findKey(state.data, ['reference', payload.reference]), rEntry = state.data[id];
    if (!rEntry || !_.has(state.monitoring, rEntry.reference) || deleted.includes(rEntry.id)) return commit('process',false);
    deleted.push(id);
    post('remote', 'remove',{ id }).then(function ({ id }) {
      commit('remove', id);
    }).catch().then(() => commit('process',false))
  } else setTimeout(dispatch,state.pending * 1000,'deleteRemoteEntry',payload);
}




const syncingKitchens = [];
export function uploadKitchen({ state,dispatch,commit,getters },data){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadKitchen',data);
  commit('process'); const item = 'kitchens';
  let store_data = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
  if(store_data && (store_data.reference || store_data.location !== BRANCH_CODE)) return commit('process',false);
  let record = getters[item](data.local_id); if(!record) return commit('process',false);
  record._location = BRANCH_CODE; record._monitor = true;
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id }).then(() => commit('process',false));
}
export function monitorKitchen({ state,commit,rootState,dispatch,getters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingKitchens.includes(remote_record.local_id)) return;
  let kitchen_id = _.toNumber(remote_record.local_id), reference = remote_record.reference, location = remote_record.location;
  if(location === BRANCH_CODE){
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
  if(store_data && (store_data.reference || store_data.location !== BRANCH_CODE)) return commit('process',false);
  let record = getters[item](data.local_id); if(!record) return commit('process',false);
  record._location = BRANCH_CODE; record._monitor = true;
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id }).then(() => commit('process',false));
}
export function monitorKitchenItem({ state,commit,rootState,dispatch,getters,rootGetters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingKitchenItems.includes(remote_record.local_id)) return;
  let kitchen_item_id = _.toNumber(remote_record.local_id), reference = remote_record.reference, location = remote_record.location;
  if(location === BRANCH_CODE){
    let map = rootGetters["kitchens/map"][kitchen_item_id], kitchen_id = map[0], idx = map[1], item_id = _.get(rootState.kitchens.items,[kitchen_id,idx,'item']);
    let watchFn = rootState => Object.assign({},rootState.kitchens.items[kitchen_id][idx],rootState.items.data[item_id])
    let listener = function(kitchen_item){
      if(!kitchen_item) {
        dispatch('deleteRemoteEntry', { id });
        dispatch('updateFirebaseRecord',{ item:'kitchen_items',reference,record:{ _monitor:false } });
        return
      }
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
  if(store_data && (store_data.reference || store_data.location !== BRANCH_CODE)) return commit('process',false);
  let record = getters[item](data.local_id); if(!record) return commit('process',false);
  record._location = BRANCH_CODE; record._monitor = true;
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id }).then(() => commit('process',false));
}
export function monitorToken({ state,commit,rootState,dispatch,getters,rootGetters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingTokens.includes(remote_record.local_id)) return;
  let token_id = _.toNumber(remote_record.local_id), reference = remote_record.reference, location = remote_record.location;
  if(location === BRANCH_CODE){
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
  } else {
    remote_ref('tokens',reference).then(function(ref){
      let unsub = onSnapshot(ref,function(snap){
        if(!snap.exists()) return dispatch('deleteRemoteEntry',{ id });
        let reference = snap.id, fb_data = cache[reference] = snap.data(), store_data = _.find(state.data,{ item:'tokens',reference });
        if(!store_data) return dispatch('deleteRemoteEntry',{ id });
        if(!fb_data._monitor || !fb_data.progress || ['Completed','Billed','Cancelled'].includes(_.get(fb_data,'progress'))) return dispatch('deleteRemoteEntry',{ id:store_data.id });
      })
      commit('monitor',{ reference,unsub }); syncingTokens.push(token_id)
    })
  }
}





const syncingTokenItems = [];
export function uploadTokenItem({ state,dispatch,commit,getters },data){
  if(state.processing) return setTimeout(dispatch,state.pending * 1000,'uploadTokenItem',data);
  commit('process'); const item = 'token_items';
  let store_data = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === parseInt(data.local_id));
  if(store_data && (store_data.reference || store_data.location !== BRANCH_CODE)) {
    if(!store_data.reference && store_data.location !== BRANCH_CODE && !!_.get(store_data,['extra','offline_reference'],null)) dispatch('handleOfflineReference',store_data.id)
    return commit('process',false);
  }
  let record = getters[item](store_data.local_id); if(!record) return commit('process',false);
  record = Object.assign({},record,{ _location:BRANCH_CODE,_monitor:true });
  dispatch('uploadFirebaseRecord',{ item,record,id:data.id }).then(() => commit('process',false));
}
export function monitorTokenItem({ state,commit,rootState,dispatch,getters,rootGetters },id){
  let remote_record = _.get(state.data,id); if(!remote_record || remote_record.monitor !== 'Yes' || syncingTokenItems.includes(remote_record.local_id)) return;
  let reference = remote_record.reference, location = remote_record.location, cache_data = _.get(cache,reference);
  let map = rootGetters["tokens/map"][remote_record.local_id], token_id = map[0], idx = map[1], token_item = rootState.tokens.items[token_id][idx], token_item_id = token_item.id;
  let progresses = state.token_item_progress;
  let watchFn = rootState => Object.assign({},rootState.tokens.items[token_id][idx],_.get(state.data,[id,'extra'],null))
  let listener = function(token_item_data){
    let remote_data = _.find(state.data,{ item:'token_items',local_id:parseInt(token_item_data.id) });
    if(!token_item_data || !remote_data) return dispatch('deleteRemoteEntry', { id });
    const store_data = getters['token_items'](token_item_data.id), update_data = {}
    if(!store_data || ['Served','Cancelled'].includes(store_data.progress)) {
      if(location === BRANCH_CODE) {
        update_data['_monitor'] = false;
        if(['Served','Cancelled'].includes(store_data.progress)) update_data['progress'] = store_data.progress;
        if(store_data.offline_reference) update_data['offline_reference'] = store_data.offline_reference;
      }
      dispatch('deleteRemoteEntry', remote_data);
      if(_.size(update_data)) dispatch('updateFirebaseRecord',{ item:'token_items',reference:remote_data.reference,record:update_data });
      return ;
    }
    let cache_data = _.get(cache,remote_data.reference);
    if(!cache_data || is_same(store_data,cache_data)) return;
    if(progresses.indexOf(cache_data.progress) < progresses.indexOf(store_data.progress)) update_data['progress'] = store_data.progress;
    if(location === BRANCH_CODE && !cache_data.offline_reference && store_data.offline_reference) update_data['offline_reference'] = store_data.offline_reference;
    if(_.size(update_data)) dispatch('updateFirebaseRecord',{ item:'token_items',reference,record:store_data });
  }
  let unwatch = this.watch(watchFn,listener,{ deep:true })
  commit('monitor',{ reference,unwatch }); syncingTokens.push(token_id);
  listener(watchFn(rootState))

  remote_ref('token_items',reference).then(function(ref){
    let unsub = onSnapshot(ref,function(snap){
      if(!snap.exists()) return dispatch('deleteRemoteEntry',{ id });
      let reference = snap.id, cache_data = cache[reference] = snap.data(), remote_data = _.find(state.data,{ item:'token_items',reference }), store_data = getters['token_items'](remote_data.local_id);
      let kitchen_id = _.get(_.find(state.data,{ item:'kitchens',reference:cache_data.kitchen }),'local_id')
      if(cache_data && cache_data.location !== BRANCH_CODE){
        if(store_data && cache_data.offline_reference && !store_data.offline_reference) attach_offline_reference(remote_data.id,cache_data.offline_reference,kitchen_id).then(() => null)
        if(['Served','Cancelled'].includes(cache_data.progress) && store_data) {
          increment_token_progress(state.token_item_next_progress,remote_data.local_id,kitchen_id,cache_data.progress,store_data.progress)
          dispatch('deleteRemoteEntry',remote_data);
        }
      }
      if(!store_data || !cache_data._monitor) dispatch('deleteRemoteEntry',remote_data)
      else {
        if(progresses.indexOf(cache_data.progress) > progresses.indexOf(store_data.progress)) {
          increment_token_progress(state.token_item_next_progress,token_item_id,kitchen_id,cache_data.progress,store_data.progress);
        }
      }
    })
    commit('monitor',{ reference,unsub }); syncingTokenItems.push(token_item_id)
  })
}
const offlineSyncing = {};
export function handleOfflineReference({ state,getters,dispatch },id){
  let store_data = state.data[id]; if(SK85W !== 'Yes' || !store_data || !_.get(store_data,['extra','offline_reference']) || !!store_data.reference) return;
  let offline_reference = _.get(store_data,['extra','offline_reference']);
  remote_query('token_items',{ offline_reference,_monitor:true }).then(qRef => offlineSyncing[offline_reference] = onSnapshot(qRef,qSnaps => qSnaps.docChanges().forEach(function(change){
    if(change.type !== 'added') return; let doc = change.doc, reference = doc.id, fb_data = cache[reference] = doc.data(), offline_reference = _.get(fb_data,'offline_reference'), token_reference = _.get(fb_data,'token');
    let store_data = offline_reference ? _.find(state.data,({ item,extra }) => extra && item === 'token_items' && _.get(extra,'offline_reference') === offline_reference) : null;
    let token_store_data = store_data ? getters['token_item_token'](store_data.local_id) : null;
    if(token_store_data && token_store_data.id)
      dispatch('addReference',{ id:token_store_data.id,reference:token_reference })
    if(store_data && store_data.id)
      dispatch('addReference',{ id:store_data.id,reference }).then(reference => offlineSyncing[offline_reference] ? (offlineSyncing[offline_reference])() : reference);
  })))
}

function increment_token_progress(next_progress,token_item_id,kitchen,target,current){
  if(target === 'Cancelled') return post('token','cancel',{ id:token_item_id,kitchen }).then(null)
  if(current === target || !_.has(next_progress,current)) return; let nxt = _.bind(increment_token_progress,this,next_progress,token_item_id,kitchen,target)
  post('token',next_progress[current],{ id:token_item_id,kitchen }).then(token_item => token_item ? nxt(token_item.progress) : null)
}
function attach_offline_reference(id,offline_reference,kitchen){
  return new Promise(resolve => post('remote','offlineReference',{ reference:offline_reference, id, kitchen }).then(resolve))
}



export function monitorOrders({ state,dispatch }){
  remote_query('token_items',{ kitchen_item_location:BRANCH_CODE,_monitor:true }).then(ref => onSnapshot(ref,qSnaps => qSnaps.docChanges().forEach(function(change){
    if(change.type !== 'added' || !!_.find(state.data,{ item:'token_items',reference:change.doc.id })) return;
    let doc = change.doc, reference = doc.id, data = cache[reference] = doc.data();
    if(_.has(cache,data.token)) dispatch('remoteAdd',{ token:_.get(cache,data.token),item:data,item_reference:reference })
    else remote_doc('tokens',data.token).then(snap => dispatch('remoteAdd',{ token:(cache[data.token] = snap.data()),item:data,item_reference:reference }))
  })))
}
let remoteAddAdding = false, RATmeOut = 0;
export function remoteAdd({ state,rootState,getters,dispatch },args){
  if(remoteAddAdding) return setTimeout(dispatch,2000,'remoteAdd',args);
  remoteAddAdding = true;  RATmeOut = setTimeout(() => remoteAddAdding = false,10000)
  let offline_reference = _.get(args,['item','offline_reference'])
  if(SK85W === 'Yes' && offline_reference && _.find(state.data,({ item,extra }) => extra && item === 'token_items' && _.get(extra,'offline_reference') === offline_reference)) return remoteAddAdding = false;
  dispatch('tokenData',args).then(tokenData => {
    post('remote','tokens',tokenData)
      .then(() => remoteAddAdding = clearTimeout(RATmeOut) && false)
  })
}

export function tokenData({ state,rootState,getters,dispatch },args){
  let location = _.get(args,['token','_location'],_.get(args,['item','_location'])), token_reference = args.item.token, kitchen_item_reference = args.item.kitchen_item_reference;
  let remote_customer_name = settings(_.snakeCase('Remote '+location+' Customer')) || _.get(_.find(rootState.customers.data,{ name:location,status:'Active' }),'name');
  if(!remote_customer_name)
    return new Promise((resolve, reject) => location
      ? post('customer','create',{ name:location,address:'Automatically created while creating token for remote order from branch - ' + location }).then(r => dispatch('tokenData',args).then(resolve))
      : reject('No Location'));
  let customer_id = _.get(_.find(rootState.customers.data,{ name:location,status:'Active' }),'id')
  let PL = settings('price_list','Remote ' + location) || settings('price_list',location) || _.find(rootState.prices.list,{ status:'Active' });
  let price_list = _.get(PL,'id',1)
  let item_id = getters['item_id_of_kitchen_item'](_.get(_.find(state.data,{ item:'kitchen_items',reference:kitchen_item_reference }),'local_id'))
  return (item_id && customer_id && price_list)
    ? Promise.resolve(Object.assign({},args,{ token_reference,price_list,item_id,customer_id,location },_.omit(args,['token','item'])))
    : Promise.reject(null)
}

export function addOffline({ state,dispatch,rootState,getters },{ offline_reference,data,kitchen }){
  let { token_item_reference,token_source_location,token_date,server } = data;
  let store_data_offline = _.find(state.data,{ item:'token_items',extra:{ offline_reference } })
  let store_data_reference = token_item_reference ? _.find(state.data,{ item:'token_items',reference:token_item_reference }) : null
  if(store_data_offline && store_data_reference) return;
  if(store_data_offline && !store_data_reference) return token_item_reference ? dispatch('addReference',{ reference: token_item_reference, id: store_data_offline.id }) : null;
  if(!store_data_offline && store_data_reference) return kitchen ? attach_offline_reference(store_data_offline.id,offline_reference,kitchen) : null;
  if(!store_data_offline && !store_data_reference) {
    let addition = { _monitor:true,_location:token_source_location }
    let token = Object.assign({},server[0],addition), item = Object.assign({},server[1],addition,{ kitchen_id:kitchen });
    dispatch('tokenData',{ token,item,offline_reference }).then(request => post('remote','offline_order',request))
  }
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

