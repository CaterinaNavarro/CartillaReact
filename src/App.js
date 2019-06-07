import React from 'react';
import Menu from './components/Menu'
import './App.css';
import Buscador from './components/Buscador'
import Selector from './components/Selector';

function App() {
  return (
    <div className="App">
      <Menu></Menu>
      <div className="Contenido">
      <Selector/>
      <div className="container">
      <hr></hr>
      </div>
      <div className="Container Buscador mt-5 pl-3">
        <Buscador/>
      </div>
      </div>
      
    </div>
  );
}

export default App;
