 import React, {Component} from 'react'
import '../App.css'
import Navegador from './Navegador';

 class Menu extends Component {

    render ()
    {
        return (
            
            <div className="Menu row bg-primary">
            <div className="col-md-2 mt-1 text-center text-white OmintLogo">    
            OMINT
            </div>  
            <div className="col-md-9 pl-4 ml-4 Navegador">
            <Navegador></Navegador> 
            </div>   
            </div>
            
        )
    }
 }

 export default Menu;