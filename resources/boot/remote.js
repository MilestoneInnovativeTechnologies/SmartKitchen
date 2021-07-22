import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const ref = localStorage.getItem('remote_reference');
let rdb, rst;

if (ref && ref.trim() !== '') {
  firebase.initializeApp({
    apiKey: "AIzaSyCdUrQDI8jHDJHkvzpevAyX9WUlK7R4wXI",
    authDomain: "smart-kitchen-server-test.firebaseapp.com",
    projectId: "smart-kitchen-server-test",
    storageBucket: "smart-kitchen-server-test.appspot.com",
    messagingSenderId: "502388406873",
    appId: "1:502388406873:web:21b1896ec46833711d0f48",
    measurementId: "G-C916FMYVX9"
  });

  rdb = firebase.firestore();
  rst = firebase.storage();

  global.db = rdb;
  global.st = rst;
  global.storage = storage;

}

let company = null;

function remote(item,prop){
  if(!ref || ref.trim() === '') return Promise.reject('No Ref');
  if(!rdb) return Promise.reject('No RDB');
  return new Promise(async function (resolve,reject){
    let valid = (company === null) ? await new Promise(function(resolve){ rdb.collection('companies').doc(ref).get().then(snap => resolve(snap.get('name') && snap.get('name') === _COMPANY)) }) : company;
    if(!valid) return reject('No company');
    if(prop === undefined) return resolve(rdb.collection(ref + '/' + item + '/data'));
    if(prop === 'get' || prop === true) return rdb.collection(ref + '/' + item + '/data').get().then(resolve)
    if(typeof prop === 'string') return resolve(rdb.doc(ref + '/' + item + '/data/' + prop))
  })
}

function storage(file,url){
  if(!ref || ref.trim() === '') return Promise.reject('No Ref');
  if(!rst) return Promise.reject('No Remote Storage');
  return new Promise(async function (resolve,reject){
    let valid = (company === null) ? await new Promise(function(resolve){ rdb.collection('companies').doc(ref).get().then(snap => resolve(snap.get('name') && snap.get('name') === _COMPANY)) }) : company;
    if(!valid) return reject('No company');
    let reference = rst.ref(ref + '/' + storage_name(file));
    return (!url) ? resolve(reference) : reference.getDownloadURL().then(resolve).catch(() => reject('File not exists!!'));
  })
}

function storage_name(fullPath){ return fullPath.replace(ref + '/','') }

export { remote,storage,storage_name }
