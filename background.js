chrome.browserAction.onClicked.addListener(function(tab) {
  var newURL = "http://lpn.swi-prolog.org/";
    chrome.tabs.create({ url: newURL });
});