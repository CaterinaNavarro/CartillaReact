
import React, {Component} from 'react'

class Navegador extends Component {

    render() {
        return (

          <div className="container">
            
            <ul className="nav nav-tabs">
  <li className="nav-item col-md-auto">
    <a className="ml-5 nav-link  text-white" href="#">Guardia Smart</a>
  </li>
  <li classname="nav-item col-md-auto">
    <a className="nav-link  text-white" href="#">Médico Online</a>
  </li>
  <li className="nav-item col-md-auto">
    <a className="nav-link active  text-dark" href="#">Cartilla</a>
  </li>
  <li className="nav-item col-md-auto">
    <a className="nav-link text-white" href="#">Solicitudes</a>
  </li>
  
  <li className="nav-item col-md-auto ml-5 ">
    <a className="ml-5 nav-link text-white" href="#">Señor X</a>
  </li>
</ul>
            
              
         
          
          </div>

              
        )
      }

}

export default Navegador