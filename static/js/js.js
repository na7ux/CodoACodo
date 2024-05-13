const formulario= document.getElementById('formulario'); 
//obtiene un arreglo con todos los inputs de formularios
const inputs= document.querySelectorAll('#formulario input');
//expresiones regulares
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,30}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


const campos={
    usuario: false,
    nombre: false,
    apellido: false,
    email: false,
    telefono: false,
    password: false,
   }

const validarFormulario=(e)=>{
    switch (e.target.name){
        case "usuario":
           validarCampo(expresiones.usuario,e.target,e.target.name);
        break;
        case "nombre":
            validarCampo(expresiones.nombre,e.target,e.target.name);
        break;
        case "apellido":
            validarCampo(expresiones.nombre,e.target,e.target.name);
        break;
        case "email":
            validarCampo(expresiones.correo,e.target,e.target.name);
        break;
        case "telefono":
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
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark'); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo]=true;
    }else{

        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo]=false;
        
    }
}

const validarPassword2 =()=>{
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password']=false;
    }else{
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password']=true;
    }
}
//usuario escribe o da click afuera 
inputs.forEach((inputs)=>{
    inputs.addEventListener('keyup',validarFormulario) //valida cuando preciona una tecla 
    inputs.addEventListener('blur',validarFormulario) //valida cuando preciona fuera del campo 
    } )

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.apellido && campos.nombre && campos.email && campos.telefono && campos.password && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 7000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
}
)

