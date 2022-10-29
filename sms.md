#### SMS Gateway
This should be enabled in subscription. Once this enabled, admin portal will have menu for creating templates.

As many as templates and actions can be set for sending SMS. For creating a template it is must to give and name and triggering options. These are not editable further. But the whole template can be deleted or can be disable.

##### Trigger
It has triggers for Token, Bill and Payment on Created or Updated. For Token Updated trigger it should mention the update field like Customer or Progress
So, if a trigger created for Token-Updated-Customer this means, whenever a token's customer changed, this template will come into action.
Similarly, Bill-Created will trigger when a bill is created. This is non editable for a template

##### Name
A name for identifying, not have any impact on sms sending process but in backend, details are get stored on the basis of name. Hence name is mandatory and non editable too.

#### Condition
Condition plays crucial role. Even when the template triggered, application goes through the conditions provided. When every condition mentioned here gives true, then only sms will be sent.
Each conditions can be provided by spearing with coma. No spaces or any other characters are allowed. in between conditions. Must be take care.<br />
Ex: `type=Dining,customer.name!=Cash`
This means, when the token type is `Dining` and customer name is not `Cash` then only this sms could be sent.
The dummy token text can be from options. Every fields of token text can be used in condition.
Ex: `bill.amount>100`, `user.role=Delivery Boy` etc etc <br>
The nested properties of token text can be accessed using dot notation.

#### Numbers
As many as numbers can be given. Each number should be seperated by coma `,`
Ex: `91900900199199` or multiple numbers as `9995999500,9888988899,8500085000`
###### Number from Token Text
It is even possible to give from token text Ex: `[customer.phone]` It should be wrapped in square bracket if taking from token text.
Multiple with combination of pure number and token text are also possible. Ex: `919895123123|[customer.phone]`.
###### Filters
Sometimes number added to customer would not be compatible with the gateway requirement. In such cases filters need to be applied.<br>
Filters for each number to be provided. Multiple filter for a number is possible, each filter separate with pipe `|` character.<br>
Ex: `91 9995 123 123|clean`,`[customer.phone]|clean|trim`<br>
Some filter may need to provide additional arguments. This can be done by given arguments separated by `&` after a `:`.<br>
Ex: `9895123123|prepend:91,[customer.phone]|clean|last:10|prepenr:91`<br>
**Supported Filters**:<br>
`clean` removes all non digit characters<br>
`trim` removes space characters from both ends<br>
`last:n` take last n number of digits. Ex: `+917907901111|last:12`<br>
`prepend:n` prepend the digit with n. Ex: `9400194001|prepend:91`

#### Template
Template of sms to be sent. Template can have any text from token text.
Wherever the text required from Token text should be wrapped with `[]`, Ex: `[bill.amount_precise]` 
The nested properties of token text can be accessed using dot notation.<br>
>Ex: `Hi [customer.name], Your order is ready to deliver. Our [user.name] will deilver it, Please be prepared with bill amount of [bill.amount_precise]`

##### Advanced
On advanced option, params can be provide extra. Some gateways offer flash message, for this it may need to provide additional parameters like `flashmessage=1`.
This can be accomplished using this area.

#### Custom SMS Gateway
By default, the client can use only the gateway with is shipped along with subscription.
If this is enabled in subscription, then Custom Gateway can be made available. Which means admin can override the details given in subscription.<br>
Also, for each template itself, different gateways are also made possible. Once this enabled in subscription admin portal's SMS Gateway menu will have all necessary options available for these
