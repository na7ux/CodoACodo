// Obtener lo necesario para el modal de habilidades
var boton_abrirModal = document.getElementById("boton_modal");
var modal = document.getElementById("mi_modal");
var spanCerrarModal = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el botón para abrir el modal de habilidades
boton_abrirModal.addEventListener("click", function() {
  modal.style.display = "block";
});

// Cuando el usuario hace clic en <span> (x) para cerrar el modal de habilidades
spanCerrarModal.onclick = function() {
  modal.style.display = "none";
};

// Cuando el usuario hace clic en cualquier lugar fuera del modal de habilidades, cerrarlo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//////////////////////////////////////////////////////////////////////////////

// Obtener el formulario para agregar habilidades
var formHabilidad = document.getElementById("form_habilidad");

// Obtener el contenedor de habilidades
var contenedorHabilidades = document.querySelector(".contenedor_tarjetas");

// Cuando se envía el formulario para agregar una habilidad
formHabilidad.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Obtener los valores del formulario
    const tecnologia = document.getElementById("tecnologia").value;
    const descripcionHabilidad = document.getElementById("descripcion_habilidad").value;
    
    // Crear elementos HTML para representar la habilidad
    const tarjetaHabilidad = document.createElement("div");
    tarjetaHabilidad.classList.add("tarjeta", "tarjeta_habilidad_subida");
    
    const tecnologiaElement = document.createElement("h3");
    tecnologiaElement.textContent = tecnologia;
    tecnologiaElement.classList.add("tecnologia_habilidad");
    
    const descripcionHabilidadElement = document.createElement("p");
    descripcionHabilidadElement.textContent = descripcionHabilidad;
    descripcionHabilidadElement.classList.add("descripcion_habilidad");
    
    // Agregar elementos al contenedor de la tarjeta de habilidad
    tarjetaHabilidad.appendChild(tecnologiaElement);
    tarjetaHabilidad.appendChild(descripcionHabilidadElement);

    // Agregar la tarjeta de habilidad al contenedor de habilidades
    contenedorHabilidades.appendChild(tarjetaHabilidad);
    
    // Eliminar el ejemplo
    var ejemplo_habilidades = document.querySelector(".tarjeta_habilidad_ejemplo");
    if (ejemplo_habilidades) {
        ejemplo_habilidades.remove();
    }
    // Cerrar el modal de habilidades
    modal.style.display = "none";
});
