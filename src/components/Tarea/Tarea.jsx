import React from 'react';
import './Tarea.css';
import { BiCheckboxMinus } from 'react-icons/bi';

function Tarea({
  id,
  texto,
  completada,
  eliminarUnaTarea,
  completarTarea
}) {
  return (
    <div className={!completada ? 'tareas' : 'tareas completada'}>
      <p className="tarea__texto" onClick={() => completarTarea(id, completada)}>{texto}</p>
      <BiCheckboxMinus
        className="tarea__boton"
        onClick={() => eliminarUnaTarea(id)}
      />
    </div>
  )
}

export default Tarea;