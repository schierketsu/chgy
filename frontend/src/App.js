import React from 'react';
import Home from './components/home.js';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrganizationPage from './components/OrganizationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/organization/:id" element={<OrganizationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
