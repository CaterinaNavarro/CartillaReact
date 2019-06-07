import React, {Component} from 'react'

const especialidades = [{value : 1, label : "Clinica Médica"}, {value:2, label : "Cardiología"},
{value:3, label: "Traumatología"},{value:4, label : "Ginecología"}];

const localidades = [{idLocalidad : 1, provincia : "Buenos Aires - GBA", nombre:"Bragado"},
{idLocalidad : 2, provincia : "Buenos Aires - GBA", nombre : "Vicente López"},
{idLocalidad : 3, provincia: "Buenos Aires - Capital Federal", nombre : "Caballito"},
{idLocalidad : 4, provincia : "Buenos Aires - GBA ", nombre : "Wilde"}]

const medicos = [{idMedico:1, idEspecialidad : 1, nombre: "Rick", S:0, idLocalidad : 1, clinica: "Clinica Margarita", idClinica: 1}, 
{idMedico:1, idEspecialidad : 1, nombre: "Rick", S:0, idLocalidad : 1, clinica: "Centro Bazterrica", idClinica:2},
{idMedico:2, idEspecialidad : 1, nombre: "Morty", S:0, idLocalidad :1, clinica : "Centro Bazterrica",idClinica:2},
{idMedico:2, idEspecialidad : 1, nombre: "Morty", S:0, idLocalidad :1, clinica : "Consultorios Externos Perón", idClinica:3},
{idMedico:3, idEspecialidad : 1, nombre: "Ramirito", S:0, idLocalidad :2, clinica: "Clinica Santa Rita",idClinica:5},
{idMedico:4, idEspecialidad : 2, nombre: "Tebi", S:0, idLocalidad : 2, clinica: "Clinica Santa Isabel",idClinica:6},
{idMedico:5, idEspecialidad : 3, nombre: "Cersei", S:1, idLocalidad : 2, clinica : "Clinica Santa Isabel", idClinica:6},
{idMedico:6, idEspecialidad : 4, nombre: "Tincho", S:0, idLocalidad : 3, clinica : "Clinica Santa Isabel",idClinica:6},
{idMedico:7, idEspecialidad : 4, nombre: "Jennie", S:1, idLocalidad : 4, clinica : "Consultorios Externos Perón",idClinica:3},
{idMedico:8, idEspecialidad : 3, nombre: "Jon Snow", S:0, idLocalidad : 1, clinica : "Consultorios Externos Perón",idClinica:3},
{idMedico:9, idEspecialidad : 3, nombre: "Daenerys", S:1, idLocalidad : 2, clinica : "Hospital Munich",idClinica:7},
{idMedico:10, idEspecialidad : 4, nombre: "Arya", S:1, idLocalidad: 3, clinica: "Hospital Paredes",idClinica:8},
{idMedico:11, idEspecialidad : 4, nombre: "Sansa", S:1, idLocalidad :3 , clinica: "Clinica San Fernando",idClinica:9},
{idMedico:12, idEspecialidad : 1, nombre: "Juliana", S:1, idLocalidad :1, clinica : "Clinica del Sol",idClinica:4},
{idMedico:13, idEspecialidad : 1, nombre: "Merlina", S:1, idLocalidad :1, clinica : "Centro Bazterrica",idClinica:2}];

var medicosDisponibles = [];
var espSeleccionada_, localidadSeleccionada_, medicoSeleccionado_;

class Buscador extends Component {

    constructor()
    {
        super();
        this.state = {medicoSeleccionado : null}
    }

    handleSearch = (busqueda_) => {
        this.setState({busqueda : busqueda_.target.value})
    }

    handleChangeMed = (medicoSeleccionado) => {

        const idMedicoSeleccionado = medicoSeleccionado.target.value;
        const idClinica = medicoSeleccionado.target.attributes.idClinica.value;
        console.log(idClinica)
        const idEspecialidad = espSeleccionada_.value;
        const medSeleccionado = medicosDisponibles.find(medico=>
            (medico.idMedico == idMedicoSeleccionado &&
             medico.idEspecialidad == idEspecialidad &&
             medico.idClinica == idClinica))

        this.setState({medicoSeleccionado : medSeleccionado});

        console.log("\nTurno Seleccionado >> "+
                    "\nMedico: "+medSeleccionado.nombre+
                    "\nEspecialidad: "+espSeleccionada_.label+
                    "\nLocalidad: "+localidadSeleccionada_.nombre+
                    "\nlugar: "+medSeleccionado.clinica)
      }

    renderOptions = (busqueda) => {

        let espSeleccionada = 0, localidadSeleccionada = 0, medicoSeleccionado =0;

        if (busqueda!=="" && busqueda!==null && busqueda!=undefined)
        {
            busqueda = this.eliminarDiacriticos(busqueda).toLocaleLowerCase();

            for (var i=0;i<especialidades.length;i++)
            {
                espSeleccionada = busqueda.search(this.eliminarDiacriticos(especialidades[i].label.toLowerCase()));

                if (espSeleccionada!=-1) {
                    espSeleccionada_ = especialidades[i];
                    break;
                }
            }

            if (espSeleccionada != -1 && espSeleccionada != undefined)
            {
                for (var i=0;i<localidades.length;i++)
                {
                    localidadSeleccionada = busqueda.search(this.eliminarDiacriticos(localidades[i].nombre.toLowerCase()));

                    if (localidadSeleccionada!=-1) {
                        localidadSeleccionada_ = localidades[i];
                        break;
                    }

                }

                if (localidadSeleccionada != -1) 
                {
                    medicosDisponibles.length = 0;

                    for(var i=0;i<medicos.length;i++)
                    {
                        medicoSeleccionado = busqueda.search(this.eliminarDiacriticos(medicos[i].nombre.toLowerCase()));
                       
                        if (medicoSeleccionado!=-1) {
                            medicoSeleccionado_ = medicos[i];
                            break;                        
                        }
                    }

                    if (medicoSeleccionado==-1)
                    {
                        medicosDisponibles = medicos.filter (medico => 
                            medico.idEspecialidad == espSeleccionada_.value &&
                                medico.idLocalidad == localidadSeleccionada_.idLocalidad );
                    }
                    else
                    {
                        medicosDisponibles = medicos.filter (medico => 
                            (medico.idEspecialidad == espSeleccionada_.value &&
                                medico.idLocalidad == localidadSeleccionada_.idLocalidad &&
                                medico.idMedico == medicoSeleccionado_.idMedico)
                        );
                    }
                
                    if (medicosDisponibles.length === 0)
                    {
                        return (
                        <div className="text-center mt-3">
                           <img src={require('./img/no_results_found.png')} className=" img-fluid img-thumbnail" width="400"/>                 
                        </div>
                        )
                    }

                    else
                    {
                        return (
                            <div className="row">
                                { medicosDisponibles.map(medico => {
                                
                                return (
                                    <div className="col-xs-3 card m-3">
                                        <div className="card-header">
                                            {medico.nombre}
                                        </div>         
                                        <div className = "card-body">
                                            <div>
                                                {
                                                    medico.S == 0 ? 
                                                    <img 
                                                        src={require('./img/doctor.png')} 
                                                        className="img-fluid" 
                                                        width="100"/> :
                                                    <img 
                                                        src={require('./img/doctora.png')} 
                                                        className="img-fluid" 
                                                        width="100"/>
                                                }  
                                            </div>
                                        <div className="mt-3">{medico.clinica}</div>
                                        <div className="col-xs-auto">
                                            <button 
                                                className="btn btn-primary mt-3"
                                                value={medico.idMedico}
                                                idClinica={medico.idClinica}
                                                onClick = {this.handleChangeMed}>
                                                    Seleccionar
                                            </button> 
                                        </div>        
                                    </div>     
                                </div>
                            )})}
                        </div>    
                        )
                    }
                }
            }
        }
    }
    

    eliminarDiacriticos = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"")
    }

    render () 
    {
        return (
            <div>
                <div className="md-form">
                    <div className="container">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Realice su búsqueda aquí.." 
                            onChange={this.handleSearch}
                            value={this.state.busqueda}/>
                        <small id="emailHelp" className="form-text text-muted mt-1">
                            Formato de búsqueda sugerida: Quiero sacar un turno para Clinica Medica en 
                            Bragado con el doctor Pepito </small>
                    </div>
               </div>
               <div className="center-block pt-4 mt-2">
                   Profesionales disponibles
                    <div className="container text-center">{this.renderOptions(this.state.busqueda)}</div>          
               </div>
            </div> 
        )
    }
}

export default Buscador;
