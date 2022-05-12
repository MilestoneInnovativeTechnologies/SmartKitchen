export default [
  { name:'Kitchen',caption:'Displays kitchen items',icon:'person',to:{ name:'display_kitchen'} },
  { name:'Active Tokens',caption:'Active tokens details',icon:'receipt',to:{ name:'display_active_tokens' } },
  { name:'Daily Order',caption:'Today\'s full orders',icon:'receipt' },
  { name:'Home Delivery',caption:'Delivery orders tracking',icon:'logout' },
  { name:'Table Status',caption:'Realtime view each tables order status and progress',icon:'logout' },
  { name:'Delivery Boy',caption:'View the activities of active delivery boys handling orders',icon:'logout' },
  { name:'Bill Payments',caption:'Displays list of Pending Bills, and on selecting any bill Payment UPI QR Code will be displayed for making easy payment..',icon:'attach_money',to:{ name:'display_pay_bill_qr_code' } },
]
