import { productServices } from "../services/product-services.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    
    try {
        const res = await productServices.crearProducto(nombre, precio);
        if(res.ok){
            Swal.fire(
                'Good job!',
                'Register',
                'success'
              )
        } else {
            throw new Error();
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error has occurred!!',
            footer: 'Please, try again later'
          })
    }
})