const formulario= document.getElementById('form'); 
const inputs= document.querySelectorAll('#form input');

const expresiones = {
	empresa: /^[a-zA-Z0-9]{3,16}$/, // Letras, numeros, guion y guion_bajo
	phone: /^\d{7,14}$/, // 7 a 14 numeros.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	
}

const campos={
    empresa: false,
    phone: false,
    email: false,
    
   }

const validarFormulario=(e)=>{
    switch (e.target.name){
        case "empresa":
            
           validarCampo(expresiones.empresa,e.target,e.target.name);
        break;
        
        case "email":
            validarCampo(expresiones.correo,e.target,e.target.name);
        break;
        case "phone":
            validarCampo(expresiones.telefono,e.target,e.target.name);
        break;
        
    }
}
const validarCampo=(expresion, input, campo)=>{
    
    if(expresion.test(input.value)){
        document.getElementById(`group__${campo}`).classList.remove('group-incorrect');
        document.getElementById(`group__${campo}`).classList.add('group-correct');
        document.querySelector(`#group__${campo} i`).classList.add('fa-check');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-circle-xmark'); 
        document.querySelector(`#group__${campo} .input-error`).classList.remove('input-error-active');
        campos[campo]=true;
       

    }else{

        document.getElementById(`group__${campo}`).classList.add('group-incorrect');
        document.getElementById(`group__${campo}`).classList.remove('group-correct');
        document.querySelector(`#group__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-check');

        document.querySelector(`#group__${campo} .input-error`).classList.add('input-error-active');
        campos[campo]=false;                                                    
       
    }
}
//usuario escribe o da click afuera 
inputs.forEach((inputs)=>{
    inputs.addEventListener('keyup',validarFormulario) //valida cuando presiona una tecla 
    inputs.addEventListener('blur',validarFormulario) //valida cuando presiona fuera del campo 
    } )

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
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