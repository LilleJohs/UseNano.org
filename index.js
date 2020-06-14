const express = require('express');
const cors = require('cors');
const formData = require('express-form-data')
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/onlineStore');

mongoose.connect(keys.mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

function httpsRedirect(req, res, next) {
  // Redirect to https
  if (req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  res.redirect(301, 'https://' + req.hostname + req.url);
}

app.set('trust proxy', true);

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());

require('./routes/approveStore')(app);
require('./routes/sendForm')(app);

const pDoc = yaml.safeLoad(fs.readFileSync('public/physical.yml', 'utf8'));

const ciSearch = (str, value) =>
  str != null && str.toLowerCase().includes(value.toLowerCase());

let allRecords;

setInterval(getLatest, 10 * 1000);
function getLatest() {
  const OnlineStore = mongoose.model('OnlineStore');

  OnlineStore.find({}, function (err, docs) {
    if (!err) {
      allRecords = docs;
    } else {
      throw err;
    }
  });
}

app.get('/db', async (req, res) => {
  //Send physical store data for front page
  try {
    const s = req.query.search;
    res.send(
      !s
        ? allRecords
        : allRecords.filter(
            (o) =>
              ciSearch(o['name'], s) ||
              ciSearch(o['category'], s) ||
              ciSearch(o['tags'], s)
          )
    );
  } catch (e) {
    console.log(e);
  }
});

app.get('/mapdb', async (req, res) => {
  //Send map data
  try {
    res.send(pDoc);
  } catch (e) {
    console.log(e);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(httpsRedirect);
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
