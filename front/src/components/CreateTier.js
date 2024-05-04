import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTier.css';

const CreateTier = () => {
    const navigate = useNavigate();
    const [newTier, setNewTier] = useState({
        nom: '',
        email: '',
        lieu: '',
        telephone: '',
        prixoui:'',
        prixnon:''
    });

    const handleChange = (e) => {
        setNewTier({
            ...newTier,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/tier', newTier);
            navigate('/tier'); 
        } catch (error) {
            console.error('Error creating tier:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Ajouter Une société de livraison</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom du société de livraison</label>
                    <input
                        type="text"
                        name="nom"
                        value={newTier.nom}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le nom de la société'
                    />
                </div>
                
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={newTier.email}
                        onChange={handleChange}
                        required
                        placeholder='Entrez Email'
                    />
                </div>

                <div className='form-group'>
                    <label>Lieu</label>
                    <input
                        type="text"
                        name="lieu"
                        value={newTier.lieu}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le lieu'
                    />
                </div>

                <div className='form-group'>
                    <label>Téléphone</label>
                    <input
                        type="number"
                        name="telephone"
                        value={newTier.telephone}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le numero de  Telephone'
                    />
                </div>
                <div className='form-group'>
                        <label>Prix de livraison </label>
                        <input
                            type="number"
                            name="prixoui"
                            value={newTier.prixoui}
                            onChange={handleChange}
                            required
                            placeholder='Entrez le frais de livraison'
                        />
                    </div>

                    <div className='form-group'>
                        <label>Prix de retour </label>
                        <input
                            type="number"
                            name="prixnon"
                            value={newTier.prixnon}
                            onChange={handleChange}
                            required
                            placeholder='Entrez le frais de retour'
                        />
                    </div>
                <button className='custom-button' type='submit'>
                    Ajouter Société de livraison
                </button>
            </form>
        </div>
    );
};

export default CreateTier;
