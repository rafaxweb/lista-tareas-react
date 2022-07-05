import React from 'react';
import './AgregarTarea.css';

function AgregarTarea({ nuevaTarea, handleTextoTarea, valorTarea }) {
  return (
    <form
      className="agregar-tarea"
      onSubmit={nuevaTarea}
    >
      <input
        className="caja-texto"
        type="text"
        placeholder="Tarea..."
        value={valorTarea}
        onChange={handleTextoTarea}
      />
      <input className="boton-agregar verde" type="submit" value="Agregar" />
    </form>
  );
}

export default AgregarTarea;
