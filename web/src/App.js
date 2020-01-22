import React, {useEffect, useState} from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'


function App() {
  const [devs, setDevs] = useState([])

  //buscando devs chamando api
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  }, [])

  //Cadastrando dev chamando a api
  async function handleAddDev(data){

    const response = await api.post('/devs', data)

    //Incluir o novo dev cadastrado na listagem
    setDevs([...devs, response.data]);
    
  }


  return (
    <div id="app">
      <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          )) }
          
        </ul>
      </main>

    </div>
  );
}



export default App;