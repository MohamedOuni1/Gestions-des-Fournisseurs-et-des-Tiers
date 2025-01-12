const slugify = require('slugify');
const db = require('../../database/db.config');
const Tier = require('../models/tiers.model');


const TierController = {
    // Create a new tier
    createTier: async (req, res) => {
        try {
            const tier = new Tier(req.body);
            await tier.save();
            res.status(201).json(tier);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Find all tiers
    getAllTiers: async (req, res) => {
        try {
            const tiers = await Tier.find();
            res.json(tiers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

     // Obtenir un tier unique par son ID
     getTierById: async (req, res) => {
        try {
            const tier = await Tier.findById(req.params.id);
            if (tier) {
                res.json(tier);
            } else {
                res.status(404).json({ message: 'Tier non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour un tier
    updateTier: async (req, res) => {
        try {
            const tier = await Tier.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (tier) {
                res.json(tier);
            } else {
                res.status(404).json({ message: 'tier non trouvé' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un tier
    deleteTier: async (req, res) => {
        try {
            const tier = await Tier.findByIdAndDelete(req.params.id);
            if (tier) {
                res.json({ message: 'tier supprimé' });
            } else {
                res.status(404).json({ message: 'tier non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = TierController;