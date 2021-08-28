import {is_future_day, is_today, is_tomorrow, is_yesterday} from "assets/helpers";
import { images } from "assets/default_images";

export const OrderTypes = ['Dining','Home Delivery','Take Away','Sale','Remote','Other']
export const PaymentsTypes = ['Cash','Card','Wallet','Credit']
export const TokenProgressSeatStatus = { New:'Just Filled',Processing:'Busy/Processing',Completed:'Busy/Served',Billed:'Billed/Vacant',Paid:'Vacant',Cancelled:'Vacant' }
export const SeatStatusCardColor = { Vacant:'positive','Just Filled':'lime','Busy/Processing':'red-6','Busy/Served':'red-6','Billed/Vacant':'green-13' }
export const OrderTypeRequiredFields = { Dining:['Seating','Waiter','Customer'],'Home Delivery':['Customer','PriceList'],'Take Away':['Customer','PriceList'],Other:[] }
export const OrderTypeRequiredFieldsDB = { Dining:['type','seating','user','customer','price_list'],'Home Delivery':['type','customer','price_list','user'],'Take Away':['type','customer','price_list'],Other:[] }
export const TokenItemProgressColor = { New:'red', Accepted:'green-6', Processing:'purple-9', Completed:'positive', Served:'primary', Cancelled:'brown' }
export const TokenProgressColor = { New:'red', Processing:'purple-9', Completed: 'green-6', Billed: 'positive', Cancelled: 'grey-2' }
export const DiningTypeColor = { Dining:'purple', 'Home Delivery':'orange', 'Take Away':'green', Remote:'cyan' }
export const KitchenTokensDisplayMode = ['Token','Progress','Item']
export const TokenDeliveryReadableChecks = [[is_today,'Today','primary'],[is_tomorrow,'Tomorrow','info'],[is_future_day,'Within 2 Days','teal',2],[is_future_day,'Within 7 Days','purple-6',7],[is_future_day,'Within 30 Days','brown-6',30],[is_future_day,'After 1 month','brown-9',180],[is_yesterday,'Yesterday','pink-6'],[null,'Delayed','red-6']]
export const Archives = ['Tokens','Orders','Sales','Remote','Bills','Payments']
export const NoCustomer = { id:0, name:'No Customer Selected', image:images.no, phone:'', address:'', email:'' }
