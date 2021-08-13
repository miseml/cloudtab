const serviceUrl = "http://localhost:3000";

export const postTab = url => fetch(`${serviceUrl}/tabs`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({url})
});

export const countOccurrences = url => fetch(`${serviceUrl}/tabs/count`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({url})
});
