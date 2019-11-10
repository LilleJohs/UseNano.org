const mongoose = require('mongoose');
const { Schema } = mongoose;

const physicalStoreSchema = new Schema({
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    address: String,
    website: String,
    category: { type: String, required: true },
    tags: String,
    dateAdded: { type: Date, required: true },
    dateLastUpdated: Date,
    discount: String,
    contactEmail: String,
    miscellaneousNotes: String,
    img:
        { data: Buffer, contentType: String },
});

mongoose.model('physicalStore', physicalStoreSchema);