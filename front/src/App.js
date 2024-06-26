import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';

import Fournisseur from './components/Fournisseur';
import CreateFournisseur from './components/CreateFournisseur';
import UpdateFournisseur from './components/UpdateFournisseur';
import DetailsFournisseur from './components/DetailsFournisseur';

import Produit from './components/Produit';
import CreateProduit from './components/CreateProduit';
import UpdateProduit from './components/UpdateProduit';
import DetailsProduit from './components/DetailsProduit';

import Tier from './components/Tier';
import CreateTier from './components/CreateTier';
import UpdateTier from './components/UpdateTier';
import DetailsTier from './components/DetailsTier';

import Shop from './components/Shop';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') === 'true'; 
        setIsAuthenticated(isAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <nav className="Nav">
                    <div className="NavLeft">
                        <NavLink to="/shop" className="NavLink" activeClassName="active">OUNIMED</NavLink>
                    </div>
                    <div className="NavRight">
                        <ul className="NavList">
                            {isAuthenticated ? (
                                <>
                                    <li className="NavItem">
                                        <NavLink to="/shop" className="NavLink" activeClassName="active">Espace client</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/fournisseur" className="NavLink" activeClassName="active">Gestion des fournisseurs</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/produit" className="NavLink" activeClassName="active">Gestion des Produits</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/tier" className="NavLink" activeClassName="active">Gestion des Livraison</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink
                                            to="/logout"
                                            className="NavLink"
                                            activeClassName="active"
                                            onClick={handleLogout}
                                            style={{ backgroundColor: 'red', border: '2px solid red' }}
                                        >
                                            Log out
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="NavItem">
                                        <NavLink to='/login' className="NavLink" activeClassName="active">Log IN</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to='/register' className="NavLink" activeClassName="active">Register</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/fournisseur" element={<Fournisseur />} />
                            <Route path="/fournisseur/create" element={<CreateFournisseur />} />
                            <Route path="/fournisseur/update/:id" element={<UpdateFournisseur />} />
                            <Route path="/fournisseur/details/:id" element={<DetailsFournisseur />} />
                            <Route path="/produit" element={<Produit />} />
                            <Route path="/produit/create" element={<CreateProduit />} />
                            <Route path="/produit/update/:id" element={<UpdateProduit />} />
                            <Route path="/produit/details/:id" element={<DetailsProduit />} />
                            <Route path="/tier" element={<Tier />} />
                            <Route path="/tier/create" element={<CreateTier />} />
                            <Route path="/tier/update/:id" element={<UpdateTier />} />
                            <Route path="/tier/details/:id" element={<DetailsTier />} />
                        </>
                    ) : (
                        <>
                            <Route path='/login' element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                            <Route path='/register' element={<Register />} />
                        </>
                    )}
                    <Route path="/shop" element={<Shop />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
