const slugify = require('slugify');
const db = require('../../database/db.config');
const Fournisseur = require('../models/fournisseurs.model');

const FournisseurController = {
    // Créer un nouveau fournisseur
    createFournisseur: async (req, res) => {
        try {
            const fournisseur = new Fournisseur(req.body);
            await fournisseur.save();
            res.status(201).json(fournisseur);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir tous les fournisseurs
    getAllFournisseurs: async (req, res) => {
        try {
            const fournisseurs = await Fournisseur.find();
            res.json(fournisseurs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir un fournisseur unique par son ID
    getFournisseurById: async (req, res) => {
        try {
            const fournisseur = await Fournisseur.findById(req.params.id);
            if (fournisseur) {
                res.json(fournisseur);
            } else {
                res.status(404).json({ message: 'fournisseur non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour un fournisseur
    updateFournisseur: async (req, res) => {
        try {
            const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (fournisseur) {
                res.json(fournisseur);
            } else {
                res.status(404).json({ message: 'Fournisseur non trouvé' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un fournisseur
    deleteFournisseur: async (req, res) => {
        try {
            const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
            if (fournisseur) {
                res.json({ message: 'Fournisseur supprimé' });
            } else {
                res.status(404).json({ message: 'Fournisseur non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = FournisseurController;
