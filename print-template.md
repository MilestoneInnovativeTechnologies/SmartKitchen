### Printing in Smart Kitchen
Smart Kitchen support infinite number of printers.<br>
Each printer address need to be given in settings.<br>
_Setting Name_ should be _Printer Name_ Ex: `Printer01`, `KitchenPrinter`, `CounterPrinter` etc <br>
_Setting Value_ should be its address EX: `192.168.1.200`, `\\localhost\epson`, `\dev\usb\lp0` etc <br>
Additional settings like `connector`,`capability`,`width` can be given in the format `<printer_name>_<setting_name>`<br>
Ex: `Printer01_connector`,`CounterPrinter_capability`,`KitchenPrinter_width` etc<br>
Details regarding `capability` and `connector` are available at https://github.com/mike42/escpos-php <br>
1. `width` is just number of characters a line can include Ex: `32`, `48`. Default set as `48`
2. `connector` should be any of `FilePrintConnector` (For windows shared printer & linux/raspberry usb printer), `WindowsPrintConnector` (For windows printer), `NetworkPrintConnector` (For network) etc 

_In model file the method accepts 3 arguments, Printer Name, Template, Data respectively_


#### TEMPLATE FORMAT
It should be in array where each element considered as a section <br>
Each section itself will be another array, having first element as TEXT or TEMPLATE STRING <br>
Second element should be the PROPERTIES given as string and multiple props separated by | "pipe character" Ex: `["Payment Details","center|underline"]` <br>
TEMPLATE STRING can be <br>
Hi Mr [customer.name], how you're doing. Your ID is [id] and time [delivery.time] <br>
The square brackets are removed with value supplied in data array <br>
Supported PROPERTIES are <br>
feed `["","feed"]` <br>
left `["Hello","left"]` <br>
center `["Date","center"]` <br>
right `["5,000","right"]` <br>
emphasis `["Milestone","emphasis|center"]` <br>
big `["Total","big|center"]` <br>
underline `["Details","underline"]` <br>
size1,size2,size3,size4,size5,size6,size7,size8 `["Payable","size2"]` <br>
title `["INVOICE","title"]` <br>
line -> text will be the character of line, it can be any. .Normally "-","*","_" or even words like "HAPPY" `["-","line"]` <br>
around -> print on each side of a line. Text should have left and right portion separated by | "pipe character" `["Name|[customer.name]","around"]`,`["ID:[id]|Date:[date]","around"]` <br>
stack -> print on top bottom. Text should have top and bottom portion separated by | "pipe character". Top text will try to emphasis. Other props like left,center,right,underline are also accepted as props `["Customer|[customer.name]","stack"]`, `["Bank Detail|A/C No: 00000, IFSC: BARB0PALARI","stack"]` <br>
table -> String should be the field details `['items#Details:[quantity]x [item.name]|Narration:[narration]|Customer:[customer.name]|Seat:[seating.name]','table']` <br>
where the items are the key of data where table data is located <br>
each field would be separated by |. Each field should have field name and its value separated by : <br>
An optional 3rd argument can be given if there is any size specification. It should be array having each element size of corresponding column. Ex: [2,3,4] <br>
An optional 4th argument can be given if there is any column to be aligned right <br>
In PROPERTIES, index can be added for having sequence number in each row `['items#Details:[quantity]x [item.name]|Narration:[narration]|Customer:[customer.name]|Seat:[seating.name]','table|index',[5,4,3,2],["Seat"]]` <br>
upi -> this is to print payment upi qr code. `['[id]|[amount]','upi']`, where ID (bill id) and amount should be separated by "|". Other PROPERTIES are also supported. <br>
Inorder to have this work, settings should contain `upi_address` and `upi_name` <br>
image -> Text should be the name, which were used to upload file in settings > upload. Other PROPERTIES are also supported. `["logo","image"]` <br>
