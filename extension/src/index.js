const {get, set} = require('./urlOccurencesStorage');
const {postTab} = require('./api');

const div = document.createElement('cloud-tab-container');
div.classList.add('cloudtab-container');

const button = document.createElement('cloud-tab-button');
button.classList.add('cloudtab-button');
const url = document.location.href;

get(url).then(value => {
    const numberOfSavedOccurrences = value >= 0 ? value : 0;
    button.innerHTML = `Save (${numberOfSavedOccurrences})`;
});

div.addEventListener('click', () => {
    postTab(url).then(() => {
        get(url).then(value => {
            const updatedNumberOfSaves = value >= 0 ? value + 1 : 1;
            set(url, updatedNumberOfSaves).then(() => {
                button.innerHTML = `Save (${updatedNumberOfSaves})`;
            });
        });
        console.log('sent')
    });

});

div.appendChild(button);
document.body.appendChild(div);
