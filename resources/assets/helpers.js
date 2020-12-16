export function h_key(){ return Array.from(arguments).join('-') }

export function o_customer(customer){ return _.assign({},customer,{ label:[customer.name,customer.phone].join(', ') }) }
export function o_customers(customers){ return _(customers).map(o_customer).value() }

export function precision(number,length){ return _.toNumber(number).toFixed(length || 2) }

export function option(obj,r,sep){ let label = _.map(r,k => obj[k]).join(sep || ',');return _.assign({},obj,{ label }); }
export function options(ary,nAry,sep){ return _.map(ary,data => option(data,nAry,sep || ', ')) }
