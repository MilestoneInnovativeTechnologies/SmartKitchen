import axios from 'axios'
import {BASE_PATH,MEDIA_PATH,BEARER_VAL_MAX_SIZE} from "assets/constants";
const jwt = require('jsonwebtoken');

const aInstance = axios.create({
  baseURL: BASE_PATH
})

aInstance.interceptors.request.use(function(config){
  if(_.size(JSON.stringify(config.data)) > BEARER_VAL_MAX_SIZE){
    let bearer = {};
    _.forEach(config.data,(val,key) => {
      if(_.size(JSON.stringify(val)) < BEARER_VAL_MAX_SIZE) {
        bearer[key] = val; delete config.data[key];
      }
    })
    config.headers.Authorization = `Bearer ` + jwt.sign(jwt_payload(bearer),jwt_secret())
  } else {
    config.headers.Authorization = `Bearer ` + jwt.sign(jwt_payload(config.data),jwt_secret())
    config.data = null;
  }
  return config;
})

function jwt_secret(){
  let replacer = _.zipObject(['%','#','$','|','@'],['a','e','i','o','u'])
  return localStorage.getItem('jwt_SECRET').replace(/[\%\#\$\|\@]/g,(t) => replacer[t])
}
function jwt_payload(payload){
  return Object.assign({},jwt.decode(localStorage.getItem('jwt_TOKEN')),payload || {});
}

const aMediaInstance = axios.create({
  baseURL: MEDIA_PATH
})

aMediaInstance.interceptors.request.use(function(config){
  let bearer = { model:config.data.model,id:config.data.id }
  config.headers.Authorization = `Bearer ` + jwt.sign(jwt_payload(bearer),jwt_secret());
  delete config.data.model; delete config.data.id
  return config;
})

const aDataInstance = axios.create({
  baseURL: MEDIA_PATH.replace('media','data')
})

export default () => {
  global.api = aInstance.post;
  global.upload = function(model,id,file){
    if(!model || !id || !file) return Promise.reject(!!console.error('Mandatory fields are null'))
    let formData = new FormData();
    formData.append('media',file); formData.append('model',model); formData.append('id',id);
    return aMediaInstance.post('upload',formData)
  };
  global.remove_upload = function(model,id){
    if(!model || !id) return Promise.reject(!!console.error('Mandatory fields are null'))
    let formData = new FormData(); formData.append('model',model); formData.append('id',id);
    return aMediaInstance.post('remove',formData)
  };
  global.import_data = function(params){
    if(!params || !_.every(params)) return Promise.reject(!!console.error('For Import all fields are mandatory!!'))
    return aDataInstance.post('import',params)
  };
  global.file_upload = function(name,file){
    if(!name || !file) return Promise.reject(!!console.error('Mandatory fields are null'))
    let formData = new FormData();
    formData.append('name',name); formData.append('file',file);
    return aMediaInstance.post('file_upload',formData)
  }
  global.file_remove = function(id){
    if(!id) return Promise.reject(!!console.error('Mandatory fields are null'))
    let formData = new FormData(); formData.append('id',id);
    return aMediaInstance.post('file_remove',formData)
  }
}
