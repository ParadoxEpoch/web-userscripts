# web-userscripts

Various userscripts for use on the web. Most scripts are designed to be cross-compatible with TamperMonkey and Userscripts for Safari but should work with any userscript manager that has the same syntax.

## :page_with_curl: Available Scripts

**:newspaper: [AntiPaywall_NewsCorp:](PaywallBypasses/AntiPaywall_NewsCorp.md)** Bypasses most News Corp paywalls with an XHR and crawler UA header.

**:newspaper: [AntiPaywall_NYT:](PaywallBypasses/AntiPaywall_NYT.md)** Bypasses The New York Times paywall with simple CSS injection.

**:newspaper: [AntiPaywall_TheAge:](PaywallBypasses/AntiPaywall_TheAge.md)** Bypasses The Age news paywall by clearing a counter in localStorage.

**:newspaper: [AntiPaywall_WaPo:](PaywallBypasses/AntiPaywall_WaPo.md)** Bypasses Washington Post paywalls with an XHR.

**:video_game: [SteamDepotDownloader:](SteamDepotDownloader/SteamDepotDownloader.js)** Generate download scripts on SteamDB for [DepotDownloader](https://github.com/SteamRE/DepotDownloader) to grab all manifests in a Steam depot.

**:tv: [InvestigationDiscoveryDownloader:](InvestigationDiscoveryDownloader/InvestigationDiscoveryDownloader.js)** Generate download scripts for [YT-DLP](https://github.com/yt-dlp/yt-dlp) to download entire seasons of free access shows from ID/TLC.

**:video_camera: [RedditDefaultVideoPlayer:](RedditDefaultVideoPlayer/RedditDefaultVideoPlayer.js)** Replaces the Reddit video player with the browser's default HTML5 player. *This script is unfinished.*

## :electric_plug: Installation

### Desktop Web Browsers (Chrome, Edge, Brave etc.)
These scripts are only tested on Chromium-based desktop browsers, but should work on any web browser that has a userscript manager extension such as [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).

1. Install [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) from the Chrome Web Store or equivalent browser add-on store.
2. Copy the URL for a script. You can do this by clicking one of the scripts [in the section above](#page_with_curl-available-scripts) and copying the _Raw Version_ link in the page that appears _(Right click > Copy Link Address)_.
3. Open the Tampermonkey extension from the extensions menu in your browser. On Chromium-based browsers this is the puzzle piece icon in the top right.
4. Choose the _Utilities_ tab on the page that opens.
5. Paste the URL that you copied into the _Import from URL_ section and click _Install_.

### Apple iOS / iPadOS (Safari)
You'll need iOS 15 or later to run userscripts in Safari.

1. Install [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887) from the App Store.
2. Download a script from this page by clicking it [in the section above](#page_with_curl-available-scripts), right clicking the _Raw Version_ link on the page that appears and choosing "Save as...".
3. Transfer the downloaded script to your device via AirDrop, Email etc. and save it to a folder on your device using the _Files_ app or similar.
4. Open the _Userscripts_ app, follow the instructions to set it up and choose the folder you saved your script(s) to as the _Userscripts Directory_.
5. Open Safari and navigate to a webpage that's targeted by the script you downloaded.
6. Open the Reader/Extensions menu from the address bar, then choose the _Userscripts_ option from the Reader/Extensions menu and make sure the script you downloaded appears and is switched on.

### Android
Android browser support for userscripts isn't great. You'll need the [Firefox Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fenix) browser from the Play Store. If anyone has a better method for running userscripts on Android, please open an issue or submit a pull request.

1. Follow [this YouTube video](https://www.youtube.com/watch?v=RzmJcEr_uts) **until 3:10** in order to install and configure Firefox Nightly with the Tampermonkey add-on.
2. Choose the _Utilities_ tab.
3. Copy the URL for a script. You can do this by tapping one of the scripts [in the section above](#page_with_curl-available-scripts) and copying the _Raw Version_ link in the page that appears _(Tap and hold > Copy Link)_.
4. Paste the URL that you copied into the _Import from URL_ section and click _Install_.

## :heart: Contributing

If you have any improvements, fixes or suggestions for future userscripts feel free to submit a pull request or open a new issue.

Alternatively, if you'd like to support ongoing development of this and other repositories a donation would be very much appreciated. I accept direct crypto donations via any of the addresses below or through [Coinbase Commerce](https://commerce.coinbase.com/checkout/bb4f7665-bfdc-4c22-9fc8-78299010b1c8).

**BTC:** bc1q6kqv5u2368j4l00rls5frg78wt7m6vf7a50sa7

**ETH:** 0x704fb3fD106D00e6D78880C25139141C4B24DFd7

**DOGE:** D6MZp3HMZQA6gFBhmcmYs6AjytXwQJ4bYj

**LTC:** ltc1qhqgsnzwumxm7q3u3m4rj0zcvwcvcvhqqrke07p

**XMR:** 8429Hzck9gdX43MF9NzNGjaeGdKBwjVTjgGDQfXKV6WxfSGubxuBi6mEh2nDWwXtAZUjMejV4Pamr5SfYp96QJZNEQecMqS
