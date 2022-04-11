const { map,set,merge,get,forEach } = require('lodash')

const layout_master = {
  Login: { path:'/', component: () => import('layouts/LoginLayout.vue') },
  Waiter: { path:'/', component: () => import('layouts/WaiterLayout.vue') },
  Chef: { path:'/', component: () => import('layouts/ChefLayout.vue') },
  Receptionist: { path:'/', component: () => import('layouts/ReceptionistLayout.vue') },
  Administrator: { path:'/', component: () => import('layouts/AdministratorLayout.vue') },
  'Delivery Boy': { path:'/', component: () => import('layouts/DeliveryBoyLayout.vue') },
  Menu: { path:'/:reference/:online/:code', component: () => import('layouts/MenuLayout.vue'), props: true, meta:{ online_menu:true } },
}

const layout_child = {
  Login: ['login_index'],
  Waiter: ['waiter_index','waiter_menu','orders','order_new','waiter_bills',
    'orders_online','customers'
  ],
  Chef: ['chef_index','chef_kitchens','kitchen_items','kitchen_stocks','tokens'],
  Receptionist: ['receptionist_index','seat_status','receptionist_bills','seat_status_order','receptionist_orders','order_new','orders_remote','orders_remote_new','sale','take_away',
    'archives','archive_payments','archive_bills','archive_remote','archive_orders','archive_sales','archive_tokens',
    'orders_online','customers'
  ],
  Administrator: ['report_index','administration_index',
    'master_customer','master_prop','master_item','master_group','master_kitchen','master_kitchen_items','master_menu','master_price_list','master_seating','master_tax','image_customer','image_item','image_kitchen','image_seating','image_user','master_user','master_settings',
    'day_token_summary','day_sale_summary','sales_by_type','sales_summary_by_type','sales_count_by_item','item_wise_sale_summary','kitchen_stock','bill_summary','payments','payments_by_type',
    'bill_summary_tax','bill_summary_tax_nature','tax_bill_detail','tax_details','bill_summary_customer','bill_summary_user_type','bill_by_user','delivery_boy_bills',
    'orders_by_waiter','orders_by_receptionist','orders_by_delivery_boy','user_orders', 'kitchen_processing','item_processing','chef_performance',
    'data_import','menu_qr_codes','menu_sync_data','remote_kitchen_manage',
    'remote_orders_by_customer','remote_order_summary_by_customer','day_wise_remote_order_summary','day_wise_remote_order_delivery','remote_order_by_item','remote_order_summary_by_item',
    'bill_by_customer','bill_payments','bill_payments_by_type','bills_unpaid','bills_unpaid_customer','bills_unpaid_type','bills_unpaid_user'
  ],
  'Delivery Boy': ['delivery_boy_index','delivery_boy_orders','order_new','customers','delivery_boy_completed','delivery_boy_payments'],
  Menu: ['menu_index'],
}

const route_master = {
  login_index: { name:'login_index', path:'/', component: () => import('pages/Login/Index'), meta:{ title:'' } },
  waiter_index: { name:'waiter_index', path:'/', component: () => import('pages/Waiter/Index'), meta:{ title:'' } },
  waiter_menu: { name:'waiter_menu', path:'/menu', component: () => import('pages/Waiter/Menu'), meta:{ title:'Menu' } },
  orders: { name:'orders', path:'/orders', component: () => import('pages/Order/DiningOrders'), meta:{ title:'Order' } },
  order_new: { name:'order_new', path:'/order/new', component: () => import('pages/Order/New'), props:true, meta:{ title:'New Order',back:true,footer:false } },
  waiter_bills: { name:'waiter_bills', path:'/bills', component: () => import('pages/Bill/Waiter'), meta:{ title:'Bills' } },
  chef_index: { name:'chef_index', path:'/', component: () => import('pages/Chef/Index'), meta:{ title:'' } },
  chef_kitchens: { name:'chef_kitchens', path:'/kitchens', component: () => import('pages/Chef/ChefKitchens'), meta:{ title:'Kitchens' } },
  kitchen_items: { name:'kitchen_items', path:'/kitchen/:id/items', component: () => import('pages/Kitchen/KitchenItems'), props:true, meta:{ title:'Items',back:true,footer:false } },
  kitchen_stocks: { name:'kitchen_stocks', path:'/kitchen/:id/stocks', component: () => import('pages/Kitchen/KitchenStocks'), props:true, meta:{ title:'Stock',back:true,footer:false } },
  tokens: { name:'tokens', path:'/tokens', component: () => import('pages/Token/Tokens'), meta:{ title:'Tokens',footer:false } },
  receptionist_index: { name:'receptionist_index', path:'/', component: () => import('pages/Receptionist/Index'), meta:{ title:'' } },
  receptionist_bills: { name:'bills', path:'/bills', component: () => import('pages/Bill/Receptionist'), meta:{ title:'Bills' } },
  seat_status: { name:'seat_status', path:'/seating/status', component: () => import('pages/Seating/SeatingStatus'), meta:{ title:'Seat Status' } },
  seat_status_order: { name:'seat_status_order', path:'/seating/status/order', component: () => import('pages/Order/CommonNew'), props: true, meta:{ title:'New Order' } },
  receptionist_orders: { name:'orders', path:'/orders', component: () => import('pages/Order/ReceptionistOrders'), meta:{ title:'Orders' } },
  administration_index: { name:'administration_index', path:'/administration', component: () => import('pages/Administrator/AdministrationIndex'), meta:{ title:null } },
  master_customer: { name:'master_customer', path:'/settings/customers', component: () => import('pages/Administrator/Master/AdministratorMasterCustomer'), meta:{ title:'Customers' } },
  master_prop: { name:'master_prop', path:'/settings/items/props', component: () => import('pages/Administrator/Master/AdministratorMasterProp'), meta:{ title:'Item Props' } },
  master_item: { name:'master_item', path:'/settings/items', component: () => import('pages/Administrator/Master/AdministratorMasterItem'), meta:{ title:'Items' } },
  master_group: { name:'master_group', path:'/settings/groups', component: () => import('pages/Administrator/Master/AdministratorMasterGroup'), meta:{ title:'Item Groups' } },
  master_kitchen: { name:'master_kitchen', path:'/settings/kitchens', component: () => import('pages/Administrator/Master/AdministratorMasterKitchen'), meta:{ title:'Kitchens' } },
  master_kitchen_items: { name:'master_kitchen_items', path:'/settings/kitchen_items', component: () => import('pages/Administrator/Master/AdministratorMasterKitchenItems'), meta:{ title:'Kitchen Items' } },
  master_menu: { name:'master_menu', path:'/settings/menus', component: () => import('pages/Administrator/Master/AdministratorMasterMenu'), meta:{ title:'Menu' } },
  master_price_list: { name:'master_price_list', path:'/settings/price_lists', component: () => import('pages/Administrator/Master/AdministratorMasterPriceList'), meta:{ title:'Price Lists' } },
  master_seating: { name:'master_seating', path:'/settings/seating', component: () => import('pages/Administrator/Master/AdministratorMasterSeating'), meta:{ title:'Seating' } },
  master_tax: { name:'master_tax', path:'/settings/taxes', component: () => import('pages/Administrator/Master/AdministratorMasterTax'), meta:{ title:'Taxes' } },
  master_user: { name:'master_user', path:'/settings/user/:role', component: () => import('pages/Administrator/Master/AdministratorMasterUser'), props:true, meta:{ title:null } },
  master_settings: { name:'master_settings', path:'/settings/settings', component: () => import('pages/Administrator/Master/AdministratorMasterSettings'), meta:{ title:'Settings' } },
  image_customer: { name:'image_customer', path:'/image/customers', component: () => import('pages/Administrator/Image/AdministratorImageCustomer'), meta:{ title:'Customers' } },
  image_item: { name:'image_item', path:'/image/items', component: () => import('pages/Administrator/Image/AdministratorImageItem'), meta:{ title:'Items' } },
  image_kitchen: { name:'image_kitchen', path:'/image/kitchens', component: () => import('pages/Administrator/Image/AdministratorImageKitchen'), meta:{ title:'Kitchens' } },
  image_seating: { name:'image_seating', path:'/image/seating', component: () => import('pages/Administrator/Image/AdministratorImageSeating'), meta:{ title:'Seating' } },
  image_user: { name:'image_user', path:'/image/users', component: () => import('pages/Administrator/Image/AdministratorImageUser'), meta:{ title:'Users' } },
  report_index: { name:'report_index', path:'/', component: () => import('pages/Report/ReportIndex'), meta:{ title:null } },
  day_token_summary: { name:'day_token_summary', path:'/report/day/token/summary', component: () => import('pages/Report/Reports/ReportDayTokenSummary'), meta:{ title:'Day Token Summary',controls:['date'] } },
  day_sale_summary: { name:'day_sale_summary', path:'/report/day/sale/summary', component: () => import('pages/Report/Reports/ReportDaySaleSummary'), meta:{ title:'Day Sales Summary',controls:['date'] } },
  sales_by_type: { name:'sales_by_type', path:'/report/sales/type', component: () => import('pages/Report/Reports/ReportSalesByType'), meta:{ title:'Sales by Type',controls:['range'] } },
  sales_summary_by_type: { name:'sales_summary_by_type', path:'/report/sales/type/summary', component: () => import('pages/Report/Reports/ReportSalesSummaryByType'), meta:{ title:'Sales Summary By Type',controls:['sale_type','range'] } },
  sales_count_by_item: { name:'sales_count_by_item', path:'/report/sales/count/item', component: () => import('pages/Report/Reports/ReportSalesCountItemWise'), meta:{ title:'Sales Count on Item Wise',controls:['date'] } },
  item_wise_sale_summary: { name:'item_wise_sale_summary', path:'/report/sales/item/summary', component: () => import('pages/Report/Reports/ReportItemWiseSaleSummary'), meta:{ title:'Item Wise Sale Summary',controls:['item','range'] } },
  kitchen_stock: { name:'kitchen_stock', path:'/report/kitchen/stock', component: () => import('pages/Report/Reports/ReportKitchenStock'), meta:{ title:'Kitchen Stock',controls:['kitchen'] } },
  bill_summary: { name:'bill_summary', path:'/report/bill/summary', component: () => import('pages/Report/Reports/ReportBillSummary'), meta:{ title:'Bill Summary',controls:['range'] } },
  payments: { name:'payments', path:'/report/payments', component: () => import('pages/Report/Reports/ReportPayments'), meta:{ title:'Bill Summary',controls:['range'] } },
  payments_by_type: { name:'payments_by_type', path:'/report/payments/type', component: () => import('pages/Report/Reports/ReportPaymentsByType'), meta:{ title:'Payments By Type',controls:['range'] } },
  bill_summary_tax: { name:'bill_summary_tax', path:'/report/bill/tax/summary', component: () => import('pages/Report/Reports/ReportBillSummaryTax'), meta:{ title:'Bill Summary with Tax',controls:['range'] } },
  bill_summary_tax_nature: { name:'bill_summary_tax_nature', path:'/report/bill/tax/nature', component: () => import('pages/Report/Reports/ReportBillSummaryTaxNature'), meta:{ title:'Bill Summary by Tax Nature',controls:['tax_nature','range'] } },
  bill_summary_customer: { name:'bill_summary_customer', path:'/report/bill/customer', component: () => import('pages/Report/Reports/ReportBillSummaryCustomer'), meta:{ title:'Bill Summary Customer',controls:['range'] } },
  bill_summary_user_type: { name:'bill_summary_user_type', path:'/report/bill/user_type', component: () => import('pages/Report/Reports/ReportBillSummaryUserType'), meta:{ title:'Bill Summary by User Type',controls:['range'] } },
  bill_by_user: { name:'bill_by_user', path:'/report/bill/user', component: () => import('pages/Report/Reports/ReportBillUser'), meta:{ title:'Bill By User',controls:['user','date'] } },
  delivery_boy_bills: { name:'delivery_boy_bills', path:'/report/bill/delivery_boy', component: () => import('pages/Report/Reports/ReportBillsByDeliveryBoy'), meta:{ title:'Bill By Delivery Boy',controls:['delivery_boy','range'] } },
  tax_bill_detail: { name:'tax_bill_detail', path:'/report/tax/bill/detail', component: () => import('pages/Report/Reports/ReportTaxBillDetail'), meta:{ title:'Tax Bill Details',controls:['range'] } },
  tax_details: { name:'tax_details', path:'/report/tax/details', component: () => import('pages/Report/Reports/ReportTaxDetails'), meta:{ title:'Tax Details',controls:['range'] } },
  orders_by_waiter: { name:'orders_by_waiter', path:'/report/orders/waiter', component: () => import('pages/Report/Reports/ReportOrdersByWaiter'), meta:{ title:'Tokens By Waiter',controls:['range'] } },
  orders_by_receptionist: { name:'orders_by_receptionist', path:'/report/orders/receptionist', component: () => import('pages/Report/Reports/ReportOrdersByReceptionist'), meta:{ title:'Tokens By Receptionist',controls:['range'] } },
  orders_by_delivery_boy: { name:'orders_by_delivery_boy', path:'/report/orders/delivery_boy', component: () => import('pages/Report/Reports/ReportOrdersByDeliveryBoy'), meta:{ title:'Tokens By Delivery Boy',controls:['range'] } },
  data_import: { name:'data_import', path:'/data/import', component: () => import('pages/Administrator/Data/AdministratorDataImport'), meta:{ title:'Import Data',controls:['noprint','download_template'] } },
  user_orders: { name:'user_orders', path:'/report/user/orders', component: () => import('pages/Report/Reports/ReportUserOrders'), meta:{ title:'User Orders',controls:['user','date'] } },
  kitchen_processing: { name:'kitchen_processing', path:'/report/kitchen/processing', component: () => import('pages/Report/Reports/ReportKitchenProcessing'), meta:{ title:'Kitchen Processing',controls:['kitchen','date'] } },
  item_processing: { name:'item_processing', path:'/report/item/processing', component: () => import('pages/Report/Reports/ReportItemProcessing'), meta:{ title:'Item Processing',controls:['item','range'] } },
  chef_performance: { name:'chef_performance', path:'/report/chef/performance', component: () => import('pages/Report/Reports/ReportChefPerformance'), meta:{ title:'Chef Performance',controls:['user','range'] } },
  orders_remote: { name:'orders_remote', path:'/orders/remote', component: () => import('pages/Order/RemoteOrders'), meta:{ title:'Remote Orders' } },
  orders_remote_new: { name:'orders_remote_new', path:'/orders/remote/new', component: () => import('pages/Order/RemoteOrdersNew'), meta:{ title:'New Remote Orders',back:true } },
  sale: { name:'sale', path:'sale', component: () => import('pages/Order/Sale'), meta:{ title:'New Sale',footer:false,back:true } },
  take_away: { name:'take_away', path:'take_away', component: () => import('pages/Order/TakeAway'), meta:{ title:'Take Away' } },
  archives: { name:'archives', path:'archives', component: () => import('pages/Archive/Index'), meta:{ title:'Archives' } },
  archive_payments: { name:'archive_payments', path:'archive/payments', component: () => import('pages/Archive/Payments'), meta:{ title:'Recent Payments',back:true,footer:false } },
  archive_bills: { name:'archive_bills', path:'archive/bills', component: () => import('pages/Archive/Bills'), meta:{ title:'Bills',back:true,footer:false } },
  archive_remote: { name:'archive_remote', path:'archive/remote', component: () => import('pages/Archive/Remote'), meta:{ title:'Remote Orders',back:true,footer:false } },
  archive_orders: { name:'archive_orders', path:'archive/orders', component: () => import('pages/Archive/Orders'), meta:{ title:'Orders',back:true,footer:false } },
  archive_sales: { name:'archive_sales', path:'archive/sales', component: () => import('pages/Archive/Sales'), meta:{ title:'Sales',back:true,footer:false } },
  archive_tokens: { name:'archive_tokens', path:'archive/tokens', component: () => import('pages/Archive/Tokens'), meta:{ title:'Tokens',back:true,footer:false } },
  delivery_boy_index: { name:'delivery_boy_index', path:'/', component: () => import('pages/DeliveryBoy/DeliveryBoyIndex'), meta:{ title:null } },
  delivery_boy_orders: { name:'orders', path:'/orders', component: () => import('pages/DeliveryBoy/DeliveryBoyOrders'), meta:{ title:'Orders' } },
  customers: { name:'customers', path:'/customers', component: () => import('pages/Customer/CustomerIndex'), meta:{ title:'Customers' } },
  delivery_boy_completed: { name:'delivery_boy_completed', path:'/completed', component: () => import('pages/DeliveryBoy/DeliveryBoyCompleted'), meta:{ title:'Completed Tokens' } },
  delivery_boy_payments: { name:'delivery_boy_payments', path:'/payments', component: () => import('pages/DeliveryBoy/DeliveryBoyPayments'), meta:{ title:'Payments' } },
  menu_index: { name:'menu_index', path:'/', component: () => import('pages/OnlineMenu/OnlineMenuIndex'), meta: { title:'Online Menu' } },
  menu_qr_codes: { name:'menu_qr_codes', path:'menu/qr_codes', component: () => import('pages/OnlineMenu/OnlineMenuQRCodes'), meta:{ title:'Online Menu QR Code Generator' } },
  menu_sync_data: { name:'menu_sync_data', path:'menu/sync/data', component: () => import('pages/OnlineMenu/OnlineMenuSyncData'), meta: { title:'Sync Data' } },
  orders_online: { name:'orders_online', path:'online/orders', component: () => import('pages/OnlineMenu/OnlineMenuOrders'), meta: { title:'Online Menu Orders' } },
  remote_kitchen_manage: { name:'remote_kitchen_manage', path:'remote/kitchen/manage', component: () => import('pages/Remote/RemoteKitchenManage'), meta: { title:'Remote Kitchens' } },
  remote_orders_by_customer: { name:'remote_orders_by_customer', path:'/report/ro/customer', component: () => import('pages/Report/Reports/ReportRemoteOrdersByCustomer'), meta:{ title:'Remote Orders by Customer',controls:['range'] } },
  remote_order_summary_by_customer: { name:'remote_order_summary_by_customer', path:'/report/ro/customer/summary', component: () => import('pages/Report/Reports/ReportRemoteOrderSummaryByCustomer'), meta:{ title:'Remote Order Summary by Customer',controls:['customer','range'] } },
  day_wise_remote_order_summary: { name:'day_wise_remote_order_summary', path:'/report/day/ro/summary', component: () => import('pages/Report/Reports/ReportDayWiseRemoteOrderSummary'), meta:{ title:'Day Wise Remote Order Summary',controls:['date'] } },
  day_wise_remote_order_delivery: { name:'day_wise_remote_order_delivery', path:'/report/day/ro/delivery/summary', component: () => import('pages/Report/Reports/ReportDayWiseRemoteOrderDelivery'), meta:{ title:'Day Wise Remote Order Delivery',controls:['date'] } },
  remote_order_by_item: { name:'remote_order_by_item', path:'/report/ro/item', component: () => import('pages/Report/Reports/ReportRemoteOrdersByItem'), meta:{ title:'Remote Order by Item',controls:['range'] } },
  remote_order_summary_by_item: { name:'remote_order_summary_by_item', path:'/report/ro/item/summary', component: () => import('pages/Report/Reports/ReportRemoteOrdersSummaryByItem'), meta:{ title:'Remote Order Summary by Item',controls:['cloud_item','range'] } },
  bill_by_customer: { name:'bill_by_customer', path:'/report/bill/customer', component: () => import('pages/Report/Reports/ReportBillCustomer'), meta:{ title:'Bill By Customer',controls:['range','customer'] } },
  bill_payments: { name:'bill_payments', path:'/report/bill/payments', component: () => import('pages/Report/Reports/ReportBillPayments'), meta:{ title:'Payments',controls:['range'] } },
  bill_payments_by_type: { name:'bill_payments_by_type', path:'/report/bill/payments/type', component: () => import('pages/Report/Reports/ReportBillPaymentsType'), meta:{ title:'Payments by Type',controls:['range','payment_type'] } },
  bills_unpaid: { name:'bills_unpaid', path:'/report/bill/unpaid', component: () => import('pages/Report/Reports/ReportBillUnpaid'), meta:{ title:'Unpaid Bills',controls:['date'] } },
  bills_unpaid_customer: { name:'bills_unpaid_customer', path:'/report/bill/unpaid/customer', component: () => import('pages/Report/Reports/ReportBillUnpaidCustomer'), meta:{ title:'Unpaid Bills by Customer',controls:['range','customer'] } },
  bills_unpaid_type: { name:'bills_unpaid_type', path:'/report/bill/unpaid/type', component: () => import('pages/Report/Reports/ReportBillUnpaidType'), meta:{ title:'Unpaid Bills by Type',controls:['range','sale_type'] } },
  bills_unpaid_user: { name:'bills_unpaid_user', path:'/report/bill/unpaid/user', component: () => import('pages/Report/Reports/ReportBillUnpaidUser'), meta:{ title:'Unpaid Bills by User',controls:['range','user'] } },
}

const feature_routes = {
  GH56E: ['guest_order_labels'],
}

function route_feature(){
  let rf = {};
  forEach(feature_routes,(routes,feature) => forEach(routes,route => rf[route] = feature))
  return rf;
}

function getRoutes(page) {
  let layout = layout_master[page]; if(!page || !layout) return console.error('No Page or Layout defined.. Page: ',page,' & Layout: ',layout) || [];
  let children = map(layout_child[page],name => merge({},get(route_master,name),{ meta: { me: typeof _USER === 'undefined' ? null : _USER }}));
  return [set(layout,'children',children)];
}

function featureFilterRoute(route){
  //Route before subscription :(
}

const routes = [
  ...getRoutes(typeof _ROLE === 'undefined' ? 'Menu' : _ROLE),
  { path: '*', component: () => import('pages/Error404.vue') }
]

export default routes
