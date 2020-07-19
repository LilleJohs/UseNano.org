const mDoc = yaml.safeLoad(fs.readFileSync("public/physical.yml", "utf8"));
const PhysicalStore = mongoose.model("PhysicalStore");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  for (var i = 0; i < mDoc.length; i++) {
    const thisStore = mDoc[i];

    var newStore = new PhysicalStore({
      name: thisStore.name,
      website: thisStore.website,
      category: thisStore.category,
      dateAdded: new Date(thisStore.timestamp),
      dateLastUpdated: new Date(thisStore.timestamp),
      discount: thisStore.discount,
      lat: thisStore.lat,
      long: thisStore.lng,
      address: "None",
    });
    newStore.save(function (err, fluffy) {
      if (err) return console.error(err);
      console.log("Success");
    });
  }
  console.log("Success: Save to physical db");
});
