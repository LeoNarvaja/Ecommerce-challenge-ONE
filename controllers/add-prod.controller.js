import { productServices } from "../services/product-services.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let categoria = "";
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descr]").value;
    const options = document.getElementsByName("option");
    options.forEach(opc => {
        if(opc.checked) {
            categoria = opc.value;
        }
    });

    console.log(typeof categoria);
    
    try {
        document.querySelector(".nav__load").classList.add("show");
        const res = await productServices.crearProducto(nombre, precio, descripcion, categoria);
        if(res.ok){
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado con éxito',
                text: 'Presiona ok para continuar',
                confirmButtonColor: '#2A7AE4',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
              }).then(result => {
                if(result.isConfirmed){
                  window.location.href = `/screens/productos.html?user=admin`;
                }
              })
        } else {
            document.querySelector(".nav__load").classList.remove("show");
            throw new Error();
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error',
            text: 'Presiona ok para continuar',
            footer: '<p>Intentelo de nuevo más tarde</p>',
            confirmButtonColor: '#2A7AE4',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          }).then(result => {
            if(result.isConfirmed){
              location.reload();
            }
          })
    }
    document.querySelector(".nav__load").classList.remove("show");
})