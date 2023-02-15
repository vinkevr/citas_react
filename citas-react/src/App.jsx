import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"
import { useState, useEffect } from "react"

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});


//Este use effect es para que si hubiera algo en local storage no resetee el storage
  useEffect(()=> {   //Una vez que cargue el componente va a amandar a llamar la funcion 
     const obtenerLS = ()=>{
       const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];   // El ?? significa si no hay nada manda arreglo vacio []  /// JSON.parse se usa para pasar de string a un arreglo
       
       setPacientes(pacientesLS)
     }
     obtenerLS();  
  }, []) //solo se ejecuta una vez cuando el componente este listo[]

  useEffect(()=>{
     localStorage.setItem('pacientes', JSON.stringify( pacientes)); //convierte a string el arreglo ya que local storage no permite arreglos
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id); //Se trae los elemntos que son diferentes al id a eliminar
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">  
      <Header
            
      />  
      
      <div className="mt-12 md:flex">
      <Formulario 
        pacientes = {pacientes} //Props
        setPacientes={setPacientes}
        paciente = {paciente}
        setPaciente={setPaciente}
      />
      <ListadoPacientes
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente={eliminarPaciente}
      />
      </div>
    
    </div>
  )
}

export default App
