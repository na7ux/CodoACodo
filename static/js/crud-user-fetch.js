const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}
/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveUser(){
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const user = document.querySelector('#user').value;
    const pasword = document.querySelector('#pasword').value;
    const profile_pic = document.querySelector('#profile_pic').value;

    
    //VALIDACION DE FORMULARIO
    /*
    if (!title || !director || !releaseDate || !banner) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
      */
    // Crea un objeto con los datos de la película
    const userData = {
        name: name,
        surname:surname,
        email:email,
        phone:phone,
        user:user,
        pasword:pasword,
        profile_pic:profile_pic,
    };
  
      
    let result = null;
    // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
    if(user!==""){
      result = await fetchData(`${BASEURL}/api/users/${user}`, 'PUT', userData);
    }else{
      // Si no hay idMovie, realiza una petición POST para crear una nueva película
      result = await fetchData(`${BASEURL}/api/users/`, 'POST', userData);
    }
    
    const formUser = document.querySelector('#form');
    formUser.reset();
    Swal.fire({
      title: 'Exito!',
      text: result.message,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    })
    showUsers();
  }
  
  /**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showMovies(){
    let movies =  await fetchData(BASEURL+'/api/movies/', 'GET');
    const tableMovies = document.querySelector('#list-table-movies tbody');
    tableMovies.innerHTML='';
    movies.forEach((movie,index) => {
      let tr = `<tr>
                    <td>${movie.title}</td>
                    <td>${movie.director}</td>
                    <td>${movie.release_date}</td>
                    <td>
                        <img src="${movie.banner}" width="30%">
                    </td>
                    <td>
                        <button class="btn-cac" onclick='updateMovie(${movie.id_movie})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteMovie(${movie.id_movie})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableMovies.insertAdjacentHTML("beforeend",tr);
    });
  }
    
  /**
   * Function que permite eliminar una pelicula del array del localstorage
   * de acuedo al indice del mismo
   * @param {string} user posición del array que se va a eliminar
   */
  function deleteUser(user){
    Swal.fire({
        title: "Esta seguro de eliminar Usuario?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/users/${user}`, 'DELETE');
          showUsers();
          Swal.fire(response.message, "", "success");
        }
    });
    
  }
  
/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {string} user Id de la pelicula que se quiere editar
 */
async function updateUser(user){
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/users/${user}`, 'GET');
    
    const name = document.querySelector('#name');
    const surname = document.querySelector('#surname');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const user = document.querySelector('#user');
    const pasword = document.querySelector('#pasword');
    const profile_pic = document.querySelector('#profile_pic');

        name.value = response.name;
        surname.value = response.surname;
        email.value= response.email; 
        phone.value = response.phone; 
        user = response.user; 
        pasword.value = response.pasword; 
        profile_pic.value = response.profile_pic; 

    }
    
  // Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
  // contenido del DOM ha sido completamente cargado y parseado.
  document.addEventListener('DOMContentLoaded',function(){
    const btnSaveUser = document.querySelector('#btn-save-user');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveUser.addEventListener('click',saveUser);
    showUsers();
  });


  