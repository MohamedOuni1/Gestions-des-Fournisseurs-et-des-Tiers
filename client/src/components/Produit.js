import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Produit.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

const Produit = () => {
    const [produits, setProduits] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef();



    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/produit');
            setProduits(response.data);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]); // Include fetchData in the dependency array
    
    const deleteProduit = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/produit/${id}`);
            fetchData();
            setDeleteMsg(true);
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProduits = produits.filter(produit =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container' ref={inputRef}>
            <nav className='flex'>
                <h1>Gestion des Produits</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link className='btn-primary' to='/produit/create'>Créer un Produit</Link>
            </nav>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px'}}>
                    Le produit a été supprimé avec succès.
                </div>
            )}
            <table className="produits-table">
                <thead>
                    <tr>
                        <th  style={{ textAlign: 'center' }}>Nom</th>
                        <th  style={{ textAlign: 'center' }}>Référence</th>
                        <th  style={{ textAlign: 'center' }}>Image</th>
                        <th  style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody  style={{ textAlign: 'center' }}>
                    {filteredProduits.map((produit) => (
                        <tr key={produit._id}>
                            <td>{produit.nom}</td>
                            <td>{produit.reference}</td>
                            <td>
                                {/* Utilisez une image miniature ou réduite au lieu de l'image de taille complète */}
                                <img
                                    src={produit.images}
                                    alt="Produit"
                                    className="product-image"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                                />
                            </td>
                            <td className="action-buttons"  style={{ textAlign: 'center' }}>
                                <button onClick={() => deleteProduit(produit.id)} style={buttonStyle}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link to={`/produit/update/${produit.id}`} style={buttonStyle}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Link to={`/produit/details/${produit.id}`} style={buttonStyle}>
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

export default Produit;
