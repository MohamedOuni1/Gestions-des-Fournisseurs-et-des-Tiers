import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailsProduit.css'; 

const DetailsTier = () => {
    const { id } = useParams();
    const [tier, setTier] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tier/${id}`);
                setTier(response.data);
            } catch (error) {
                console.error('Error fetching tier:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-container">
            <h2 className="details-title">
                Détails du Société de livraison : {" "}
                {tier && <span style={{ color: "red" }}>{tier.nom}</span>} 
            </h2>
            <div className="details-content">
                <p><span className="details-label">ID:</span> {tier && tier.id}</p>
                <p><span className="details-label">Telephone:</span> {tier && tier.telephone}</p>
                <p><span className="details-label">Email:</span> {tier && tier.email}</p>
                <p><span className="details-label">Lieu:</span> {tier && tier.lieu}</p>
                <p><span className="details-label">Frais de livraison:</span> {tier && tier.prixoui}</p>
                <p><span className="details-label">Frais de Retour:</span> {tier && tier.prixnon}</p>
            </div>
        </div>
    );
};

export default DetailsTier;
