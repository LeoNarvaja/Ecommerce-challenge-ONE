import { productServices } from "../services/product-services.js";
import { showCard } from "./show.controller.js";

const box = document.querySelector("[data-prod]");

const showAllProducts = async () => {
    try {
        box.innerHTML = ``;
        document.querySelector(".nav__load").classList.add("show");
        const res = await productServices.listaProductos();
        const resJson = await res.json();
        if (res.ok){
            resJson.forEach(({imagen, nombre, precio, id}) => {
                const nuevaTarjeta = showCard.createCard(imagen, nombre, precio, id);
                box.appendChild(nuevaTarjeta);
            });
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
    document.querySelector(".nav__load").classList.remove("show")
}

showAllProducts();