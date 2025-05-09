# The Age Paywall Bypass

[Install Userscript](https://raw.githubusercontent.com/ParadoxEpoch/web-userscripts/main/PaywallBypasses/AntiPaywall_TheAge.user.js) | [View Code](AntiPaywall_TheAge.user.js)

## May 2023 Update

The Age has changed their paywall implementation and removing the `ffx:paywallCount` object from localStorage no longer works.
The updated version of the bypass now works by requesting the article via a background XHR, injecting the article body back into the page and removing the paywall prompt.

## Write up

**⚠️ This write up is outdated and no longer applies to the current implementation**

The Age allows users to view three free articles per month. This is enforced entirely client-side by storing an object in the user's browser via the localStorage API _(similar to a cookie)_. The object is named `ffx:paywallCount` and it keeps track of free article views and the date that the three article limit will reset.

`{"expires":"2022-11-26T04:37:56.558Z","value":0}`

If the _value_ property is >= 3 a client-side script will remove the article contents from the page and inject the paywall prompt. We can easily bypass this by deleting the 'ffx:paywallCount' object from localStorage with `localStorage.removeItem('ffx:paywallCount')` on each page load.

There is a minor complication with this method, however. The Age seems to be dynamic web app that uses the `History` API for page navigation instead of traditional page redirection. This means that our userscript only fires when the website is initially loaded or refreshed, and not each time the user clicks on an article. This means that viewing three or more articles without refreshing or closing the page will still trigger the paywall. We get around this limitation by creating a new `MutationObserver` that monitors for changes to the DOM's `location.href` string. Every time the URL in the address bar changes while browsing The Age, the userscript's payload will fire.
