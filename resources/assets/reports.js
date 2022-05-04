export const masters = [
  ['Daily Token Summary', 'day_token_summary'],//0
  ['Sales Summary', 'day_sale_summary'],//1
  ['Sales By Type', 'sales_by_type'],//2
  ['Sales Summary by Type', 'sales_summary_by_type'],//3
  ['Sales Count by Item', 'sales_count_by_item'],//4
  ['Item Wise Sales Summary', 'item_wise_sale_summary'],//5
  ['Kitchen Stock', 'kitchen_stock'],//6
  ['Bill Summary', 'bill_summary'],//7
  ['Bill Summary - Tax', 'bill_summary_tax'],//8
  ['Bill Summary - Nature', 'bill_summary_tax_nature'],//9
  ['Tax Bill Details', 'tax_bill_detail'],//10
  ['Payments', 'payments'],//11
  ['Payments By Type', 'payments_by_type'],//12
  ['Tax Details', 'tax_details'],//13
  ['Orders by Waiter', 'orders_by_waiter'],//14
  ['User Orders', 'user_orders'],//15
  ['Kitchen Processing', 'kitchen_processing'],//16
  ['Item Processing', 'item_processing'],//17
  ['Chef Performance', 'chef_performance'],//18
  ['Orders by Receptionist', 'orders_by_receptionist'],//19
  ['Orders by Delivery Boy', 'orders_by_delivery_boy'],//20
  ['Bill Summary with Customer', 'bill_summary_customer'],//21
  ['Bill Summary - User Type', 'bill_summary_user_type'],//22
  ['Bill by User', 'bill_by_user'],//23
  ['Delivery Boy Bills', 'delivery_boy_bills'],//24
  ['Remote Orders by Customer', 'remote_orders_by_customer'],//25
  ['Remote Order Summary by Customer', 'remote_order_summary_by_customer'],//26
  ['Day Wise Remote Order Summary', 'day_wise_remote_order_summary'],//27
  ['Day Wise Remote Order Delivery', 'day_wise_remote_order_delivery'],//28
  ['Remote Order by Item', 'remote_order_by_item'],//29
  ['Remote Order Summary by Item', 'remote_order_summary_by_item'],//30
  ['Bill Payments', 'bill_payments'],//31
  ['Payments by Type', 'bill_payments_by_type'],//32
  ['Bill by Customer', 'bill_by_customer'],//33
  ['Unpaid Bills', 'bills_unpaid'],//34
  ['Unpaid Bills by Customer', 'bills_unpaid_customer'],//35
  ['Unpaid Bills by Type', 'bills_unpaid_type'],//36
  ['Unpaid User Bills', 'bills_unpaid_user'],//37
  ['Group Wise Order Summary', 'group_wise_order_summary'],//38
  ['Group Items Order Summary', 'group_items_order_summary'],//39
  ['Payment Type Summary', 'payment_type_summary'],//40
  ['Customer Payments', 'customer_payments'],//41
  ['Customer Payments by Mode', 'customer_payment_type'],//42
]
export const reports = {
  Token: [0,14,19,20,15],
  Sales: [1,2,3,4,5],
  Bill: [7,8,9,10,21,22,23,24,33,31,34,35,36,37],
  Payments: [31,32,40,41,42,34,35,36,37],
  Remote: [25,26,27,28,29,30],
  Tax: [8,9,10,13],
  Kitchen: [6,16],
  Stock: [6],
  Item: [4,5,17,39],
  'Item Group': [38,39],
  Waiter: [14,15],
  Chef: [18],
  Receptionist: [19],
  'Delivery Boy': [20,24],
  Customer: [21,33,41,42,25,26,35],
  Performance: [14,15,16,17,18]
}
export const subscription_reports = {
  KJ30I: [20,24],
  KK99V: [25,26,27,28,29,30]
}
