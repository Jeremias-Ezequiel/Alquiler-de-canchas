document.addEventListener('DOMContentLoaded',() => {

    // Variables
    const nombre = document.querySelector('#nombre')
    const apellido = document.querySelector('#apellido')
    const correo = document.querySelector('#correo')
    const mensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const fieldset = document.querySelector('#fieldset')

    const spinner = formulario.querySelector('#spinner')
    spinner.style.display = 'none'
    console.log(spinner.style.display)

    // Objeto controlano cada entrada del formulario
    const datos = {
        nombre : '',
        apellido : '',
        correo: '',
        mensaje : ''
    }

    // Event Listeners
    nombre.addEventListener('input',validar); 
    apellido.addEventListener('input',validar); 
    correo.addEventListener('input',validar); 
    mensaje.addEventListener('input',validar); 
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(formulario); 

        enviarFormulario(formData)
        mostrarMensajeExitoso();
    })


    // Funciones
    function validar(event){
        const {id,value} = event.target; 

        if(value === ''){
            mostrarError(`El campo ${id} no puede estar vacio`,event.target.parentElement); 
            btnSubmit.disabled = true; 
            return
        }

        if(!validarEmail(value) && id === 'correo'){
            mostrarError("El email es invalido",event.target.parentElement);
            btnSubmit.disabled = true; 
            return
        }

        eliminarError(event.target.parentElement);
        ingresarDatos(id,value);
        
        if(!Object.values(datos).includes('') && Object.keys(datos).every(llave => datos[llave] !== '')){
            btnSubmit.disabled = false; 
        }else{
            btnSubmit.disabled = true; 
        }
    }

    /**
     * Muestra un mensaje de error dentro del elemento padre
     * @param {String} mensaje - El mensaje de error a mostrar
     * @param {HTMLElement} elementoPadre - El contenedor donde se inserta el error
     */

    function mostrarError(mensaje,elementoPadre){
        eliminarError(elementoPadre); // Evita duplicados antes de agregar un nuevo mensaje

        const error = document.createElement('P'); 
        error.classList.add('error'); 
        error.innerText = mensaje; 
        elementoPadre.appendChild(error); 
    }

    
    /**
     * Elimina un mensaje de error, si existe, del elemento padre
     * @param {HTMLElement} elementoPadre - El contenedor que puede tener un mensaje de error
     */
    function eliminarError(elementoPadre){
        const error = elementoPadre.querySelector('.error')
        if(error){
            error.remove(); 
        }
    }


    /**
     * Valida el formato de un correo electrónico
     * @param {String} elemento - El valor del input a validar 
     * @returns  {Boolean} - Devuelve 'true' si el correo es válido
     */
    function validarEmail(elemento){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ; 
        const resultado = regex.test(elemento)

        return resultado
    }

    /**
     * Asigna los valores provenientes del formulario al objeto datos
     * @param {String} propiedad - Clave de nuestro objeto datos 
     * @param {String} valor - Valor de nuestro objeto datos
     */
    function ingresarDatos(propiedad,valor){
        datos[propiedad] = valor.toLowerCase(); 
    }


    function mostrarMensajeExitoso(){
        
        spinner.style.display = 'flex'
        let mensaje = formulario.querySelector('.enviado')

        if(!mensaje){
            mensaje = document.createElement('P')
            mensaje.classList.add('enviado')
        }
        mensaje.innerText = "Mensaje enviado correctamente"
        
        setTimeout(() => {
            spinner.style.display = 'none'; 
            fieldset.appendChild(mensaje)
        }, 2000);
        
        setTimeout(() => {
            mensaje.remove(); 
        },4000)

        
        setTimeout(() => {
            formulario.reset();
        },2000); 
        resetDatosFormulario();
        btnSubmit.disabled = true; 
    }

    /**
     * Reseteamos los datos de nuestro objeto data
     */
    function resetDatosFormulario(){
        Object.keys(datos).forEach(key => datos[key] = ''); 
    }

    /**
     * Controlamos el envio del formulario
     * @param {Object} formData 
     */
    function enviarFormulario (formData){
        fetch('https://formspree.io/f/mldrqrzr',{
            method : 'POST',
            body : formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Exito',data);
        })
        .catch(error => console.log(error))

    }
} )