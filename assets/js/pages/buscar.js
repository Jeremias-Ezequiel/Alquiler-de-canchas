// Variables
const resultado = document.querySelector("#resultados_busqueda")

const tipo_cancha = document.querySelector('#tipo_cancha')
const ubicacion = document.querySelector('#ubicacion')
const precio_hora = document.querySelector('#precio_hora')
const iluminacion = document.querySelector('#iluminacion')
const valoracion = document.querySelector('#valoracion')


const informacion = {
    tipo_cancha : '',
    ubicacion : '',
    precio_hora : '',
    iluminacion : '',
    valoracion : ''
}
// Para mostrar todos los resultados una primera vez
mostrarResultados(datos);
// Listeners

tipo_cancha.addEventListener('change',(event) => {
    guardarDatos(event);
    let filtrado = filtrarCanchas()
    mostrarResultados(filtrado);  
    noHayResultados();
})

ubicacion.addEventListener('change',(event) => {
    guardarDatos(event);
    let filtrado = filtrarCanchas()
    mostrarResultados(filtrado);  
    noHayResultados();
})

precio_hora.addEventListener('change',(event) => {
    guardarDatos(event); 
    let filtrado = filtrarCanchas();
    mostrarResultados(filtrado);  
    noHayResultados();
})

iluminacion.addEventListener('change',(event) => {
    guardarDatos(event); 
    let filtrado = filtrarCanchas();
    mostrarResultados(filtrado);  
    noHayResultados();
})

valoracion.addEventListener('change',(event) => {
    guardarDatos(event); 
    let filtrado = filtrarCanchas();
    mostrarResultados(filtrado);  
    noHayResultados();
})

// Funciones

function guardarDatos(event){
    informacion[`${event.target.id}`] = event.target.value; 
}

function resetearHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function mostrarResultados(datos){
        resetearHTML();
        datos.forEach(cancha => {

            // Formatear cada mensaje
            const {tipo_cancha : cantidad,ubicacion,precio_hora : precio,iluminacion,valoracion} = cancha;

            // Usamos expresion para cambiar a mayusculas; 
            let ciudad = ubicacion.replace(/_/g,' '); 
            ciudad = ciudad.replace(/\b\w/g, (letra) => letra.toUpperCase())

            // Creamos el mensaje
            const mensaje = document.createElement('P')
            let iluminado = (parseInt(iluminacion) ? 'Si' : 'No');
            mensaje.innerText = `Cancha: ${cantidad} vs ${cantidad} - Ubicado en: ${ciudad} - Precio: ${precio} - Iluminacion: ${iluminado} - Valoracion de: ${valoracion} estrellas`

            resultado.appendChild(mensaje)
        });
}

function filtrarCanchas(){
    const resultado = datos.filter(filtrarTipo).filter(filtrarUbicacion).filter(filtrarPrecio).filter(filtrarIluminacion).filter(filtrarValoracion)

    return resultado; 
}

function filtrarTipo(cancha){
    const {tipo_cancha} = informacion
    if(tipo_cancha){
        return cancha.tipo_cancha === tipo_cancha
    }

    return cancha
}

function filtrarUbicacion(cancha){
    const {ubicacion} = informacion
    if(ubicacion){
        return cancha.ubicacion === ubicacion
    }

    return cancha
}

function filtrarPrecio(cancha){
    const {precio_hora} = informacion; 
    if(precio_hora){
        return cancha.precio_hora <= parseInt(precio_hora);
    }
    return cancha
}

function filtrarIluminacion(cancha){
    const {iluminacion} = informacion; 
    if(iluminacion){
        return cancha.iluminacion === iluminacion;
    }
    return cancha
}

function filtrarValoracion(cancha){
    const {valoracion} = informacion; 
    if(valoracion){
        return cancha.valoracion === valoracion;
    }
    return cancha
}

function noHayResultados(){
    if(!resultado.firstChild){
        const error = document.createElement('P')
        error.classList.add('error','py-3')
        error.innerText = 'Ha ocurrido un error con la búsqueda. Pruebe otro filtro'

        resultado.appendChild(error)
    }
}