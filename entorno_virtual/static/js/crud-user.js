document.addEventListener('DOMContentLoaded', () => {
    showUsers();
});
class User {
    constructor(user_name, user_last_name, email, phone, user_usuario, user_password, image) {
        this.user_name = user_name;
        this.user_last_name = user_last_name;
        this.email = email;
        this.phone = phone;
        this.user_usuario = user_usuario;
        this.user_password = user_password;
        this.image = image;
    }
}

function showUsers() {
    fetch('/usuarios')
        .then(response => response.json())
        .then(users => {
            const tbodyUsers = document.querySelector('#list-table-user tbody');
            tbodyUsers.innerHTML = ''; // Limpiar el contenido previo de la tabla
            users.forEach(user => {
                const tr = `
                    <tr>
                        <td>${user.user_name}</td>
                        <td>${user.user_last_name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td><img src="${user.image}" alt="Imagen de perfil" width="30%"/></td>
                        <td>
                            <button class="button" onclick='updateUser("${user.user_usuario}")'><i class="fa fa-pencil"></i></button>
                            <button class="button" onclick='deleteUser("${user.user_usuario}")'><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                tbodyUsers.insertAdjacentHTML('beforeend', tr);
            });
        })
        .catch(error => console.error('Error:', error));
}
/* function showUsers() {
    fetch('/usuarios')
        .then(response => response.json())
        .then(users => {
            const tbodyUsers = document.querySelector('#list-table-users tbody');
            tbodyUsers.innerHTML = '';
            users.forEach(user => {
                const tr = `
                    <tr>
                        <td>${user.user_name}</td>
                        <td>${user.user_last_name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td><img src="${user.image}" alt="Imagen de perfil" width="30%"></td>
                        <td>
                            <button class="button" onclick='updateUser("${user.user_usuario}")'><i class="fa fa-pencil"></i></button>
                            <button class="button" onclick='deleteUser("${user.user_usuario}")'><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                tbodyUsers.insertAdjacentHTML('beforeend', tr);
            });
        })
        .catch(error => console.error('Error:', error));
} */

function saveUser() {
    const form = document.querySelector('#form');
    const inputName = document.querySelector('#name');
    const inputSurname = document.querySelector('#surname');
    const inputEmail = document.querySelector('#email');
    const inputPhone = document.querySelector('#phone');
    const inputUser = document.querySelector('#user');
    const inputPassword = document.querySelector('#password');
    const inputProfilePic = document.querySelector('#profile_pic');

    if (inputName.value.trim() !== '') {
        let newUser = new User(
            inputName.value,
            inputSurname.value,
            inputEmail.value,
            inputPhone.value,
            inputUser.value,
            inputPassword.value,
            inputProfilePic.value
        );

        fetch(`/usuario?user_usuario=${inputUser.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(existingUser => {
            console.log(existingUser)
            if (existingUser.user_usuario===inputUser.value) {
                // Usuario existe, hacer PUT para actualizar
                fetch(`/update/${inputUser.value}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    showUsers();
                    form.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {
                // Usuario no existe, hacer POST para crear nuevo usuario
                fetch('/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    showUsers();
                    form.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.error('Error: Por favor completa el campo Nombre.');
    }
}

function updateUser(userUsuario) {
    const user = prompt('Ingrese los nuevos datos del usuario (nombre, apellido, email, teléfono, imagen) separados por comas:');
    if (!user) {
        return;  // Cancelled
    }

    const [user_name, user_last_name, email, phone, image] = user.split(',');

    fetch(`/update/${userUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_name, user_last_name, email, phone, image })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        showUsers();
    })
    .catch(error => console.error('Error:', error));
}
function deleteUser(userUsuario) {
    fetch(`/delete/${userUsuario}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        showUsers();
    })
    .catch(error => console.error('Error:', error));
}