// ==UserScript==
// @name        Bypass The Age Paywall
// @version     1.0
// @description Bypasses The Age paywall by removing an internal counter from localStorage on each page load
// @author      ParadoxEpoch
// @match       https://www.theage.com.au/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=theage.com.au
// ==/UserScript==

// Fetch the current ffx:paywallCount object from localStorage so we can perform a check on it later on.
const paywallCount = localStorage.getItem('ffx:paywallCount');

// Remove the ffx:paywallCount object from localStorage.
localStorage.removeItem('ffx:paywallCount');

// If the paywallCount had already exceeded the free article limit, reload the page after clearing the counter.
if (JSON.parse(paywallCount).value > 2) location.reload();
