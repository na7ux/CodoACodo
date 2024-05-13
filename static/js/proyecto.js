// Obtener lo necesario para el modal
var boton_abrirModal = document.getElementById("boton_modal");
var modal = document.getElementById("mi_modal");
var spanCerrarModal = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el botón, abrir el modal
boton_abrirModal.addEventListener("click", function() {
  modal.style.display = "block";
});

// Cuando el usuario hace clic en <span> (x), cerrar el modal
spanCerrarModal.onclick = function() {
  modal.style.display = "none";
};

// Cuando el usuario hace clic en cualquier lugar fuera del modal, cerrarlo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Obtener el formulario de subida de proyecto
var form_proyecto = document.getElementById("form_proyecto");

// Obtener el contenedor de proyectos
var contenedor_proyectos = document.querySelector(".contenedor_tarjetas");

form_proyecto.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe normalmente

  // Obtener los valores del formulario
  const titulo = document.getElementById("titulo_proyecto1").value;
  const imagenInput = document.getElementById("imagen_proyecto1");
  const imagen = imagenInput.files[0];
  const descripcion = document.getElementById("descripcion_proyecto1").value;

  // Crear elementos HTML para representar el proyecto
  const tarjeta_proyecto = document.createElement("div");
  tarjeta_proyecto.classList.add("tarjeta", "tarjeta_proyecto_subido");

  const titulo_element = document.createElement("h3");
  titulo_element.textContent = titulo;
  titulo_element.classList.add("titulo_proyecto");

  const imagen_container = document.createElement("div");
  imagen_container.classList.add("imagen_proyecto");

  const imagen_element = document.createElement("img");
  imagen_element.classList.add("imagen_previa");
  imagen_element.src = URL.createObjectURL(imagen);
  imagen_element.alt = "Imagen del proyecto";


  const descripcion_element = document.createElement("p");
  descripcion_element.textContent = descripcion;
  descripcion_element.classList.add("descripcion_proyecto");
  
  // Agregar elementos al contenedor de la tarjeta de proyecto
  tarjeta_proyecto.appendChild(titulo_element);
  imagen_container.appendChild(imagen_element);
  tarjeta_proyecto.appendChild(imagen_container);
  tarjeta_proyecto.appendChild(descripcion_element);

  // Agregar la tarjeta de proyecto al contenedor de proyectos
  contenedor_proyectos.appendChild(tarjeta_proyecto);
  
  // Eliminar el ejemplo si es el primer proyecto
  var ejemplo_proyecto = document.querySelector(".tarjeta_proyecto_ejemplo");
  if (ejemplo_proyecto) {
    ejemplo_proyecto.remove();
  }
    
  // Cerrar el modal
  modal.style.display = "none";
});
