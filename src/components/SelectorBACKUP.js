import React, {Component} from 'react'
//import Selector from './Selector'
import Select from 'react-select'


const especialidades = [{value : 1, label : "Clinica Médica"}, {value:2, label : "Cardiología"},
{value:3, label: "Traumatología"},{value:4, label : "Ginecología"}];

const clinicas = [{idCentro: 1, nombre: "Clínica Bazterrica", especialidades: [1,3]}, 
{idCentro: 2, nombre : "Clínica del Sol", especialidades:[2]},
{idCentro : 3, nombre : "Clínica Santa Isabel", especialidades : [1,2,3,4]},
{idCentro : 4, nombre : "Centro Médico Bazterrica", especialidades : [3,4]},

{idCentro: 5, nombre : "Consultorios Externos Perón", especialidades:[1,2,3,4]},
{idCentro : 6, nombre : "Sanatorio Santa Rita", especialidades : [3,4]},
{idCentro : 7, nombre : "Sanatorio Osprem", especialidades : [3,4]},
{idCentro: 8, nombre : "Hospital Santa Lucía", especialidades:[1,2]},
{idCentro : 9, nombre : "Hospital Paredes", especialidades : [1,2,3,4]},
{idCentro : 10, nombre : "Clinica Margarita", especialidades : [2,3]},

];

const localidades = [{idLocalidad : 1, provincia : "Buenos Aires - GBA", nombre:"Bragado", clinicas : [1,3,6]},
{idLocalidad : 2, provincia : "Buenos Aires - GBA", nombre : "Vicente López", clinicas : [2,5]},
{idLocalidad : 3, provincia: "Buenos Aires - Capital Federal", nombre : "Caballito", clinicas : [4,7]},
{idLocalidad : 4, provincia : "eeuu", nombre : "Miameeeee", clinicas : [8,9,10]}]

const medicos = [{idMedico:1, idEspecialidad : 1, nombre: "Rick", centrosAtiende : [1,5,9]}, 
{idMedico:2, idEspecialidad : 1, nombre: "Morty", centrosAtiende : [1,3,8,9,5]}, 
{idMedico:3, idEspecialidad : 1, nombre: "Ramirito", centrosAtiende : [1]}, 
{idMedico:4, idEspecialidad : 2, nombre: "Tebi", centrosAtiende : [2,3,9,10]}, 
{idMedico:5, idEspecialidad : 3, nombre: "Lisa", centrosAtiende : [1,3,4,5,7,9]}, 
{idMedico:6, idEspecialidad : 4, nombre: "Tincho", centrosAtiende : [3,6,7]}, 
{idMedico:7, idEspecialidad : 4, nombre: "Jennie", centrosAtiende : [3,4,5,7]},

{idMedico:8, idEspecialidad : 3, nombre: "Jon Snow", centrosAtiende : [4,5,10]}, 
{idMedico:9, idEspecialidad : 3, nombre: "Daenerys", centrosAtiende : [3,7,9,10]}, 
{idMedico:10, idEspecialidad : 4, nombre: "Arya", centrosAtiende : [3,4,5,9]}, 
{idMedico:11, idEspecialidad : 4, nombre: "Sansa", centrosAtiende : [3,9]}, 

];

var centrosHabilitados = [];
var medicosHabilitados = [];

class Selector extends Component {

    constructor ()
    {
        super();

        this.state = {
            espSeleccionada : null,
            localidadSeleccionada : null,
            clinicaSeleccionada : null,
            medicoSeleccionado : null,
        }
    }

    handleChangeEsp = (espSeleccionada) => {
        this.setState({ espSeleccionada : espSeleccionada,
                        localidadSeleccionada : null, 
                        clinicaSeleccionada : null,
                        medicoSeleccionado : null
                    });

        console.log(`especialidad:`, espSeleccionada);
      }
      handleChangeLocalidad = (localidadSeleccionada) => {
        this.setState({ 
                        localidadSeleccionada : localidadSeleccionada, 
                        clinicaSeleccionada : null,
                        medicoSeleccionado : null

        });
        console.log(`Localidad:`, localidadSeleccionada);
      }
      
      handleClinica = (ClinicaSeleccionada) => {

        const idClinica = ClinicaSeleccionada.target.value;
        console.log("ID DE LA CLINICA:" + idClinica);
        this.setState({clinicaSeleccionada : idClinica,
                       medicoSeleccionado : null
                    });
        
      }
      handleChangeMed = (medicoSeleccionado) => {
        this.setState({medicoSeleccionado});
        console.log(`Medico:`, medicoSeleccionado);
      }
 
    generarSegundoSelect (especialidad) {

        if (especialidad === undefined || especialidad === "" || especialidad === null) {
            console.log("la especialidad devuelve null")
        return (
            <select disabled className="form-control"></select>
        )}
        
        else {
            
            const {localidadSeleccionada} = this.state;
            console.log("la especialidad devuelve "+especialidad.label)

            return (
                <Select 
                    value={localidadSeleccionada}
                    onChange={this.handleChangeLocalidad}
                    options={localidades.map(x=>({value:x.idLocalidad, label: x.nombre}))}
                    />
            )
        }
    }

    generarCentros = (localidadSeleccionada, especialidadSeleccionada) => {
        console.log(localidadSeleccionada+" "+especialidadSeleccionada)
        if (localidadSeleccionada!==undefined && localidadSeleccionada !=="" && localidadSeleccionada !==null)
        {
            const localidad = localidades.find(localidad => localidad.idLocalidad ===localidadSeleccionada.value);
            console.log(localidad.nombre)
            centrosHabilitados.length = 0;

            centrosHabilitados = clinicas.filter ( item => 
                (item.especialidades.find(idEspecialidad=> idEspecialidad === especialidadSeleccionada.value)!==undefined && 
                localidad.clinicas.find(idClinica=> idClinica === item.idCentro)!==undefined)
                )

            return (
                centrosHabilitados.map(clinica=> {
                    
                    return (
                        <div className="col-md-4">
                        <button className="btn btn-primary" value={clinica.idCentro} onClick = {this.handleClinica} >{clinica.nombre}</button>
                           
                        </div>
                      
                    )})
            )
        }
    }

    generarTercerSelect = (clinica, especialidad) => {
        if (clinica === undefined || clinica=== "" || clinica === null) {
            console.log("Todavia no selecciona la clinica");
        return (
            <select disabled className="form-control"></select>
        )}
        
        else {
            
            const {medicoSeleccionado} = this.state;
            console.log("idclinica seleccionada"+clinica+" especialidad seleccionada "+especialidad.label)     
            
            medicosHabilitados.length = 0;

            medicosHabilitados = (medicos.filter (medico => 
                (medico.centrosAtiende.find(centro => centro == clinica)!= undefined &&
                medico.idEspecialidad == especialidad.value)
            )).map ( x=> ({value:x.idMedico, label : x.nombre}))

            console.log("el arr tiene "+medicosHabilitados.length)

            return (
                <Select
                  value={medicoSeleccionado}
                  onChange={this.handleChangeMed}
                  options={medicosHabilitados}
                />
            )
        }
    }
    

    render ()
    {
        const {espSeleccionada} = this.state;

        return (

            <div>
                <div className="form-row m-5">
                <div className="form-group col-md-4">
                <div className="text-center"><label for="inputEsp">Especialidad</label></div>
                <Select
                  value={espSeleccionada}
                  onChange={this.handleChangeEsp}
                  options={especialidades}
                />
                </div>
                <div className="form-group col-md-4">
                <div className="text-center"><label for="inputClinica">Localidades</label></div>
                {this.generarSegundoSelect(espSeleccionada)}
                </div>

                <div className="form-group col-md-4">
                <div className="text-center"><label for="inputMedico">Médico</label></div>
                {this.generarTercerSelect(this.state.clinicaSeleccionada, this.state.espSeleccionada)}
                </div>   
            </div>
            <div className='row mb-5 pb-5'>{this.generarCentros(this.state.localidadSeleccionada, this.state.espSeleccionada)}</div>
            </div>
            
            

        )
    }
}



export default Selector;