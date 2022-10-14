Printer and Printing Template can be selected according to the following priority

If have any settings in the name

<user_name>_<role>_<type>_<item>
here the <user_name> is the name of logged in user. Everything will be snake case letters
<role> is the role of logged in user
<type> is dining, sale, take_away etc etc
<item> is either printer or print_template
<token> means. Where there is a token without bill is called Token. If have bill then that token is called Bill 

<user_name>_<type>_<token>_<item>
<user_name>_<type>_token
<user_name>_<type>_<item>
<user_name>_<token>_<item>
<user_name>_token_<item>
<user_name>_<item>
<role>_<type>_<token>_<item>
<role>_<type>_token_<item>
<role>_<type>_<item>
<role>_<token>_<item>
<role>_token_<item>
<role>_<item>
<type>_<token>_<item>
<type>_token_<item>
<type>_<item>
<token>_<item>
token_<item>
<item>

Ex: administrator_sale_printer, delivery_boy_bill_print_template, kot_cancelled_print_template, firose_hussain_printer
This above is the priority order while selecting a printer or print_template


kot_print_separate
By default the full kot will be printed even for an update in the token. This can be restricted, to print kot on separate actions
Make the value to any of 1,true,True,yes,Yes to make the selection of template according to Modified, Added or Cancelled.
If it doesn't have this setting and have any template in the name kot_add_print_template, kot_modify_print_template, kot_cancel_print_template, then specified template will be used.
The data available for template will have the token item detail under the attribute name item and have additional attribute named item_state which have value Added, Modified, Cancelled

browser_print
If it needs printing from browser using the printer installed withing the PC or browsing device, then make this setting to any of true. The template for printing is developed used laravel blade template, which can be managed from `/print2` url.

ping_frequency
Normally by default, ping action (updating data from server) occurs on each 15 seconds, that is 4 pings per minute.
This means ping_frequency is 4. This can be changed as per requirement. Ex: if made 10, then 10 pings per minute, ie on each 6 seconds it updates data from server 


items_per_page or max_items_per_page
This is the setting who controls the maximum amount of items that should be displayed in a page (while ordering)
Default is 100


sale_menu, home_delivery_menu, take_away_menu
This should be the name of a menu.
The purpose of these settings is, In Sales or any type of Order of items all items and items groups are displayed. This can be limited to any specified menu.
That menu name is given here. The name should be exactly same as what in Menus.
If there is a menu of name exactly same of any type or order, then this menu will be taken for that type of order. This have lesser priority than that of having in settings 


sale_price_list, home_delivery_price_list, take_away_price_list, price_list
This should be the name of a price list.
The purpose of these settings is, In any type of Order which price list should be taken is decided by this setting.
The price list name should be exactly same as what in Price lists
If there is a price list of name exactly same of any type or order, then this price list will be taken for that type of order. This have lesser priority than that of having in settings
If none of above satisfied, and is there a setting with name price_list with value, then that price list will be used for all.


default_customer, <type>_default_customer
This should be the name of a Customer. Case Sensitive.
The purpose of these settings is, In any type of Order, what should be the default customer is decided by this setting.
The setting name should be like take_away_default_customer, sale_default_customer etc.
Type specified setting have more priority than that of default_customer. The setting default_customer is used all over other than type specified.

customer_display_format
While selecting customer from the options list, the displaying customer details can be customized using this settings. By default display format is [name], [phone]
This can be made to any format using the following available keys id,name,phone,address,email,status
Ex: [name], Phone:[phone], Adr: [address]
Ex: [name] - [phone]
Ex: [address] - [name], [phone]
Please avoid using `(` and `)`

remote_<branch_code>_price_list, remote_<branch_code>, <branch_code>_price_list, <branch_code>
This should be the name of a price list.
If remote kitchen function is enabled and have a kitchen as cloud, the orders will be received & creates corresponding token and token items locally.
For creating a token, price list is mandatory. If there is a setting in this name then while creating token, that price list will be considered.
If there is no such settings, then remote_price_list value will have next priority. If that is also not available, then first active price list will be considered
Each branch can have separate price list. Suppose a branch have branch code as CKD, then remote_ckd_price_list is considered first then remote_ckd then ckd_price_list then ckd.
Similarly, branch code WISMA => remote_wisma_price_list or remote_wisma or wisma_price_list or wisma and so on.
Settings name will be always small letters. ie, wisma_price_list is correct and WISMA_price_list is not correct.


remote_<branch_code>_customer
This should be the name of a customer.
If remote kitchen function is enabled and have a kitchen as cloud, the orders will be received & creates corresponding token and token items locally.
For creating a token, customer is required. If there is a setting in this name then while creating token, that customer will be considered.
If this not exists, then search for the customer having branch_code as Customer name.
If both fails, then a customer will be created with the name of branch_code and use this customer
Setting name will be always small letter, while value can be any, but it must exactly same as what in customer.


online_order_waiter_handle, online_order_receptionist_handle
When the feature Online Menu is enabled and also enabled Online Menu Ordering, then that orders are normally arrive at Receptionist and Waiter.
While setting this menu name to either of these
0,false,False,no,No then the corresponding users can't confirm the online orders
1,true,True,yes,Yes then the corresponding users can confirm the online orders


take_away_waiter_handle, take_away_receptionist_handle
When the feature Take Away is enabled, then a menu named Take Away will be available where all Take Away orders can manage. By default, receptionist can handle but waiter can't. This can disable/enable by having these setting.
0,false,False,no,No then the corresponding users won't have take away menu
1,true,True,yes,Yes then the corresponding users will have take away menu


take_away_waiter_own_order
If these setting have any value from 1,true,True,yes,Yes then the takeaway orders will be filtered to current waiter's order only
By default, filtering is not applying. Making this value to any of 0,false,False,no,No will disable filtering for waiter


take_away_instant_payment, take_away_waiter_instant_payment, take_away_receptionist_instant_payment
By default, while taking Take Away order from its own screen, it mentions the order as fully paid.
If these settings have any value that of false (0,false,False,no,No), then the bill get generated without adding any payment.
Making value to any of 1,true,True,yes,Yes will make the order instantly paid.
Priority: If settings have take_away_waiter_instant_payment or take_away_receptionist_instant_payment then it will be considered else take_away_instant_payment will be considered


delivery_boy_take_orders
By default delivery boy can take home delivery order. This can be disabled by setting this value to any of 0,false,False,no,No


delivery_boy_hide_others_billed
These settings decide whether the orders that are billed by other delivery boy need to be shown or not.
When the value of this setting is any of 1,true,True,yes,Yes then it will hide other waiters billed orders.
By default, it will show every orders that are billed by anyone.

items_search_fields
Default is id,name,detail
These are the fields of an item, where the search/filter string  to be compared with. When any matches found, that items are only get displayed
Item props can also be given, Be sure the case of props are exactly same.
sale_items_search_fields, dining_items_search_fields, take_away_items_search_fields etc have higher priority, if them present as settings.


enable_order_narration, enable_item_narration
When values of these have any from 1,true,True,yes,Yes then narration field will be displayed on order summary popup as well as item edit popup.
By default, this remains as disabled


enable_processing_token_item_update, enable_completed_token_item_update, enable_served_token_item_update
Normally an ordered item can be edited only when its status is New or Processing. This can be extended to Processing and Completed progresses too.
These setting with any value from 1,true,True,yes,Yes will enable editing that progress item.
enable_processing_token_item_update will enable editing Processing items && enable_completed_token_item_update will enable editing Completed items and so on.


waiter_manage_customer, receptionist_manage_customer, delivery_boy_manage_customer
By default, delivery_boy and receptionist can only manage customers. Manage means adding & edition customers.
If waiter too need to manage, then add setting of waiter_manage_customer to any of true,1,True,yes,Yes
Similarly, delivery boy or receptionist don't need this option, then add and make delivery_boy_manage_customer/receptionist_manage_customer setting value to any of 0,false,False,no,No


waiter_remote_orders, receptionist_remote_orders
When a branch have the feature, Remote Kitchen & Remote Kitchen Client, enabled then that branch Receptionist can take orders and manage it. By default Receptionist can have options for these but not for Waiter.
When this settings value made either of these
0,false,False,no,No then the corresponding users can't have options of remote orders
1,true,True,yes,Yes then the corresponding users can have options of remote orders


waiter_generate_bills, waiter_make_payments
By default generating bills and making payments are to be done by receptionist and waiter. If it is not required, add this setting and make its value to no


quick_mode
If the feature Quick Mode is enabled, then toggle switch will be displayed on header bar on create order windows. The Quick mode can be made ON/OFF from there itself.
And if there have a settings in the name quick_mode with value any of 1,true,True,yes,Yes,YES,ON,on,On the by default, quick mode will be enabled. This can be turned off using header bar toggle switch


quick_mode_tap_sound
Tap sound can be enabled on key press on quick mode numeric keypad. Make this value to any of 1,true,True,yes,Yes,YES,ON,on,On.
By default, no tap sound will be fired.


quick_mode_item_prop
This settings decides which property if an item to be used as code in quick mode. The item can have upto 5 properties that can be enabled by admin in settings > item props
The settings value could exactly match with item prop name (case-sensitive)


quick_mode_quantity_fix
Normally the quick mode work like, at first item code to be entered, then tap ENTER key, then enter quantity, then tap ENTER key again next item code then its quantity and so on...
If this settings have added with any of these values 1,true,True,yes,Yes,YES,ON,on,On, then quantity will be locked at 1.
Each time item code entered and on tapping ENTER key, quantity will be taken as 1, and it gets added. On tapping ENTER key multiple times, quantity will also add consequently


auto_serve_token_item_on_complete, auto_serve_take_away_token_item_on_complete, auto_serve_dining_token_item_on_complete, auto_serve_home_delivery_token_item_on_complete 
Each token item on said type of token will be marked as served on getting its status as completed.
To achieve this option, make the value of these settings to any of true.
auto_serve_token_item_on_complete have lesser priority that type specified, if no type specified exists, then auto_serve_token_item_on_complete will be considered


auto_bill_token_on_complete, auto_bill_take_away_token_on_complete, auto_bill_dining_token_on_complete, auto_bill_home_delivery_token_on_complete 
Having this setting value as Yes means, it will generate Bill automatically for the specified type or for all.
A customer is required to create a Bill, which should be there while ordering, or else in settings.
Refer default_customer setting section for setting customer. If no customer is found, no bill will be generated.


auto_bill_default_tax_nature, auto_bill_take_away_default_tax_nature, auto_bill_dining_default_tax_nature, auto_bill_home_delivery_default_tax_nature
If auto bill is enabled, the completed token will be billed. For billing, it requires customer as mandatory, tax nature as optional.
If this setting is added and have the value as same as any of tax nature (Already added in taxes), then bill get generated in that tax nature. No, any value given, bill get generated without tax. 


auto_pay_bill_payment_type, auto_pay_take_away_bill_payment_type, auto_pay_dining_bill_payment_type, auto_pay_home_delivery_bill_payment_type
The value can be any of Payment type from Cash, Card, Credit, Wallet.
Having this setting means, it will make the Bill as Paid by automatically adding same bill amount as payment.
The value given here will be used as payment type


keep_tokens_in_orders_until, keep_tokens_in_waiter_orders_until
By default, its value is Completed for Receptionist and Billed for Waiter., which means for receptionist, in Orders tab, all the orders will be displayed until the token status is Completed. And for waiters it is Billed.
Whenever the token status comes to Completed (All items served) or Billed respectively for Receptionist & Waiter, It will be hided from Orders.
This can be changed to anu from Completed, Billed or Paid. If this made as Billed and the token status reached to Billed, it will be hided. That means until we generate bill it remains there ,and once bill generated, it goes from there.
Supported values are Completed, Billed, Paid.
For waiter keep_tokens_in_waiter_orders_until is prior than keep_tokens_in_orders_until


currency_symbol
The symbol given will prepend to the price displayed on item selection. It can be any symbol or character. If a space required between symbol and price, it should give so.. Ex: `₹ `, `₨`, `AED `


instant_item_create
If this setting made to true, then receptionist will be able to add item instantly. An additional icon will be displayed of top bar, which popups item create card.


report_image, report_text
Report page header customization is possible by adding image and text in print. report_image, it should be an uploaded image and report_text, address or whatever text or paragraph.
If both settings provided, image should be aligned towards left and text towards right. If only one of above is given, then that will be aligned at center.
These are visible only in printing.


report_image_<report_title>, report_text_<report_title>
If for any particular report a custom image or text is required, this can be accomplished using this above settings. Title should be snake cased.
These have higher priority than that of report_image, report_text.
Ex: report_image_day_token_summary, report_text_sales_by_type


retries_on_server_error
Sometimes server respond with any error, in such cases, an alert popup with an error message will be displayed.
Smart Kitchen can make retry the request after a minute, before pop up error message.
The number of retries could be made is defined by here. The value should be any number. ex: 1,3 etc.
By default, the value should be 0, means no retry is made.


avoid_cancelling_bill_on_token_update, restrict_payment_cancel_while_bill_cancel_on_token_update
Normally orders can be edited by adding, editing or cancelling any items. While doing this, if there is any bill existing, it will get cancelled.
If having this settings value as any of true, then bill won't get cancelled.
If the bill is cancellable on token update, even if payment exists, payments will be cancelled and the bill will ge cancelled.
Cancelling payments can be restricted by having restrict_payment_cancel_while_bill_cancel_on_token_update to any of true


enable_billed_token_update, enable_billed_take_away_token_update, enable_billed_home_delivery_token_update, enable_billed_dining_token_update
Normally when a token is billed, it won't be edited further. That means no adding of further items are allowed. This can be altered and can make editable until it Paid.
So, when the value of this setting is yes, then even billed token is also become editable. Type specified setting is available, it has more priority than enable_unpaid_token_update.
When updating token, the generated bill will get cancelled, which depends on settings avoid_cancelling_bill_on_token_update


day_start, recent_days_length, data_limit
These are the settings decide the amount of data to be fetched from server. Although this setting is available, dependent data will always fetch subsequently.
day_start have higher priority than recent_days_length.
day_start should be a time in 24-hour format mentioning the start time of business. The data will be fetched from that time onwards only.
If day_start is not available then checked for recent_days_length, which is by default 7. The fetching data will be from the mentioned days onwards.
data_limit, by default is 1500, means, maximum data fetched will be caped to this number.