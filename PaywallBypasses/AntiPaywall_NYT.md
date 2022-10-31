# New York Times Paywall Bypass

[View Script Code](AntiPaywall_NYT.js) | [Raw Version](https://raw.githubusercontent.com/Maega/web-userscripts/main/PaywallBypasses/AntiPaywall_NYT.js)

## Write up

The New York Times does very little to enforce their paywall. The full article contents are always loaded into the DOM and only obscured by a paywall modal and by hiding page overflow. All we have to do to bypass this is to inject some basic CSS that sets the `display` property of the modal's CSS selector to "none" and setting the page container's `overflow` property back to "visible".

For maximum compatibility, we just create a `style` tag, append our CSS styles and then inject that element into the page's head.

_That was easy™_
