import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateProduit.css'; 

const UpdateTier = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [tier, setTier] = useState({
        nom: '',
        email: '',
        telephone: '',
        lieu: '',
        prixoui:'',
        prixnon:''
    });

    useEffect(() => {
        const fetchTier = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tier/${id}`);
                setTier(response.data);
            } catch (error) {
                console.error('Error fetching tier:', error);
            }
        };

        fetchTier();
    }, [id]);


    const handleChange = (e) => {
        setTier({
            ...tier,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/tier/${id}`, tier);
            navigate('/tier'); // Redirect to supplier list page
        } catch (error) {
            console.error('Error updating tier:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Modifier la société de livraison</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={tier.nom}
                        onChange={handleChange}
                        required
                        placeholder='Enter name'
                    />
                </div>
                
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={tier.email}
                        onChange={handleChange}
                        required
                        placeholder='Enter Email'
                    />
                </div>

               



              
                <div className='form-group'>
                    <label>Lieu</label>
                    <input
                        type="text"
                        name="lieu"
                        value={tier.lieu}
                        onChange={handleChange}
                        placeholder='Enter lieu'
                    />                
                </div>

               

                <div className='form-group'>
                    <label>Telephone</label>
                    <input
                        type="number"
                        name="telephone"
                        value={tier.telephone}
                        onChange={handleChange}
                        placeholder='Enter Telepohone'
                    />             
                </div>

                <div className='form-group'>
                    <label>Frais de livraison </label>
                    <input
                        type="number"
                        name="prixoui"
                        value={tier.prixoui}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le frais de livraison'
                    />
                </div>

                <div className='form-group'>
                    <label>Frais de retour </label>
                    <input
                        type="number"
                        name="prixnon"
                        value={tier.prixnon}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le frais de retour'
                    />
                </div>

                <button className='custom-button' type='submit'>
                    Modifier Société de livraison
                </button>
            </form>
        </div>
    );
};

export default UpdateTier;
