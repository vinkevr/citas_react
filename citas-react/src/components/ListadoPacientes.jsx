import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {  //Extracción de props

  

  return (
      <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-scroll">

        {/*Si hay pacientes se devuelve el listado de pacientes */}
        {pacientes && pacientes.length ? (
          <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''} 
            <span className="text-indigo-600 font-bold">Pacientes y citas</span>
          </p>
          
          {pacientes.map( paciente => (
              <Paciente  
                  key= {paciente.id}  
                  paciente ={paciente}
                  setPaciente={setPaciente}
                  eliminarPaciente={eliminarPaciente}
              />  
            ))}  
            </>       /*Va a llamar al componente tantas veces como haya elementos en el arreglo de pacientes  /// Siempre que se utilice .map para un listado debe contener un key unico NUNCA usar el indice de un arreglo como el key de un arreglo en REACT es una mala practica*/

        ) : (
          <>
             <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
             <p className="text-xl mt-5 mb-10 text-center">
                Comienza agregando pacientes {''} 
                <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
              </p>
          </>
        )}  {/*Si no hay pacientes se devuelve otro texto que indica que no hay pacientes */}
        

    
        
      </div>
  )
}

export default ListadoPacientes
