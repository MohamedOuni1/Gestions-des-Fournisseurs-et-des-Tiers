const slugify = require('slugify');
const db = require('../../database/db.config');
const Produit = require('../models/produits.model');

const ProduitController = {
    // Créer un nouveau produit
    createProduct: async (req, res) => {
        try {
            const produit = new Produit(req.body);
            await produit.save();
            res.status(201).json(produit);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir tous les produits
    getAllProducts: async (req, res) => {
        try {
            const produits = await Produit.find();
            res.json(produits);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir un produit unique par son ID
    getProductById: async (req, res) => {
        try {
            const produit = await Produit.findById(req.params.id);
            if (produit) {
                res.json(produit);
            } else {
                res.status(404).json({ message: 'Produit non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour un produit
    updateProduct: async (req, res) => {
        try {
            const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (produit) {
                res.json(produit);
            } else {
                res.status(404).json({ message: 'Produit non trouvé' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un produit
    deleteProduct: async (req, res) => {
        try {
            const produit = await Produit.findByIdAndDelete(req.params.id);
            if (produit) {
                res.json({ message: 'Produit supprimé' });
            } else {
                res.status(404).json({ message: 'Produit non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ProduitController;
