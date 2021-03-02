const { formatDate,extractDate,isSameDate } = require('quasar').date

export function h_key(){ return Array.from(arguments).join('-') }

export function o_customer(customer){ return _.assign({},customer,{ label:[customer.name,customer.phone].join(', ') }) }
export function o_customers(customers){ return _(customers).map(o_customer).value() }

export function precision(number,length){ return _.toNumber(number).toFixed(length || 2) }

export function option(obj,r,sep){ let label = _.map(r,k => obj[k]).join(sep || ',');return _.assign({},obj,{ label }); }
export function options(ary,nAry,sep){ return _.map(ary,data => option(data,nAry,sep || ', ')) }

export function matches(obj,keys,text){ return _.includes(_.values(_.pick(obj,keys)).join(' ').toLowerCase(),text.toString().toLowerCase()) }

export function now(){ return _.toInteger(new Date().getTime()/1000) }
export function time(datetime,format){ format = format || 'YYYY-MM-DD HH:mm:ss'; return formatDate(extractDate(datetime,format),'hh:mm A') }
export function is_today(datetime,format){ format = format || 'YYYY-MM-DD HH:mm:ss'; return isSameDate(extractDate(datetime,format),new Date(),'day') }

export function crypt(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
}

export function image(file){
  return [MEDIA_ROOT,file].join('/');
}
