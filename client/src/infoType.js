module.exports = {
  showOnline: {
    Name: {
      dbEntry: "name",
      edit: true,
      info: "Enter the name of the company",
      required: true,
    },
    Website: {
      dbEntry: "website",
      edit: true,
      info:
        "Please add the website starting with 'https://'. If your website isn't TSL encrypted (the 's' in https), then we won't consider your website safe, and it will not be added to this site.",
      required: true,
    },
    Category: {
      dbEntry: "category",
      edit: true,
      info: "Please enter the category",
      required: true,
    },
    Tags: {
      dbEntry: "tags",
      edit: true,
      info: "Please enter relevant tags. Add commas between tags",
      required: true,
    },
    "Last Updated": {
      dbEntry: "dateLastUpdated",
      edit: false,
      info: "",
      required: false,
    },
    Added: {
      dbEntry: "dateAdded",
      edit: false,
      info: "",
      required: false,
    },
    "Nano Discount?": {
      dbEntry: "discount",
      edit: false,
      info: "If you give a discount if the user pays with Nano, please give let us know how much that discount is. Leave blank if you don't give a discount.",
      required: false,
    },
    Address: {
      dbEntry: "address",
      edit: true,
      info: "What is the public address of the company?",
      required: false,
    },
    "Country of Origin": {
      dbEntry: "countryOfOrigin",
      edit: true,
      info: "What country is the company from?",
      required: true
    },
    "Relevant For/ Ships To": {
      dbEntry: "regionRelevance",
      edit: true,
      info: "Which countries does the company ship to or is relevant for?",
      required: true,
    },
    "Contact E-mail": {
      dbEntry: "contactEmail",
      edit: true,
      info: "What is the contact email for the company?",
      required: false,
    },
    "Miscellaneous Notes": {
      dbEntry: "miscellaneousNotes",
      edit: true,
      info: "Anything else people should know?",
      required: false,
    },
  },
  showPhysical: {
    Name: {
      dbEntry: "name",
      edit: true,
      info: "Enter the name of the company",
    },
    Website: {
      dbEntry: "website",
      edit: true,
      info:
        "Please add the website starting with 'https://'. If your website isn't TSL encrypted (the 's' in https), then we won't consider your website safe, and it will not be added to this site.",
    },
    Category: {
      dbEntry: "category",
      edit: true,
      info: "Please enter the category",
    },
    Latitude: {
      dbEntry: "lat",
      edit: true,
      info: "Please enter the latitude of the position of the store.",
    },
    Longitude: {
      dbEntry: "long",
      edit: true,
      info: "Please enter the longitude of the position of the store.",
    },
    Tags: {
      dbEntry: "tags",
      edit: true,
      info: "Please enter relevant tags. Add commas between tags",
    },
    "Last Updated": {
      dbEntry: "dateLastUpdated",
      edit: false,
      info: "",
    },
    Added: {
      dbEntry: "dateAdded",
      edit: false,
      info: "",
    },
    "Nano Discount?": {
      dbEntry: "discount",
      edit: false,
      info: "",
    },
    "Contact E-mail": {
      dbEntry: "contactEmail",
      edit: true,
      info: "What is the contact email for the company?",
    },
    "Miscellaneous Notes": {
      dbEntry: "miscellaneousNotes",
      edit: true,
      info: "Anything else people should know?",
    },
  },
};
