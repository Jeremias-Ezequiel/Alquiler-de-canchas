if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then(respuesta => console.log("Registrado exitosamente: ",respuesta))
        .catch(error => console.error("Hubo un error")); 
}else{
    console.log("Service Worker no soportado");
}