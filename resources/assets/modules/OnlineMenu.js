import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, StringFormat, uploadString, uploadBytesResumable, uploadBytes, listAll } from "firebase/storage";
import { doc, addDoc, collection, getFirestore, onSnapshot, query, where, updateDoc } from "firebase/firestore";

import firebaseConfig from 'assets/firebase_config'

let BRANCH_CODE = null
import {BRANCH_CODE as BRANCH} from "boot/subscription";
try {
  BRANCH_CODE = BRANCH || _.get(JSON.parse(atob(location.hash.split('/').pop())),'branch')
} catch (e){
  BRANCH_CODE = null
}

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const image_cache = {}

function full_path(reference){ return reference + '/menu/' + BRANCH_CODE + '.json' }
function image_path(reference,id){ return reference + '/menu/' + BRANCH_CODE + '/' + id }
function asset_ref(reference){ return ref(storage,full_path(reference)) }
function image_ref(reference,img_id){ return ref(storage,image_path(reference,img_id)) }


function asset_url(reference){ return new Promise(function (resolve){ getDownloadURL(asset_ref(reference)).then(resolve) }) }
function image_url(reference,img_id){
  if(_.has(image_cache,_.toInteger(img_id))) return Promise.resolve(_.get(image_cache,_.toInteger(img_id)));
  return new Promise(function (resolve,reject){
    getDownloadURL(image_ref(reference,img_id)).then(url => resolve(image_cache[_.toInteger(img_id)] = url)).catch(reject)
  })
}

function upload_assets(reference,assets){
  return new Promise(function (resolve) {
    uploadString(asset_ref(reference),JSON.stringify(assets),StringFormat.RAW,{ contentType:'application/json' })
      .then(() => resolve(assets))
  })
}

function upload_image_progress(reference,id,data){
  return uploadBytesResumable(image_ref(reference,id),data,{ contentType:data.type })
}

function upload_image(reference,id,data){
  return new Promise(function (resolve) {
    uploadBytes(image_ref(reference,id),data).then(({ ref }) => getDownloadURL(ref).then(url => resolve(image_cache[_.toInteger(id)] = url)))
  })
}

function all_images(reference){
  return new Promise(async function(resolve){
    const refs = await listAllRefs(reference);
    Promise.all(_.map(refs,ref => cacheRefUrl(ref))).then(urls => resolve(image_cache))
  })
}

async function listAllRefs(reference){
  const LARS = [], res = await listAll(image_ref(reference,""));
  res.items.forEach(ref => LARS.push(ref))
  return LARS;
}

function cacheRefUrl(ref){
  let img_id = _.toInteger(ref.name)
  if(_.has(image_cache,img_id)) return Promise.resolve(_.get(image_cache,img_id))
  return new Promise(resolve => getDownloadURL(ref).then(url => {
    image_cache[img_id] = url; resolve(url);
  }))
}

function orderPost(reference,branch,params){
  const db = getFirestore(firebaseApp)
  return new Promise(function (resolve) {
    addDoc(collection(db,reference + '/' + 'online_orders/' + branch),params).then(resolve)
  })
}

function orderRef(reference,branch,id){
  const db = getFirestore(firebaseApp)
  return doc(db,`${reference}/online_orders/${branch}/${id}`);
}

function ordersQuery(reference,branch){
  const db = getFirestore(firebaseApp)
  return query(collection(db,`${reference}/online_orders/${branch}`),where('active','==',true))
}

export { asset_url,image_url,upload_assets,upload_image,upload_image_progress,all_images }
export { orderPost,onSnapshot,orderRef,ordersQuery,updateDoc }

