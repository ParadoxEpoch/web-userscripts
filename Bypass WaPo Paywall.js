// ==UserScript==
// @name        Bypass Washington Post Paywall
// @description Bypasses Washington Post paywall with an XHR
// @match       https://www.washingtonpost.com/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js
// ==/UserScript==

// If element with grid-body class is present, assume this is an article
const isArticle = !!document.querySelector('.grid-body');

// Look for the paywall modal
//const hasPaywall = !!document.querySelector('#paywall-ui-responsive-modal');

// If this is not an article or it has no paywall, return now
if (!isArticle) return;

// Inject CSS to hide the paywall modal
async function hidePaywallModal() {

    // Create the modal hider stylesheet
    var hidePaywallStyle = document.createElement('style');
    hidePaywallStyle.innerHTML = `
    [data-qa="overlay-container"] {
        display: none !important;
    }

    body {
        position: initial !important;
        height: initial !important;
    }`;

    // Append the paywall modal hider to the document head
    document.head.appendChild(hidePaywallStyle);

}

// Fetches the article via an XHR
async function requestArticle(articleUrl) {

    const articleBody = document.querySelector('.grid-body');
    
    // Display loading message so that users with slow connections don't think the script has failed
    articleBody.innerHTML = '<div style="text-align:center"><h2>Bypassing paywall, one moment please...</h2></div>';
    
    // Make request with GoogleBot UA header
    const response = await axios.get(articleUrl);
    
    // Parse response HTML string
    const parser = new DOMParser();
    const parsedOutput = parser.parseFromString(response.data, "text/html");

    // Extract article from the parsed response
    const articleContent = parsedOutput.querySelector('.grid-body').innerHTML;

    // Replace the article body with the contents of the article in the parsed response
    articleBody.innerHTML = articleContent;

}

// Hide the paywall modal by injecting CSS
hidePaywallModal();

// Make a new request for this raw page data
requestArticle(window.location.href);