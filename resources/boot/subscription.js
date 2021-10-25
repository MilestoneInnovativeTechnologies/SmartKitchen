import axios from 'axios'
import {KEY,CODE,TIME} from 'assets/constants'
import {GLOBAL_FEATURES} from "assets/features";
const MD5 = require('js-md5'), _ = require('lodash')

let CODE_VALID = true, CODE_INVALID_REASON = '', CODE_INVALID_DETAIL = '', CODE_INVALID_ERROR_CODE = '';

const SERIAL = localStorage.getItem('serial');

export const KEY_VALID = SERIAL ? (KEY.substr(0,2) + MD5(KEY.substr(0,2) + SERIAL + KEY.substr(-4)).toString() + KEY.substr(-4)) === KEY : false;
// E00
if(!KEY_VALID) { CODE_VALID = false; CODE_INVALID_REASON = "Key is not Valid"; CODE_INVALID_DETAIL = "The provided key string is not arranged as per the expected way"; CODE_INVALID_ERROR_CODE = 'E00' }
/*
The key is composed of branch reg date and serial of the device in a distinct order. The key provided doesn't follows the said order. It may be because of SERIAL have changed and key have not updated.
*/

export default () => {
  // if(SERIAL && !KEY_VALID && typeof _USER === 'undefined' && typeof LOGIN !== 'undefined') return axios.post(LOGIN.replace('login','subscription/key')).then(() => location.reload())
  if(!SERIAL && typeof _USER === 'undefined' && typeof LOGIN !== 'undefined') return axios.post(LOGIN.replace('login','subscription/serial')).then(({ headers }) => localStorage.setItem('serial',headers['sk-serial']) || location.reload())
}

export function KEY_MOVE(){
  return axios.post(LOGIN.replace('login','subscription/key')).then(() => location.reload())
}

// E01
if(CODE_VALID && (!KEY || !CODE || !SERIAL)) { CODE_VALID = false; CODE_INVALID_REASON = "Subscription details missing"; CODE_INVALID_DETAIL = "KEY, CODE or SERIAL is not accessible"; CODE_INVALID_ERROR_CODE = 'E01' }

// E02
if(CODE_VALID && !CODE.indexOf('/')) { CODE_VALID = false; CODE_INVALID_REASON = "Code is corrupted"; CODE_INVALID_DETAIL = "Code have no separator for basic."; CODE_INVALID_ERROR_CODE = 'E02' }
/*
Subscription code must have "/" between feature encrypted section and base64 encoded basic details of company.. If there is no "/" means code is some what got corrupted
*/

const CODE_HAS_BASIC = CODE_VALID && CODE.split('/').length === 2 && !_.isEmpty(CODE.split('/')[0]) && !_.isEmpty(CODE.split('/')[1])
const CODE_BASIC_JSON_STRING = CODE_HAS_BASIC ? atob(CODE.split("/")[1]) : ""
let JSON_STRING_VALID = false;
if(CODE_HAS_BASIC){
  try {
    JSON.parse(CODE_BASIC_JSON_STRING)
    JSON_STRING_VALID = true;
  } catch (e) {
    JSON_STRING_VALID = false;
  }
}

const SUBSCRIPTION_ARRAY = JSON_STRING_VALID ? JSON.parse(CODE_BASIC_JSON_STRING) : [];
export const CLIENT = SUBSCRIPTION_ARRAY['client'];
export const BRANCH = SUBSCRIPTION_ARRAY['branch'];
export const CLIENT_CODE = SUBSCRIPTION_ARRAY['client_code'];
export const BRANCH_CODE = SUBSCRIPTION_ARRAY['branch_code'];
export const EDITION = SUBSCRIPTION_ARRAY['edition'];

function KJDU(){ return CODE_VALID ? CODE.split("/")[0] : '' }
function UEPQ(){ return KJDU().substr(34,5) + "" + KJDU().substr(-5); }
function QWPO(){ return UEPQ() === _.toString(_.toInteger(new Date(SUBSCRIPTION_ARRAY['expiry']).getTime()/1000)) }

// E03
if(!QWPO()) { CODE_VALID = false; CODE_INVALID_REASON = "Code is corrupted"; CODE_INVALID_DETAIL = "Expiry date mismatches"; CODE_INVALID_ERROR_CODE = 'E03' }
/*
The first portion and second portion have timestamp of expiry date.. These are not matching in the provided code..
*/

export const VALID_UPTO = QWPO() ? SUBSCRIPTION_ARRAY['expiry'] : '1999-12-31 23:59:59';
export const VALID_UPTO_UNIX = _.toInteger(new Date(VALID_UPTO).getTime()/1000);
export const VALID_UPTO_REMAINS = VALID_UPTO_UNIX - _.toInteger(TIME);

function IAZP(){ return _.toString(UEPQ()).substr(0,5) }
function LMNP(){ return _.toString(UEPQ()).replace(IAZP(),'') }
function XAAL(){ return KJDU().substr(0,2) }

// E04
if(CODE_VALID && !_.toNumber(XAAL())) { CODE_VALID = false; CODE_INVALID_REASON = "Code is invalid"; CODE_INVALID_DETAIL = "Separator is corrupted"; CODE_INVALID_ERROR_CODE = 'E04' }
/*
The first 2 characters of code is some placing information in numbers, which created from key.. Its is not identified as number in the provided code..
*/

function S0IP(){ return KEY.substr(0,_.toNumber(XAAL())) }
function K090(){ return KEY.replace(S0IP(),'') }

// E05
if(CODE_VALID && (!S0IP() || !K090() || KEY !== (S0IP() + K090())))  { CODE_VALID = false; CODE_INVALID_REASON = "Code and Key not matches"; CODE_INVALID_DETAIL = "Code is not encoded with provided key"; CODE_INVALID_ERROR_CODE = 'E05' }
/*
The code have key arranged in a distinct order.. While segregating and checking with code, it does not matches.
May be code created with key which is not updated in env or this code is not for this client
*/

function AR1P(){ return MD5 }
function RO06(){ return AR1P()(S0IP()) }
function DGV7(){ return AR1P()(K090()) }

const P1 = ['XAAL','RO06','IAZP']
const P2 = ['DGV7','LMNP']

function W93M(){ return P1.reduce((S,F) => S += eval(F+'()'),'') }
function M39W(){ return P2.reduce((S,F) => S += eval(F+'()'),'') }
function KXY3(){ return M39W().length }

function TA00(){ return KJDU().indexOf(W93M()) === 0 }
function TB11(){ return KJDU().split("/")[0].substr(0-KXY3()).indexOf(M39W()) === 0 }
function CFAD(){ return KJDU().replace(W93M(),'').replace(M39W(),'') }

// E06
if(CODE_VALID && (!TA00() || !TB11()))  { CODE_VALID = false; CODE_INVALID_REASON = "Code corrupted"; CODE_INVALID_DETAIL = "Code initial part and final part are not matching"; CODE_INVALID_ERROR_CODE = 'E06' }
/*
The features are hashed and included in between of some key arrangements. The key is extracted from code and checked with the key provided and it fails
May be code created with key which is not updated in env or this code is not for this client
 */

function N8EJ(key){
  let T = 0;
  let M = key.substr(T,1); T++;
  let L = parseInt(M,16), N = [];
  N.push(key.substr(T,L)); T += L;
  let C = key.substr(T,1); T++;
  N.push(key.substr(T,L)); T += L;
  let U = (key.substr(T)).indexOf("g");
  let O = key.substr(T,U); T += U; T++;
  let F = parseInt(O,16);
  let P = key.substr(key.lastIndexOf("h")+1)
  let G = parseInt(P,16);
  let G0 = key.substr(T);
  N.push(G0.substr(0,G0.length - (P+"").length - 1));
  let J = N.join("");
  let V = [], D = [], E = [], W = '';
  for(let i = 0; i < J.length; i+=(parseInt(C)*2)) V.push(J.substr(i,parseInt(C)*2));
  for(let I in V){
    W = V[I];
    let D1 = W.substr(0,C), E1 = W.substr(C);
    if(F > I && G > I) { D.push(D1); E.push(E1); continue }
    if(F > I) { D.push(D1); if(E1 !== "") D.push(E1); continue }
    if(G > I) { E.push(D1); if(E1 !== "") E.push(E1); continue }
  }
  D[F-1] = (D[D.length - 1]).replaceAll("$","");
  E[G-1] = (E[E.length - 1]).replaceAll("$","");
  let A = D.join(""), B = E.join("");
  return [atob(A).split("|"),atob(B).split("|")]
}

// E07
if(CODE_VALID && !CFAD()) { CODE_VALID = false; CODE_INVALID_REASON = "No Features"; CODE_INVALID_DETAIL = "Features are empty"; CODE_INVALID_ERROR_CODE = 'E07' }

const YZB6 = CODE_VALID ? N8EJ(CFAD()) : false

// E08
if(CODE_VALID && (!_.isArray(YZB6) || !_.isArray(YZB6[0]) || !_.isArray(YZB6[1]) || YZB6[0].length !==  YZB6[1].length)){
  CODE_VALID = false; CODE_INVALID_REASON = "Features corrupted"; CODE_INVALID_DETAIL = "Features corrupted"; CODE_INVALID_ERROR_CODE = 'E08'
}

function MJ78(){ return _.zipObject(YZB6[0],YZB6[1]) }

// E09
if(CODE_VALID && !MJ78()){
  CODE_VALID = false; CODE_INVALID_REASON = "Features Corrupted"; CODE_INVALID_DETAIL = "Features compile error"; CODE_INVALID_ERROR_CODE = 'E09'
}

const FEATURES = {}

function DF00(){
  let CF23 = MJ78();
  _.forEach(GLOBAL_FEATURES,function(SET){ FEATURES[SET[0]] = _.get(CF23,SET[0],SET[2]) })
  return true;
}

// E10
if(CODE_VALID && !DF00()){
  CODE_VALID = false; CODE_INVALID_REASON = "Final Stage"; CODE_INVALID_DETAIL = "Final Stage unknown error"; CODE_INVALID_ERROR_CODE = 'E10'
}

const KEY_CHANGE_ERRORS = ['E00','E04','E05','E06','E10']
const KEY_CHANGE_REQUIRED = KEY_CHANGE_ERRORS.includes(CODE_INVALID_ERROR_CODE)
export { CODE_VALID,CODE_INVALID_ERROR_CODE,CODE_INVALID_DETAIL,CODE_INVALID_REASON,KEY_CHANGE_REQUIRED,FEATURES }
