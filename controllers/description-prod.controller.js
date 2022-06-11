import { productServices } from "../services/product-services.js";
import { showCard } from "./show.controller.js";

const prodContent = document.querySelector("[data-content]");
const relContent = document.querySelector("[data-rel-prod]");

const createDetailProduct = (imagen, nombre, precio) => {
    const cont = `
        <div class="content__img">
            <img class="selproduct__img" src="../assets/img/${imagen}" alt="Skill_1">
        </div>
        <div class="content__text">
            <h3 class="content__title">${nombre}</h3>
            <p class="content__price">${precio}</p>
            <p class="content__desc">Voluptas voluptatum quibusdam similique, class debitis alias maecenas eveniet ridiculus, facilis fusce! Ullam conubia? Sociis, minima malesuada habitasse distinctio sequi aliqua malesuada. Quisque deleniti proin expedita, aliquid litora. Iste recusandae? Commodo, quia ridiculus doloribus vero dictum? Penatibus donec placeat faucibus, dolorum do. Animi porta anim magnam</p>
        </div>`
    return cont
}

const showProducts = async () => {

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    try {

        const res = await productServices.detalleProducto(id);
        const resJson = await res.json();

        if(res.ok) {
            let img = resJson.imagen,
            name = resJson.nombre,
            price = resJson.precio,
            newContent = createDetailProduct(img, name, price);

        prodContent.innerHTML = newContent;

        const list = await productServices.listaProductos();
        const listJson = await list.json();

        listJson.forEach(({imagen, nombre, precio, id, categoria})=> {
            if(resJson.categoria == categoria){
                const card = showCard.createCard(imagen, nombre, precio, id);
                relContent.appendChild(card);
            }
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
    
}

showProducts();
