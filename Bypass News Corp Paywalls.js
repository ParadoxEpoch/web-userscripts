// ==UserScript==
// @name        Bypass News Corp Paywalls
// @description Bypasses various News Corp paywalls with an XHR and crawler UA header
// @match       https://www.heraldsun.com.au/*
// @match       https://www.dailytelegraph.com.au/*
// @match       https://www.couriermail.com.au/*
// @match       https://www.adelaidenow.com.au/*
// @match       https://www.theaustralian.com.au/*
// @match       https://www.themercury.com.au/*
// @match       https://www.cairnspost.com.au/*
// @match       https://www.goldcoastbulletin.com.au/*
// @match       https://www.townsvillebulletin.com.au/*
// @match       https://www.thechronicle.com.au/*
// @match       https://www.ntnews.com.au/*
// @match       https://www.weeklytimesnow.com.au/*
// @match       https://www.geelongadvertiser.com.au/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js
// ==/UserScript==

// If URL path does not include /news/* or /news-story/*, this is not an article page and so we should stop running this script
if (!window.location.href.includes('/news/') && !window.location.href.includes('/news-story/')) return;

// Fetches a Herald Sun article by URL using the GoogleBot user agent.
async function requestArticle(articleUrl) {
    
    // Display loading message so that users with slow connections don't think the script has failed
    document.querySelector('body').innerHTML = '<div style="display:flex;height:100vh;width:100vw;justify-content:center;align-items:center;text-align:center"><h2>Loading your news article, one moment please...</h2></div>';
    
    // Remove "amp" query param if present since requesting this page as GoogleBot with the parameter returns a 403
    const targetUrl = articleUrl.replace('?amp', '?');
    
    // Make request with GoogleBot UA header
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    
    // Replace document with response data. If all goes well this should be the full article.
    document.write(response.data);
}

// If the user was redirected to the subscribe page...
if (window.location.href.includes('/subscribe/news')) {

    // Grab query param "dest". This is the intended article URL before the redirect
    const url1 = window.location.href.split('dest=')[1];
    const url2 = url1.split('&')[0];
    const destUrl = decodeURIComponent(url2);
    
    // Use replaceState to change the address bar URL back to the article URL without actually redirecting there
    window.history.replaceState("", "", destUrl);
    
    // Request the article page with the GoogleBot user agent so that we get the actual article contents, then replace the current page contents with the result
    requestArticle(destUrl);
    
} else {

    // User was not redirected to the subscribe page, this is probably an amp URL which instead shows a small preview of the content
    // In this case, request the article page with the GoogleBot user agent and replace the current page with the result
    requestArticle(window.location.href);

}