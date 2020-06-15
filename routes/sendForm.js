const axios = require('axios');
const mongoose = require('mongoose');
const OnlineStoreUnapproved = mongoose.model('OnlineStoreUnapproved');
const keys = require('../config/keys');
const multer = require('multer');
const fs = require('fs');

module.exports = (app) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    },
  });

  var upload = multer({ storage: storage });

  app.post('/sendform', upload.single('logo'), async (req, res) => {
    const reqBody = req.body;
    // const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${keys.captchaSecret}&response=${req.body.captchaValue}`);
    console.log(reqBody);

    if (req.file != null) {
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        var finalImg = {
            contentType: req.file.mimetype,
            data:  new Buffer(encode_image, 'base64')
         };
    }
    

    if (true === true) {
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
        img: req.file != null ? finalImg : null
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
};
