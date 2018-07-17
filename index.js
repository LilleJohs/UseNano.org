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

app.get('/db', async (req, res) => {
  //Send physical store data for front page
  try {
    var doc = yaml.safeLoad(fs.readFileSync("public/merchants.yml", 'utf8'));
    var search = req.query.search.toLowerCase();
    if (search !== "undefined") {
      newList = [];
      for (var i = 0; i < doc.length; i++) {
        if (doc[i].name.toLowerCase().includes(search) || doc[i].category.toLowerCase().includes(search)) {
          newList.push(doc[i]);
        }
      }
      res.send(newList);
    } else {
      res.send(doc);
    }
  } catch (e) {
    console.log(e);
  }
});

app.get('/mapdb', async (req, res) => {
  //Send map data
  try {
    var doc = yaml.safeLoad(fs.readFileSync("public/physical.yml", 'utf8'));
    res.send(doc);
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
