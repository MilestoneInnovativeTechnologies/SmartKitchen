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

This is the priority order while selecting a printer or print_template


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


online_order_waiter_handle, online_order_receptionist_handle
When the feature Online Menu is enabled and also enabled Online Menu Ordering, then that orders are normally arrive at Receptionist and Waiter.
While setting this menu name to either of these
0,false,False,no,No then the corresponding users can't confirm the online orders
1,true,True,yes,Yes then the corresponding users can confirm the online orders


items_search_fields
Default is id,name,detail
These are the fields of an item, where the search/filter string  to be compared with. When any matches found, that items are only get displayed
Item props can also be given, Be sure the case of props are exactly same.
sale_items_search_fields, dining_items_search_fields, take_away_items_search_fields etc have higher priority, if them present as settings.


waiter_manage_customer, receptionist_manage_customer, delivery_boy_manage_customer
By default, delivery_boy and receptionist can only manage customers. Manage means adding & edition customers.
If waiter too need to manage, then add setting of waiter_manage_customer to any of true,1,True,yes,Yes
Similarly, delivery boy or receptionist don't need this option, then add and make delivery_boy_manage_customer/receptionist_manage_customer setting value to any of 0,false,False,no,No

