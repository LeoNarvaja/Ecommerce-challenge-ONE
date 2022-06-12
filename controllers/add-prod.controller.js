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
        const res = await productServices.crearProducto(nombre, precio, descripcion, categoria);
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
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error has occurred!!',
            footer: 'Please, try again later'
          })
    }
})