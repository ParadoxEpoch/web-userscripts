// ==UserScript==
// @name         Improved Reddit Video Player
// @namespace    https://www.reddit.com/
// @version      0.1
// @description  Replaces the Reddit video player with the browser's default HTML5 player
// @author       ParadoxEpoch
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

// ! This userscript is not finished.
// ! * It only works on overlay Reddit posts (aka when clicking on a post from a subreddit, but not when visiting a post URL directly or refreshing on an overlay post).
// ! * It also currently only plays the 480p version of a video. If no 480p version is available, the video will fail to load.
// ! * Videos do not currently have sound.

(function () {
    'use strict';

    async function init() {
        if (!location.pathname.includes('/comments/')) {
            console.log('>>> Not a post page, ignoring...');
            return;
        }

        console.log('>>> Post page detected, looking for video element...');

        function injectVideo() {
            $('#overlayScrollContainer [data-click-id="media"]').css({ 'background': 'transparent' })
            $('#overlayScrollContainer [data-click-id="media"]').html(`
                <video controls autoplay height="100%" width="100%" style="max-height: 512px; max-width: calc(100% - 50px);">
                    <source src="https://v.redd.it/${videoId}/DASH_480.mp4" type="video/mp4">
                </video>
            `)
        }

        const sleep = m => new Promise(r => setTimeout(r, m))
        let videoId;
        let isReady = false
        while (!isReady) {
            await sleep(250);
            console.log('Looking for video element...');
            isReady = !!$('#overlayScrollContainer [data-click-id="media"] video').length;
            if (isReady) {
                console.log('Found video element!');
                videoId = $('#overlayScrollContainer [data-click-id="media"] video > source').attr('src').split('/')[3];
                injectVideo();
            }
        }
    }

    let oldHref = document.location.href;

    window.onload = function () {
        const bodyList = document.querySelector("body")

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (oldHref != document.location.href) {
                    console.log('>>> State change detected');
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

})();