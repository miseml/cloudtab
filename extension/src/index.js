const {postTab, countOccurrences} = require('./api');

const div = document.createElement('cloud-tab-container');
div.classList.add('cloudtab-container');

const button = document.createElement('cloud-tab-button');
button.classList.add('cloudtab-button');
const url = document.location.href;

countOccurrences(url)
    .then(response => response.json())
    .then(({occurrences}) => {
        button.innerHTML = `Save (${occurrences})`;
    });

div.addEventListener('click', () => {
    postTab(url)
        .then(response => response.json())
        .then(({occurrences}) => {
            button.innerHTML = `Save (${occurrences})`;
            console.log('sent')
        });
});

div.appendChild(button);
document.body.appendChild(div);
