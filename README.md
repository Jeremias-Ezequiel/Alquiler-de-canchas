# CanchasYA - Página de Alquiler de Canchas

## Descripción

**CanchasYa** es una aplicación web diseñada para facilitar la reserva de canchas de fútbol sintético. Los usuarios pueden explorar las canchas disponibles, ver detalles relevantes y realizar consultar de disponibilidad.

## Secciones

- *Inicio*: Página principal con una introducción al servicio y canchas destacadas. 
- *Buscar* : Sección donde podras filtrar las distintas canchas disponibles con el formato que prefieras.
- *Cancha Especifica* : Al dar clic en alguna tarjeta sobre una cancha, serás redirijido a una página la cual vas a poder seleccionar dia y horario de la reserva.
- *Galeria*: Sección donde se muestran imagenes sobre el futbol.
- *Contacto*: Formulario de contacto para que los usuarios puedan hacer preguntas o solicitar más información sobre el servicio.

## Tecnologías Utilizadas

- HTML5: Estructura y contenido del sitio web.
- CSS3: Diseño visual personalizado. 
- Bootstrap: Framework para un diseño responsivo y componentes predefinidos. 
- Formspree: Para gestionar el envío del formulario de contacto sin necesidad de un backend.
- JavaScript : Para manejo de logica, funcionalidades e interacción dinamica en la página. 

## Funcionalidades

- Busqueda de cancha : El usuario podrá filtrar canchas en especifico a traves de parametros como por ejemplo : Tipo de cancha, ubicacion, precio, iluminacion y valoracion.
- Prevencion de errores : Evita el envio de formularios incompletos o con datos incorrectos, en la seccion de contactos, validando campos vacios y formato de correo electronico.
- Integracion API : La pagina de 'Imagenes', muestra el contenido visual a traves de la conexion a una API para obtener los datos. 
- Gestion de reservas : Permite al usuario seleccionar y guardar una reserva asociada a un dia y horario especifico, utilizando local storage para permitir la persistencia de datos. 