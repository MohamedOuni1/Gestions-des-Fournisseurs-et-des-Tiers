import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './CreateProduit.css'; 

const CreateProduit = () => {
    const navigate = useNavigate();
    const [newProduit, setNewProduit] = useState({});

    const handleChange = (e) => {
        setNewProduit({
            ...newProduit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/produit', newProduit);
            navigate('/produit'); 
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Créer Produit</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom du produit</label>
                    <input
                        type="text"
                        name="nom"
                        value={newProduit.nom}
                        onChange={handleChange}
                        required
                        placeholder='écrire le nom du produit'
                    />
                </div>
                
                <div className='form-group'>
                    <label>Référence</label>
                    <input
                        type="text"
                        name="reference"
                        value={newProduit.reference}
                        onChange={handleChange}
                        required
                        placeholder='écrire le référence du produit'
                    />
                </div>

                <div className='form-group'>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={newProduit.description}
                        onChange={handleChange}
                        placeholder='écrire le description du produit'
                    ></textarea>
                </div>

                <div className='form-group'>
                    <label>Catégorie</label>
                    <input
                        type="text"
                        name="categorie"
                        value={newProduit.categorie}
                        onChange={handleChange}
                        placeholder='écrire le catégorie du produit'
                    />
                </div>

                <div className='form-group'>
                    <label>Images URL</label>
                    <input
                        type="text"
                        name="images"
                        value={newProduit.images}
                        onChange={handleChange}
                        placeholder="écrire url de l'image principale"
                    />
                </div>
                <input
                    type="text"
                    name="images1"
                    value={newProduit.images1}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
                <input
                    type="text"
                    name="images2"
                    value={newProduit.images2}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
                <input
                    type="text"
                    name="images3"
                    value={newProduit.images3}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
                <input
                    type="text"
                    name="images4"
                    value={newProduit.images4}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
                
                <button className='custom-button' type='submit'>
                    Ajouter Produit
                </button>
            </form>
        </div>
    );
};

export default CreateProduit;
