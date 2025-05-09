# Cashrewards Sort Deals by Cashback

[Install Userscript](https://raw.githubusercontent.com/ParadoxEpoch/web-userscripts/main/CashrewardsSortDeals/CashrewardsSortDeals.user.js) | [View Code](CashrewardsSortDeals.user.js)

Cashrewards (an Australian cashback platform) has a convenient [all stores](https://www.cashrewards.com.au/all-stores) page that lists all participating stores and their cashback offers, but it doesn't offer a way to sort the 1500+ stores by cashback percentage. Additionally, the page only shows 18 stores at a time, meaning users have to click a _"Load More"_ button over and over again to actually display all the participating stores.

This userscript solves both these issues by automatically loading all participating stores at once and sorting them by cashback percentage, making it easier for users to find the best deals.

#### :x: Before
![Before CashrewardsSortDeals](https://i.imgur.com/o9TEPDM.png)

#### :heavy_check_mark: After
![After CashrewardsSortDeals](https://i.imgur.com/d1x2Lir.png)

## Write up

On load, the page queries an API endpoint to get JSON structured cashback data for the first 18 stores.

`https://api-prod.cashrewards.com.au/api/v1/merchants/all-stores?limit=18&offset=0`

The userscript intercepts this request by overriding the `XMLHttpRequest open()` method. It then checks if the request URL matches our targeted endpoint. If it does, the script modifies the request by replacing the `limit` parameter with a value of `20000` to load all stores at once. We choose `20000` since this covers any future growth of the number of participating stores. The request is then handed off to the original `open()` method which is stored before being overridden.

While this is taking place, the script continuously monitors the page for the presence of an element with the `.main__cardWrapper` class (there's only ever one on the page). Once the element is found and is confirmed to contain at least two child anchor elements (cards), we can be confident that store data has finished loading at which point we can proceed to sort the stores by cashback percentage.

To do this, we use `document.querySelectorAll()` to grab all the card elements, before converting them into an array with `Array.from()`. Using some simple regex on child elements within each card, we can parse the cashback percentage as a simple float and sort the array based on those values in descending order using the `Array.sort()` method.

Finally, we grab the parent element of the cards and append each card node back to the parent in the new order, effectively _moving_ each card to its new position within the wrapper element without needing to remove or re-create the card elements.
