// ==UserScript==
// @name        Bypass The Age Paywall
// @version     1.0
// @description Bypasses The Age paywall by removing an internal counter from localStorage on each page load
// @author      ParadoxEpoch
// @match       https://www.theage.com.au/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=theage.com.au
// ==/UserScript==

// * This init function contains the routine to remove the paywallCount object from localStorage.
function init() {
    // Fetch the current ffx:paywallCount object from localStorage so we can perform a check on it later on.
    let paywallCount = localStorage.getItem('ffx:paywallCount');

    // Remove the ffx:paywallCount object from localStorage.
    localStorage.removeItem('ffx:paywallCount');

    // If the paywallCount had already exceeded the free article limit, reload the page after clearing the counter.
    if (!!paywallCount && JSON.parse(paywallCount).value > 2) location.reload();
}

let oldHref = document.location.href;

// * Create a MutationObserver instance on page load to watch for URL state changes.
// ? We're doing this because The Age uses the history API for page navigation and we need a way to trigger script execution on each article load.
window.onload = function () {
    const bodyList = document.querySelector("body")

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                init();
            }
        });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);
};

init();