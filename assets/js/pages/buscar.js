// Variables
const resultado = document.querySelector("#resultados_busqueda")

const informacion = {
    tipo_cancha : '',
    ubicacion : '',
    precio_hora : '',
    iluminacion : '',
    valoracion : ''
}

// Listeners
mostrarResultados();

// Funciones

function mostrarResultados(){
    if(datos.length){
        datos.forEach(cancha => {

            // Formatear cada mensaje
            let {tipo_cancha : cantidad,ubicacion,precio_hora : precio,iluminacion,valoracion} = cancha; 
            const mensaje = document.createElement('P')
            let iluminado = (parseInt(iluminacion) ? 'Si' : 'No');
            mensaje.innerText = `Cancha: ${cantidad} vs ${cantidad} - Ubicado en: ${ubicacion} - Precio: ${precio} - Iluminacion: ${iluminado} - Valoracion de: ${valoracion} estrellas`

            resultado.appendChild(mensaje)
        });
    }
}

