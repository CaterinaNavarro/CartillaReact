import React, {Component} from 'react'
import Select from 'react-select'

const especialidades = [{value : 1, label : "Clinica Médica"}, {value:2, label : "Cardiología"},
{value:3, label: "Traumatología"},{value:4, label : "Ginecología"}];

const localidades = [{idLocalidad : 1, provincia : "Buenos Aires - GBA", nombre:"Bragado"},
{idLocalidad : 3, provincia: "Buenos Aires - Capital Federal", nombre : "Caballito"},
{idLocalidad : 2, provincia : "Buenos Aires - GBA", nombre : "Vicente López"},
{idLocalidad : 4, provincia : "Buenos Aires - GBA", nombre : "Wilde"}]

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

var medicosHabilitados = [];

class Selector extends Component {

    constructor ()
    {
        super();

        this.state = {
            espSeleccionada : null,
            localidadSeleccionada : null,
            medicoSeleccionado : null
        }

    }

    handleChangeEsp = (espSeleccionada) => {
        this.setState({ espSeleccionada : espSeleccionada,
                        localidadSeleccionada : null, 
                        clinicaSeleccionada : null,
                        medicoSeleccionado : null
                    });
      }

    handleChangeLocalidad = (localidadSeleccionada) => {
        this.setState({ 
                        localidadSeleccionada : localidadSeleccionada, 
                        clinicaSeleccionada : null,
                        medicoSeleccionado : null

        });
       
      }

      handleChangeMed = (medicoSeleccionado) => {

        const idMedicoSeleccionado = medicoSeleccionado.target.value;
        const idClinica = medicoSeleccionado.target.attributes.idClinica.value;
        const idEspecialidad = this.state.espSeleccionada.value;

        const medicoSeleccionado_ = medicosHabilitados.find(medico=> 
            medico.idMedico == idMedicoSeleccionado &&
            medico.idEspecialidad == idEspecialidad &&
            medico.idClinica == idClinica )
            
        this.setState({medicoSeleccionado : {value:medicoSeleccionado_.idMedico, nombre:medicoSeleccionado_.nombre,
                                              clinica:medicoSeleccionado_.clinica}});
        console.log("\nTurno Seleccionado >>"+
                    "\nMedico: "+medicoSeleccionado_.nombre+
                    "\nEspecialidad: "+this.state.espSeleccionada.label+
                    "\nLocalidad: "+this.state.localidadSeleccionada.label+
                    "\nlugar: "+medicoSeleccionado_.clinica)
      
      }
 
    generarSegundoSelect (especialidad) {

        if (especialidad === undefined || especialidad === "" || especialidad === null) {
            
        return (
            <select disabled className="form-control"></select>
        )}
        
        else {
            
            const {localidadSeleccionada} = this.state;

            return (
                <Select 
                    value={localidadSeleccionada}
                    onChange={this.handleChangeLocalidad}
                    options={localidades.map(x=>({value:x.idLocalidad, label: x.nombre}))}
                    />
            )
        }
    }

    tercerSelect = (localidadSeleccionada, especialidadSeleccionada) => {
    
        if (localidadSeleccionada!==undefined && localidadSeleccionada !=="" && localidadSeleccionada !==null)
        {
            
            medicosHabilitados.length = 0;

            medicosHabilitados = medicos.filter ( item =>
                (item.idEspecialidad == especialidadSeleccionada.value && 
                item.idLocalidad == localidadSeleccionada.value)
            );

            if (medicosHabilitados.length === 0)
                        return (
                        <div className="text-center mt-3">
                           <img src={require('./img/no_results_found.png')} className=" img-fluid img-thumbnail" width="400"/>                 
                        </div>
                        )
                    
            else
            return (
                <div className="row">
                    { medicosHabilitados.map((medico, i) => {  
                    return (
                        <div className="col-xs-3 card m-3" key={i}>
                            <div className="card-header">{medico.nombre}</div>         
                            <div className = "card-body">
                                <div>
                                {
                                    medico.S == 0 ? <img src={require('./img/doctor.png')} className="img-fluid" width="100"/> :
                                    <img src={require('./img/doctora.png')} className="img-fluid" width="100"/>
                                }  
                                </div>
                                <div className="mt-3">
                                    {medico.clinica}
                                </div>
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

    render ()
    {
        const {espSeleccionada} = this.state;
        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-6 p-5 pb-0 mb-0">
                        <div className="text-center "><label for="inputEsp">Especialidad</label></div>
                            <Select
                                value={espSeleccionada}
                                onChange={this.handleChangeEsp}
                                options={especialidades}/>
                    </div>
                    <div className="form-group col-md-6 p-5 pb-0 mb-0">
                            <div className="text-center">
                                <label for="inputClinica">Localidades</label>
                            </div>
                                    {this.generarSegundoSelect(espSeleccionada)}
                    </div>   
                    <div className='center-block container pb-0 mb-0'>
                            Profesionales disponibles   
                            <div className="container pl-5 mb-2 mt-3">
                                {this.tercerSelect(this.state.localidadSeleccionada, this.state.espSeleccionada)}
                            </div> 
                    </div>
                </div>
            </div>
        )
    }
}



export default Selector;