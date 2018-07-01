const express = require('express');
const keys = require('./config/keys');
const cors = require('cors');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/db', async (req, res) => {
  try {
    var doc = yaml.safeLoad(fs.readFileSync(keys.path, 'utf8'));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
