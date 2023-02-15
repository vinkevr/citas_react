import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');  {/*El orden del state es importante(debe ser igual que el orden del formulario) */}
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect(()=> {
     if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
     }else {
        console.log('No hay nada')
     } //Para comprobar si un objeto tiene algo es con Object.keys()
  }, [paciente])



  
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }
   
  const handleSubmit = (e)=> {
    e.preventDefault();

    //Validación del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio')

      setError(true)
      return;
    }

    setError(false)  


    //Objeto de paciente

    const objetoPaciente = {
      nombre,
      propietario, 
      email, 
      fecha, 
      sintomas,
      
    }

    if (paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id 
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])   /*Toma una copia de pacientes con "..." spread operator y agrega el nuevo objeto de paciente */
    }
   // console.log(objetoPaciente)
   

    //Reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  } 
  
  return (
    <div className="md:w-1/2 lg:w-2/5">  {/*2/5 es 40% de la pantalla */}
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
          Añade pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">  {/*Padding en vertical y horizaontal con py/px */}
            {error && <Error><p>Todos los campos son obligatorios</p></Error>}  {/*Si hay error imprime 'si hay error' utiliza && para validar que sea cierto /// Aqui se usa un prop para pasarle a error.jsx un mensaje  // Hay 2 formas de usar props, una con el mensaje y otra con children en donde se pueden pasar multiples objetos o incluso codigo html a otro archivo jsx 
            La sintaxis con children es <Error><p>Todos son obligatorios</p></Error>
            La sintaxis con props es <Error mensaje='Todos son obligatorios' />
            */}
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold mb-2">Nombre mascota</label> {/*Block para que tome todo el ancho disponible */}
            <input 
                  id="mascota"   
                  type="text"
                  placeholder="Nombre de la mascota"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  value={nombre}
                  onChange= {(e) => setNombre(e.target.value)}
            /> {/*w-full para que tome todo el ancho */}
          </div>


          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold mb-2">Nombre Propietario</label> {/*Block para que tome todo el ancho disponible */}
            <input 
                  id="propietario"   
                  type="text"
                  placeholder="Nombre del propietario"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  value={propietario}
                  onChange= {(e) => setPropietario(e.target.value)}
            /> {/*w-full para que tome todo el ancho */}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold mb-2">Email</label> {/*Block para que tome todo el ancho disponible */}
            <input 
                  id="email"   
                  type="email"
                  placeholder="Email Contacto Propietario"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  value={email}
                  onChange= {(e) => setEmail(e.target.value)}
            /> {/*w-full para que tome todo el ancho */}
          </div>

          
          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold mb-2">Alta</label> {/*Block para que tome todo el ancho disponible */}
            <input 
                  id="alta"   
                  type="date"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  value={fecha}
                  onChange= {(e) => setFecha(e.target.value)}
            /> {/*w-full para que tome todo el ancho */}
          </div>

          
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold mb-2">Síntomas</label> {/*Block para que tome todo el ancho disponible */}
            <textarea 
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder = "Describe los sintomas" 
              value={sintomas}
              onChange= {(e) => setSintomas(e.target.value)} 
            />
           
          </div>
          
          <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value= {paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
          />

        </form>
    </div>
  )
}

export default Formulario


