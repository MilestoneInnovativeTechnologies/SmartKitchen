import axios from 'axios'
const jwt = require('jsonwebtoken');

const aInstance = axios.create({
  /*headers:{
    Authorization: `Bearer ${new URLSearchParams(document.location.search.substring(1)).get('token')}`
  },*/
  baseURL: BASE_URL
})

const maxData = 1024

aInstance.interceptors.request.use(function(config){
  if(_.size(JSON.stringify(config.data)) > maxData){
    let bearer = {};
    _.forEach(config.data,(val,key) => {
      if(_.size(JSON.stringify(val)) < maxData) {
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
  baseURL: MEDIA_ROOT
})


aMediaInstance.interceptors.request.use(function(config){
  let bearer = { model:config.data.model,id:config.data.id }
  config.headers.Authorization = `Bearer ` + jwt.sign(jwt_payload(bearer),jwt_secret());
  delete config.data.model; delete config.data.id
  return config;
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
}
