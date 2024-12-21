// Variables
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const correo = document.querySelector("#correo");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#formulario");
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const fieldset = document.querySelector("#fieldset");

const spinner = formulario.querySelector("#spinner");
spinner.style.display = "none";
console.log(spinner.style.display);

// Objeto controlano cada entrada del formulario
const datos = {
  nombre: "",
  apellido: "",
  correo: "",
  mensaje: "",
};

// Event Listeners
nombre.addEventListener("input", validar);
apellido.addEventListener("input", validar);
correo.addEventListener("input", validar);
mensaje.addEventListener("input", validar);
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formulario);

  enviarFormulario(formData);
  mostrarMensajeExitoso();
});

// Funciones
function validar(event) {
  const { id, value } = event.target;

  if (value === "") {
    mostrarError(
      `El campo ${id} no puede estar vacio`,
      event.target.parentElement
    );
    btnSubmit.disabled = true;
    return;
  }

  if (!validarEmail(value) && id === "correo") {
    mostrarError("El email es invalido", event.target.parentElement);
    btnSubmit.disabled = true;
    return;
  }

  eliminarError(event.target.parentElement);
  ingresarDatos(id, value);

  if (
    !Object.values(datos).includes("") &&
    Object.keys(datos).every((llave) => datos[llave] !== "")
  ) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}

function mostrarError(mensaje, elementoPadre) {
  eliminarError(elementoPadre); // Evita duplicados antes de agregar un nuevo mensaje

  const error = document.createElement("P");
  error.classList.add("error");
  error.innerText = mensaje;
  elementoPadre.appendChild(error);
}

function eliminarError(elementoPadre) {
  const error = elementoPadre.querySelector(".error");
  if (error) {
    error.remove();
  }
}

function validarEmail(elemento) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = regex.test(elemento);

  return resultado;
}

function ingresarDatos(propiedad, valor) {
  datos[propiedad] = valor.toLowerCase();
}

function mostrarMensajeExitoso() {
  spinner.style.display = "flex";
  let mensaje = formulario.querySelector(".enviado");

  if (!mensaje) {
    mensaje = document.createElement("P");
    mensaje.classList.add("enviado");
  }
  mensaje.innerText = "Mensaje enviado correctamente";

  setTimeout(() => {
    spinner.style.display = "none";
    fieldset.appendChild(mensaje);
  }, 2000);

  setTimeout(() => {
    mensaje.remove();
  }, 4000);

  setTimeout(() => {
    formulario.reset();
  }, 2000);
  resetDatosFormulario();
  btnSubmit.disabled = true;
}

function resetDatosFormulario() {
  Object.keys(datos).forEach((key) => (datos[key] = ""));
}

function enviarFormulario(formData) {
  fetch("https://formspree.io/f/mldrqrzr", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Exito", data);
    })
    .catch((error) => console.log(error));
}
