// ==UserScript==
// @name        Bypass The Age Paywall
// @version     2.0
// @description Bypasses The Age paywall using a new method (May 2023)
// @author      ParadoxEpoch
// @match       https://www.theage.com.au/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js
// @icon        https://www.google.com/s2/favicons?sz=64&domain=theage.com.au
// ==/UserScript==

(function () {
    'use strict';

    const sleep = m => new Promise(r => setTimeout(r, m));

    let currentHref = document.location.href;
    let currentTimeout;

    // * Create a MutationObserver instance on page load to watch for URL state changes.
    // ? We're doing this because The Age uses the history API for page navigation and we need a way to trigger script execution on each article load.
    window.onload = function () {
        const bodyList = document.querySelector("body");

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (currentHref != document.location.href) {
                    currentHref = document.location.href;
                    clearInterval(currentTimeout);
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

    async function init() {

        await sleep(500);

        const articleContent = await getArticle();

        if (!articleContent) return;

        currentTimeout = setTimeout(() => {
            document.querySelector('#paywall-prompt-wrapper-piano-id')?.remove();
            document.querySelector('#hard-reg-wall-piano-id')?.remove();
            document.querySelector('body').classList.remove('lock');

            const article = document.querySelector('article');
            if (article.innerHTML !== articleContent) {
                console.log('>>>>>>>> Replacing articleContent...');
                article.innerHTML = articleContent;
            }
        }, 500);

    }

    async function getArticle() {

        const response = await axios.get(document.location.href);

        // Parse response HTML string
        const parser = new DOMParser();
        const parsedOutput = parser.parseFromString(response.data, "text/html");

        // Extract article from the parsed response
        //const articleContent = parsedOutput.querySelector('article > div:first-of-type').innerHTML;
        const articleContent = parsedOutput.querySelector('article')?.innerHTML;

        return articleContent;

    }

    init();

})();