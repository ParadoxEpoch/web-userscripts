// ==UserScript==
// @name         Create Download Script for SteamDB Manifests
// @namespace    https://steamdb.info/
// @version      0.1
// @description  Creates a script to download all manifests for a depot on SteamDB
// @author       ParadoxEpoch
// @match        https://steamdb.info/depot/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
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
        const sleep = m => new Promise(r => setTimeout(r, m))
        let isReady = false
        while (!isReady) {
            await sleep(500);
            console.log('Looking for element to attach to...');
            isReady = !!$('#manifests').length;
            if (isReady) {
                $('#manifests').append(`<div style="display: flex;"><input type="text" id="steamUser" placeholder="Steam Username"><input type="text" id="appId" placeholder="App ID" style="margin-left: 10px;"><button id="downloadAllManifests" style="margin-left: 10px;">Download All Manifests</button></div>`);
                const savedSteamUser = localStorage.getItem('steamUser');
                if (savedSteamUser) $('#steamUser').val(savedSteamUser);
                const thisDepotAppId = localStorage.getItem(depotId + '_appId');
                if (thisDepotAppId) $('#appId').val(thisDepotAppId);
            }
        }
    }

    initCheck();

})();