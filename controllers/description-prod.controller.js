import { productServices } from "../services/product-services.js";
import { showCard } from "./show.controller.js";

const prodContent = document.querySelector("[data-content]"),
      relContent = document.querySelector("[data-rel-prod]"),
      url = new URL(window.location),
      user = url.searchParams.get("user");

// Crear imagen para el producto.
const createImgProduct = (imagen) => {
    const cardImg = document.createElement("div");
          cardImg.classList.add("content__img");
    const imgCont = `<div class="content__img">
                        <img class="selproduct__img" src="${imagen}" alt="Imagen Producto">
                    </div>`;
    cardImg.innerHTML = imgCont;
    return cardImg
}

// Crear contenido del producto, segun tipo de usuario.
const createDetailProduct = (nombre, precio, id, descripcion) => {
    let cont;
    const cardDescr = document.createElement("div");
          cardDescr.classList.add("content__text");
    if(user === null) {
        cont = `<h3 class="content__title">${nombre}</h3>
                <p class="content__price">${precio}</p>
                <p class="content__desc">${descripcion}</p>`;

    cardDescr.innerHTML = cont;
    } else if (user == "admin"){
        cont = `<h3 class="content__title">${nombre}</h3>
                <p class="content__price">${precio}</p>
                <p class="content__desc">${descripcion}</p>
                <div class="products__icons___box">
                    <a title="Editar producto" href="../screens/producto_editar.html?id=${id}&user=admin" class="products__option" data-edit><i class="fa-solid fa-pen-to-square"></i></a>
                    <a title="Eliminar producto" id="${id}" class="products__option" data-del><i class="fa-solid fa-trash-can"></i></a>
                </div>`;
    
        cardDescr.innerHTML = cont;
        
        const btnDel = cardDescr.querySelector("[data-del]");
              btnDel.addEventListener("click", () => {
              const id = btnDel.id;
            Swal.fire({
                title: 'Estas seguro que desea eliminar este producto?',
                text: "Esta accion no se puede revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar producto!',
                cancelButtonText: 'Cancelar'
                }).then( async (result) => {
                    if(result.isConfirmed) {
                        try {
                            document.querySelector(".nav__load").classList.add("show");
                            const res = await productServices.eliminarProducto(id);
                            if(res.ok) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Producto eliminado con éxito',
                                    text: 'Presiona ok para continuar',
                                    confirmButtonColor: '#2A7AE4',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    allowEnterKey: false,
                                }).then(res => {
                                    if(res.isConfirmed){
                                        window.location.href = `/screens/productos.html?user=admin`
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
                            })
                        }
                        document.querySelector(".nav__load").classList.remove("show");
                    } 
                })
            })
    }
    return cardDescr
}

const showProducts = async () => {

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    try {
        document.querySelector(".nav__load").classList.add("show");
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
            document.querySelector(".nav__load").classList.remove("show");
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
    document.querySelector(".nav__load").classList.remove("show");
}

showProducts();
