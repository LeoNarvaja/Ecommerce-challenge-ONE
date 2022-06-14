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
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Presiona ok para continuar',
            confirmButtonColor: '#2A7AE4',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          }).then(result => {
            if(result.isConfirmed){
                window.location.href = `../index.html?user=admin`;
            }
          })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrecta',
            text: 'Presiona ok e intentelo de nuevo',
            confirmButtonColor: '#2A7AE4',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        })
    }   
}

login.addEventListener("submit", validarLogin);