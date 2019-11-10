const axios = require('axios');
const mongoose = require('mongoose');
const OnlineStoreUnapproved = mongoose.model('OnlineStoreUnapproved');
const keys = require('../config/keys');

module.exports = app => {
    app.post('/sendForm', async (req, res) => {
        const reqBody = req.body;
        const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${keys.captchaSecret}&response=${req.body.captchaValue}`);
        console.log(captchaRes.data);
        if (captchaRes.data.success === true) {
            var newStore = new OnlineStoreUnapproved({
                name: reqBody.name,
                oldId: reqBody._id,
                website: reqBody.website,
                category: reqBody.category,
                tags: reqBody.tags,
                dateLastUpdated: new Date(),
                discount: reqBody.discount,
                regionRelevance: reqBody.regionRelevance,
                countryOfOrigin: reqBody.countryOfOrigin,
                address: reqBody.address,
                contactEmail: reqBody.contactEmail,
                miscellaneousNotes: reqBody.miscellaneousNotes,
            });
            newStore.save(function (err, store) {
                if (err) return console.error(err);
                console.log('Success');
            });
            res.status(200).send('Ok');
        } else {
            res.status(401).send('Captcha not correct');
        }
    });
}