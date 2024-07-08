class User{
    constructor(id_userWebfolio,user_name,user_last_name,email,phone,user_usuario,user_password,image){
        this.id_userWebfolio = id_userWebfolio
        this.user_name = user_name
        this.user_last_name = user_last_name
        this.email = email
        this.phone = phone
        this.user_usuario = user_usuario
        this.user_password = user_password
        this.image = image
        }
    }

    function showUsers(){
    
        //BUSCAR LO QUE HAY EN LOCAL STORAGE
        let users = JSON.parse(localStorage.getItem('users')) || [];
    
        //buscar elemento HTML donde quiero insertar las peliculas
        const tbodyUsers = document.querySelector('#list-table-users tbody');
        // const tbodyMovies = document.getElementById('#tbody-table-movies');
        //limpio el contenido de la tabla
        tbodyUsers.innerHTML = '';
        users.forEach(user => {
            //TEMPLATE STRING - TEMPLATE LITERAL 
            const tr = `
                        <tr>
                            <td>${user.user}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            
                            <td>
                                <img src="${user.profile_pic}" alt="${Imagen_de_perfil}" width="30%">
                            </td>
                            <td>
                                <button class="button" onclick='updateUser(${user.user})'><i class="fa fa-pencil" ></button></i>
                                <button class="button" onclick='deleteUser(${user.user})'><i class="fa fa-trash" ></button></i>
                            </td>
                        </tr>
            `;
            tbodyUsers.insertAdjacentHTML('beforeend',tr);
        });
    
    }
    


    function saveUser(){
    
        //Obtengo el elemento HTML del formulario
        const form = document.querySelector('#form');
    
        //obtengo los inputs del formulario
        const inputName = document.querySelector('#name');
        const inputSurname = document.querySelector('#surname');
        const inputEmail = document.querySelector('#email');
        const inputPhone = document.querySelector('#phone');
        const inputUser = document.querySelector('#user');
        const inputPasword = document.querySelector('#pasword');
        const inputprofile_pic = document.querySelector('#profile_pic');
    
        //Realizo una validación simple de acuerdo al contenido del value del input del titulo
        if(inputName.value.trim() !== ''){
            //Busca en localstorage el item movies, si no existe asigna el array vacio.
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
             //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de movies el objeto a editar
            const userFind = users.find(user => user.user == inputUser.value);

          
                if (userFind) {
                    userFind.name= inputName.value;
                    userFind.surname=inputSurname.value;
                    userFind.email=inputEmail.value;
                    userFind.phone= inputPhone.value;
                    userFind.user= inputUser.value;
                    userFind.profile_pic=inputprofile_pic.value; 
                  
                }
            }else{
                let newUser = new User(
                    
                    inputName.value,
                    inputSurname.value,
                    inputEmail.value,
                    inputPhone.value,
                    inputUser.value,
                    inputPasword.value,
                    inputprofile_pic.value,
                    
                );
                users.push(newUser);
            }
    
            //Se actualiza el array de peliculas en el localstorage
            localStorage.setItem('users',JSON.stringify(users));
            showUsers();
            //Se limpian los inputs del formulario
            form.reset();
            Swal.fire({
                title: 'Exito!',
                text: 'Operacion exitosa.',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Por favor completa el campo Titulo.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    
    }