// ==UserScript==
// @name         Create Download Script for YT-DLP
// @namespace    https://github.com/paradoxepoch
// @version      0.1
// @description  Creates download scripts to use with YT-DLP on Investigation Discovery and TLC
// @author       ParadoxEpoch
// @match        https://investigationdiscovery.com/show/*
// @match        https://www.investigationdiscovery.com/show/*
// @match        https://go.tlc.com/show/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function initiateDownload(filename, content) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    $(document).on('click', '#addSeasonToQueue', (event) => {
        const showName = $('.hiddenLogoHeaderText-31ldTq2m').text().replace(':', ''); // Remove colon in show names since Windows paths cannot contain the colon symbol
        const seasonNum = $('[aria-controls="season-dropdown"]').text().replace('Season ', '');
        const episodes = $('[data-sonic-type="collection"] [data-sonic-type="video"]');
        let scriptContent = `@echo off\ntitle ${showName} S${seasonNum}\n`;
        episodes.each((index, item) => {
            const itemLink = $(item).find('a').attr('href');
            const itemNum = $(item).find('.seasonNumberEpisodeNumber-1y_p3fTv').text().replace(' ', '');
            const itemName = $(item).find('h3').text();
            if (itemLink.includes('login-affiliates')) {
                console.warn(itemNum + ' is locked, skipping...');
                scriptContent += `echo.\necho.\necho --- ${itemNum} is locked and has been skipped ---\n`;
                return;
            }
            scriptContent += `echo.\necho.\necho --- Downloading ${itemNum} ---\n`;
            scriptContent += `yt-dlp-tlc "https://${window.location.hostname + itemLink}" -o "${showName}\\Season ${seasonNum}\\${showName} - ${itemNum} - ${itemName}.%%(ext)s" --cookies-from-browser brave --geo-bypass -N 5\n`;
        });
        scriptContent += 'echo.\necho.\necho All Done. Press any key to exit...\npause>nul';
        initiateDownload(`Download ${showName} S${seasonNum}.bat`, scriptContent);
    });

    async function initCheck() {
        const sleep = m => new Promise(r => setTimeout(r, m))
        let isReady = false
        while (!isReady) {
            await sleep(500);
            console.log('Looking for element to attach to...');
            isReady = !!$('.seasonWrapper-dJRaEeAD').length;
            if (isReady) $('.seasonWrapper-dJRaEeAD').append(`
                <div id="addSeasonToQueue" style="margin-left: 20px"><a style="text-decoration: underline">Download this Season</a></div>
            `);
        }
    }

    initCheck();

})();