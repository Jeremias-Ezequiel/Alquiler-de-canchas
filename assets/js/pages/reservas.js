const btnAlquilar = document.getElementById('btn-alquilar')
const alquilerCancha = document.getElementById('alquiler-cancha'); 
const dia = document.getElementById('dia'); 
const horario = document.getElementById('horario'); 

dia.addEventListener('change',cambiarDias)
dia.addEventListener('change',verificarOpciones)
horario.addEventListener('change',verificarOpciones)
btnAlquilar.addEventListener('click', reservarCancha)



const reservas = {
    'Lunes' : new Array(16).fill(false),
    'Martes' : new Array(16).fill(false),
    'Miercoles' : new Array(16).fill(false),
    'Jueves' : new Array(16).fill(false),
    'Viernes' : new Array(16).fill(false),
    'Sabado' : new Array(16).fill(false),
    'Domingo' : new Array(16).fill(false)
}

const reservasStorage = JSON.parse(localStorage.getItem('reservasStorage')) || []; 

if(Object.keys(reservasStorage).length > 0){
    
    let n = Object.keys(reservasStorage).length; 
    for(let dia of Object.keys(reservasStorage)){
        for(let i = 0; i < n; i++){
            reservas[dia] = reservasStorage[dia]; 
        }
    }
}

function agregarDias(){

    const dias = Object.keys(reservas); 

    for(let i = 0; i < dias.length; i++){
        let opcion = document.createElement('OPTION')
        opcion.value = i+1; 
        opcion.textContent = dias[i];
        dia.appendChild(opcion)
    }

}

function verificarOpciones(){
    if(this.value !== "" && horario.value !== ""){
        btnAlquilar.disabled = false;  
    }else{
        btnAlquilar.disabled = true; 
    }
}

function cambiarDias(){
    let diaSeleccionado = dia.options[dia.value].text; 

    mostrarHorario(diaSeleccionado);    
}

function mostrarHorario(dia){ 

    limpiarSelect();

    reservas[dia].forEach((opcion,index) => {
        
        let option = document.createElement('OPTION')
        let hora = index + 8; 

        option.value = index; 
        option.disabled = opcion;
        option.textContent = (hora <= 11) ? `${hora}:00 AM` : `${hora}:00 PM`;   

        horario.appendChild(option); 
    });
}

function mostrarMensaje(mensaje,tipo){

    eliminarMensaje();

    const msj = document.createElement('P')

    msj.textContent = mensaje;
    msj.classList.add(tipo,"fw-bold","py-2","mb-2");
    msj.style.display = "block"; 
    alquilerCancha.appendChild(msj); 

    setTimeout(() => {
        msj.style.display = "none"; 
    }, 2000);
}

function eliminarMensaje(){
    const enviado = alquilerCancha.querySelector(".enviado")
    const error = alquilerCancha.querySelector(".error")
    if(error){
        error.remove();
    }

    if(enviado){
        enviado.remove(); 
    }
}

function limpiarSelect(){
    while(horario.firstChild){
        horario.firstChild.remove();
    } 
}

function reservarCancha(){
    verificarOpciones();
    if(!btnAlquilar.disabled){
        const horarioAlquilar = (parseInt(horario.value));
        const diaSeleccionado = dia.options[dia.value].text; 

        if(reservas[diaSeleccionado][horarioAlquilar]){
            mostrarMensaje("Este dia ya esta ocupado","error"); 
        }else{
            reservas[diaSeleccionado][horarioAlquilar] = true; 
            mostrarMensaje("Alquilado Correctamente!","enviado")
            mostrarHorario(diaSeleccionado)
            
            //Agregamos al localStorage
            localStorage.setItem("reservasStorage",JSON.stringify(reservas)); 
        }
    }
}

agregarDias();