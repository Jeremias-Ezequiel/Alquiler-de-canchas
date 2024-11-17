document.addEventListener('DOMContentLoaded',() => {

    // Variables
    const nombre = document.querySelector('#nombre')
    const apellido = document.querySelector('#apellido')
    const correo = document.querySelector('#correo')
    const mensaje = document.querySelector('#mensaje')

    nombre.addEventListener('blur',validar); 
    apellido.addEventListener('blur',validar); 
    correo.addEventListener('blur',validar); 
    mensaje.addEventListener('blur',validar); 



    function validar(event){

        if(event.target.value === ''){
            mostrarError(`El campo ${event.target.id} no puede estar vacio`,event.target.parentElement); 
            return
        }

        if(!validarEmail(event.target.value) && event.target.id === 'correo'){
            mostrarError("El email es invalido",event.target.parentElement);
            return
        }

        eliminarError(event.target.parentElement);
    }

    function mostrarError(mensaje,elementoPadre){
        eliminarError(elementoPadre);

        const error = document.createElement('P'); 
        error.classList.add('error'); 
        error.innerText = mensaje; 
        elementoPadre.appendChild(error); 
    }

    function eliminarError(elementoPadre){
        const error = elementoPadre.querySelector('.error')
        if(error){
            error.remove(); 
        }
    }

    function validarEmail(elemento){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ; 
        const resultado = regex.test(elemento)

        return resultado
    }
} )