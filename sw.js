const nombreCache = 'canchasYa-v1.4'; 
const archivos = [
    '/',
    '/index.html',
    '/assets/css/app.css',
    '/assets/img/src/icons/favicon.png',
    '/assets/img/src/img/hero/heroImg.webp',
    '/assets/js/app.js',
    '/manifest.json'
]


// Instalacion del Service Worker
self.addEventListener('install',e => {
    console.log("Instalando sevice worker");

    // Lugar para cachear los archivos
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => 
                cache.addAll(archivos)
            )
    )
}); 


// Activando service worker
self.addEventListener('activate',e => {
    console.log("Activando serivce worker");

    // Eliminar archivos anteriores y actualizar los nuevos 
    // e.waitUntil(
    //     caches.keys()
    //         .then(nombreCaches => {
    //             return Promise.all(
    //                 nombreCaches.filter(versionCache => versionCache !== nombreCache)
    //                     .map(versiones => caches.delete(versiones))
                    
    //             )
    //         } )
    // )
}); 

// Fetch para que sea instalable 
self.addEventListener('fetch',e => {
    console.log("Agregando fetch: ",e);

    // Le damos la respuesta almacenada en cache
    // e.respondWith(
    //     caches.match(e.request)
    //         .then(respuestaCache => respuestaCache)
    // )    
})