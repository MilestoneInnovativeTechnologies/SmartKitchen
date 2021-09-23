import { initializeApp } from "firebase/app";
import { getFirestore,collection,doc,addDoc,getDoc,getDocs,setDoc,runTransaction } from "firebase/firestore";
import { getStorage,ref,getDownloadURL,uploadBytes,uploadString,StringFormat } from "firebase/storage";
import firebaseConfig from 'assets/firebase_config'

const { JI36A } = require('./subscription').FEATURES

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db,storage }

function fbs(item){
  if(!JI36A) return Promise.reject('No Firebase Reference');
  if(!db) return Promise.reject('No DB Initialized');
  return new Promise(async function (resolve,reject){
    resolve(collection(db,JI36A + '/' + item + '/data'))
  })
}

export { fbs,doc,addDoc,getDoc,getDocs,setDoc,runTransaction }

function fst(item){
  return ref(storage,JI36A + '/' + item)
}

export { fst,ref,getDownloadURL,uploadBytes,uploadString,StringFormat }
