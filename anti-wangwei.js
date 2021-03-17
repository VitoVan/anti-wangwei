// ==UserScript==
// @name         UAW: Anti Wang Wei by maomaolv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block All Wang Wei by maomaolv
// @author       VitoVan
// @match        https://*.v2ex.com/*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    // Add Anti Class
    document.head.insertAdjacentHTML("beforeend", `<style type="text/css">.hideWW{background-color:black !important;color:black !important;text-shadow:none !important;pointer-events:none !important;}</style>`)
    // Check Anti List
    const todayUTCDate = (new Date()).getUTCDate();
    var wwUpdateDate = window.localStorage.getItem('wwUpdateDate');
    var wwUniText = '';
    if (wwUpdateDate != todayUTCDate) { // Need Update
        console.debug(`ANTI-WW: Updating List (${wwUpdateDate} / ${todayUTCDate})`);
        // Load Anti List
        const wwUniResp = await fetch('https://www.v2ex.com/p/3SS1131M');
        wwUniText = await wwUniResp.text();
        window.localStorage.setItem('wwUpdateDate', todayUTCDate);
        window.localStorage.setItem('wwUniText', wwUniText);
    } else {
        console.debug(`ANTI-WW: Use Local List (${wwUpdateDate} / ${todayUTCDate})`);
        wwUniText = window.localStorage.getItem('wwUniText');
    }
    const wwLinkList = wwUniText.match(/(\/t\/[0-9]+)/g);
    // Mark Links
    for (const link of document.links) {
        if (wwLinkList.includes(link.pathname)) {
            link.classList.add('hideWW');
            console.debug(`Found Link: ${link.pathname}`);
        }
    }
    // Mark Page
    if (wwLinkList.includes(document.location.pathname)) {
        console.debug(`Found Page: ${document.location.pathname}`);
        document.querySelector('#Main>.box').innerHTML = '<h1 style="background:white;color:black;height:500px;line-height:500px;font-size:100px;font-family: "PingFang SC">已屏蔽</h1>'
    }
})();
