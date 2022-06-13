import { productServices } from "../services/product-services.js";
import { showCard } from "./show.controller.js";

const box = document.querySelector("[data-prod]"),
      btnAdd = document.querySelector("[data-add]"),
      url = new URL(window.location),
      user = url.searchParams.get("user");

// Validar si el usuario es un administrador.
if(user == "admin") {
    btnAdd.classList.remove("products__add");
    btnAdd.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "producto_nuevo.html?user=admin"
    })
}

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

showAllProducts();