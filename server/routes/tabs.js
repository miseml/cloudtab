const express = require('express');
const router = express.Router();
const {
    v4: uuidv4,
} = require('uuid');

let tabs = [{
    id: uuidv4(),
    url: "whatever",
    time: 0
}, {
    id: uuidv4(),
    url: "whatever",
    time: Date.now()
}];

router.get('/', (req, res, next) => {
    res.render('tabs', {title: "CloudTab service", tabs});
});

router.post('/', (req, res, next) => {
    const newTab = {
        id: uuidv4(),
        url: req.body.url,
        time: Date.now()
    };
    tabs.push(newTab);

    res.sendStatus(201);
});

router.post('/delete/:id', (req, res, next) => {
    const indexToRemove = tabs.findIndex(({id}) => req.params.id === id);
    indexToRemove >= 0 && tabs.splice(indexToRemove, 1);

    res.redirect('/tabs');
});

module.exports = router;
