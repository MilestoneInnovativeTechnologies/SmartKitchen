const CryptoJS = require('crypto-js')

global.CryptoJS = CryptoJS;

const GLOBAL_FEATURES = [["GH56E","Yes/No","No"],["GH75F","Yes/No","No"],["JI36A","Detail",null]]
const KEY = localStorage.getItem('key')
const CODE = localStorage.getItem('code')
const SERIAL = localStorage.getItem('serial')

let CODE_VALID = true, CODE_INVALID_REASON = '', CODE_INVALID_DETAIL = '', CODE_INVALID_ERROR_CODE = '';

// E00
if(CODE_VALID && (!KEY || !CODE || !SERIAL)) { CODE_VALID = false; CODE_INVALID_REASON = "Subscription details missing"; CODE_INVALID_DETAIL = "KEY, CODE or SERIAL is not accessible"; CODE_INVALID_ERROR_CODE = 'E00' }

export const KEY_VALID = (KEY.substr(0,2) + CryptoJS.MD5(KEY.substr(0,2) + SERIAL + KEY.substr(-4)).toString() + KEY.substr(-4)) === KEY
const CODE_HAS_BASIC = CODE.split('/').length === 2 && !_.isEmpty(CODE.split('/')[0]) && !_.isEmpty(CODE.split('/')[1])
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
export const SUBSCRIPTION_NAME = SUBSCRIPTION_ARRAY['sub'];

function KJDU(){ return CODE.split("/")[0] }
function UEPQ(){ return KJDU().substr(34,5) + "" + KJDU().substr(-5); }
function QWPO(){ return UEPQ() === _.toString(_.toInteger(new Date(SUBSCRIPTION_ARRAY['end']).getTime()/1000)) }

export const VALID_UPTO = QWPO() ? SUBSCRIPTION_ARRAY['end'] : '1999-12-31 23:59:59';
export const VALID_UPTO_UNIX = _.toInteger(new Date(VALID_UPTO).getTime()/1000);
export const VALID_UPTO_REMAINS = VALID_UPTO_UNIX - _.toInteger(_TIME);

function IAZP(){ return _.toString(UEPQ()).substr(0,5) }
function LMNP(){ return _.toString(UEPQ()).replace(IAZP(),'') }
function XAAL(){ return KJDU().substr(0,2) }

// E01
if(CODE_VALID && !_.toNumber(XAAL())) { CODE_VALID = false; CODE_INVALID_REASON = "CODE is invalid"; CODE_INVALID_DETAIL = "Separator is corrupted"; CODE_INVALID_ERROR_CODE = 'E01' }

function S0IP(){ return KEY.substr(0,_.toNumber(XAAL())) }
function K090(){ return KEY.replace(S0IP(),'') }

// E02
if(CODE_VALID && (!S0IP() || !K090() || KEY !== (S0IP() + K090())))  { CODE_VALID = false; CODE_INVALID_REASON = "CODE and KEY not matches"; CODE_INVALID_DETAIL = "Code is not encoded with provided key"; CODE_INVALID_ERROR_CODE = 'E02' }

function AR1P(){ return CryptoJS.MD5 }
function RO06(){ return AR1P()(S0IP()).toString() }
function DGV7(){ return AR1P()(K090()).toString() }

const P1 = ['XAAL','RO06','IAZP']
const P2 = ['DGV7','LMNP']

function W93M(){ return P1.reduce((S,F) => S += eval(F+'()'),'') }
function M39W(){ return P2.reduce((S,F) => S += eval(F+'()'),'') }
function KXY3(){ return M39W().length }

function TA00(){ return KJDU().indexOf(W93M()) === 0 }
function TB11(){ return KJDU().split("/")[0].substr(0-KXY3()).indexOf(M39W()) === 0 }
function CFAD(){ return KJDU().replace(W93M(),'').replace(M39W(),'') }

// E03
if(CODE_VALID && (!TA00() || !TB11()))  { CODE_VALID = false; CODE_INVALID_REASON = "CODE corrupted"; CODE_INVALID_DETAIL = "Code initial part and final part are not matching"; CODE_INVALID_ERROR_CODE = 'E03' }

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
  N.push(key.substring(key.lastIndexOf('g')+1,key.lastIndexOf('h')));
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

// E04
if(CODE_VALID && !CFAD()) {
  CODE_VALID = false; CODE_INVALID_REASON = "No Features"; CODE_INVALID_DETAIL = "Features are empty"; CODE_INVALID_ERROR_CODE = 'E04'
}

function YZB6(){ return N8EJ(CFAD()) }

// E05
if(CODE_VALID && (!_.isArray(YZB6()) || !_.isArray(YZB6()[0]) || !_.isArray(YZB6()[1]) || YZB6()[0].length !==  YZB6()[1].length)){
  CODE_VALID = false; CODE_INVALID_REASON = "Features corrupted"; CODE_INVALID_DETAIL = "Features corrupted"; CODE_INVALID_ERROR_CODE = 'E05'
}

function MJ78(){ return _.zipObject(YZB6()[0],YZB6()[1]) }

// E06
if(CODE_VALID && !MJ78()){
  CODE_VALID = false; CODE_INVALID_REASON = "Features Corrupted"; CODE_INVALID_DETAIL = "Features compile error"; CODE_INVALID_ERROR_CODE = 'E06'
}

const FEATURES = {}

function DF00(){
  let CF23 = MJ78();
  _.forEach(GLOBAL_FEATURES,function(SET){ FEATURES[SET[0]] = _.get(CF23,SET[0],SET[2]) })
  return true;
}

// E07
if(CODE_VALID && !DF00()){
  CODE_VALID = false; CODE_INVALID_REASON = "Final Stage"; CODE_INVALID_DETAIL = "Final Stage unknown error"; CODE_INVALID_ERROR_CODE = 'E07'
}

export { CODE_VALID,CODE_INVALID_ERROR_CODE,CODE_INVALID_DETAIL,CODE_INVALID_REASON,FEATURES }
