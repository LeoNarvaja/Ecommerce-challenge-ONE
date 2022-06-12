import { productServices } from "../services/product-services.js";

const form = document.querySelector("[data-form]");

const detailProducts = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const name = document.querySelector("[data-nombre]");
    const price = document.querySelector("[data-precio]");
    const descr = document.querySelector("[data-descr]");

    try {

        const res = await productServices.detalleProducto(id);
        const resJson = await res.json();

        if(res.ok){
            name.value = resJson.nombre;
            price.value = resJson.precio;
            descr.value = resJson.descripcion;
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
}

detailProducts();

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;

    try {
        const res = await productServices.actualizarProducto(name, price, id)

        if(res.ok) {
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
