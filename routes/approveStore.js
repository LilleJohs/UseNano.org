const axios = require('axios');
const mongoose = require('mongoose');
const OnlineStore = mongoose.model('OnlineStore');
const OnlineStoreUnapproved = mongoose.model('OnlineStoreUnapproved');
const keys = require('../config/keys');

module.exports = app => {
    app.get('/approveStoreAuth', async (req, res) => {
        const id = req.query.id;
        const secret = keys.approveSecret;
        if (id === secret) {
            let allUnapprovedRecords;
            OnlineStoreUnapproved.find({}, function (err, docs) {
                if (!err) {
                    res.send(docs);
                } else { throw err; }
            });
        } else {
            res.status(401).send('Feilfeil');
        }
    });
}