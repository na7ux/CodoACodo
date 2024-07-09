// Obtener lo necesario para el modal de experiencia laboral
var boton_abrirModalExperiencia = document.getElementById("boton_modal");
var modalExperiencia = document.getElementById("mi_modal");
var spanCerrarModalExperiencia = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el botón para abrir el modal de experiencia laboral
boton_abrirModalExperiencia.addEventListener("click", function() {
  modalExperiencia.style.display = "block";
});

// Cuando el usuario hace clic en <span> (x) para cerrar el modal de experiencia laboral
spanCerrarModalExperiencia.onclick = function() {
  modalExperiencia.style.display = "none";
};

// Cuando el usuario hace clic en cualquier lugar fuera del modal de experiencia laboral, cerrarlo
window.onclick = function(event) {
  if (event.target == modalExperiencia) {
    modalExperiencia.style.display = "none";
  }
};

// Obtener el formulario para agregar experiencia laboral
var formExperiencia = document.getElementById("form_experiencia");

// Obtener el contenedor de experiencias laborales
var contenedorExperiencias = document.querySelector(".contenedor_tarjetas");

// Cuando se envía el formulario para agregar una experiencia laboral
formExperiencia.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Obtener los valores del formulario
    const tituloExperiencia = document.getElementById("titulo_experiencia").value;
    const nombreEmpresa = document.getElementById("nombre_empresa").value;
    const duracionExperiencia = document.getElementById("duracion_experiencia").value;
    const descripcionExperiencia = document.getElementById("descripcion_experiencia").value;
    
    // Crear elementos HTML para representar la experiencia laboral
    const tarjetaExperiencia = document.createElement("div");
    tarjetaExperiencia.classList.add("tarjeta", "tarjeta_experiencia_subida");
    
    const tituloExperienciaElement = document.createElement("h3");
    tituloExperienciaElement.textContent = tituloExperiencia;
    tituloExperienciaElement.classList.add("titulo_experiencia");
    
    const nombreEmpresaElement = document.createElement("p");
    nombreEmpresaElement.textContent = nombreEmpresa;
    nombreEmpresaElement.classList.add("nombre_empresa");
    
    const duracionExperienciaElement = document.createElement("p");
    duracionExperienciaElement.textContent = `${duracionExperiencia} años`;
    duracionExperienciaElement.classList.add("duracion_experiencia");
    
    const descripcionExperienciaElement = document.createElement("p");
    descripcionExperienciaElement.textContent = descripcionExperiencia;
    descripcionExperienciaElement.classList.add("descripcion_experiencia");
    
    // Agregar elementos al contenedor de la tarjeta de experiencia laboral
    tarjetaExperiencia.appendChild(tituloExperienciaElement);
    tarjetaExperiencia.appendChild(nombreEmpresaElement);
    tarjetaExperiencia.appendChild(duracionExperienciaElement);
    tarjetaExperiencia.appendChild(descripcionExperienciaElement);

    // Agregar la tarjeta de experiencia laboral al contenedor de experiencias laborales
    contenedorExperiencias.appendChild(tarjetaExperiencia);
    
    var ejemplo_experencia = document.querySelector(".tarjeta_experiencia_ejemplo");
    if(ejemplo_experencia)  {
        ejemplo_experencia.remove();
    }


    // Cerrar el modal de experiencia laboral
    modalExperiencia.style.display = "none";
});
