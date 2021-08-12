const div = document.createElement('cloud-tab-container');
div.classList.add('cloudtab-container');

const button = document.createElement('cloud-tab-button');
button.classList.add('cloudtab-button');

const text = document.createTextNode('Save');

button.addEventListener('click', () => {
    const url = document.location.href;

    fetch('http://localhost:3000/tabs', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url})
    }).then(()=> {
        console.log('sent')
    });

});

button.appendChild(text);
div.appendChild(button);
document.body.appendChild(div);
