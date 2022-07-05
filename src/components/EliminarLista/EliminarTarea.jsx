import React from 'react';
import './EliminarTarea.css';

function EliminarTareas({ onPress }) {
  return (
    <button type="button" className="boton-eliminar" onClick={onPress}>Eliminar Todo</button>
  );
}

export default EliminarTareas;
