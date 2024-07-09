const formulario= document.getElementById('form'); 
//obtiene un arreglo con todos los inputs de formularios
const inputs= document.querySelectorAll('#form input');
//expresiones regulares
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,30}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


const campos={
    user: false,
    name: false,
    surname: false, 
    email: false,
    phone: false,
    password: false,
   }

const validarFormulario=(e)=>{
    switch (e.target.name){
        case "user":
            
           validarCampo(expresiones.usuario,e.target,e.target.name);
        break;
        case "name":
            validarCampo(expresiones.nombre,e.target,e.target.name);
        break;
        case "surname":
            validarCampo(expresiones.nombre,e.target,e.target.name);
        break;
        case "email":
            validarCampo(expresiones.correo,e.target,e.target.name);
        break;
        case "phone":
            validarCampo(expresiones.telefono,e.target,e.target.name);
        break;
        case "password":
            validarCampo(expresiones.password,e.target,e.target.name);
            validarPassword2();
        break;
        case "password2":
            validarPassword2();
        break;
    

    }
}

const validarCampo=(expresion, input, campo)=>{
    
    if(expresion.test(input.value)){
        document.getElementById(`group__${campo}`).classList.remove('group-incorrect');
        document.getElementById(`group__${campo}`).classList.add('group-correct');
        document.querySelector(`#group__${campo} i`).classList.add('fa-check');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-circle-xmark'); 

        document.querySelector(`#group__${campo} .input-error`).classList.remove('.input-error-active');
        campos[campo]=true;
       

    }else{

        document.getElementById(`group__${campo}`).classList.add('group-incorrect');
        document.getElementById(`group__${campo}`).classList.remove('group-correct');
        document.querySelector(`#group__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-check');

        document.querySelector(`#group__${campo} .input-error`).classList.add('.input-error-active');
        campos[campo]=false;                                                    
       
    }
}

const validarPassword2 =()=>{
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`group__password2`).classList.add('group-incorrect');
        document.getElementById(`group__password2`).classList.remove('group-correct');
        document.querySelector(`#group__password2 i`).classList.add('fa-circle-xmark');
        document.querySelector(`#group__password2 i`).classList.remove('fa-check');

        document.querySelector(`#group__password2 .input-error`).classList.add('input-error-active');
        campos['password']=false;
    }else{
        document.getElementById(`group__password2`).classList.remove('group-incorrect');
        document.getElementById(`group__password2`).classList.add('group-correct');
        document.querySelector(`#group__password2 i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#group__password2 i`).classList.add('fa-check');
        document.querySelector(`#group__password2 .input-error`).classList.remove('input-error-active');
        campos['password']=true;
    }
}
//usuario escribe o da click afuera 
inputs.forEach((inputs)=>{
    inputs.addEventListener('keyup',validarFormulario) //valida cuando presiona una tecla 
    inputs.addEventListener('blur',validarFormulario) //valida cuando presiona fuera del campo 
    } )

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    // const terminos = document.getElementById('terminos'); ya no hay terminos
    console.log(campos.user , campos.surname , campos.name , campos.email ,campos.phone , campos.password)
	if(campos.user && campos.surname && campos.name && campos.email && campos.phone && campos.password ){
		formulario.reset();
        document.getElementById('form__message').classList.remove('message-active');
		document.getElementById('success').classList.add('success-active');
		setTimeout(() => {
			document.getElementById('success').classList.remove('success-active');
            formulario.reset();
        
		}, 7000);

		document.querySelectorAll('.groupo-correct').forEach((icono) => {
			icono.classList.remove('group-correct');
		});
	} else {
		document.getElementById('form__message').classList.add('message-active');
        
	}
}
)

