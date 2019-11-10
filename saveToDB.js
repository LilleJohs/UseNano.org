const OnlineStore = mongoose.model('OnlineStore');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    for (var i = 0; i < mDoc.length; i++) {
        var thisStore = mDoc[i];
        var newStore = new OnlineStore({
            name: thisStore.name,
            website: thisStore.websitelink,
            category: thisStore.category,
            tags: thisStore.tags,
            dateAdded: new Date(thisStore.timestamp),
            dateLastUpdated: new Date(thisStore.timestamp),
            discount: thisStore.discount,
            regionRelevance: thisStore.country,
        });
        console.log(newStore.tags);
        newStore.save(function (err, fluffy) {
            if (err) return console.error(err);
            console.log('Success');
        });
    }
    console.log('Success2');
});