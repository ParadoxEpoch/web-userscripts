// ==UserScript==
// @name         Create Download Script for SteamDB Manifests
// @namespace    https://github.com/paradoxepoch
// @version      0.1
// @description  Creates a script to download all manifests for a depot on SteamDB
// @author       ParadoxEpoch
// @match        https://steamdb.info/depot/*
// @match        https://steamdb.info/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=store.steampowered.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function appPage() {
        const appId = location.pathname.split('app/')[1].split('/')[0];

        async function initCheck() {
            console.log(`Detected app page with ID ${appId}, scanning for depots...`);
            const sleep = m => new Promise(r => setTimeout(r, m))
            let isReady = false
            while (!isReady) {
                await sleep(500);
                console.log('Scanning for depots...');
                isReady = !!$('#depots').length;
                if (isReady) {
                    console.log(`Found ${$('#depots tr.depot').length} depots!`);
                    $('#depots tr.depot > td:first-of-type a:not(.app)').each((index, item) => {
                        const thisDepotId = $(item).text();
                        localStorage.setItem(thisDepotId + '_appId', appId);
                        console.log(`Set appId for depot ${thisDepotId} in localStorage`);
                    });
                }
            }
        }

        initCheck();

    }

    function depotPage() {
        const depotId = location.pathname.split('depot/')[1].split('/')[0];

        function initiateDownload(filename, content) {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        $(document).on('click', '#downloadAllManifests', (event) => {
            let batchArray = [];
            let batchContent = '';
            let totalBuilds = $('#manifests tbody > tr').length;
            let unitPercent = 100/totalBuilds;
            let totalPercent = 0;
            const steamUser = $('#steamUser').val();
            const appId = $('#appId').val();
            const depotName = $('.pagehead > h1').clone().children().remove().end().text().trim(); // lol
            localStorage.setItem('steamUser', steamUser);
            localStorage.setItem(depotId + '_appId', appId);
            $('#manifests tbody > tr').each((index, item) => {
                item = $(item);
                const manifestId = item.find('a').text();
                const branchId = item.find('code').text();
                const datedAt = item.find('.timeago').attr('data-time').split('+')[0].replaceAll(':', '.').replace('T', ' @ ');
                batchArray.push(`DepotDownloader.exe -username ${steamUser} -remember-password -max-downloads 30 -app ${appId} -depot ${depotId} -dir ".\\depots\\${depotName.replaceAll(' ', '').replaceAll('\'', '')}_${depotId}\\${datedAt}${!!branchId ? ' [' + branchId + ' branch]' : ''}" -manifest ${manifestId}\n`);
            });
            batchArray = batchArray.reverse();
            batchArray.forEach((item, index) => {
                index = index + 1;
                const downloadCmd = `title Downloading ${index}/${totalBuilds} (${totalPercent.toFixed(2)}%%)\n${item}`;
                batchContent += downloadCmd;
                totalPercent += unitPercent;
            });
            initiateDownload(`Download ${depotName}.bat`, '@echo off\n' + batchContent + 'echo.\necho All Done!\npause');
        });

        async function initCheck() {
            console.log('Detected depot page, looking for manifest table...')
            const sleep = m => new Promise(r => setTimeout(r, m))
            let isReady = false
            while (!isReady) {
                await sleep(500);
                console.log('Looking for manifest table to attach to...');
                isReady = !!$('#manifests').length;
                if (isReady) {
                    console.log('Found manifest table to attach to!');
                    $('#manifests').append(`<div style="display: flex;"><input type="text" id="steamUser" placeholder="Steam Username"><input type="text" id="appId" placeholder="App ID" style="margin-left: 10px;"><button id="downloadAllManifests" style="margin-left: 10px;">Download All Manifests</button></div>`);
                    const savedSteamUser = localStorage.getItem('steamUser');
                    if (savedSteamUser) $('#steamUser').val(savedSteamUser);
                    const thisDepotAppId = localStorage.getItem(depotId + '_appId');
                    if (thisDepotAppId) $('#appId').val(thisDepotAppId);
                }
            }
        }

        initCheck();
    }

    if (location.pathname.includes('/app/')) {
        appPage();
    } else if (location.pathname.includes('/depot/')) {
        depotPage();
    }


})();