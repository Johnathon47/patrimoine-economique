import { useEffect, useState } from 'react'
import './App.css'
import Possession from '../../models/possessions/Possession'

function App() {
  const [inputValue, setInputValue] = useState('');

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
    .then(response => response.json())
    .then(json => {
      setData(json)
      setLoading(false)
    })
    .catch(error => {
      console.error("Erreur lors du chargement des données:", error)
      setLoading(false)
    })
  }, [])
  if (loading) {
    return <p>Chargement des données...</p>
  }

  if (!data) {
    return <p>Aucune donnée disponible</p>
  }

  const personne = data.find(entry => entry.model === "Personne").data
  const patrimoine = data.find(entry => entry.model === "Patrimoine").data
  const test = new Possession();

  const handleGetValeur = (possession, date) => {
    if (date) {
      const dateObject = new Date(date);
      return possession.getValeur(dateObject);
    }
    return 'Non défini';
  };
  
  return (
    <>
      <h1>Information sur {personne.nom}</h1>
      <table className='table table-bordered' >
          <thead>
            <tr>
              <th scope='col'>Libelle</th>
              <th scope='col'>Valeur initiale</th>
              <th scope='col'>Date de debut</th>
              <th scope='col'>Date de fin</th>
              <th scope='col'>Taux d'amortissement</th>
              <th scope='col'>Valeur actuelle</th>
            </tr>
          </thead>
          <tbody>
            {patrimoine.possessions.map((possession, index) => (
            
              <tr key={index}>
              <th scope='row'>{possession.libelle}</th>
              <td>{possession.valeur}</td>
              <td>{new Date(possession.dateDebut).toUTCString()}</td>
              <td>{inputValue}</td>
              <td>{possession.tauxAmortissement}</td>
              <td>{handleGetValeur(new Possession(
                null,
                possession.libelle,
                possession.valeur,
                new Date(possession.dateDebut),
                new Date(inputValue), // Utiliser l'inputValue comme date de fin
                possession.tauxAmortissement
              ), inputValue)}</td>
            </tr>
            ))}
          </tbody>
        </table>
        <input type="Date"
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        /> 
    </>
  )
}

export default App
