const express = require("express");
const cors = require("cors");
const formData = require("express-form-data");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/onlineStore");
require("./models/physicalStore");

mongoose.connect(keys.mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

function httpsRedirect(req, res, next) {
  // Redirect to https
  if (req.headers["x-forwarded-proto"] === "https") {
    return next();
  }
  res.redirect(301, "https://" + req.hostname + req.url);
}

app.set("trust proxy", true);

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());

require("./routes/approveStore")(app);
require("./routes/sendForm")(app);

const ciSearch = (str, value) =>
  str != null && str.toLowerCase().includes(value.toLowerCase());

let allOnlineStoreRecords;
let allPhysicalStoreRecords;

setInterval(getLatest, 100 * 1000);
getLatest();
function getLatest() {
  const OnlineStore = mongoose.model("OnlineStore");
  const PhysicalStore = mongoose.model("PhysicalStore");

  OnlineStore.find({}, function (err, docs) {
    if (!err) {
      allOnlineStoreRecords = docs;
    } else {
      throw err;
    }
  });
  PhysicalStore.find({}, function (err, docs) {
    if (!err) {
      allPhysicalStoreRecords = docs;
    } else {
      throw err;
    }
  });
}

app.get("/db", async (req, res) => {
  //Send physical store data for front page
  try {
    const s = req.query.search;
    res.send(
      !s
        ? allOnlineStoreRecords
        : allOnlineStoreRecords.filter(
            (o) =>
              ciSearch(o["name"], s) ||
              ciSearch(o["category"], s) ||
              ciSearch(o["tags"], s)
          )
    );
  } catch (e) {
    console.log(e);
  }
});

app.get("/mapdb", async (req, res) => {
  //Send map data
  try {
    res.send(allPhysicalStoreRecords);
  } catch (e) {
    console.log(e);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(httpsRedirect);
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
