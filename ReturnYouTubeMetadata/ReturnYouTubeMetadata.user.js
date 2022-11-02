// ==UserScript==
// @name         Return YouTube Metadata
// @namespace    https://github.com/maega
// @version      1.0
// @description  Returns the precise video view count and upload date to above the fold where it belongs!
// @author       ParadoxEpoch
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let metadata;
    const sleep = m => new Promise(r => setTimeout(r, m));

    async function init() {

        // Wait for video metadata to be loaded into the DOM, then proceed...
        let isReady = false
        while (!isReady) {
            await sleep(500);
            console.log('Waiting for video metadata to load...');
            isReady = !!document.querySelector('ytd-watch-metadata #description-inner #tooltip') && !!document.querySelector('#above-the-fold #title h1 > yt-formatted-string') && !!document.querySelector('ytd-watch-metadata #description-inner #tooltip').innerText.trim();
        }

        // Fetch metadata string
        metadata = document.querySelector('ytd-watch-metadata #description-inner #tooltip').innerText.trim();

        // If our element to inject already exists in the DOM, just update its contents. Otherwise, create the element and inject it now.
        // ? The element already exists when navigating to another video directly from a watch page since the title container element doesn't get reset.
        if (document.querySelectorAll('#aboveTheFoldMetadata').length) {
            document.querySelector('#aboveTheFoldMetadata').innerText = metadata;
        } else {
            document.querySelector('#above-the-fold #title h1 > yt-formatted-string').insertAdjacentHTML('beforeend', `<span id="aboveTheFoldMetadata" style="font-size: smaller; position: absolute; right: 0px; color: rgb(255 255 255 / 75%);">${metadata}</span>`);
        }
    }

    // * Only start looking for video metadata if the user is on a watch page.
    if (location.pathname === '/watch') init();

    // * Create a MutationObserver instance on page load to watch for URL state changes.
    let oldHref = document.location.href;
    window.onload = function () {
        const bodyList = document.querySelector("body")

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(async function (mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;

                    // If this is not a watch page, set metadata to null and return here.
                    if (location.pathname !== '/watch') {
                        metadata = null;
                        return;
                    }

                    const currentMetadataElem = document.querySelector('#aboveTheFoldMetadata');
                    if (currentMetadataElem) currentMetadataElem.innerText = '';
                    let isReady = false
                    while (!isReady) {
                        await sleep(500);
                        console.log('Waiting for metadata update...');
                        isReady = currentMetadataElem
                            ? document.querySelector('ytd-watch-metadata #description-inner #tooltip').innerText.trim() !== metadata
                            : true;
                        if (isReady) init();
                    }
                }
            });
        });

        const config = {
            childList: true,
            subtree: true
        };

        observer.observe(bodyList, config);
    };


})();