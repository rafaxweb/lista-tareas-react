import React, { useState } from 'react'
  
import './Temporizador.css'
  
const App = () => {
  
  const [temporizador, setTiempo] = useState('00:00:00');
  const [temporizadorIniciado, setTemporizadorIniciado] = useState(false);
  const [textoFormularioTemporizador, setTextoFormularioTemporizador] = useState("");

  // Formularios y botones
  const handleFormularioTemporizador = (evento) => {
    setTextoFormularioTemporizador(evento.target.value);
  };

  // Métodos
  const obtenerTiempo = (ms) => {
    const horas = Math.floor(ms/(1000*60*60));
    const minutos = Math.floor((ms- (horas*60*60*1000) )/(1000*60));
    const segundos = Math.floor((ms-((horas*60*60*1000) + (minutos*60*1000)))/1000);
    return [horas, minutos, segundos]
  }
  
  const establecerFechaFinal = (minutos) => {
    const fechaActual = new Date();
    const nuevosMilisegundos = fechaActual.getTime() + minutos*60*1000;
    fechaActual.setTime(nuevosMilisegundos);
    return fechaActual;
  }

  const obtenerDiferenciaTiempo = (fecha) => {
    const msRestante = fecha.getTime() - Date.now();
    return msRestante>0 ? msRestante: 0;
  }

  const establecerTemporizador = (tiempo) => {
    const tiempoActual = obtenerTiempo(tiempo);

    const tiempoAdaptado = [];
    tiempoActual.forEach( (valor) => {
      if (valor<10) {
        valor = '0' + String(valor);
      
      } else { valor = String(valor)}

      tiempoAdaptado.push(valor)
    })

    const [horas, minutos, segundos] = tiempoAdaptado;

    setTiempo(`${horas}:${minutos}:${segundos}`);
  }

  const iniciarCuenta = (tiempoFinal) => {
    
    var intervalo = setInterval(() => {
      const restante = obtenerDiferenciaTiempo(tiempoFinal);
      establecerTemporizador(restante);
      
      if (restante === 0) {
        setTemporizadorIniciado(false);
        function beep() {
          var snd = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"+Array(1.5e3).join(1234));  
          
          snd.play()

          setTimeout( () => {
            alert("Temporizador finalizado");
          }, 1000)
      }
      beep();
        clearInterval(intervalo);
      }
    }, 500);

    if (temporizadorIniciado) {
      clearInterval(intervalo);
      alert("Ya hay un temporizador en marcha");
      return
    }

    setTemporizadorIniciado(true);
  }

  const onIniciarTemporizador = (event) => {
    event.preventDefault();
    
    if (isNaN(Number(textoFormularioTemporizador))) {
      setTextoFormularioTemporizador("")
      alert("Por favor, introduzca un número")
      return
    }
    const fecha = establecerFechaFinal(textoFormularioTemporizador);
    setTextoFormularioTemporizador("");

    if (!(textoFormularioTemporizador.trim())) {
      return;
    }

    iniciarCuenta(fecha);
  };

  return (
    <div className="cronometro">
      <p className='texto-temporizador'>Temporizador</p>
      <div className='flex'>
        <div>
          <p className="cronometro__tiempo">{temporizador}</p>
        </div>
        <div>
          <form
            className="agregar-tarea bloque"
            onSubmit={onIniciarTemporizador}
          >
            <input
              className="caja-texto corta"
              type="text"
              placeholder="Minutos..."
              value={textoFormularioTemporizador}
              onChange={handleFormularioTemporizador}
            />
            <input className="boton-agregar medio verde" type="submit" value="Iniciar" />
          </form>
          <form
            className="agregar-tarea"
          >
            <input className="boton-agregar grande" type="submit" value="Parar" />
          </form>
        </div>
      </div>
    </div>
  )
}
  
export default App;