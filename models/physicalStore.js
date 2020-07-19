const mongoose = require("mongoose");
const { Schema } = mongoose;

const physicalStoreSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  address: { type: String, required: true },
  website: String,
  category: { type: String, required: true },
  tags: String,
  dateAdded: { type: Date, required: true },
  dateLastUpdated: Date,
  discount: String,
  contactEmail: String,
  miscellaneousNotes: String,
  img: { data: Buffer, contentType: String },
});

const physicalStoreUnapprovedSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  address: { type: String, required: true },
  website: String,
  category: { type: String, required: true },
  oldId: String,
  tags: String,
  dateAdded: { type: Date, required: true },
  dateLastUpdated: Date,
  discount: String,
  contactEmail: String,
  miscellaneousNotes: String,
  img: { data: Buffer, contentType: String },
});

mongoose.model("PhysicalStore", physicalStoreSchema, "physicalstores");
mongoose.model(
  "PhysicalStoreUnapproved",
  physicalStoreUnapprovedSchema,
  "physicalstores_unapproved"
);
