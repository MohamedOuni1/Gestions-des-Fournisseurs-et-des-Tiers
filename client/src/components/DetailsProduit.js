import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailsProduit.css'; 

const DetailsProduit = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produit/${id}`);
                setProduit(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-container">
            <h2 className="details-title">
                Détails du Produit : {" "}
                {produit && <span style={{ color: "red" }}>{produit.nom}</span>} {/* Mettre le nom en rouge si produit n'est pas null */}
            </h2>
            <div className="details-content">
                <p><span className="details-label">ID:</span> {produit && produit.id}</p>
                <p><span className="details-label">Référence:</span> {produit && produit.reference}</p>
                <p><span className="details-label">Description:</span> {produit && produit.description}</p>
                <p><span className="details-label">Catégorie:</span> {produit && produit.categorie}</p>
                <div className="image-container">
                    <span className="details-label">Image:</span>
                    <div className="image-wrapper">
                        {produit && (
                            <img 
                                src={produit.images}
                                alt="Produit"
                                className="product-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                        {produit && (
                            <img
                                src={produit.images1}
                                alt="Produit"
                                className="product-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                        {produit && (
                            <img
                                src={produit.images2}
                                alt="Produit"
                                className="product-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                        {produit && (
                            <img
                                src={produit.images3}
                                alt="Produit"
                                className="product-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                        {produit && (
                            <img
                                src={produit.images4}
                                alt="Produit"
                                className="product-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsProduit;
