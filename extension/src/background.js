const {postTab, countOccurrences} = require("./api");

chrome.runtime.onMessage.addListener(({method, url}, sender, sendResponse) => {
    if (method === "count") {
        countOccurrences(url)
            .then(response => response.json())
            .then(({occurrences}) => {
                sendResponse({occurrences});
            });
    }
    if (method === "post") {
        postTab(url)
            .then(response => response.json())
            .then(({occurrences}) => {
                sendResponse({occurrences});
            });
    }
    return true;
});
