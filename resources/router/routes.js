const { map,set } = require('lodash')

const layout_master = {
  Login: { path:'/', component: () => import('layouts/LoginLayout.vue')  },
  Waiter: { path:'/', component: () => import('layouts/WaiterLayout.vue')  },
  Chef: { path:'/', component: () => import('layouts/ChefLayout.vue')  },
  Receptionist: { path:'/', component: () => import('layouts/ReceptionistLayout.vue')  },
}

const layout_child = {
  Login: [],
  Waiter: ['waiter_index','waiter_menu','orders','order_new'],
  Chef: ['chef_index','chef_kitchens','kitchen_items','kitchen_stocks','tokens'],
  Receptionist: ['receptionist_index','seat_status','receptionist_tokens','bills','seat_status_order','receptionist_orders','receptionist_order_new','receptionist_order_new_items'],
}

const route_master = {
  waiter_index: {  name:'waiter_index', path:'/', component: () => import('pages/Waiter/Index'), meta:{ title:'' }  },
  waiter_menu: {  name:'waiter_menu', path:'/menu', component: () => import('pages/Waiter/Menu'), meta:{ title:'Menu' }  },
  orders: {  name:'orders', path:'/orders', component: () => import('pages/Order/Orders'), meta:{ title:'Order' }  },
  order_new: {  name:'order_new', path:'/order/new', component: () => import('pages/Order/New'), meta:{ title:'New Order',back:true,footer:false }  },
  chef_index: {  name:'chef_index', path:'/', component: () => import('pages/Chef/Index'), meta:{ title:'' }  },
  chef_kitchens: {  name:'chef_kitchens', path:'/kitchens', component: () => import('pages/Chef/ChefKitchens'), meta:{ title:'Kitchens' }  },
  kitchen_items: {  name:'kitchen_items', path:'/kitchen/:id/items', component: () => import('pages/Kitchen/KitchenItems'), props:true, meta:{ title:'Items',back:true,footer:false }  },
  kitchen_stocks: {  name:'kitchen_stocks', path:'/kitchen/:id/stocks', component: () => import('pages/Kitchen/KitchenStocks'), props:true, meta:{ title:'Stock',back:true,footer:false }  },
  tokens: {  name:'tokens', path:'/tokens', component: () => import('pages/Token/Tokens'), meta:{ title:'Tokens' }  },
  receptionist_index: {  name:'receptionist_index', path:'/', component: () => import('pages/Receptionist/Index'), meta:{ title:'' }  },
  receptionist_tokens: {  name:'receptionist_tokens', path:'/tokens', component: () => import('pages/Receptionist/Tokens'), meta:{ title:'Completed Tokens' }  },
  bills: {  name:'bills', path:'/bills/pending', component: () => import('pages/Bill/Pending'), meta:{ title:'Pending Bills' }  },
  seat_status: {  name:'seat_status', path:'/seating/status', component: () => import('pages/Seating/SeatingStatus'), meta:{ title:'Seat Status' }  },
  seat_status_order: {  name:'seat_status_order', path:'/seating/status/order', component: () => import('pages/Order/CommonNew'), props: true, meta:{ title:'New Order' }  },
  receptionist_orders: {  name:'orders', path:'/orders', component: () => import('pages/Order/ReceptionistOrders'), meta:{ title:'Order' }  },
  receptionist_order_new: {  name:'receptionist_order_new', path:'/orders/new', component: () => import('pages/Order/ReceptionistNew'), meta:{ title:'New Order',back:true }  },
  receptionist_order_new_items: {  name:'receptionist_order_new_items', path:'/orders/new/items', component: () => import('pages/Order/CommonNew'), props:true, meta:{ title:'Select Items',back:true,footer:false }  },
}

function getRoutes(page) {
  let layout = layout_master[page]; if(!page || !layout) return console.error('No Page or Layout defined.. Page: ',page,' & Layout: ',layout) || [];
  let children = map(layout_child[page],name => _.get(route_master,name));
  return [set(layout,'children',children)];
}

const routes = [
  ...getRoutes(_ROLE),
  { path: '*', component: () => import('pages/Error404.vue') }
]

export default routes
