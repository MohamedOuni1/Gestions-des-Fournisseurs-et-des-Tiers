// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema;

// Create the schema for the Tier model
const TierSchema = new Schema({
    nom: { type: String, required: true },
    email: { type: String },
    telephone: { type: Number, required: true },
    lieu: { type: String },
    prixoui: { type: Number, required: true },
    prixnon: { type: Number, required: true }

});

// Define a toJSON method to customize the JSON representation of documents
TierSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Create the Tier model
const Tier = mongoose.model('Tier', TierSchema);

// Export the model
module.exports = Tier;
