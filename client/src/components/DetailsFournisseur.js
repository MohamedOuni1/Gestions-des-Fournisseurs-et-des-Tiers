import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailsFournisseur.css'; 

const DetailsFournisseur = () => {
    const { id } = useParams();
    const [fournisseur, setFournisseur] = useState(null);
    const [produit, setProduit] = useState(null);
    const [tier, setTier] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/fournisseur/${id}`);
                setFournisseur(response.data);

                const produitResponse = await axios.get(`http://localhost:3000/api/produit/${response.data.ProduitId}`);
                setProduit(produitResponse.data);

                const tierResponse = await axios.get(`http://localhost:3000/api/tier/${response.data.TierId}`);
                setTier(tierResponse.data);
            } catch (error) {
                console.error('Error fetching fournisseur:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-container">
            {fournisseur && (
                <>
                    <h2 className="details-title">
                        Détails du Fournisseur : {" "}
                        <span style={{ color: "red" }}>{fournisseur.Nom}</span> {/* Mettre le nom en rouge */}
                    </h2>               
                    <div className="details-content">
                        <p><span className="details-label">ID:</span> {fournisseur.id}</p>
                        <p><span className="details-label">Lieu:</span> {fournisseur.Lieu}</p>
                        <p><span className="details-label">Telephone:</span> {fournisseur.Tel}</p>
                        <p><span className="details-label1">Produit:</span> {produit && produit.nom}</p>
                        <p><span className="details-label1">Categorie :</span> {produit && produit.categorie}</p>

                        <p><span className="details-label1">Prix:</span> {fournisseur.Prix}</p>
                        <p><span className="details-label1">Quantité:</span> {fournisseur.Quantite}</p>
                        <p>
                            <span className="details-label1">Date d'expiration :</span>{" "}
                            {fournisseur.DateExpiration && new Date(fournisseur.DateExpiration).toLocaleDateString('fr-CA')}
                        </p>
                        <p><span className="details-label">Société de livraison:</span> {tier && tier.nom}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailsFournisseur;
