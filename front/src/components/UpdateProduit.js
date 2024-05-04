import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateProduit.css'; 

const UpdateProduit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [produit, setProduit] = useState({
        nom: '',
        reference: '',
        description: '',
        categorie: '',
        images: '',
        images1: '',
        images2: '',
        images3: '',
        images4: ''
    });

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produit/${id}`);
                setProduit(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduit();
    }, [id]);

    const handleChange = (e) => {
        setProduit({
            ...produit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/produit/${id}`, produit);
            navigate('/produit'); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Modifier le produit</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={produit.nom}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le nom'
                    />
                </div>

                <div className='form-group'>
                    <label>Référence</label>
                    <input
                        type="text"
                        name="reference"
                        value={produit.reference}
                        onChange={handleChange}
                        required
                        placeholder='Entrez la référence'
                    />
                </div>

              

                <div className='form-group'>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={produit.description}
                        onChange={handleChange}
                        required
                        placeholder='Entrez la description'
                    />
                </div>

                <div className='form-group'>
                    <label>Catégorie</label>
                    <input
                        type="text"
                        name="categorie"
                        value={produit.categorie}
                        onChange={handleChange}
                        required
                        placeholder='Entrez la catégorie'
                    />
                </div>
                <div className='form-group'>
                    <label>Images URL</label>
                    <input
                        type="text"
                        name="images"
                        value={produit.images}
                        onChange={handleChange}
                        placeholder='Entrez les URLs des images, séparées par des virgules'
                    />

                    <input
                        type="text"
                        name="images1"
                        value={produit.images1}
                        onChange={handleChange}
                        placeholder='Entrez les URLs des images, séparées par des virgules'
                    />


                    <input
                        type="text"
                        name="images2"
                        value={produit.images2}
                        onChange={handleChange}
                        placeholder='Entrez les URLs des images, séparées par des virgules'
                    />


                    <input
                        type="text"
                        name="images3"
                        value={produit.images3}
                        onChange={handleChange}
                        placeholder='Entrez les URLs des images, séparées par des virgules'
                    />


                    <input
                        type="text"
                        name="images4"
                        value={produit.images4}
                        onChange={handleChange}
                        placeholder='Entrez les URLs des images, séparées par des virgules'
                    />

                </div>
                <button className='custom-button' type='submit'>
                    Mettre à jour le produit
                </button>
            </form>
        </div>
    );
};

export default UpdateProduit;
