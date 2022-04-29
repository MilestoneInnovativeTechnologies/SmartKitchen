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


This is the priority order while selecting a printer or print_template

kot_print_separate
By default the full kot will be printed even for an update in the token. This can be restricted, to print kot on separate actions
Make the value to any of 1,true,True,yes,Yes to make the selection of template according to Modified, Added or Cancelled.
If it doesn't have this setting and have any template in the name kot_add_print_template, kot_modify_print_template, kot_cancel_print_template, then specified template will be used.
The data available for template will have the token item detail under the attribute name item and have additional attribute named item_state which have value Added, Modified, Cancelled

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


sale_price_list, home_delivery_price_list, take_away_price_list
This should be the name of a price list.
The purpose of these settings is, In any type of Order which price list should be taken is decided by this setting.
The price list name should be exactly same as what in Price lists
If there is a price list of name exactly same of any type or order, then this price list will be taken for that type of order. This have lesser priority than that of having in settings


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


delivery_boy_hide_others_billed
These settings decide whether the orders that are billed by other delivery boy need to be shown or not.
When the value of this setting is any of 1,true,True,yes,Yes then it will hide other waiters billed orders.
By default, it will show every orders that are billed by anyone.

items_search_fields
Default is id,name,detail
These are the fields of an item, where the search/filter string  to be compared with. When any matches found, that items are only get displayed
Item props can also be given, Be sure the case of props are exactly same.
sale_items_search_fields, dining_items_search_fields, take_away_items_search_fields etc have higher priority, if them present as settings.


waiter_manage_customer, receptionist_manage_customer, delivery_boy_manage_customer
By default, delivery_boy and receptionist can only manage customers. Manage means adding & edition customers.
If waiter too need to manage, then add setting of waiter_manage_customer to any of true,1,True,yes,Yes
Similarly, delivery boy or receptionist don't need this option, then add and make delivery_boy_manage_customer/receptionist_manage_customer setting value to any of 0,false,False,no,No


waiter_remote_orders, receptionist_remote_orders
When a branch have the feature, Remote Kitchen & Remote Kitchen Client, enabled then that branch Receptionist can take orders and manage it. By default Receptionist can have options for these but not for Waiter.
When this settings value made either of these
0,false,False,no,No then the corresponding users can't have options of remote orders
1,true,True,yes,Yes then the corresponding users can have options of remote orders


waiter_generate_bills
By default generating bills from completed tokens are can be done by receptionist and waiter. If the branch doesn't want the waiter to generate bills, then add a setting in this name having value either of these
0,false,False,no,No
If no settings in this name or the value is not any of above, then the waiter is able to generate bills from completed tokens


waiter_make_payments
By default making payments from bills are can be done by receptionist and waiter. If the branch doesn't want the waiter to be able to add payments, then add a setting in this name having value either of these
0,false,False,no,No
If no settings in this name or the value is not any of above, then the waiter is able to add payments from bills


quick_mode
If the feature Quick Mode is enabled, then toggle switch will be displayed on header bar on create order windows. The Quick mode can be made ON/OFF from there itself.
And if there have a settings in the name quick_mode with value any of 1,true,True,yes,Yes,YES,ON,on,On the by default, quick mode will be enabled. This can be turned off using header bar toggle switch


quick_mode_item_prop
This settings decides which property if an item to be used as code in quick mode. The item can have upto 5 properties that can be enabled by admin in settings > item props
The settings value could exactly match with item prop name (case-sensitive)


quick_mode_quantity_fix
Normally the quick mode work like, at first item code to be entered, then tap ENTER key, then enter quantity, then tap ENTER key again next item code then its quantity and so on...
If this settings have added with any of these values 1,true,True,yes,Yes,YES,ON,on,On, then quantity will be locked at 1.
Each time item code entered and on tapping ENTER key, quantity will be taken as 1, and it gets added. On tapping ENTER key multiple times, quantity will also add consequently


currency_symbol
The symbol given will prepend to the price displayed on item selection. It can be any symbol or character. If a space required between symbol and price, it should give so.. Ex: `₹ `, `₨`, `AED `