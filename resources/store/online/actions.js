import {onSnapshot, orderRef, ordersQuery, updateDoc} from "assets/modules/OnlineMenu";
import {now} from "assets/helpers";
import {BRANCH_CODE} from "boot/subscription";

const { GH56E,GH75F,JI36A } = require('boot/subscription').FEATURES
export function init ({ dispatch }) {
  if(typeof _USER === "undefined" || GH56E !== 'Yes' || GH75F !== 'Yes') return;
  if(JI36A) dispatch('init_remote')
  else dispatch('local')
}

export function init_remote({ commit,dispatch }){
  if(typeof BRANCH_CODE === "undefined") return;
  onSnapshot(ordersQuery(JI36A,BRANCH_CODE),function(qSnap){
    qSnap.docChanges().forEach(function(change){
      let TYPE =  change.type, ID = change.doc.id, DATA = change.doc.data();

      if(TYPE === 'removed') commit('remove',ID)
      else if(DATA.progress !== 'Paid' && DATA.progress !== 'Cancelled') commit('data',{ id:ID,data:DATA });

      if(TYPE === 'added' && DATA.token && DATA.progress !== 'Paid' && DATA.progress !== 'Cancelled') dispatch('subWatch',{ id:DATA.token,reference:ID })

      if(DATA.progress === 'Paid' && (now() - DATA.time) > 1800) dispatch('remove',{ reference:ID,progress:'Paid' })
      if(DATA.progress === 'Cancelled') dispatch('remove',{ reference:ID,progress:'Cancelled' })
    })
  })
}

export function update({ dispatch },params) {
  if (GH56E !== 'Yes' || GH75F !== 'Yes' || typeof BRANCH_CODE === 'undefined') return;
  if (JI36A) dispatch('update_remote', params)
  else dispatch('update')
}

export function update_remote(ctx,{ id,data }){
  updateDoc(orderRef(JI36A,BRANCH_CODE,id),data)
}

export function create({ dispatch },{ reference,params }){
  post('token','create',params).then(({ id }) => {
    dispatch('subWatch',{ id,reference}).then(() => dispatch('token',{ reference,token:id }))
  })
}

export function remove(ctx,{ reference,progress }){
  if (GH56E !== 'Yes' || GH75F !== 'Yes' || typeof BRANCH_CODE === 'undefined') return;
  if (JI36A) updateDoc(orderRef(JI36A,BRANCH_CODE,reference),{ progress:progress || 'Cancelled',active:false })
}

export function subWatch({ dispatch,rootState,rootGetters },{ id,reference }){
  const store = this;
  if(!_.has(rootState.tokens.data,id)) return Promise.resolve(dispatch('remove',{ reference }) || true)
  return new Promise(function (resolve){
    store.watch(rootState => _.assign({},_.get(rootState.tokens.data,id),{ items:_.get(rootState.tokens.items,id,[]) },{ progress:rootGetters['tokens/progress'][id] }),function(data){
      dispatch('update',{ id:reference,data:token2online(data,rootState.items.data,rootGetters['prices/items'][data.price_list]) });
      resolve(true)
    },{ deep:true,immediate:true })
  })
}

export function token({ state,dispatch },{ token,reference }){
  let data = _.assign({},state.data[reference],{ token })
  dispatch('update',{ id:reference,data })
}

function token2online({ id,items:tItems,progress },items,prices){
  let online = { token:id,progress,items:[] };
  _.forEach(tItems,({ progress:iProgress,item,quantity }) => {
      online.items.push({ progress:iProgress,item,quantity,rate:prices[item],name:_.get(items,[item,'name']) })
  })
  return online;
}
