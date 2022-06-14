/*---------- DESPLEGAR BARRA DE BÚSQUEDA ----------*/

const button = document.querySelector("#toggle-search")
const navSearch = document.querySelector("#nav-search")

button.addEventListener("click", () => {
    navSearch.classList.toggle("show");
})

/*---------- EFECTO FOCUS ----------*/

const contactInputs = document.querySelectorAll(".contact__input");

contactInputs.forEach(input => {
    input.addEventListener("focus", (input) => {
        input.target.parentElement.classList.add("focus");
    })
})

/*---------- VALIDACIONES, FORMULARIO DE CONTACTO ----------*/

const inputs = {
    nombre: false,
    mensaje: false,
    precio: false,
    descripcion: false,
    imagen: false
}

contactInputs.forEach(input => {
    input.addEventListener("blur", (input) => {
        if(input.target.value == "") {
            input.target.parentElement.classList.remove("focus");
        }
        validarCampo(input.target);
    })
})

const validarCampo = (input) => {
    const actInput = input.dataset.name;

    if(validaciones[actInput]) {
        validaciones[actInput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("error");
        input.parentElement.querySelector(".contact__error").innerHTML = "";
        inputs[input.dataset.name] = true;
    } else {
        input.parentElement.classList.add("error");
        input.parentElement.querySelector(".contact__error").innerHTML = mostrarMensaje(actInput, input);
        inputs[input.dataset.name] = false;
    }
}

const form = document.querySelector(".contact__form")

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(inputs.nombre && inputs.mensaje) {
        
    } else {
        contactInputs.forEach(input => {
            if(inputs[input.dataset.name] == false) {
                input.parentElement.classList.add("error");
                input.parentElement.querySelector(".contact__error").innerHTML = mostrarMensaje(input.dataset.name, input)
            } 
        })
    }
})

/* ----------- ERRORES ----------- */

const tiposErrores = [
    "valueMissing",
    "patternMismatch",
    "customError"
]

const mensajesErrores = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
        patternMismatch: "Respete el formato solicitado, el nombre no puede exceder los 40 caracteres"
    },
    mensaje: {
        valueMissing: "El mensaje no puede estar vacio",
        customError: "El mensaje debe tener menos de 120 caracteres"
    },
    usuario: {
        valueMissing: "El campo de correo no puede estar vacio",
        patternMismatch: "Respete el formato de correo solicitado"
    },
    pass: {
        valueMissing: "El campo contraseña no puede estar vacio"
    },
    precio: {
        valueMissing: "El campo precio no puede estar vacio",
        patternMismatch: "Respete el formato de precio solicitado, solo dos decimales"
    },
    descripcion: {
        valueMissing: "El campo descripcion no puede estar vacio",
    }
}

const mostrarMensaje = (actInput, input) => {
    let mensaje = "";
    tiposErrores.forEach(error => {
        if(input.validity[error]) {
            mensaje = mensajesErrores[actInput][error];
        }
    })
    return mensaje;
}

/*----------- VALIDACION DEL INPUT MENSAJE -----------*/

const validaciones = {
    mensaje: (input) => validarMensaje(input)
}

const validarMensaje = (input) => {
    let mensaje = "";
    if(input.value.length > 120) {
        mensaje = "No puede exceder los 120 caracteres"
    }
    input.setCustomValidity(mensaje);
}

/*---------- VALIDACIONES, FORMULARIO LOGIN ----------*/

const loginInputs = document.querySelectorAll(".login__input");

loginInputs.forEach(input => {
    input.addEventListener("blur", (input) => {
        validarCampo(input.target);
    })
})

/*---------- VALIDACIONES, EDITAR/AGREGAR PRODUCTO ----------*/

const prodNuevo = document.querySelectorAll(".newproduct__input");
const btnAgregar = document.querySelector("[data-form]");


/*---------- VALIDAR REGISTRO ----------*/

const btn1 = document.querySelectorAll("[data-ind]");
const btn2 = document.querySelectorAll("[data-all]");
const btn3 = document.querySelector("[data-log]");

const url = new URL(window.location)
const user = url.searchParams.get("user")

if(btn1){
    btn1.forEach(el => {
        el.addEventListener("click", (event) => {
            event.preventDefault();
            if(user === null) {
                window.location.href = "/index.html";
            } else if(user == "admin") {
                window.location.href = "/index.html?user=admin";
            }
        })
    })
}

if(btn2) {
    btn2.forEach(el => {
        el.addEventListener("click", (event) => {
            event.preventDefault();
            if(user === null) {
                window.location.href = "/screens/productos.html";
            } else if(user == "admin") {
                window.location.href = "/screens/productos.html?user=admin";
            }
        })
    })
}

if(user == "admin") {
    btn3.textContent = "Salir";
    btn3.addEventListener("click", () => {
        window.location.href = "/index.html"
    })
} else if (user === null) {
    btn3.addEventListener("click", () => {
        window.location.href = "/screens/login.html"
    })
}