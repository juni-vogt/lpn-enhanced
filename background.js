let browser = chrome || browser; // chrome / firefox

browser.browserAction.onClicked.addListener(() => {
	chrome.tabs.create({ url: "http://lpn.swi-prolog.org/" });
});
