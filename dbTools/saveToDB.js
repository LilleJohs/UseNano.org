const mDoc = yaml.safeLoad(fs.readFileSync('public/merchants.yml', 'utf8'));
const OnlineStore = mongoose.model('OnlineStore');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    for (var i = 0; i < mDoc.length; i++) {
        const thisStore = mDoc[i];
        const storeLogo = thisStore.logo;
        let finalImg = null;
        if (storeLogo != 'none.png') {
            var img = fs.readFileSync(`./client/public/logos/${storeLogo}`);
            var encode_image = img.toString('base64');
            finalImg = {
                contentType: `image/${storeLogo.split('.')[1]}`,
                data:  new Buffer(encode_image, 'base64')
             };
        }

        var newStore = new OnlineStore({
            name: thisStore.name,
            website: thisStore.websitelink,
            category: thisStore.category,
            tags: thisStore.tags,
            dateAdded: new Date(thisStore.timestamp),
            dateLastUpdated: new Date(thisStore.timestamp),
            discount: thisStore.discount,
            regionRelevance: thisStore.country,
            img: finalImg
        });
        console.log(finalImg);
        newStore.save(function (err, fluffy) {
            if (err) return console.error(err);
            console.log('Success');
        });
    }
    console.log('Success2');
});