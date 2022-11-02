# Return YouTube Metadata

[Install Userscript](https://raw.githubusercontent.com/Maega/web-userscripts/main/ReturnYouTubeMetadata/ReturnYouTubeMetadata.user.js) | [View Code](ReturnYouTubeMetadata.user.js)

The new October 2022 YouTube Web UI moved precise video view counts and upload dates below the fold, requiring users to scroll down and click "show more". This script returns that metadata above the fold so that it can be seen at a glance on any video watch page.

#### :x: Before
![Before ReturnYouTubeMetadata](https://i.imgur.com/CAoOfBp.png)

#### :heavy_check_mark: After
![After ReturnYouTubeMetadata](https://i.imgur.com/Js7gebs.png)

## Write up

YouTube stores a nicely formatted copy of a video's precise view count and upload date in a hoverable tooltip at the selector `ytd-watch-metadata #description-inner #tooltip`. We can pull the text contents of that element, trim the whitespace with `String.trim()`, wrap it in a container element and inject that container into the video's title element at selector `#above-the-fold #title h1 > yt-formatted-string`.

In order to have the metadata fit in nicely with YouTube's layout, we position it to absolute right of the video's title and slightly reduce the text size and opacity to visually distingish it from the title itself.

Because YouTube is a dynamic web app, we can't rely on watch pages having the metadata available when the onload event fires. To work around this and prevent a race condition, we use a simple while loop on a timer to wait for the title element to load and metadata tooltip to be populated. Once the title element is found and tooltip metadata text is no longer falsey we can fetch the metadata and proceed with DOM injection.

Additionally, as with many modern web apps YouTube does not use traditional page navigation and instead internally handles navigation without triggering a full page reload. Because of this, we need to instantiate a _MutationObserver_ to monitor for URL changes so that we can fire the script payload when navigating to a new video. Because we need to create this _MutationObserver_ instance on the initial page load, the script needs to run on all _youtube.com/*_ pages. To prevent the script from trying to inject video metadata on non-video pages (which would crash the script), we simply check if `location.pathname === "/watch"` and if it doesn't, we don't call the payload function.