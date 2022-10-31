# News Corp Paywall Bypass

Rupert's not amused.

![Rupert Murdoch](https://cdn.theatlantic.com/media/mt/steve_clemons/murdoch.jpg)

[View Script Page](AntiPaywall_NewsCorp.js) | [Raw Version](https://raw.githubusercontent.com/Maega/web-userscripts/main/PaywallBypasses/AntiPaywall_NewsCorp.js)

## Write up

News Corp uses one of the most sophisticated server-side paywall implementations I've seen yet _(which isn't saying much)_. However, since it still needs to permit search engine crawlers to index the article there's inevitably going to be a way around the paywall.

In this case, bypassing the News Corp paywall involves requesting the article again via an XHR that has a GoogleBot User Agent header present in the request. There are some complications to this, however. The request **cannot** have the _amp_ query param or the server will respond with a HTTP 403 error (Forbidden), so this has to be stripped if it's present in the URL.

Another complication is the way that the paywall behaves. In some cases, the user is shown a small preview of the article, but in other cases the user is redirected to a "subscribe" page. If the user is redirected, we can't use the current URL in the address bar to make the new request since we'll just be requesting the subscribe page and not the article. Therefore, we need to grab the URL from a _dest_ query param in the subscribe page's URL and use that to make the request, followed by using the `history.replaceState()` API to change the address bar URL without triggering a redirect or breaking the browser's back button.

Once we've got a response from the server, we can just use the `document.write()` function to replace the page contents with the response body since there are no client-side scripts that trigger the paywall.