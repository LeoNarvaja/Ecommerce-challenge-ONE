/*---------- VALIDACION LOGIN ----------*/

const login = document.querySelector("[data-form-login]");

const validarLogin = (event) => {
    event.preventDefault();
    let validacion = false;
    let input = document.querySelector("[data-name=usuario]").value;
    let pass = document.querySelector("[data-name=pass]").value;

    const email = "abcde@gmail.com";
    const password = "12345";

    if(input == email && pass == password) {
        console.log("login completado");

        window.location.href = `../index.html?user=admin`
    } else {
        console.log("email o contraseña incorrecto")
    }
}

login.addEventListener("submit", validarLogin);