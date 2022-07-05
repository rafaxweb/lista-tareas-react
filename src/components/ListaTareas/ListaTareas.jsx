import React, { useEffect, useState } from 'react';
import './ListaTareas.css';
import Tarea from '../Tarea/Tarea';
import AgregarTarea from '../AgregarTarea/AgregarTarea';
import EliminarTareas from '../EliminarLista/EliminarTarea';
import Temporizador from '../Temporizador/Temporizador';

function ListaTareas() {
  const [listaTareas, setListaTareas] = useState([]);
  const [valorTarea, setValorTarea] = useState('');

  const guardarTareas = (tareas) => {
    localStorage.setItem('Tareas', JSON.stringify(tareas));
  };

  const obtenerTareas = () => {
    const tareasJSON = localStorage.getItem('Tareas');
    const tareas = JSON.parse(tareasJSON);
    if (tareas) {
      setListaTareas(tareas);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const agregarNuevaTarea = (event) => {
    event.preventDefault();

    if (!(valorTarea.trim())) {
      return;
    }

    const nuevaTarea = {
      id: Math.random(),
      texto: valorTarea.trim(),
      completada: false,
    };

    const nuevaListaTareas = [...listaTareas, nuevaTarea];

    setListaTareas(nuevaListaTareas);
    setValorTarea('');

    guardarTareas(nuevaListaTareas);
  };

  const handleTextoTarea = (evento) => {
    setValorTarea(evento.target.value);
  };

  const completarTarea = (id) => {
    const tareasUpdate = listaTareas.map((tarea) => {
      const tareaSeleccionada = tarea;
      if (tarea.id === id) {
        tareaSeleccionada.completada = !tarea.completada;
      }

      return tareaSeleccionada;
    });

    setListaTareas(tareasUpdate);
    guardarTareas(tareasUpdate);
  };

  const eliminarUnaTarea = (id) => {
    const nuevasTareas = listaTareas.filter((tarea) => (tarea.id !== id));

    setListaTareas(nuevasTareas);
    guardarTareas(nuevasTareas);
  };

  const eliminarTodasTareas = () => {
    setListaTareas([]);
    guardarTareas([]);
  };

  return (
  <div className="lista-tareas">

    <Temporizador />
    <h1 className="h1-size color-principal">Lista de Tareas</h1>
    <div className="todas-tareas">
      <AgregarTarea
        nuevaTarea={agregarNuevaTarea}
        handleTextoTarea={handleTextoTarea}
        valorTarea={valorTarea}
      />

      <div className="lista-tareas__todas">
        <h2 className="color-principal">Tareas</h2>
        {listaTareas.map((tarea) => (
          <Tarea
            key={tarea.id}
            id={tarea.id}
            texto={tarea.texto}
            completada={tarea.completada}
            eliminarUnaTarea={eliminarUnaTarea}
            completarTarea={completarTarea}
          />
        ))}
      </div>

      <EliminarTareas
        onPress={eliminarTodasTareas}
      />
    </div>
  </div>
);
}

export default ListaTareas;
