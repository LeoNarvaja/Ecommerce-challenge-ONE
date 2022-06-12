import { productServices } from "../services/product-services.js";

const form = document.querySelector("[data-form]");

const detailProducts = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const name = document.querySelector("[data-nombre]");
    const price = document.querySelector("[data-precio]");
    const descr = document.querySelector("[data-descr]");


    try {
        document.querySelector(".nav__load").classList.remove("show");
        const res = await productServices.detalleProducto(id);
        const resJson = await res.json();

        if(res.ok){
            name.value = resJson.nombre;
            price.value = resJson.precio;
            descr.value = resJson.descripcion;
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
              window.location.href = `/screens/productos.html?user=admin`;
            }
          })
    } 
    document.querySelector(".nav__load").classList.remove("show");
}

detailProducts();

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    let categoria = "";

    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;
    const descr = document.querySelector("[data-descr]").value;
    const options = document.getElementsByName("option");
    options.forEach(opc => {
        if(opc.checked) {
            categoria = opc.value;
        }
    });

    try {
        document.querySelector(".nav__load").classList.add("show");
        const res = await productServices.actualizarProducto(name, price, id, descr, categoria)

        if(res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Producto modificado',
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
