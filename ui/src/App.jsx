import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Patrimoine from './pages/Patrimoine';
import ListPossession from './pages/ListPossession';
import CreatePossession from './pages/CreatePossession';
import UpdatePossession from './pages/UpdatePossession';
import PatrimoineGraph from './pages/PatrimoineGraph';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/patrimoine" element={<Patrimoine />} />
          <Route path="/possession" element={<ListPossession />} />
          <Route path="/possession/create" element={<CreatePossession />} />
          <Route path="/possession/update/:libelle" element={<UpdatePossession />} />
          <Route path='/patrimoine/graph' element={<PatrimoineGraph />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;