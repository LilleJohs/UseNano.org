const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

const app = express();

app.set('trust proxy', true);

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

const mDoc = yaml.safeLoad(fs.readFileSync("public/merchants.yml", 'utf8'));
const pDoc = yaml.safeLoad(fs.readFileSync("public/physical.yml", 'utf8'));

const ciSearch = (str, value) => str.toLowerCase().includes(value.toLowerCase());

app.get('/db', async (req, res) => {
  //Send physical store data for front page
  try {
    const s = req.query.search;
    res.send(!s ? mDoc : mDoc.filter(o => ciSearch(o['name'], s) || ciSearch(o['category'], s) || ciSearch(o['tags'], s)));
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
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
