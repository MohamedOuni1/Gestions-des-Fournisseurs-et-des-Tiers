import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import './Produit.css';

const Tier = () => {
    const [tiers, setTiers] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef();


    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tier'); 
            setTiers(response.data);
        } catch (error) {
            console.error('Failed to fetch tier:', error);
        }
    }, []);

    const deleteTier = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tier/${id}`); 
            fetchData();
            setDeleteMsg(true);
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Failed to delete tier:', error);
        }
    };
  useEffect(() => {
        fetchData();
    }, [fetchData]); // Include fetchData in the dependency array
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }; 

    const filteredTiers = tiers.filter(tier =>
        tier.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container' ref={inputRef}>
            <nav className='flex'>
                <h1>Gestion des Sociétés de livraison</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher une société ..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link className='btn-primary' to='/tier/create'>Créer une société</Link>
            </nav>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px'}}>
                    La société a été supprimée avec succès.
                </div>
            )}
            <table className="produits-table" style={{ textAlign: 'center' }}>
                <thead style={{ textAlign: 'center' }} >
                    <tr>
                        <th style={{ textAlign: 'center' }}>Nom</th>
                        <th style={{ textAlign: 'center' }}>Telephone</th>
                        <th style={{ textAlign: 'center' }}>Frais de Livraison</th>
                        <th style={{ textAlign: 'center' }}>Frais de Retour</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody  style={{ textAlign: 'center' }}>
                    {filteredTiers.map((tier) => (
                        <tr key={tier._id}>
                            <td>{tier.nom}</td>
                            <td>{tier.telephone}</td>
                            <td>{tier.prixoui}</td>
                            <td>{tier.prixnon}</td>
                            <td  style={{ textAlign: 'center' }}>
                                <button onClick={() => deleteTier(tier.id)} style={buttonStyle}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link to={`/tier/update/${tier.id}`} style={buttonStyle}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Link to={`/tier/details/${tier.id}`} style={buttonStyle}>
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

export default Tier;
