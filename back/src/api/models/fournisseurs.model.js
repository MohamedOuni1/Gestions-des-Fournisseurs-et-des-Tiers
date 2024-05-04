// Importez Mongoose
const mongoose = require('mongoose');

// Définir le schéma
const Schema = mongoose.Schema;

// Créez le schéma pour le modèle Fournisseur
const FournisseurSchema = new Schema({
    Nom: { type: String, required: true },
    Lieu: { type: String, required: true },
    Tel: { type: Number, required: true },
    Prix: { type: Number, required: true },
    Quantite: { type: Number, required: true },
    DateExpiration: { type: Date, required: true },
    ProduitId: { type: Schema.Types.ObjectId, ref: 'Produit' }, 
    TierId: { type: Schema.Types.ObjectId, ref: 'Tier' }  
});

// Définissez une méthode toJSON pour personnaliser la représentation JSON des documents
FournisseurSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Créez le modèle Fournisseur
const Fournisseur = mongoose.model('Fournisseur', FournisseurSchema);

// Exportez le modèle
module.exports = Fournisseur;
