import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, query, where, updateDoc, addDoc, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage,ref,getDownloadURL,deleteObject,uploadBytesResumable } from "firebase/storage";


const { CC71V,DP71V } = require('boot/subscription').FEATURES

import firebaseConfig from 'assets/firebase_config'
export { arrayRemove,onSnapshot,setDoc,getDoc,documentId } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);

let company_defined = null
let FDB = null, RST = null

export function storage_name(fullPath){ return (fullPath || '').replace(((DP71V || '').trim()) + '/','') }

export function remote(item,prop){
  if(CC71V !== 'Yes' || DP71V.trim() === '') return Promise.reject('Remote Kitchen not enabled or no remote reference provided...');
  if(!FDB) FDB = getFirestore(firebaseApp); const reference = DP71V.trim();
  if(!global.enNet) global.enNet = function(){ enableNetwork(FDB) }
  if(!global.disNet) global.disNet = function(){ disableNetwork(FDB) }
  return new Promise(async function (resolve,reject){
    company_defined = (company_defined === null) ? await new Promise(function(resolve){ getDoc(doc(FDB,'companies',reference)).then(snap => resolve(snap.get('name') && snap.get('name') === _COMPANY)) }) : company_defined;
    if(!company_defined) return reject('Company not defined!!');
    if(prop === undefined) return resolve(collection(FDB,reference + '/' + item + '/data'));
    if(prop === 'get' || prop === true) return getDocs(collection(FDB,reference + '/' + item + '/data')).then(resolve).catch(reject)
    if(typeof prop === 'string') return resolve(doc(FDB,reference + '/' + item + '/data/' + prop))
  })
}

export function storage(file,url){
  if(CC71V !== 'Yes' || DP71V.trim() === '') return Promise.reject('Remote Kitchen not enabled or no remote reference provided...');
  const reference = DP71V.trim();
  if(!RST) RST = getStorage(firebaseApp); if(!FDB) FDB = getFirestore(firebaseApp);
  return new Promise(async function (resolve,reject){
    company_defined = (company_defined === null) ? await new Promise(function(resolve){ getDoc(doc(FDB,'companies',reference)).then(snap => resolve(snap.get('name') && snap.get('name') === _COMPANY)) }) : company_defined;
    if(!company_defined) return reject('Company not defined!!');
    let s_ref = ref(RST,reference + '/' + storage_name(file));
    return (!url) ? resolve(s_ref) : getDownloadURL(s_ref).then(resolve).catch(() => reject('File not exists!!'));
  })
}

export function delete_file(file){ return new Promise(resolve => deleteObject(storage(file)).then(resolve)) }
export function upload_file(file,name){ return new Promise(resolve => storage(name).then(ref => resolve(_.bind(uploadBytesResumable,this,ref,file)))) }
export function storage_url(name){ return new Promise(resolve => storage(name,true).then(resolve)) }

export function remote_ref(item,path){ return _.isObject(item) ? Promise.resolve(item) : remote(item,path) }
export function remote_query(item,qry,get){ return new Promise((resolve,reject) => remote_ref(item).then(ref => { let q_ref = query(ref,...(_.map(proper_query(qry),args => where(...args)))); return get ? getDocs(q_ref).then(resolve).catch(reject) : resolve(q_ref) }).catch(reject)) }
export function remote_update(ref,data,data2){ return new Promise((resolve,reject) => _.isObject(ref) ? updateDoc(ref,data).then(resolve).catch(reject) : remote_ref(ref,data).then(u_ref => updateDoc(u_ref,data2).then(resolve).catch(reject))) }
export function remote_add(ref,data){  return new Promise((resolve,reject) => _.isObject(ref) ? addDoc(ref,data).then(resolve).catch(reject) : remote_ref(ref).then(ref => addDoc(ref,data).then(resolve).catch(reject)).catch(reject)) }
export function remote_doc(item,path){ return new Promise((resolve, reject) => _.isObject(item) ? getDoc(item).then(resolve).catch(reject) : remote_ref(item,path).then(d_ref => getDoc(d_ref).then(resolve).catch(reject)).catch(reject)) }

function proper_query(arg){
  if(!_.isArray(arg)) return proper_query([arg]);
  const proper = [];
  _.forEach(arg,function(obj){
    let operand = _.get(obj,'operand','==');
    _.forEach(obj,(value,field) => (field && operand && value !== undefined && field !== 'operand') ? proper.push([field,operand,value]) : null)
  })
  return proper;
}

