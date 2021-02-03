import { date } from 'quasar'

export function h_key(){ return Array.from(arguments).join('-') }

export function o_customer(customer){ return _.assign({},customer,{ label:[customer.name,customer.phone].join(', ') }) }
export function o_customers(customers){ return _(customers).map(o_customer).value() }

export function precision(number,length){ return _.toNumber(number).toFixed(length || 2) }

export function option(obj,r,sep){ let label = _.map(r,k => obj[k]).join(sep || ',');return _.assign({},obj,{ label }); }
export function options(ary,nAry,sep){ return _.map(ary,data => option(data,nAry,sep || ', ')) }

export function matches(obj,keys,text){ return _.includes(_.values(_.pick(obj,keys)).join(' ').toLowerCase(),text.toString().toLowerCase()) }


export function time(datetime,format){ format = format || 'YYYY-MM-DD HH:mm:ss'; return date.formatDate(date.extractDate(datetime,format),'hh:mm A') }
export function is_today(datetime,format){ format = format || 'YYYY-MM-DD HH:mm:ss'; return date.isSameDate(date.extractDate(datetime,format),new Date(),'day') }
