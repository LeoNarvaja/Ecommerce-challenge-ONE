import { productServices } from "../services/product-services.js";
import { showCard } from "./show.controller.js";

const prodContent = document.querySelector("[data-content]");
const relContent = document.querySelector("[data-rel-prod]");

const url = new URL(window.location);
const user = url.searchParams.get("user");

const createImgProduct = (imagen) => {
    const cardImg = document.createElement("div");
    cardImg.classList.add("content__img");
    const imgCont = `<div class="content__img">
                        <img class="selproduct__img" src="../assets/img/${imagen}" alt="Skill_1">
                    </div>`
    cardImg.innerHTML = imgCont;
    return cardImg
}

const createDetailProduct = (nombre, precio, id, descripcion) => {
    let cont;
    const cardDescr = document.createElement("div");
    cardDescr.classList.add("content__text");
    if(user === null) {
        cont = `<h3 class="content__title">${nombre}</h3>
                <p class="content__price">${precio}</p>
                <p class="content__desc">${descripcion}</p>`

        cardDescr.innerHTML = cont
    } else if (user == "admin"){
        cont = `<h3 class="content__title">${nombre}</h3>
                <p class="content__price">${precio}</p>
                <p class="content__desc">${descripcion}</p>
                <div class="products__icons___box">
                    <a title="Editar producto" href="../screens/producto_editar.html?id=${id}&user=admin" class="products__option" data-edit><i class="fa-solid fa-pen-to-square"></i></a>
                    <a title="Eliminar producto" id="${id}" class="products__option" data-del><i class="fa-solid fa-trash-can"></i></a>
                </div>`
    
        cardDescr.innerHTML = cont
        
        const btnDel = cardDescr.querySelector("[data-del]");
        btnDel.addEventListener("click", async () => {
            const id = btnDel.id
            try {
                const res = await productServices.eliminarProducto(id);
                if(res.ok){
                    let timerInterval
                    Swal.fire({
                        title: 'Producto Eliminado!!',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            },
                            illClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            location.reload();
                        }
                    })
                } else {
                    throw new Error();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error has occurred!!',
                    footer: 'Please, try again later'
                });
            }
        })
    }
    return cardDescr
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
            descr = resJson.descripcion,
            newImg = createImgProduct(img),
            newDescr = createDetailProduct(name, price, id, descr);

        prodContent.appendChild(newImg);
        prodContent.appendChild(newDescr);

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
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error has occurred!!',
            footer: 'Please, try again later'
          })
    }
    
}

showProducts();
