module.exports = app => {
  const router = require('express').Router();
  const fournisseurController = require('../controllers/fournisseurs.controller');
  const tierController = require('../controllers/tiers.controller');
  const produitController = require('../controllers/produits.controller'); // Importez le contrôleur des produits

  // Routes pour les tiers
  router.post('/tier', tierController.createTier);
  router.get('/tier', tierController.getAllTiers);
  router.get('/tier/:id', tierController.getTierById);
  router.put('/tier/:id', tierController.updateTier);
  router.delete('/tier/:id', tierController.deleteTier);


  // Routes pour les produits
  router.post('/produit', produitController.createProduct); // Créer un nouveau produit
  router.get('/produit', produitController.getAllProducts); // Obtenir tous les produits
  router.get('/produit/:id', produitController.getProductById); // Obtenir un produit par son ID
  router.put('/produit/:id', produitController.updateProduct); // Mettre à jour un produit
  router.delete('/produit/:id', produitController.deleteProduct); // Supprimer un produit

  // Routes pour le s fournisseurs
  router.post('/fournisseur', fournisseurController.createFournisseur);
  router.get('/fournisseur', fournisseurController.getAllFournisseurs);
  router.get('/fournisseur/:id', fournisseurController.getFournisseurById);
  router.put('/fournisseur/:id', fournisseurController.updateFournisseur);
  router.delete('/fournisseur/:id', fournisseurController.deleteFournisseur);


  // Utilisez le routeur pour gérer les routes
  app.use('/api/', router);
}
