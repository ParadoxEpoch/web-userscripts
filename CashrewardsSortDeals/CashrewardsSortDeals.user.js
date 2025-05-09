// ==UserScript==
// @name         Sort deals by highest cashback
// @namespace    https://github.com/paradoxepoch
// @version      2.0.0
// @description  Loads all participating stores on Cashrewards "All Stores" page and sorts them by highest cashback offer.
// @author       ParadoxEpoch
// @match        https://www.cashrewards.com.au/all-stores
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cashrewards.com.au
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleep = m => new Promise(r => setTimeout(r, m));

    // Intercept XHRs to modify the request URL's "limit" query parameter
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (url.includes('/merchants/all-stores') && url.includes('limit=18')) {
            url = url.replace('limit=18', 'limit=20000');
            console.log('✅ Intercepted API request to all-stores endpoint!');
        };
        open.call(this, method, url, ...rest);
    };

    async function watchForCards() {
        let isReady = false
        while (!isReady) {
            await sleep(500);
            console.log('⏳ Waiting for card wrapper element...');
            isReady = !!document.querySelector('.main__cardWrapper') && document.querySelectorAll('.main__cardWrapper > a').length > 1;
        }
        console.log('✅ Found populated card wrapper!');
        sortCards();
    }

    function sortCards() {
        let cards = Array.from(document.querySelectorAll('.card'));

        console.log(`⏳ Sorting ${cards.length} deals by highest cashback...`);

        cards.sort((a, b) => {
            // Get the inner HTML of the .card__cbRate element in the card
            let aRateElement = a.querySelector('.card__cbRate');
            let bRateElement = b.querySelector('.card__cbRate');

            const aRateMatch = aRateElement.innerHTML.match(/ (\d+(\.\d+)?)/);
            const bRateMatch = bRateElement.innerHTML.match(/ (\d+(\.\d+)?)/);
            // Use regex to grab the percentage (string between a space and percent character)
            let aPercentage = aRateMatch && aRateMatch.length > 1 ? parseFloat(aRateMatch[1]) : 0;
            let bPercentage = bRateMatch && bRateMatch.length > 1 ? parseFloat(bRateMatch[1]) : 0;

            // Sort from highest to lowest
            return bPercentage - aPercentage;
        });

        let parent = cards[0].parentNode;
        cards.forEach((card) => parent.appendChild(card));
        console.log(`✅ All done! Deals have been sorted by highest cashback. Happy shopping!`);
    }

    // Start watching for card elements
    watchForCards();

})();