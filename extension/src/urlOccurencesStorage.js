const NOT_FOUND = -1;

export const get = (url) => new Promise(resolve => {
    chrome.storage.local.get(url, (item) => {
        Object.keys(item).length === 0 && resolve(NOT_FOUND);
        resolve(item[url]);
    });
});

export const set = (url, numberOfOccurrences) => new Promise(resolve => {
    chrome.storage.local.set({[url]:numberOfOccurrences}, () => {
        resolve();
    });
})
