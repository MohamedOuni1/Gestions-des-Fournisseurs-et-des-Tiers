import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './CreateFournisseur.css'; 

const CreateFournisseur = () => {
    const navigate = useNavigate();
    const [newFournisseur, setNewFournisseur] = useState({
        Nom: '',
        Lieu: '',
        Tel: '',
        Prix: '',
        Quantite: '',
        DateExpiration: '',
        ProduitId: '',
        TierId: ''
    });
    const [produits, setProduits] = useState([]);
    const [tiers, setTiers] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produit');
                setProduits(response.data);
            } catch (error) {
                console.error('Error fetching produits:', error);
            }
        };

        const fetchTiers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/tier');
                setTiers(response.data);
            } catch (error) {
                console.error('Error fetching tiers:', error);
            }
        };

        fetchProduits();
        fetchTiers();
    }, []);

    const handleChange = (e) => {
        setNewFournisseur({
            ...newFournisseur,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/fournisseur', newFournisseur);
            navigate('/fournisseur'); 
        } catch (error) {
            console.error('Error creating fournisseur:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Créer un Fournisseur</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom Fournisseur</label>
                    <input
                        type="text"
                        name="Nom"
                        value={newFournisseur.Nom || ''}
                        onChange={handleChange}
                        required
                        placeholder='Saisir le nom du fournisseur'
                    />
                </div>

                <div className='form-group'>
                    <label>Lieu de fournisseur</label>
                    <input
                        type="text"
                        name="Lieu"
                        value={newFournisseur.Lieu || ''}
                        onChange={handleChange}
                        required
                        placeholder='Saisir le lieu du locale du Fournisseur'
                    />
                </div>

                <div className='form-group'>
                    <label>Téléphone</label>
                    <input
                        type="number"
                        name="Tel"
                        value={newFournisseur.Tel || ''}
                        onChange={handleChange}
                        required
                        placeholder='Saisir le numéro de téléphone du Fournisseur'
                    />
                </div>

                <div className='form-group'>
                    <label>Produit :</label><br />
                    <select name="ProduitId" value={newFournisseur.ProduitId || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez un nom du Produit</option>
                        {produits.map(produit => (
                            <option key={produit.id} value={produit.id}>{produit.nom}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Prix de produit </label>
                    <input
                        type="number"
                        name="Prix"
                        value={newFournisseur.Prix || ''}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le prix'
                    />
                </div>

                <div className='form-group'>
                    <label>Quantité</label>
                    <input
                        type="number"
                        name="Quantite"
                        value={newFournisseur.Quantite || ''}
                        onChange={handleChange}
                        required
                        placeholder='Entrez la quantité'
                    />
                </div>

                <div className='form-group'>
                    <label>Date d'expiration</label>
                    <input
                        type="date"
                        name="DateExpiration"
                        value={newFournisseur.DateExpiration || ''}
                        onChange={handleChange}
                        required
                        placeholder='Saisir la Date dexpiration'

                    />
                </div>
                <div className='form-group'>
                    <label>Livraison :</label><br />
                    <select name="TierId" value={newFournisseur.TierId || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez un nom du société de livraison</option>
                        {tiers.map(tier => (
                            <option key={tier.id} value={tier.id}>{tier.nom}</option>
                        ))}
                    </select>
                </div>

                <button className='custom-button' type='submit'>
                    Ajouter Fournisseur
                </button>
            </form>
        </div>
    );
};

export default CreateFournisseur;
