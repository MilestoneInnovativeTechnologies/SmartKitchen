
export const TokenProgressSeatStatus = { New:'Just Filled',Processing:'Busy/Processing',Completed:'Busy/Served',Billed:'Billed/Vacant',Paid:'Vacant',Cancelled:'Vacant' }
export const SeatStatusCardColor = { Vacant:'positive','Just Filled':'lime','Busy/Processing':'red-6','Busy/Served':'red-6','Billed/Vacant':'green-13' }
export const OrderTypeRequiredFields = { Dining:['Seating','Waiter','Customer'],'Home Delivery':['Customer','PriceList'],'Take Away':['Customer','PriceList'],Other:[] }
export const OrderTypeRequiredFieldsDB = { Dining:['type','seating','user','customer','price_list'],'Home Delivery':['type','customer','price_list'],'Take Away':['type','customer','price_list'],Other:[] }
