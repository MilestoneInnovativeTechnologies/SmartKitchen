import axios from 'axios'
const jwt = require('jsonwebtoken');

const aInstance = axios.create({
  /*headers:{
    Authorization: `Bearer ${new URLSearchParams(document.location.search.substring(1)).get('token')}`
  },*/
  baseURL: BASE_URL
})

aInstance.interceptors.request.use(function(config){
  config.headers.Authorization = `Bearer ` + jwt.sign(jwt_payload(config.data),jwt_secret())
  config.data = null;
  return config;
})

function jwt_secret(){
  let replacer = _.zipObject(['%','#','$','|','@'],['a','e','i','o','u'])
  return localStorage.getItem('jwt_SECRET').replace(/[\%\#\$\|\@]/g,(t) => replacer[t])
}
function jwt_payload(payload){
  return Object.assign({},jwt.decode(localStorage.getItem('jwt_TOKEN')),payload || {});
}

export default () => {
  global.api = aInstance.post
}
