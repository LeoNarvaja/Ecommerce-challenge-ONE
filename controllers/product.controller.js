import { productServices } from "../services/product-services.js";

const box = document.querySelector("[data-prod]");

const createCard = (imagen, nombre, precio, id) => {
    const card = document.createElement("div");
    card.classList.add("products__card");
    const content = `
        <img class="products__image" src="assets/img/${imagen}" alt="${imagen}">
        <h3 class="products__name">${nombre}</h3>
        <p class="products__price">${precio}</p>
        <a href="productoXYZ.html" class="products__option">Ver producto</a>`

    card.innerHTML = content;
    
    return card
}

const searchProduct = async () => {
    const url = new URL(window.location);
    let query = url.searchParams.get("query");
    try {
        box.innerHTML = ``;
        document.querySelector(".nav__load").classList.add("show");
        const res = await productServices.buscarProductos(query);
        if (res.length === 0){
            box.parentNode.querySelector("h2").textContent = `No hay resultados para la búsqueda: "${query}"`;
        } else {
            box.parentNode.querySelector("h2").textContent = `Resultados para la búsqueda: "${query}"`;
            res.forEach(({imagen, nombre, precio, id}) => {
                const nuevaTarjeta = createCard(imagen, nombre, precio, id);
                box.appendChild(nuevaTarjeta);
            });
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

searchProduct();
