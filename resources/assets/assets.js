
export const TokenProgressSeatStatus = { New:'Just Filled',Processing:'Busy/Processing',Completed:'Busy/Served',Billed:'Billed/Vacant',Paid:'Vacant',Cancelled:'Vacant' }
export const SeatStatusCardColor = { Vacant:'positive','Just Filled':'lime','Busy/Processing':'red-6','Busy/Served':'red-6','Billed/Vacant':'green-13' }
export const OrderTypeRequiredFields = { Dining:['Seating','Waiter','Customer'],'Home Delivery':['Customer','PriceList'],'Take Away':['Customer','PriceList'],Other:[] }
export const OrderTypeRequiredFieldsDB = { Dining:['type','seating','user','customer','price_list'],'Home Delivery':['type','customer','price_list'],'Take Away':['type','customer','price_list'],Other:[] }
export const TokenItemProgressColor = { New:'red', Accepted:'green-6', Processing:'purple-9' }
export const TokenProgressColor = { New:'red', Processing:'purple-9', Completed: 'green-6', Billed: 'positive', Cancelled: 'grey-2' }
export const DiningTypeColor = { Dining:'purple', 'Home Delivery':'orange', 'Take Away':'green' }
