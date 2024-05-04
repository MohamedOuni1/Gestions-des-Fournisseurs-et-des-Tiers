const config = require('../config/config');
const mongoose = require('mongoose');
const db = {};

// Configuration de la base de données
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URL, { useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

db.mongoose = mongoose;
db.url = config.DB_URL;
db.fournisseurs = require('../api/models/fournisseurs.model')(mongoose);
db.produits = require('../api/models/produits.model')(mongoose);
db.tiers = require('../api/models/tiers.model')(mongoose);

module.exports = db;
