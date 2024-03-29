import { MEDIA_PATH } from './constants'
const { formatDate,extractDate,isSameDate,startOfDate,subtractFromDate,addToDate,isBetweenDates,getDateDiff } = require('quasar').date
const AttentionAudio = new Audio(MEDIA_PATH + '/attention.mp3')
const TapAudio = new Audio(MEDIA_PATH + '/tap.mp3')

export function attention(){ AttentionAudio.play() }
export function tap(){ TapAudio.play() }

export function h_key(){ return _.kebabCase(Array.from(arguments).join(' ')) }

export function template_obj(temp,obj){ return temp.replace(/\[(\w+)\]/g,(fT,tT) => obj?.[tT] || '') }

export function o_customer(customer,temp){ customer['label'] = template_obj(temp,customer); return customer }
export function o_customers(customers,temp){ let o_customers = _(customers).map(customer => o_customer(customer,temp)).value(); o_customers.unshift(o_customer({ id:0,name:'New Customer',phone:'000' },temp)); return o_customers; }

export function precision(number,length){ return _.toNumber(number).toFixed(length || 2) }

export function option(obj,r,sep){ let label = _.map(r,k => obj[k]).join(sep || ',');return _.assign({},obj,{ label }); }
export function options(ary,nAry,sep){ return _.map(ary,data => option(data,nAry,sep || ', ')) }

export function matches(obj,keys,text){ return _.includes(_.values(_.pick(obj,keys)).join(' ').toLowerCase(),text.toString().toLowerCase()) }

export function now(){ return _.toInteger(new Date().getTime()/1000) }
export function tomorrow(format){ return to_format(format || 'YYYY-MM-DD',addToDate(new Date(),{ days:1 })) }
export function next_month(format){ return to_format(format || 'YYYY-MM-DD',addToDate(new Date(),{ days:30 })) }
export function common_format(format){ return format || 'YYYY-MM-DD HH:mm:ss' }
export function extract_date(datetime,format){ format = common_format(format); return extractDate(datetime,format) }
export function time(datetime,format,sec){ format = common_format(format); return formatDate(extractDate(datetime,format),sec ? 'hh:mm:ss A' : 'hh:mm A') }
export function human_date(datetime,time){ return formatDate(extractDate(datetime,common_format()),time ? 'ddd, D/MM - hh:mm A' : 'ddd, D/MM') }
export function human_date2(datetime){ return formatDate(extractDate(datetime,common_format()),'ddd, D/MMM/YYYY') }
export function day_start(){
  if(!settings('day_start')) return startOfDate(new Date(),'day')
  let dayStart = settings('day_start'), date = extractDate(formatDate(new Date(),'YYYY-MM-DD ') + dayStart,'YYYY-MM-DD HH:mm:ss');
  return (date > new Date()) ? subtractFromDate(date,{ days:1 }) : date;
}
export function day_end(){ return addToDate(day_start(),{ seconds:86399 }) }
export function is_today(datetime,format){ format = common_format(format); return isBetweenDates(extractDate(datetime,format),day_start(),day_end(),{ inclusiveFrom:true,inclusiveTo:true,onlyDate:false }) }
export function is_yesterday(datetime,format){ format = common_format(format); return isBetweenDates(extractDate(datetime,format),subtractFromDate(day_start(),{ days:1 }),day_start(),{ inclusiveFrom:true,inclusiveTo:false,onlyDate:false }) }
export function is_tomorrow(datetime,format){ format = common_format(format); return isBetweenDates(extractDate(datetime,format),day_end(),addToDate(day_end(),{ days:1 }),{ inclusiveFrom:false,inclusiveTo:true,onlyDate:false }) }
export function is_past_day(datetime,days){ return isBetweenDates(extract_date(datetime),subtractFromDate(day_start(),{ days:days || 8 }),day_start(),{ inclusiveFrom:true,inclusiveTo:false,onlyDate:false }) }
export function is_future_day(datetime,days){ return isBetweenDates(extract_date(datetime),day_end(),addToDate(day_end(),{ days:days || 8 }),{ inclusiveFrom:false,inclusiveTo:true,onlyDate:false }) }
export function is_date_same(d1,d2,unit,format){ format = common_format(format); return isSameDate(extractDate(d1,format),extractDate(d2,format),(unit || 'day')) }
export function to_format(format,date){ format = common_format(format); return formatDate(date || new Date,format) }
export function range(from,to) {
  if (_.has(from, 'from')) {
    to = _.get(from, 'to', formatDate(day_end(),"YYYY-MM-DD HH:mm:ss"))
    from = _.get(from, 'from',formatDate(day_start(),"YYYY-MM-DD HH:mm:ss"))
  }
  let time_start = settings('day_start');
  if(time_start) {
    from =  subtractFromDate(day_start(),{ days:getDateDiff(day_start(),extractDate(from,'YYYY-MM-DD'),'days') });
    to = subtractFromDate(day_end(),{ days:getDateDiff(day_end(),extractDate(to,'YYYY-MM-DD'),'days') });
  } else {
    from = startOfDate(from || to_format(), 'day');
    to = subtractFromDate(startOfDate(to || addToDate(to_format(), {days: 1}), 'day'), {seconds: 1})
  }
  return { from: to_format('YYYY-MM-DD HH:mm:ss',from),to: to_format('YYYY-MM-DD HH:mm:ss',to) }
}
export function is_between(date,from,to){ return isBetweenDates(extract_date(date),extract_date(from),extract_date(to),{ inclusiveFrom:true,inclusiveTo:true,onlyDate:false }) }

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

export function image(file){ return [MEDIA_PATH,file].join('/') }
export function is_email_valid(email){ return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) }
export function to_html(obj){ return _.map(_.toPairs(obj),pairs => pairs.join(': ')).join(`<br />`) }
export function is_period(keyCode){ return [229,110,190].includes(keyCode) }
export function active(records){ return _.filter(records,({ status }) => status === 'Active') }
export function of_ids(records,ids){ return _.filter(records,({ id }) => ids.includes(id)) }

export function popup_width(width){ return new Object({ width:(width || 360)+'px','max-width':'90vw' }) }
export function settings_boolean(value){ return _.includes([0,'0','No','no','NO',false,'false','False','FALSE',null,'of','off','Of','Off','OFF','OF'],value) ? false : (_.includes([1,'1','Yes','yes','YES',true,'true','True','TRUE','on','On','ON'],value) ? true : undefined) }
export function id_keyed(records){ return _(records).mapKeys(record => _.toInteger(record.id)).value() }
