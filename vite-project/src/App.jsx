import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
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

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Information sur {personne.nom}</h1>
    </>
  )
}

export default App
