import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateFournisseur.css';

const UpdateFournisseur = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fournisseur, setFournisseur] = useState({
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
        const fetchFournisseur = async () => {
            try {
                const responseFournisseur = await axios.get(`http://localhost:3000/api/fournisseur/${id}`);
                setFournisseur(responseFournisseur.data);

                const responseProduits = await axios.get('http://localhost:3000/api/produit');
                setProduits(responseProduits.data);

                const responseTiers = await axios.get('http://localhost:3000/api/tier'); // Ajout de la récupération des tiers
                setTiers(responseTiers.data);
            } catch (error) {
                console.error('Error fetching fournisseur:', error);
            }
        };

        fetchFournisseur();
    }, [id]);

    const handleChange = (e) => {
        setFournisseur({
            ...fournisseur,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/fournisseur/${id}`, fournisseur);
            navigate('/fournisseur'); 
        } catch (error) {
            console.error('Error updating fournisseur:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Modifier Fournisseur</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom Fournisseur</label>
                    <input
                        type="text"
                        name="Nom"
                        value={fournisseur.Nom}
                        onChange={handleChange}
                        required
                        placeholder='Enter le nouveau nom de fournisseur'
                    />
                </div>

                <div className='form-group'>
                    <label>Lieu</label>
                    <input
                        type="text"
                        name="Lieu"
                        value={fournisseur.Lieu}
                        onChange={handleChange}
                        required
                        placeholder='Enter le nouveau lieu de fournisseur'
                    />
                </div>
                <div className='form-group'>
                    <label>Tel</label>
                    <input
                        type="number"
                        name="Tel"
                        value={fournisseur.Tel}
                        onChange={handleChange}
                        required
                        placeholder='Enter le nouveau telephone de fournisseur'
                    />
                </div>

                <div className='form-group'>
                    <label>Produit :</label><br />
                    <select name="ProduitId" value={fournisseur.ProduitId || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez un produit</option>
                        {produits.map(produit => (
                            <option key={produit.id} value={produit.id}>{produit.nom}</option>
                        ))}
                    </select>
                </div>


                <div className='form-group'>
                    <label>Prix</label>
                    <input
                        type="number"
                        name="Prix"
                        value={fournisseur.Prix}
                        onChange={handleChange}
                        required
                        placeholder='Enter le nouveau prix de produit'
                    />
                </div>

                <div className='form-group'>
                    <label>Quantite</label>
                    <input
                        type="number"
                        name="Quantite"
                        value={fournisseur.Quantite}
                        onChange={handleChange}
                        required
                        placeholder='Enter quantite'
                    />
                </div>

                <div className='form-group'>
                    <label>Date Expiration</label>
                    <input
                        type="date"
                        name="DateExpiration"
                        value={fournisseur.DateExpiration}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label>Livraison :</label><br />
                    <select name="TierId" value={fournisseur.TierId || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez un nom du société de livraison</option>
                        {tiers.map(tier => (
                            <option key={tier.id} value={tier.id}>{tier.nom}</option>
                        ))}
                    </select>
                </div>



                <button className='custom-button' type='submit'>
                    Modifier fournisseur
                </button>
            </form>
        </div>
    );
};

export default UpdateFournisseur;
