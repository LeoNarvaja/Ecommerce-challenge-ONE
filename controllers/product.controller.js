import { productServices } from "../services/product-services.js";
import { showCard } from "./show.controller.js";

const box = document.querySelector("[data-prod-search]");

const searchProduct = async () => {
    const url = new URL(window.location);
    let query = url.searchParams.get("query");
    try {
        box.innerHTML = ``;
        document.querySelector(".nav__load").classList.add("show");
        const res = await productServices.buscarProductos(query);
        const resJson = await res.json();
        if (res.ok) {
            if (resJson.length === 0){
                box.parentNode.querySelector("h2").textContent = `No hay resultados para la búsqueda: "${query}"`;
            } else {
                box.parentNode.querySelector("h2").textContent = `Resultados para la búsqueda: "${query}"`;
                resJson.forEach(({imagen, nombre, precio, id}) => {
                    const nuevaTarjeta = showCard.createCard(imagen, nombre, precio, id);
                    box.appendChild(nuevaTarjeta);
                });
            }
        } else {
            document.querySelector(".nav__load").classList.remove("show")
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
          })
    }
    document.querySelector(".nav__load").classList.remove("show")
}

searchProduct();