Printer and Printing Template can be selected according to the following priority

If have any settings in the name

<user_name>_<role>_<type>_<item>
here the <user_name> is the name of logged in user... Everything will be snake case letters
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


sale_menu
This should be the name of a menu.
The purpose of this settings is, In Sales of items (Direct Selling By Receptionist) all items and items groups are displayed.. This can be limited to any specified menu..
That menu name is given here.. The name should be exactly same as what in Menus..


online_order_waiter_handle
When the feature Online Menu is enabled and also enabled Online Menu Ordering, then that orders are normally arrive at Receptionist and Waiter.
While setting this menu name to either of these
0,false,False,no,No then waiter can't confirm the online orders


online_order_receptionist_handle
When the feature Online Menu is enabled and also enabled Online Menu Ordering, then that orders are normally arrive at Receptionist and Waiter.
While setting this menu name to either of these
0,false,False,no,No then receptionist can't confirm the online orders


items_search_fields
Default is id,name,detail
These are the fields of an item, where the search/filter string  to be compared with. When any matches found, that items are only get displayed
Item props can also be given, Be sure the case of props are exactly same.
sale_items_search_fields, dining_items_search_fields, take_away_items_search_fields etc have higher priority, if them present as settings.
