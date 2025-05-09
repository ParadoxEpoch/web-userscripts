# Washington Post Paywall Bypass

Sorry Bezos _(not sorry)_

[Install Userscript](https://raw.githubusercontent.com/ParadoxEpoch/web-userscripts/main/PaywallBypasses/AntiPaywall_WaPo.user.js) | [View Code](AntiPaywall_WaPo.user.js)

## Write up

The Washington Post returns full articles in the initial GET request for a page. After the full article page loads, a script tag on the page removes the article contents from the DOM and injects a paywall modal.

By requesting the page again via an XHR, then filtering out the article container element from the response body and injecting it back into the page we can restore the article contents. Then, some simple CSS injection can be used to hide the paywall modal.
Since we aren't reloading the full page the paywall script doesn't execute again, so we're effectively able to restore the contents of the article and bypass the paywall with this method.

An alternative approach might be to interrupt the paywall script, but this isn't practical since userscripts seem to be executed _after_ on-page script tags and would be subject to race condition failures.
