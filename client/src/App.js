import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

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
    return (
        <div className="App">
            <BrowserRouter>
                <nav className="Nav">
                    <div className="NavLeft">
                        <NavLink to="/shop" className="NavLink" >OUNIMED</NavLink>
                    </div>
                    <div className="NavRight">
                        <ul className="NavList">

                                    <li className="NavItem">
                                        <NavLink to="/fournisseur" className="NavLink" >Gestion des fournisseurs</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/produit" className="NavLink" >Gestion des Produits</NavLink>
                                    </li>
                                    <li className="NavItem">
                                        <NavLink to="/tier" className="NavLink" >Gestion des Livraison</NavLink>
                                    </li>
                                  
                               
                        </ul>
                    </div>
                </nav>
                <Routes>
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
                 
                    <Route path="/shop" element={<Shop />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
