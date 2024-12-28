const contenedorGaleria = document.querySelector('#galeria-fotos'); 

function mostrarImagenes(){
    const KEY = process.env.API_TOKEN; 
    const URL = `https://pixabay.com/api/?key=${KEY}&q=soccer`; 

    fetch(URL)
        .then(response => response.json())
        .then(resultado => {
            const imagenes = resultado.hits; 
            console.log(imagenes)

            imagenes.forEach(imagen => {
                const {previewURL,largeImageURL,id} = imagen; 
                const divImg = document.createElement('DIV')
                divImg.innerHTML = `
                    <a href="${largeImageURL}" target="_blank">
                        <img src="${previewURL}" alt="${id}"> 
                    </a>
                `

                contenedorGaleria.appendChild(divImg)
            })
            
        })
}

mostrarImagenes(); 