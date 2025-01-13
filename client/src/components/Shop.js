import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [produitDetails, setProduitDetails] = useState({});
    const [societeLivraisonDetails, setSocieteLivraisonDetails] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

  

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/fournisseur');
            setFournisseurs(response.data);
            const produitsResponse = await axios.get('http://localhost:3000/api/produit');
            const details = {};
            produitsResponse.data.forEach(produit => {
                details[produit.id] = {
                    nom: produit.nom,
                    reference: produit.reference
                };
            });
            setProduitDetails(details);
           

            const tiersResponse = await axios.get('http://localhost:3000/api/tier');
            const tiersDetails = {};
            tiersResponse.data.forEach(tier => {
                tiersDetails[tier.id] = {
                    nom: tier.nom,
                };
            });
            setSocieteLivraisonDetails(tiersDetails);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Include fetchData in the dependency array
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFournisseurs = fournisseurs.filter(fournisseur =>
        produitDetails[fournisseur.ProduitId] ? produitDetails[fournisseur.ProduitId].nom.toLowerCase().includes(searchTerm.toLowerCase()) : false
    );

    return (
        <div className='container'>
            <nav className='flex'>
                <h1>Voir Les Produits</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </nav>
           
            <table className="table" style={{ color: 'black' }}>
                <thead  style={{ textAlign: 'center' }}>
                    <tr  style={{ textAlign: 'center' }}>
                        <th  style={{ textAlign: 'center' }}>Nom Fournisseur</th>
                        <th  style={{ textAlign: 'center' }}>Nom produit</th>
                        <th  style={{ textAlign: 'center' }}>Référence</th>
                        <th  style={{ textAlign: 'center' }}>Société de livraison</th>
                        <th  style={{ textAlign: 'center' }}>Prix</th>
                    </tr>
                </thead>
                <tbody style={{ color: 'black' }}>
                    {filteredFournisseurs.map((fournisseur, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>
                                <Link to={`/fournisseur/details/${fournisseur.id}`} style={{ color: 'black' }}>{fournisseur.Nom}</Link>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <Link to={`/produit/details/${fournisseur.ProduitId}`} style={{ color: 'black', textDecoration: 'underline' }}>
                                    {produitDetails[fournisseur.ProduitId] ? produitDetails[fournisseur.ProduitId].nom : ''}
                                </Link>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {produitDetails[fournisseur.ProduitId] ? produitDetails[fournisseur.ProduitId].reference : ''}
                            </td>
                            <td style={{ textAlign: 'center', color: 'black' }}>
                                {societeLivraisonDetails[fournisseur.TierId] ? (
                                    <Link to={`/tier/details/${fournisseur.TierId}`} style={{ color: 'black', textDecoration: 'underline' }}>
                                        {societeLivraisonDetails[fournisseur.TierId].nom}
                                    </Link>
                                ) : ''}
                            </td>
                            <td style={{ textAlign: 'center' }}>{fournisseur.Prix}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Shop;
