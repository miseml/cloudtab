const div = document.createElement('cloud-tab-container');
div.classList.add('cloudtab-container');

const button = document.createElement('cloud-tab-button');
button.classList.add('cloudtab-button');
const url = document.location.href;

chrome.runtime.sendMessage(({url, method: "count"}), (res) => {
    res && (button.innerHTML = `Save (${res.occurrences})`);
});

div.addEventListener('click', () => {
    chrome.runtime.sendMessage(({url, method: "post"}), (res) => {
        res && (button.innerHTML = `Save (${res.occurrences})`);

    });
});

div.appendChild(button);
document.body.appendChild(div);
