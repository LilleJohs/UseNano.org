const axios = require('axios');
const mongoose = require('mongoose');
const OnlineStore = mongoose.model('OnlineStore');
const OnlineStoreUnapproved = mongoose.model('OnlineStoreUnapproved');
const keys = require('../config/keys');

module.exports = app => {
    app.get('/approveUserAuth', async (req, res) => {
        const userid = req.query.userid;
        const secret = keys.approveSecret;
        if (userid === secret) {
            let allUnapprovedRecords;
            OnlineStoreUnapproved.find({}, function (err, docs) {
                if (!err) {
                    res.send(docs);
                } else { throw err; }
            });
        } else {
            res.status(401).send('You are not allowed in');
        }
    });

    app.get('/approveStoreAuth', async (req, res) => {
        const userid = req.query.userid;
        const storeid = req.query.storeid;
        const secret = keys.approveSecret;
        if (userid === secret) {
            let allUnapprovedRecords;
            OnlineStoreUnapproved.findById(storeid, function (err, doc) {
                if (!err) {
                    console.log(doc);
                    // Add to ordinary database

                    var newApprovedStore = new OnlineStore({
                        name: doc.name,
                        website: doc.website,
                        category: doc.category,
                        tags: doc.tags,
                        dateAdded: new Date(),
                        dateLastUpdated: new Date(),
                        discount: doc.discount,
                        regionRelevance: doc.regionRelevance,
                        countryOfOrigin: doc.countryOfOrigin,
                        address: doc.address,
                        contactEmail: doc.contactEmail,
                        miscellaneousNotes: doc.miscellaneousNotes,
                    });

                    newApprovedStore.save(function (err, newApprovedStore) {
                        if (err) return console.error(err);
                        OnlineStoreUnapproved.deleteOne({ _id: storeid }, function (err) {
                            if (err) {
                                console.log('Error deleting from unapproved database after adding to approved database');
                                res.status(401).send('Error deleting from unapproved database after adding to approved database');
                            } else {
                                console.log('Success');
                                res.status(200).send('Ok');
                            }
                        });
                    });
                    
                } else { throw err; }
            });
        } else {
            res.status(401).send('You are not allowed in');
        }
    });
}