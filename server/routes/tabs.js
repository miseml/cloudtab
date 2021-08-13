const express = require('express');
const {
    v4: uuidv4,
} = require('uuid');

module.exports = (db) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        db.collection('documents').find({}).toArray().then(tabs => {
            res.render('tabs', {title: "CloudTab service", tabs});
        });
    });

    router.post('/', (req, res, next) => {
        const {url} = req.body;
        const newTab = {
            id: uuidv4(),
            time: Date.now(),
            url
        };

        db.collection('documents').insertOne(newTab).then(() => {
            db.collection('documents').find({url}).count().then(occurrences => {
                res.status(201).send({
                    occurrences
                });
            });
        });
    });

    router.post('/count', (req, res, next) => {
        const {url} = req.body;
        db.collection('documents').find({url}).count().then(occurrences => {
            res.status(200).send({
                occurrences
            });
        });
    });

    router.post('/delete/:id', (req, res, next) => {
        const {id} = req.params;
        db.collection('documents').remove({id});
        res.redirect('/tabs');
    });

    return router;
};
