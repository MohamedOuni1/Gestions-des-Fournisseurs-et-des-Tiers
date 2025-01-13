import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Fournisseur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

const Fournisseur = () => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [produitDetails, setProduitDetails] = useState({});
    const inputRef = useRef();

   
    

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/fournisseur');
            setFournisseurs(response.data);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]); // Include fetchData in the dependency array

    useEffect(() => {
        const fetchProduitDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produit');
                const details = {};
                response.data.forEach(produit => {
                    details[produit.id] = {
                        nom: produit.nom,
                        reference: produit.reference,
                        description: produit.description,
                        categorie: produit.categorie,
                    };
                });
                setProduitDetails(details);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduitDetails();
    }, []);

    const deleteFournisseur = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/fournisseur/${id}`);
            fetchData();
            setDeleteMsg(true);
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const filteredFournisseurs = fournisseurs.filter(fournisseur =>
        fournisseur.Nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container' ref={inputRef}>
            <nav className='flex'>
                <h1>Gestion des Fournisseurs</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher un fournisseur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link className='btn-primary' to='/fournisseur/create'>Créer un fournisseur</Link>
            </nav>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px'}}>
                    Le fournisseur a été supprimé avec succès.
                </div>
            )}
            <table className="table" >
                <thead  style={{ textAlign: 'center' }}>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Nom Fournisseur</th>
                        <th style={{ textAlign: 'center' }}>Nom produit</th>
                        <th style={{ textAlign: 'center' }}>Référence</th>
                        <th style={{ textAlign: 'center' }}>Prix</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody  style={{ textAlign: 'center' }}>
                    {filteredFournisseurs.map((fournisseur, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>{fournisseur.Nom}</td>
                            <td style={{ textAlign: 'center' }}>{produitDetails[fournisseur.ProduitId] ? produitDetails[fournisseur.ProduitId].nom : ''}</td>
                            <td style={{ textAlign: 'center' }}>{produitDetails[fournisseur.ProduitId] ? produitDetails[fournisseur.ProduitId].reference : ''}</td>
                            <td style={{ textAlign: 'center' }}>{fournisseur.Prix}</td>
                            <td className="action-buttons"  style={{ textAlign: 'center' }}>
                                <button onClick={() => deleteFournisseur(fournisseur.id)} style={buttonStyle}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link to={`/fournisseur/update/${fournisseur.id}`} style={buttonStyle}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Link to={`/fournisseur/details/${fournisseur.id}`} style={buttonStyle}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    margin: '0 5px',
    cursor: 'pointer',
    textDecoration: 'none', 
};

export default Fournisseur;
