
import React from "react";
import id from "shortid";
function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  //state para ediciion
  const [modoEdicion,setEdicion] = React.useState(false)
  const [ids,setId] = React.useState('')
  // mensajes
  const [error,setError] = React.useState(null)
  const editar=(item)=>{
    console.log(item)
    setEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }
  // editar tarea para el submit de el formulario
  const editarTarea = e =>{
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("elemento vacio");
      setError("Debes escribir algo!")
      return;
    }
    const arrayEditado = tareas.map(
      item=> item.id === ids ? {id:ids,tarea} : item
      )
    setTareas(arrayEditado)
    setEdicion(false)
    setTarea('')
    setId('')
    setError(null)

  }
  // submit agregar tarea
  const agregartarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("elemento vacio");
      setError("Debes escribir algo!")
      return;
    }
    console.log(tarea);
    setTareas([...tareas, { id: id.generate(), tarea }]);
    setTarea("");
    setError(null)

    
  };
  const eliminarTarea=(id)=>{
    // console.log(id)
    const arrayFilter = tareas.filter(item=>item.id !== id)
    // no es necesario abrir corchetes porq ya es un array
    setTareas(arrayFilter)
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center">Crud simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.tarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregartarea}>
            {error ? (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {/* para llamr un html se usa parentisis */}
            {modoEdicion ? (
              <button className="btn btn-warning w-100" type="Submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark w-100" type="Submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
