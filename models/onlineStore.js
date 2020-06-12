const mongoose = require('mongoose');
const { Schema } = mongoose;

const onlineStoreSchema = new Schema({
    name: { type: String, required: true },
    website: { type: String, required: true },
    category: { type: String, required: true },
    tags: String,
    dateAdded: { type: Date, required: true },
    dateLastUpdated: Date,
    discount: String,
    countryOfOrigin: String,
    address: String,
    regionRelevance: String,
    contactEmail: String,
    miscellaneousNotes: String,
    img:
        { data: Buffer, contentType: String },
});

const onlineStoreUnapprovedSchema = new Schema({
    name: { type: String, required: true },
    website: { type: String, required: true },
    category: { type: String, required: true },
    oldId: String,
    tags: String,
    dateLastUpdated: Date,
    discount: String,
    countryOfOrigin: String,
    address: String,
    regionRelevance: String,
    contactEmail: String,
    miscellaneousNotes: String,
    img:
        { data: Buffer, contentType: String },
});

mongoose.model('OnlineStore', onlineStoreSchema, 'onlinestores');
mongoose.model('OnlineStoreUnapproved', onlineStoreUnapprovedSchema, 'onlinestores_unapproved');