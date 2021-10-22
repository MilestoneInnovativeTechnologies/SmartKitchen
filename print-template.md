Inorder to have this work, settings should have a value like '//localhost/EPSON' under any name (printer name).. Ex: PRINTER001 This name is referred while calling the class Printer
Every setting related to this printer should provide in settings as <printer_name>_<settings name>.. Ex: PRINTER001_width
Required settings are connector -> windows shared printers => FilePrintConnector, windows printer => WindowsPrintConnector, more details @ https://github.com/mike42/escpos-php
capability -> more details @ https://github.com/mike42/escpos-php
width -> width in no of characters a line can include.. In thermal printer it may line 32,48 etc. Default is 48

The first argument should be the printer name (string), second & third are array as template and data respectively


TEMPLATE FORMAT
It should be in array where each element considered as a section
Each section itself will be another array, having first element as text or template string
Second element should be the properties given as string and multiple props separated by | "pipe character"
Template string can be
Hi Mr [customer.name], how you're doing. You line number is [id] and time [delivery.time]
The square brackets are removed with value supplied in data array
Supported properties are
feed
left
center
right
emphasis
big
underline
size1,size2,size3,size4,size5,size6,size7,size8
title
line -> text will be the character of line, it can be any. .Normally "-","*","_" or even words like "HAPPY"
around -> print on each side of a line. Text should have left and right portion separated by | "pipe character"
stack -> print on top bottom. Text should have top and bottom portion separated by | "pipe character". Top text will try to emphasis. Other props like left,center,right,underline are also accepted as props
table -> String should be the field details ex: 'items#Details:[quantity]x [item.name]|Narration:[narration]|Customer:[customer.name]|Seat:[seating.name]
where the items are the key of data where table data is located
each field would be separated by |. Each field should have field name and its value separated by :
An optional 3rd argument can be given if there is any size specification. It should be array having each element size of corresponding column. Ex: [2,3,4]
An optional 4th argument can be given if there is any column to be aligned right
In props, index can be added for having sequence number in each row
upi -> this is to print payment upi qr code. text should be like '[id]|[amount]', where ID and amount should be separated by "|". Other props are also supported.
Inorder to have this work, settings should contain upi_address and upi_name
image -> Text should be the name, which were used to upload file in settings > upload. Other props are also supported.
