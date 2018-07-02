const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

const app = express();

function wwwRedirect(req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    }
    next();
};

app.set('trust proxy', true);
app.use(wwwRedirect);

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/db', async (req, res) => {
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

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
