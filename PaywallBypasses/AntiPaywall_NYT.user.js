// ==UserScript==
// @name        Bypass NYT Paywall
// @description Uses pure CSS to bypass The New York Times paywall
// @match       https://www.nytimes.com/*
// ==/UserScript==

// Create the modal hider stylesheet
var hidePaywallStyle = document.createElement('style');
hidePaywallStyle.innerHTML = `
#gateway-content,
.css-gx5sib {
    display: none;
}

.css-mcm29f {
    position: static;
    overflow: visible;
}`;

// Append the paywall modal hider to the document head
document.head.appendChild(hidePaywallStyle);